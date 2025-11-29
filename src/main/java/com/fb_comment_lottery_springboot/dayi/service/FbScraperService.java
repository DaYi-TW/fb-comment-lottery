package com.fb_comment_lottery_springboot.dayi.service;

import com.fb_comment_lottery_springboot.dayi.model.FbComment;
import com.microsoft.playwright.*;
import com.microsoft.playwright.options.AriaRole;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Service
public class FbScraperService {

    public List<FbComment> scrapeComments(String postUrl) {
        List<FbComment> comments = new ArrayList<>();
        Set<String> uniqueKeys = new HashSet<>();

        try (Playwright playwright = Playwright.create()) {
            // Launch chromium, headless=true for performance, can be false for debugging
            Browser browser = playwright.chromium().launch(new BrowserType.LaunchOptions().setHeadless(true));
            BrowserContext context = browser.newContext();
            Page page = context.newPage();

            try {
                page.navigate(postUrl);
                
                // Wait for the page to load significantly. 
                // Facebook often has a "skeleton" load state.
                page.waitForLoadState();
                page.waitForTimeout(5000); // Give it some extra time for dynamic content

                // Attempt to close "See more on Facebook" login modal if it appears
                // Strategy: Look for a close button or "Not Now" button
                try {
                    page.getByRole(AriaRole.BUTTON, new Page.GetByRoleOptions().setName("Close")).click();
                } catch (Exception ignored) {}
                
                try {
                     // Sometimes it's a "Decline" cookies button
                     page.getByRole(AriaRole.BUTTON, new Page.GetByRoleOptions().setName("Decline optional cookies")).click();
                } catch (Exception ignored) {}


                // Scraping Loop
                // We will try to scroll and load more comments a few times.
                int maxScrolls = 5; 
                for (int scroll = 0; scroll < maxScrolls; scroll++) {
                    
                    // 1. Locate Comments using ARIA Role 'article'
                    // Most FB comments are marked as articles within the feed or modal.
                    Locator commentArticles = page.getByRole(AriaRole.ARTICLE);
                    int count = commentArticles.count();

                    for (int i = 0; i < count; i++) {
                        Locator article = commentArticles.nth(i);
                        
                        // ARIA Label Strategy: "Comment by [Name]"
                        // This is very robust on FB.
                        String ariaLabel = article.getAttribute("aria-label");
                        String author = null;
                        String content = null;

                        if (ariaLabel != null && ariaLabel.startsWith("Comment by ")) {
                            author = ariaLabel.substring("Comment by ".length());
                            // The content is usually the visible text inside, minus the author name?
                            // Actually, extracting content cleanly is harder.
                            // Let's try to get the text content of the article.
                            String fullText = article.innerText();
                            // Simple heuristic: Remove author name from full text
                            content = fullText.replace(author, "").trim(); 
                            // Clean up timestamps/buttons (Like, Reply) if possible
                            // This is a "best effort" parsing.
                        } else {
                            // Fallback: Structure + Text
                            // Look for the author link
                            // Usually the first link with substantial text is the author
                            try {
                                Locator authorLink = article.getByRole(AriaRole.LINK).first();
                                if (authorLink.isVisible()) {
                                    author = authorLink.innerText();
                                }
                                content = article.innerText(); // Raw text
                            } catch (Exception e) {
                                continue; // Skip if structure doesn't match
                            }
                        }

                        if (author != null && !author.isEmpty() && content != null) {
                            // Basic cleanup
                            content = cleanContent(content);
                            
                            String key = author + "::" + content;
                            if (!uniqueKeys.contains(key)) {
                                comments.add(new FbComment(author, content));
                                uniqueKeys.add(key);
                            }
                        }
                    }

                    // 2. Scroll Down
                    page.evaluate("window.scrollTo(0, document.body.scrollHeight)");
                    
                    // 3. Click "View more comments" if visible
                    // Facebook often hides comments behind a button.
                    // Strategy: specific text match
                    try {
                         Locator viewMore = page.getByRole(AriaRole.BUTTON, new Page.GetByRoleOptions().setName("View more comments"));
                         if (viewMore.isVisible()) {
                             viewMore.click();
                             page.waitForTimeout(2000);
                         }
                    } catch (Exception ignored) {}
                    
                    page.waitForTimeout(2000); // Wait for new comments to render
                }

            } catch (Exception e) {
                e.printStackTrace();
                // Return whatever we collected so far
            }
        }
        return comments;
    }
    
    private String cleanContent(String raw) {
        // Remove common UI noise if it got captured
        // "Like Reply 1m" etc.
        // This requires regex or sophisticated parsing.
        // For now, we return the raw text, trimming whitespace.
        if (raw == null) return "";
        String cleaned = raw.trim();
        // Example: remove "LikeReplyShare" suffix logic could go here
        return cleaned;
    }
}
