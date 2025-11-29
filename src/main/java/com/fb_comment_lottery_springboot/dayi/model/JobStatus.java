package com.fb_comment_lottery_springboot.dayi.model;

import java.util.Collections;
import java.util.List;

public class JobStatus {
    private int count;
    private String status; // IDLE, SCRAPING, COMPLETED, ERROR
    private List<FbComment> results;
    private long lastUpdated;

    public JobStatus() {
        this.count = 0;
        this.status = "SCRAPING";
        this.lastUpdated = System.currentTimeMillis();
    }

    public void updateCount(int count) {
        this.count = count;
        this.lastUpdated = System.currentTimeMillis();
    }

    public void complete(List<FbComment> results) {
        this.results = results;
        this.status = "COMPLETED";
        this.lastUpdated = System.currentTimeMillis();
    }

    public void error() {
        this.status = "ERROR";
        this.lastUpdated = System.currentTimeMillis();
    }

    public int getCount() {
        return count;
    }

    public String getStatus() {
        return status;
    }

    public List<FbComment> getResults() {
        return results != null ? results : Collections.emptyList();
    }
    
    public long getLastUpdated() {
        return lastUpdated;
    }
}
