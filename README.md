# 閒台文 GitHub Pages 同窗 QR v1.5

- 修正夜市／收藏／戰具多處道具破圖
- O門高粱酒由 `null` 改為真正本機圖片
- 石花凍、吉古拉由巨大 data URI 改為本機 WebP
- 道具圖片檔名統一為小寫 kebab-case，降低 GitHub Pages 大小寫路徑問題
- 所有道具圖加入失敗 fallback，不再顯示瀏覽器破圖框或 alt 文字
- 保留 v1.4 其他功能

上傳 GitHub 時請整包覆蓋，尤其是 `assets/items/` 與 `assets/app-core.js`。
