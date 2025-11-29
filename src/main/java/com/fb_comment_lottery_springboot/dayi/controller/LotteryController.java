package com.fb_comment_lottery_springboot.dayi.controller;

import com.fb_comment_lottery_springboot.dayi.model.LotteryRequest;
import com.fb_comment_lottery_springboot.dayi.model.LotteryResponse;
import com.fb_comment_lottery_springboot.dayi.model.Winner;
import com.fb_comment_lottery_springboot.dayi.service.LotteryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/fb")
public class LotteryController {

    private final LotteryService lotteryService;

    @Autowired
    public LotteryController(LotteryService lotteryService) {
        this.lotteryService = lotteryService;
    }

    @PostMapping("/lottery")
    public LotteryResponse performLottery(@RequestBody LotteryRequest request) {
        List<Winner> winners = lotteryService.performLottery(
                request.getParticipants(),
                request.getCount(),
                request.isAllowDuplicate(),
                request.getFilterKeyword()
        );
        return new LotteryResponse(winners);
    }
}
