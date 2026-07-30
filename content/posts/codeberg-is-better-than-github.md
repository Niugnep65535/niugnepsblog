---
title: 為什麼 Codeberg 比 GitHub 更適合放部落格？
date: 2026-07-09
tags:
- 網際網路
- Codeberg
- 部落格
draft: false
---
就在今天，我正式把自己的部落格遷移到了Codeberg。

## 為什麼？
其實原因很簡單：開放。  
GitHub受到母公司Microslop的包袱，有非常大量的商業利益牽扯問題；Codeberg e.V.是位在德國的非營利組織，沒有商業包袱，背景也更單純。  
此外Codeberg基於自由開源的Forgejo構建，有很強的自由度，並且是真．完全免費。  
連台灣Linux使用者常用的[新酷音專案](https://codeberg.org/chewing)都轉到了Codeberg呢！

## 怎麼弄？
與GitHub要在設定裡搞半天不同，Codeberg的Pages極為單純。  
只要把做好的HTML、CSS跟JavaScript全丟到`pages`分支，就好了，連設定都不用。  
做好的東西會生成在`<你的倉庫名稱>.<你的使用者名稱>.codeberg.page`；如果倉庫名叫pages，就是`<你的使用者名稱>.codeberg.page`。

## 額外的好處
GitHub Pages是透過CI/CD把Jekyll編譯的東西推到伺服器，而Codeberg是直接透過Webhook推到伺服器。  
這就讓Codeberg可以在一秒內把專案放上去，不用浪費時間在跑多餘的Jekyll，對於我這種本機render的架構可謂再好不過了。  
此外，Codeberg這種架構讓Google的爬蟲一下就抓到了sitemap，非常快速且好用；GitHub因為CI/CD的關係，Google的爬蟲非常容易抓不到sitemap。

看到這裡了，真的不考慮改用Codeberg嗎？

