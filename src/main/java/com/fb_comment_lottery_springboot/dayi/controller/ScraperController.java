package com.fb_comment_lottery_springboot.dayi.controller;

import com.fb_comment_lottery_springboot.dayi.model.FbComment;
import com.fb_comment_lottery_springboot.dayi.model.JobStatus;
import com.fb_comment_lottery_springboot.dayi.service.FbScraperService;
import com.fb_comment_lottery_springboot.dayi.util.JobManager;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.Collections;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/fb")
public class ScraperController {

    private final FbScraperService scraperService;
    private final JobManager jobManager;

    @Autowired
    public ScraperController(FbScraperService scraperService, JobManager jobManager) {
        this.scraperService = scraperService;
        this.jobManager = jobManager;
    }

    @GetMapping("/comments")
    public ResponseEntity<Map<String, String>> startScraping(@RequestParam("url") String url) {
        String jobId = jobManager.createJob();
        scraperService.scrapeCommentsAsync(url, jobId);
        return ResponseEntity.accepted().body(Map.of("jobId", jobId));
    }

    @GetMapping("/progress")
    public ResponseEntity<Map<String, Object>> getProgress(@RequestParam("jobId") String jobId) {
        JobStatus job = jobManager.getJob(jobId);
        if (job == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(Map.of(
            "status", job.getStatus(),
            "count", job.getCount()
        ));
    }
    
    @GetMapping("/results")
    public ResponseEntity<List<FbComment>> getResults(@RequestParam("jobId") String jobId) {
        JobStatus job = jobManager.getJob(jobId);
        if (job == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(job.getResults());
    }
}