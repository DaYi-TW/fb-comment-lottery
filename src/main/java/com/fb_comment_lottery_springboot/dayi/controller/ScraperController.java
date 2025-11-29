package com.fb_comment_lottery_springboot.dayi.controller;

import com.fb_comment_lottery_springboot.dayi.model.FbComment;
import com.fb_comment_lottery_springboot.dayi.service.FbScraperService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/fb")
public class ScraperController {

    private final FbScraperService scraperService;

    @Autowired
    public ScraperController(FbScraperService scraperService) {
        this.scraperService = scraperService;
    }

    @GetMapping("/comments")
    public List<FbComment> getComments(@RequestParam("url") String url) {
        return scraperService.scrapeComments(url);
    }
}
