package com.fb_comment_lottery_springboot.dayi.model;

public class Winner {
    private String author;
    private String content;

    public Winner() {
    }

    public Winner(FbComment comment) {
        this.author = comment.getAuthor();
        this.content = comment.getContent();
    }

    public Winner(String author, String content) {
        this.author = author;
        this.content = content;
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
}
