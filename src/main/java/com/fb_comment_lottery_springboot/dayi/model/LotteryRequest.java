package com.fb_comment_lottery_springboot.dayi.model;

import java.util.List;

public class LotteryRequest {
    private int count;
    private boolean allowDuplicate;
    private String filterKeyword;
    private List<FbComment> participants;

    public int getCount() {
        return count;
    }

    public void setCount(int count) {
        this.count = count;
    }

    public boolean isAllowDuplicate() {
        return allowDuplicate;
    }

    public void setAllowDuplicate(boolean allowDuplicate) {
        this.allowDuplicate = allowDuplicate;
    }

    public String getFilterKeyword() {
        return filterKeyword;
    }

    public void setFilterKeyword(String filterKeyword) {
        this.filterKeyword = filterKeyword;
    }

    public List<FbComment> getParticipants() {
        return participants;
    }

    public void setParticipants(List<FbComment> participants) {
        this.participants = participants;
    }
}
