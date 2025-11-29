package com.fb_comment_lottery_springboot.dayi.model;

import java.util.List;

public class LotteryResponse {
    private List<Winner> winners;

    public LotteryResponse() {
    }

    public LotteryResponse(List<Winner> winners) {
        this.winners = winners;
    }

    public List<Winner> getWinners() {
        return winners;
    }

    public void setWinners(List<Winner> winners) {
        this.winners = winners;
    }
}
