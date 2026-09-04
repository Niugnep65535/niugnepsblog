---
title: Foot獨占的假tty環境
date: 2026-09-04
tags:
 - GNU/Linux
 - Arch Linux
draft: false
---
tty好是好，但是沒有中文。

沒有中文就算了，它還有三個最致命的缺陷：  
 * 難看！  
 * *難看！！*
 * ***還是ㄊㄇㄉ難看！！！***

---

那你開個桌面環境好看些了吧，又費電還會誤觸，也難專注：
 > Mostly I use a text console, for convenience's sake. Most of my work is editing text and that is more efficient on a text console. On the text console, the touchpad can't cause me any trouble if I touch it by accident. The mouse can't make my editing commands fail to work by being on the wrong window.   
 > -- Richard Stallman ["How I do my computing"](https://stallman.org/stallman-computing.html)
 
看了Ivon老師的[《將Linux Surface平板變成Android平板 (Waydroid only session) 》](https://ivonblog.com/posts/waydroid-only-session/)之後我就想到「欸，把一個終端機塞進去會不會挺好的？」

太好了，我的Aspire續航有救了。  

## 吊胃口 / 理論基礎
最終效果：  
![真漂亮](https://i.meee.com.tw/yUHhRNg.jpg)

與Ivon老師的操作類似，他把Waydroid塞進一個無邊框、全螢幕的Sway環境下；我則是把Foot放進一樣無邊框、全螢幕的Sway環境下，然後設定桌布跟輸入法。

我演示的發行版是Arch Linux。其實不只這個發行版，支援Foot跟Sway的發行版就能做到。

## 安裝必要工具
我們需要Sway、Foot跟Fcitx5，而且建議提前設定好Fcitx5。
```sh
sudo pacman -S foot sway swaybg fcitx5-im fcitx5-chewing
```
`fcitx5-im`在Arch下是個組合包，包含`fcitx5`、`fcitx5-configtool`、`fcitx5-gtk`跟`fcitx5-qt`。

如果想用拼音，可以把`fcitx5-chewing`換成`fcitx5-chinese-addons`等。

對於X Server狂熱者，可以把`foot`換成`alacritty`（Foot只支援Wayland）；`sway`換成`i3`或`i3-wm`；`swaybg`換成`feh`。具體使用說明我不再贅述。

Kitty調用GPU跟各種東西功耗太高，所以不拿來示範。

對於其它發行版請自行搜尋對應套件。

（btw我對Foot圖示上的帶派大腳有點意見，但是沒差）

## 編寫配置文件
Sway跟Foot都要寫配置文件，且要在Display Manager（登入畫面）顯示選項也得寫配置文件。

一般來講配置文件都在`/home/《君の名は。》/.config`底下，但是Wayland的配置文件在`/usr/share/wayland-session`。如果有不同使用者會用到這個，建議把相關配置文件設定成`644`或`755`的權限。（記得把`《君の名は。》`改成你的帳號名稱）

如果跟我一樣整台電腦只有一個人用就沒差。

建立Sway跟Foot的配置文件跟目錄：
```sh
# 建立目錄
mkdir -p ~/.config/sway
mkdir -p ~/.config/foot

# 建立文件
touch ~/.config/sway/foot-only
touch ~/.config/sway/start-terminal.sh # 可選
touch ~/.config/foot/foot.ini

# 設定權限
chmod 644 ~/.config/sway/foot-only
chmod 755 ~/.config/sway/start-terminal.sh # 可選
```

設定Sway的Foot專用設定檔（`~/.config/sway/foot-only`）：
```sh
# 設定無邊框
default_border none
default_floating_border none

# 設定桌布
exec --no-startup-id swaybg -i /path/to/wallpaper.jpg -m fill

# 啟動輸入法
exec --no-startup-id fcitx5 -d 

# 啟動Foot本體
exec_always --no-startup-id foot ~/.config/sway/start-terminal.sh
```

（可選）關閉終端機之後詢問要不要重新開啟終端機（`~/.config/sway/start-terminal.sh`）：
```sh
zsh
while true; do
    read -n 1 -p '您選擇了退出終端機，是否重新開啟zsh？ (y/N): ' ans
    echo "" # 換行用，避免輸出擠在一起
    if [ "$ans" = "y" ] || [ "$ans" = "Y" ]; then
        zsh
    else
        in_mainloop="false"
        swaymsg exit
        break
    fi
done
```

Foot的設定檔（`~/.config/foot/foot.ini`）：
```ini
# Catppuccin Mocha 主題（自選）
include=/usr/share/foot/themes/catppuccin-mocha

[main]
# 字型設定
font=JetBrainsMono Nerd Font:size=11, Noto Sans Mono CJK TC:size=11

[cursor]
# 游標樣式（block / beam / underline）
style=block
blink=no

# 背景透明度
[colors-dark]
alpha=0.85

# 如果你喜歡淺色
[colors-light]
alpha=0.85
```

## 設定登入選項
如果你有狠到不用登入管理器，可以直接跳過本章節。

我們要建立Wayland登入選項的話，要在`/usr/share/wayland-sessions/`建立`.desktop`檔案：
```sh
sudo nano /usr/share/wayland-sessions/sway-foot.desktop
```

內容如下：
```ini
[Desktop Entry]
Name=Sway with foot
Comment=Sway with foot
Exec=sway -c /home/你的名字/.config/sway/foot-only
Type=Application
```

記得把`你的名字`改成你的帳號名稱。

此後在登入畫面選擇「Sway with foot」即可進入這個環境。

當然，直接在真．tty執行`sway -c /home/你的名字/.config/sway/foot-only`也能跑。
