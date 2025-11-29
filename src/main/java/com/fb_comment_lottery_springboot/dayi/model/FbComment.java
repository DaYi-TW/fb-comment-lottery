package com.fb_comment_lottery_springboot.dayi.model;

public class FbComment {
    private String author;
    private String content;
    private String timestamp;

    public FbComment() {
    }

    public FbComment(String author, String content) {
        this.author = author;
        this.content = content;
    }
    
    public FbComment(String author, String content, String timestamp) {
        this.author = author;
        this.content = content;
        this.timestamp = timestamp;
    }

    public String getAuthor() {
        return author;
    }

    public void setAuthor(String author) {
        this.author = author;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }
    
    public String getTimestamp() {
        return timestamp;
    }

    public void setTimestamp(String timestamp) {
        this.timestamp = timestamp;
    }
}