document.addEventListener("DOMContentLoaded", function () {
    // 1. 選單滾動位置記錄
    const menu = document.getElementById('menu');
    if (menu) {
        const scrollPosition = localStorage.getItem("menu-scroll-position");
        if (scrollPosition) {
            menu.scrollLeft = parseInt(scrollPosition, 10);
        }
        menu.onscroll = function () {
            localStorage.setItem("menu-scroll-position", menu.scrollLeft);
        };
    }

    // 2. 平滑錨點滾動
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener("click", function (e) {
            e.preventDefault();
            const id = this.getAttribute("href").substr(1);
            if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
                const target = document.querySelector(`[id='${decodeURIComponent(id)}']`);
                if (target) target.scrollIntoView({ behavior: "smooth" });
            } else {
                const target = document.querySelector(`[id='${decodeURIComponent(id)}']`);
                if (target) target.scrollIntoView();
            }
            if (id === "top") {
                history.replaceState(null, null, " ");
            } else {
                history.pushState(null, null, `#${id}`);
            }
        });
    });

    // 3. 回到頂部按鈕 (Top Link)
    const toplink = document.getElementById("top-link");
    if (toplink) {
        window.onscroll = function () {
            const scrollThreshold = window.innerHeight;
            if (document.body.scrollTop > scrollThreshold || document.documentElement.scrollTop > scrollThreshold) {
                toplink.classList.remove("hidden");
            } else {
                toplink.classList.add("hidden");
            }
        };
    }

    // 4. 主題切換 (Theme Toggle)
    const themeToggle = document.getElementById("theme-toggle");
    if (themeToggle) {
        themeToggle.addEventListener("click", () => {
            const html = document.querySelector("html");
            if (html.dataset.theme === "dark") {
                html.dataset.theme = 'light';
                localStorage.setItem("pref-theme", 'light');
            } else {
                html.dataset.theme = 'dark';
                localStorage.setItem("pref-theme", 'dark');
            }
        });
    }

    // 5. 程式碼區塊複製按鈕 (Code Copy Buttons)
    document.querySelectorAll('pre > code').forEach((codeblock) => {
        const container = codeblock.parentNode.parentNode;
        const copybutton = document.createElement('button');
        copybutton.classList.add('copy-code');
        copybutton.innerHTML = 'copy';

        function copyingDone() {
            copybutton.innerHTML = 'copied!';
            setTimeout(() => {
                copybutton.innerHTML = 'copy';
            }, 2000);
        }

        copybutton.addEventListener('click', () => {
            if ('clipboard' in navigator) {
                navigator.clipboard.writeText(codeblock.textContent);
                copyingDone();
                return;
            }

            const range = document.createRange();
            range.selectNodeContents(codeblock);
            const selection = window.getSelection();
            selection.removeAllRanges();
            selection.addRange(range);
            try {
                document.execCommand('copy');
                copyingDone();
            } catch (e) {}
            selection.removeRange(range);
        });

        if (container.classList.contains("highlight")) {
            container.appendChild(copybutton);
        } else if (container.parentNode && container.parentNode.firstChild === container) {
            // td containing LineNos
        } else if (codeblock.parentNode.parentNode.parentNode.parentNode.parentNode.nodeName === "TABLE") {
            codeblock.parentNode.parentNode.parentNode.parentNode.parentNode.appendChild(copybutton);
        } else {
            codeblock.parentNode.appendChild(copybutton);
        }
    });
});
// @license-end
