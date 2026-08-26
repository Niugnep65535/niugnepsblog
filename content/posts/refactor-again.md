---
title: 又又又重構
date: 2026-08-26
tags:
- 網際網路
- Codeberg
- 部落格
draft: false
---
[上次](https://niugnep.idv.tw/posts/codeberg-is-better-than-github)剛推薦Codeberg，就被背刺了。

不知為何，我競賽那陣子Codeberg被炸的亂七八糟，我的部落格也非常不穩定，所以我又把架構換了。

這次的架構：
```text
我 -> GitHub -> Actions -> Cloudflare Pages
```
畢竟GitHub還是穩定的多，套Cloudflare是因為GSC沒法存取GitHub Pages的Sitemap。

反正就這樣。

補充：Cloudflare居然會自動把Ugly URLs轉成Pretty　URLs，還好Ugly URLs有個308讓我不用挨家挨戶請大家改我在blogroll的連結（
