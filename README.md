# 📄 **Proposal：FB 留言爬取與抽獎系統 (Facebook Comment Scraper & Lottery System)**

## 📌 專案名稱

**fb-comment-lottery-springboot**

---

# 1. 📘 專案簡介 (Project Overview)

本專案旨在建立一個 **以 Spring Boot 為後端核心**、搭配 **Playwright 瀏覽器自動化** 的
**Facebook 公開留言爬取與抽獎系統**。

系統能透過貼文網址自動擷取留言內容與留言者，並提供公平、透明的抽獎機制，適用於：

* 粉絲團活動抽獎
* 公關活動贈品抽選
* 社群行銷互動統計
* 客戶留言互動整理

本系統不依賴 Meta Graph API，因此 **無需粉專管理員權限**，可適用於任何「公開」貼文。

---

# 2. 🎯 目標 (Objectives)

* 自動化擷取 Facebook 公開貼文留言（作者、內容、時間等資料）
* 透過後端 API 提供資料抓取介面
* 建立可重複使用的抽獎邏輯（隨機抽選、排除條件等）
* 支援匯出 CSV / JSON
* 提供抽獎記錄與結果驗證機制
* 可擴充整合前端（Vue / React）製作管理面板

---

# 3. 🏗 系統架構 (System Architecture)

```text
                ┌───────────────────────────┐
                │       前端（可選）        │
                │ Vue / React / Bootstrap   │
                └─────────────┬─────────────┘
                              │ REST API
                              ▼
                ┌───────────────────────────┐
                │       Spring Boot API     │
                │   /fb/comments            │
                │   /fb/lottery             │
                └─────────────┬─────────────┘
                              │ 呼叫 Playwright
                              ▼
                ┌───────────────────────────┐
                │   Playwright for Java     │
                │ 自動滾動、解析留言         │
                └─────────────┬─────────────┘
                              │
                              ▼
                ┌───────────────────────────┐
                │        Facebook 網站      │
                │（公開貼文，不需登入）      │
                └───────────────────────────┘
```

---

# 4. ⚙️ 功能說明 (Features)

## 🔍 4.1 留言爬取功能

* 支援輸入貼文網址
* 自動滾動載入所有留言
* 解析留言內容：

  * 作者名稱
  * 留言文字
  * 留言時間（可加入）
  * 按讚數（可加入）
  * 回覆留言（可加入）
* 產出 JSON 或 CSV

---

## 🎰 4.2 抽獎功能

* 隨機抽出一位或數位留言者
* 支援排除條件：

  * 空白留言
  * 指定文字才符合條件（如：tag 朋友）
  * 重複留言者只算一次
* 抽獎紀錄保存與可驗證性

---

## 📤 4.3 匯出功能

* 結果可匯出 CSV / JSON
* 方便行銷團隊、客戶進行備份與公告

---

# 5. 🔧 技術棧 (Tech Stack)

| 技術                      | 用途             |
| ----------------------- | -------------- |
| **Spring Boot 3**       | API 伺服器        |
| **Playwright for Java** | 自動化瀏覽器爬取 FB 留言 |
| **Java 17+**            | 主程式語言          |
| **Maven**               | 專案管理           |
| **Lombok**              | 資料模型簡化（可選）     |
| **Docker (可選)**         | 打包部署           |
| **H2 / MySQL (可選)**     | 抽獎紀錄儲存         |

---

# 6. 📑 API 設計 (API Design)

## ▶ 6.1 爬取留言

### `GET /fb/comments?url={FB貼文網址}`

**Response 範例：**

```json
[
  {
    "author": "王小明",
    "content": "我來參加抽獎！"
  },
  {
    "author": "陳大益",
    "content": "希望能中獎"
  }
]
```

---

## ▶ 6.2 抽獎

### `POST /fb/lottery`

**Request：**

```json
{
  "count": 1,
  "allowDuplicate": false,
  "filterKeyword": null
}
```

**Response：**

```json
{
  "winners": [
    {
      "author": "王小明",
      "content": "我來參加抽獎！"
    }
  ]
}
```

---

# 7. 🗂 專案目錄結構（建議）

```
fb-comment-lottery-springboot/
│
├── src/main/java/com/example/
│   ├── controller/
│   │   └── FbScraperController.java
│   ├── service/
│   │   ├── FbScraperService.java
│   │   └── LotteryService.java
│   ├── model/
│   │   ├── FbComment.java
│   │   └── Winner.java
│   └── FbCommentLotteryApplication.java
│
├── resources/
│   └── application.yml
│
└── README.md
```

---

# 8. 🧪 測試規劃 (Testing)

| 測試項目       | 說明          |
| ---------- | ----------- |
| 爬公開貼文留言    | 正常抓取、不漏留言   |
| 貼文留言 1000+ | 自動滾動是否完整    |
| 抽獎結果是否隨機   | 重複抽取測試      |
| API 壓力測試   | 多人使用情境      |
| 爬取速度測試     | 倒數顯示與 retry |

---

# 9. 🚀 部署建議 (Deployment)

可選擇：

* Docker + Playwright 版 Chromium
* Linux Server 上原生跑 JAR
* Azure / AWS / GCP 雲端部署
* Kubernetes（大規模使用）

---

# 10. 📈 後續擴充 (Future Enhancements)

* 加入前端管理介面（Vue / React）
* 定期自動抽獎（排程）
* 支援 Instagram / Threads 抽獎
* 儲存留言原始資料供分析
* 增加「抽獎條件」規則引擎

---

# 11. 📚 授權 (License)

建議使用：
**MIT License**（可商用、最寬鬆）

---

# 12. 🧑‍💻 作者 (Author)

**DaYi-TW**
Facebook 留言抽獎系統開發者
Email: *你自己的 email*
GitHub: [https://github.com/DaYi-TW](https://github.com/DaYi-TW)
