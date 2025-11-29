package com.fb_comment_lottery_springboot.dayi.util;

import com.fb_comment_lottery_springboot.dayi.model.FbComment;
import com.fb_comment_lottery_springboot.dayi.model.JobStatus;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.Map;
import java.util.UUID;
import java.util.concurrent.ConcurrentHashMap;

@Component
public class JobManager {
    
    private final Map<String, JobStatus> jobs = new ConcurrentHashMap<>();

    public String createJob() {
        String jobId = UUID.randomUUID().toString();
        jobs.put(jobId, new JobStatus());
        return jobId;
    }

    public void updateJob(String jobId, int count) {
        JobStatus job = jobs.get(jobId);
        if (job != null) {
            job.updateCount(count);
        }
    }

    public void completeJob(String jobId, List<FbComment> results) {
        JobStatus job = jobs.get(jobId);
        if (job != null) {
            job.complete(results);
        }
    }

    public void errorJob(String jobId) {
        JobStatus job = jobs.get(jobId);
        if (job != null) {
            job.error();
        }
    }

    public JobStatus getJob(String jobId) {
        return jobs.get(jobId);
    }
    
    // Cleanup old jobs every 10 minutes
    @Scheduled(fixedRate = 600000)
    public void cleanup() {
        long now = System.currentTimeMillis();
        long expiry = 30 * 60 * 1000; // 30 mins
        jobs.entrySet().removeIf(entry -> (now - entry.getValue().getLastUpdated()) > expiry);
    }
}
