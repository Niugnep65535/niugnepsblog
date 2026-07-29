---
title: "搜尋"
layout: "search"
summary: "search"
---
<div id="search"></div>

<link href="/pagefind/pagefind-ui.css" rel="stylesheet">
<script src="/pagefind/pagefind-ui.js"></script>

<script>
  window.addEventListener('DOMContentLoaded', (event) => {
    new PagefindUI({ 
        element: "#search", 
        showSubResults: true,
        showImages: false
    });
  });
</script>
