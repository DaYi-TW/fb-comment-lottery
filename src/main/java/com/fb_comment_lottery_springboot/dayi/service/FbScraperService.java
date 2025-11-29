package com.fb_comment_lottery_springboot.dayi.service;

import com.fb_comment_lottery_springboot.dayi.model.FbComment;
import com.fb_comment_lottery_springboot.dayi.util.JobManager;
import com.microsoft.playwright.*;
import com.microsoft.playwright.options.AriaRole;
import com.microsoft.playwright.options.LoadState;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.regex.Pattern;

@Service
public class FbScraperService {

    private static final Logger logger = LoggerFactory.getLogger(FbScraperService.class);
    private final JobManager jobManager;

    @Autowired
    public FbScraperService(JobManager jobManager) {
        this.jobManager = jobManager;
    }

    public void scrapeCommentsAsync(String postUrl, String jobId) {
        new Thread(() -> {
            scrapeCommentsInternal(postUrl, jobId);
        }).start();
    }

    private void scrapeCommentsInternal(String postUrl, String jobId) {
        logger.info("Starting scraping for Job: {}, URL: {}", jobId, postUrl);
        
        List<FbComment> comments = new ArrayList<>();
        Set<String> uniqueKeys = new HashSet<>();

        try (Playwright playwright = Playwright.create()) {
            logger.info("Launching Chromium...");
            Browser browser = playwright.chromium().launch(new BrowserType.LaunchOptions()
                    .setHeadless(true)
                    .setArgs(List.of("--disable-blink-features=AutomationControlled"))); 
            
            BrowserContext context = browser.newContext(new Browser.NewContextOptions()
                    .setUserAgent("Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36"));
            
            Page page = context.newPage();

            try {
                logger.info("Navigating to page...");
                page.navigate(postUrl);
                page.waitForLoadState(LoadState.DOMCONTENTLOADED);
                page.waitForTimeout(1000);
                logger.info("Page loaded.");

                // Modals (Fast Fail)
                try {
                    Locator closeBtn = page.getByRole(AriaRole.BUTTON, new Page.GetByRoleOptions().setName("Close"));
                    if (closeBtn.isVisible()) closeBtn.click();
                } catch (Exception ignored) {}
                try {
                    Locator cookieBtn = page.getByRole(AriaRole.BUTTON, new Page.GetByRoleOptions().setName("Decline optional cookies"));
                    if (cookieBtn.isVisible()) cookieBtn.click();
                } catch (Exception ignored) {}

                // Filter Switch
                try {
                    Pattern filterPattern = Pattern.compile("Most relevant|Top comments|最相關|熱門", Pattern.CASE_INSENSITIVE);
                    Locator filterButton = page.getByRole(AriaRole.BUTTON)
                            .filter(new Locator.FilterOptions().setHasText(filterPattern))
                            .first();
                    
                    if (filterButton.isVisible()) {
                        filterButton.click();
                        page.waitForTimeout(500);
                        Pattern allCommentsPattern = Pattern.compile("All comments|所有留言", Pattern.CASE_INSENSITIVE);
                        Locator allCommentsOption = page.getByRole(AriaRole.MENUITEM).filter(new Locator.FilterOptions().setHasText(allCommentsPattern)).first();
                        if (allCommentsOption.isVisible()) {
                            allCommentsOption.click();
                        } else {
                             page.getByText(allCommentsPattern).click();
                        }
                        page.waitForTimeout(2000);
                    }
                } catch (Exception e) {
                    logger.error("Could not switch filter: {}", e.getMessage());
                }

                // Loop
                int maxIterations = 500;
                int previousCount = 0;
                int noChangeCount = 0;
                int tolerance = 5;
                Pattern viewMorePattern = Pattern.compile("View.*comments|查看.*留言|更多留言", Pattern.CASE_INSENSITIVE);

                for (int i = 0; i < maxIterations; i++) {
                    Locator commentArticles = page.getByRole(AriaRole.ARTICLE);
                    int count = commentArticles.count();

                    for (int j = 0; j < count; j++) {
                        Locator article = commentArticles.nth(j);
                        // print article inner text
                        // System.out.println("Article Text: " + article.innerText());
                        String ariaLabel = article.getAttribute("aria-label");
                        String author = null;
                        String content = null;
                        String timestamp = null;
                        
                        // --- AUTHOR EXTRACTION ---
                        // Strategy 1: aria-label (Most Reliable)
                        // e.g. "Comment by John Doe" or "由 John Doe 留言"
                        // print ariaLabel
                        
                        if (ariaLabel != null && (ariaLabel.startsWith("Comment by ") || ariaLabel.contains("留言"))) {
                            
                            try {
                                 String fullText = article.innerText();
                                 String[] lines = fullText.split("\n", 2); // Split into max 2 parts
                                 
                                 if (lines.length >= 2) {
                                     author = lines[0].trim();
                                     content = lines[1].trim();
                                 } else if (lines.length == 1) {
                                     author = lines[0].trim();
                                     content = "";
                                 } else {
                                     author = "Unknown";
                                     content = fullText;
                                 }
                             } catch (Exception e) {
                                 continue;
                             }
                        } else {
                            try {
                                Locator authorLink = article.getByRole(AriaRole.LINK).first();
                                if (authorLink.isVisible()) {
                                    author = authorLink.innerText();
                                }
                                content = article.innerText(); 
                            } catch (Exception e) {
                                continue; 
                            }
                        }

                        // Strategy 2: DOM Structure (Fallback)
                        if (author == null) {
                            // Find the first link that is NOT a timestamp
                            // Timestamp links usually match regex: \d+[dwymh週天時分秒]
                            List<Locator> links = article.getByRole(AriaRole.LINK).all();
                            for (Locator link : links) {
                                String text = link.innerText().trim();
                                if (!text.isEmpty()
                                    && !text.matches("Like|Reply|Share|讚|回覆|分享")
                                    && !text.matches(
                                        "^\\d+\\s*(h|hr|hrs|m|min|mins|d|day|days|w|week|weeks|y|year|years)$"          // 英文的 3h / 5d / 10w / 1y
                                        + "|^\\d+\\s*(分鐘|分|小時|時|天|週|月|年前?|後?)$"                              // 中文 5分鐘、3小時、2天
                                        + "|^\\d+.*ago$"                                                               // 英文 3 hours ago
                                    )) {
                                    author = text;
                                    break;
                                }

                            }
                        }
                        
                        if (author == null) author = "Unknown"; // Should rarely happen

                        // --- TIMESTAMP EXTRACTION ---
                        try {
                             List<Locator> links = article.getByRole(AriaRole.LINK).all();
                             for (Locator link : links) {
                                 String linkText = link.innerText().trim();
                                 
                                 // Identify timestamp link: usually digits + short suffix
                                if (linkText.matches(
                                        "^\\d+\\s*(s|sec|secs|m|min|mins|h|hr|hrs|d|day|days|w|week|weeks|y|year|years)$"   // 英文縮寫數字 + 單位
                                        + "|^\\d+.*ago$"                                                                     // 英文 ago
                                        + "|^\\d+\\s*(秒|分鐘|分|小時|時|天|週|月|年)(前)?$"                                   // 中文
                                )) {
                                     
                                     // 1. Try aria-label
                                     String dateLabel = link.getAttribute("aria-label");
                                     if (dateLabel != null && !dateLabel.isEmpty()) {
                                         timestamp = dateLabel;
                                         break; 
                                     }
                                     
                                     // 2. Try Hover (Dynamic Tooltip)
                                     try {
                                         link.hover();
                                         Locator tooltip = page.getByRole(AriaRole.TOOLTIP).first();
                                         
                                         // Fallback for non-role tooltips
                                         if (tooltip.count() == 0) {
                                             page.waitForTimeout(500);
                                             tooltip = page.getByRole(AriaRole.TOOLTIP).first();
                                         } else {
                                             tooltip.waitFor(new Locator.WaitForOptions().setTimeout(500));
                                         }

                                         if (tooltip.isVisible()) {
                                             timestamp = tooltip.innerText();
                                             page.mouse().move(0, 0);
                                             break;
                                         }
                                     } catch (Exception ignoredHover) {}
                                     
                                     // 3. Fallback: Use relative text (e.g. "2天") if everything else failed
                                     if (timestamp == null) {
                                         timestamp = linkText; 
                                     }
                                     break; // Found the date link
                                 }
                             }
                        } catch (Exception e) {}

                        if (author != null && !author.isEmpty() && content != null) {
                            content = cleanContent(content);
                            String key = author + "::" + content;
                            if (!uniqueKeys.contains(key)) {
                                comments.add(new FbComment(author, content, timestamp));
                                uniqueKeys.add(key);
                            }
                        }
                    }
                    
                    jobManager.updateJob(jobId, comments.size());

                    if (comments.size() == previousCount) {
                        noChangeCount++;
                    } else {
                        logger.info("Job {}: Iteration {}: Found {} comments.", jobId, i, comments.size());
                        noChangeCount = 0;
                        previousCount = comments.size();
                    }

                    boolean buttonClicked = false;
                    try {
                         Locator viewMore = page.getByRole(AriaRole.BUTTON).filter(new Locator.FilterOptions().setHasText(viewMorePattern)).first();
                         if (viewMore.isVisible()) {
                             viewMore.scrollIntoViewIfNeeded();
                             viewMore.click();
                             buttonClicked = true;
                             noChangeCount = 0; 
                             page.waitForLoadState(LoadState.NETWORKIDLE, new Page.WaitForLoadStateOptions().setTimeout(1000)); 
                         }
                    } catch (Exception ignored) {}

                    if (!buttonClicked && noChangeCount >= tolerance) break;

                    try {
                        if (count > 0) commentArticles.last().scrollIntoViewIfNeeded();
                        else page.evaluate("window.scrollTo(0, document.body.scrollHeight)");
                    } catch (Exception e) {
                         page.evaluate("window.scrollTo(0, document.body.scrollHeight)");
                    }
                    page.waitForTimeout(500); 
                }

            } catch (Exception e) {
                logger.error("Scraping error for job " + jobId, e);
                jobManager.errorJob(jobId);
                return;
            }
        }
        
        logger.info("Job {} finished. Total: {}", jobId, comments.size());
        jobManager.completeJob(jobId, comments);
    }
    
    private String cleanContent(String raw) {
        if (raw == null) return "";
        return raw.replaceAll("(?m)^(Like|Reply|Share|Favorites|讚|回覆|分享|\\d+[wdyhms]).*$", "").trim();
    }
}