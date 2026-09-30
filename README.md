# 閒台文 GitHub Pages 同窗 QR v1.9

- 修正夜市／收藏／戰具多處道具破圖
- O門高粱酒由 `null` 改為真正本機圖片
- 石花凍、吉古拉由巨大 data URI 改為本機 WebP
- 道具圖片檔名統一為小寫 kebab-case，降低 GitHub Pages 大小寫路徑問題
- 所有道具圖加入失敗 fallback，不再顯示瀏覽器破圖框或 alt 文字
- 保留 v1.4 其他功能

上傳 GitHub 時請整包覆蓋，尤其是 `assets/items/` 與 `assets/app-core.js`。

## v1.6 mobile scroll recovery
- 分離「同窗 QR」與「證書」的 scroll lock，不再共用同一個 modal class。
- 移除同窗視窗對 `body.style.overflow = hidden` 的 inline 鎖定。
- 新增手機 scroll watchdog：頁面切換、返回、旋轉、恢復前景與下一次觸控時，若 modal 已消失會自動清除殘留鎖。
- 同窗、商店、封測、證書等固定視窗在手機上改為自己的可滾動容器，保留 iOS momentum scrolling。

## v1.7 — Desktop nav + classmate progress
- Fixed desktop top navigation collisions/overlap by switching the wide layout to a four-column grid and forcing Search into icon-only mode.
- Classmate QR payload v2 now includes local game progress (cleared count, highest cleared stage, next stage). New clients can still read v1 classmate QR codes.
- Add-friend confirmation now shows level/title plus current stage progress instead of cryptographic key/signature details.
- Classmate detail no longer exposes local key fingerprint. Signature verification remains internal for continuity/anti-spoof checks.


## v1.8 — 常駐同窗快捷列
- 同窗功能改為全站常態顯示於右下角：同窗證／掃證／同窗冊。
- 桌機為三個緊湊膠囊；手機為三顆直向圓形按鈕，固定在底部 tab bar 上方。
- 手機的返回頂端按鈕會自動向左讓位，避免重疊。
- Profile 原本的大型同窗卡取消，避免重複入口。
- 同窗冊工具列新增「本機備份」。


## v1.9 — 商城置於好友上方
- 右下角常駐快捷區新增「商城」。
- 桌機：商城獨立在上一排，下面才是同窗證／掃證／同窗冊。
- 手機：商城固定在三個同窗圓形按鈕最上方，整組仍避開底部 tab bar 與 safe-area。
- 點「商城」直接進入 `#shop`。

## v1.10 · 今日一抽主視覺 / BGM restore
- 「今日一抽」改為進場 → 手氣形成 → 結果解讀的三段式儀式流程，互動節奏參考勞山道士專案，但配色、排版與材質全面使用閒台文主視覺。
- 結果新增「手氣 / 今日紀錄 / 本次費用」與「今日一句 · XIÁN TÁI WÉN NOTE」。
- 保留每日免費抽、3 珍珠加抽、獎池與今日紀錄機制。
- 預載主題與夜市 BGM；Soundscape 在第一次使用者互動前尚未建立音樂物件時會主動補建，並提高背景音樂至可感知但仍低於語音的音量。
- iOS/Safari 在 pageshow / focus / visibilitychange 後會再次嘗試恢復背景音樂。

## v1.11
- 結業魔龍已通關後，不再顯示「戰前說明」區塊。
- 戰前說明改為主題感知配色：淺色模式使用奶油紙卡＋深墨字；深色模式跟隨站內深色變數。
- 正式挑戰解鎖條件仍保留在深色魔龍戰場內，維持高對比。
