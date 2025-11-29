package com.fb_comment_lottery_springboot.dayi.service;

import com.fb_comment_lottery_springboot.dayi.model.FbComment;
import com.fb_comment_lottery_springboot.dayi.model.Winner;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import java.util.Arrays;
import java.util.Collections;
import java.util.List;

import static org.junit.jupiter.api.Assertions.*;

class LotteryServiceTest {

    private LotteryService lotteryService;

    @BeforeEach
    void setUp() {
        lotteryService = new LotteryService();
    }

    @Test
    void testPerformLottery_Basic() {
        List<FbComment> participants = Arrays.asList(
                new FbComment("User1", "Comment 1"),
                new FbComment("User2", "Comment 2"),
                new FbComment("User3", "Comment 3")
        );

        List<Winner> winners = lotteryService.performLottery(participants, 1, true, null);

        assertEquals(1, winners.size());
        assertTrue(participants.stream().anyMatch(p -> p.getAuthor().equals(winners.get(0).getAuthor())));
    }

    @Test
    void testPerformLottery_EmptyList() {
        List<Winner> winners = lotteryService.performLottery(Collections.emptyList(), 1, true, null);
        assertTrue(winners.isEmpty());
    }

    @Test
    void testPerformLottery_KeywordFilter() {
        List<FbComment> participants = Arrays.asList(
                new FbComment("User1", "Hello World"),
                new FbComment("User2", "Hello Java"),
                new FbComment("User3", "Hi Python")
        );

        List<Winner> winners = lotteryService.performLottery(participants, 3, true, "Hello");

        assertEquals(2, winners.size());
        assertTrue(winners.stream().allMatch(w -> w.getContent().contains("Hello")));
        assertTrue(winners.stream().noneMatch(w -> w.getAuthor().equals("User3")));
    }

    @Test
    void testPerformLottery_Deduplication() {
        List<FbComment> participants = Arrays.asList(
                new FbComment("User1", "Comment 1"),
                new FbComment("User1", "Comment 2"), // Duplicate author
                new FbComment("User2", "Comment 3")
        );

        // Allow Duplicate = false
        List<Winner> winnersNoDup = lotteryService.performLottery(participants, 3, false, null);
        assertEquals(2, winnersNoDup.size()); // Should only be User1 and User2

        // Allow Duplicate = true
        List<Winner> winnersDup = lotteryService.performLottery(participants, 3, true, null);
        assertEquals(3, winnersDup.size());
    }

    @Test
    void testPerformLottery_CountGreaterThanSize() {
        List<FbComment> participants = Arrays.asList(
                new FbComment("User1", "Comment 1"),
                new FbComment("User2", "Comment 2")
        );

        List<Winner> winners = lotteryService.performLottery(participants, 5, true, null);
        assertEquals(2, winners.size());
    }
}
