# Change: Phase 20 - Fix Regex Escape Sequence

## Why
The user reported a compilation error: `Invalid escape sequence`.
This is caused by a regex string in `FbScraperService.java` where backslashes are not properly escaped for Java strings.
Specifically: `\d` (digit) in a Java string must be written as `\\d`.

## What Changes
- **File:** `src/main/java/com/fb_comment_lottery_springboot/dayi/service/FbScraperService.java`
- **Correction:**
    - Change `^\\d+([dwymh週天時分秒]|.*ago).*` (which was likely written as `^\d+...`)
    - Or check `matches("Like|Reply|Share|讚|回覆|分享")` logic.

## Impact
- **Affected Code:** `FbScraperService.java`
- **Result:** Code compiles and runs without error.

