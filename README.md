# 閒台文 GitHub Pages 同窗QR v1.16

## v1.16 魔龍直達修正
- 修正「傳送魔龍戰場」偶發卡住、只切頁卻沒有進入戰鬥的問題。
- 傳送按鈕不再搜尋畫面上的「正式挑戰」按鈕後模擬 click，而是直接呼叫魔龍戰鬥引擎。
- 單次點擊會直接切到 `#academy.dragon`、建立正式戰 battle state、跳過 2.6 秒魔龍降臨 intro，立即顯示第一題。
- 移除 6.5 秒 requestAnimationFrame 等待迴圈；失敗時只做一次 80ms 相容性重試，且不會留下全螢幕遮罩阻塞頁面。

# 閒台文 GitHub Pages v1.15

更新：啟動畫面改為台灣故事式載入里程碑。

- 0% 唐山過台灣
- 38% 與台灣原住民交朋友
- 52% 阿美族的朋友說我皮膚很白
- 73% 後來和客家人一起採茶
- 100% 採茶成功！

使用者介面不再顯示 5s Watchdog、Core Parsing、Audio Pack 等技術載入字樣；內部載入機制保持不變。


## v1.17.1 packaging fix
- GitHub Pages deploy files are at ZIP root (index.html / assets / soundscape).
- Preserves v1.17 mobile layout fixes.
- Startup/core scripts remain identical to v1.16; no old intro was reintroduced.

## v1.18 · 夜市補給站 HUD 商城
- 撤除 v1.14 的時尚雜誌商城版型。
- 改為 GTA-inspired 遊戲 HUD 商店：左側分類、商品選取清單、大型預覽、資產錢包與明確購買／啟用流程。
- 手機改為橫向分類列 + 單欄商品預覽，避開底部 safe-area。
- 保留珍珠、貢丸、折扣、庫存、啟用、每日一抽、魔龍與永久道具邏輯。
- 未使用 GTA logo、商標素材或遊戲截圖；只採用遊戲 HUD / 黑色補給站的介面語言。
