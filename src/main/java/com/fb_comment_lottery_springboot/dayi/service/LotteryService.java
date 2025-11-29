package com.fb_comment_lottery_springboot.dayi.service;

import com.fb_comment_lottery_springboot.dayi.model.FbComment;
import com.fb_comment_lottery_springboot.dayi.model.Winner;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class LotteryService {

    public List<Winner> performLottery(List<FbComment> participants, int count, boolean allowDuplicate, String filterKeyword) {
        if (participants == null || participants.isEmpty()) {
            return Collections.emptyList();
        }

        // 1. Filter by keyword
        List<FbComment> filteredList = participants.stream()
                .filter(c -> filterKeyword == null || filterKeyword.isEmpty() || (c.getContent() != null && c.getContent().contains(filterKeyword)))
                .collect(Collectors.toList());

        // 2. Deduplicate by author if needed
        if (!allowDuplicate) {
            filteredList = filteredList.stream()
                    .collect(Collectors.collectingAndThen(
                            Collectors.toMap(FbComment::getAuthor, c -> c, (c1, c2) -> c1), // Keep first
                            map -> new ArrayList<>(map.values())
                    ));
        }

        // 3. Random Selection
        if (filteredList.size() <= count) {
            return filteredList.stream().map(Winner::new).collect(Collectors.toList());
        }

        List<FbComment> shuffled = new ArrayList<>(filteredList);
        Collections.shuffle(shuffled);

        return shuffled.subList(0, count).stream()
                .map(Winner::new)
                .collect(Collectors.toList());
    }
}
