---
title: Distro Hopping的一點皮毛筆記
date: 2026-08-25
tags:
- GNU/Linux
- Ubuntu
- 筆記
draft: false
---
因為這陣子常常換系統（Arch -> Debian -> Ubuntu -> Kubuntu），決定把換系統的操作整理一下給大家參考。

## 準備工作
1. 備份家目錄下的`.ssh`資料夾
```sh
mkdir <隨身碟>/ssh
cp -r ~/.ssh/* <隨身碟>/ssh
```
2. 匯出GPG金鑰：
```sh
gpg --export <金鑰ID> > gpg_public.asc # 匯出公鑰
gpg --export-secret-keys <金鑰ID> > gpg_private.asc # 匯出私鑰
```
3. 備份沒有上傳到雲端/GitHub的專案、音樂、圖片等
4. 備份設定文件（位在`.config`下，對`kitty`、Hyprland等使用設定檔設定的軟體尤其重要）
5. 備份瀏覽器設定（可選）

## 正式安裝
主要分為以下步驟：
 * 更新系統
 * 升級系統（如果是舊版point release）
 * 安裝驅動
 * 解除安裝Snap（Ubuntu系，可選）
 * 安裝Flatpak（可選）
 * 安裝必要軟體
 * 還原設定、還原資料
 
## 更新系統
依照發行版派系有所不同：
```sh
# Debian / Ubuntu
sudo apt update; sudo apt upgrade

# Arch / Manjaro / CachyOS
sudo pacman -Syu

# Fedora / RHEL / Rocky
sudo dnf upgrade --refresh
```
對於Linux Mint，可以透過更新管理員進行更新；對於KDE neon，建議透過Discover應用程式更新。

## 升級系統（如果是舊版point release）
這裡只針對Ubuntu系發行版：
```sh
sudo do-release-upgrade
```

## 安裝驅動
依照發行版派系有所不同。通常需要安裝`intel-ucode`（或`amd-ucode`）跟獨顯驅動（`mesa`或`nvidia-driver-xxx-open` / `nvidia-open`）。

對於某些小眾硬體，可能需要自行編譯驅動，這裡我沒有範例，故不示範。

對於Ubuntu系，可以使用Ubuntu提供的工具安裝：
```sh
sudo ubuntu-drivers install
```

對於Linux Mint，可以透過驅動管理員等程式安裝。

## 解除安裝Snap（Ubuntu系，可選）
（我自己是一個不小心點到`lsblk`就血壓上升。）

對於Ubuntu系，通常使用Snap安裝瀏覽器等程式。這樣可以隔離應用程式，但是這會讓軟體很卡。

對於新手不建議如此操作以免系統壞掉，尤其是原生版Ubuntu，可能會刪除GNOME組件。

1. 解除安裝Snap安裝的軟體
```sh
sudo snap remove $(snap list | awk 'NR>1 {print $1}') 2>/dev/null
```
2. 移除Snap
```sh
sudo apt purge snapd
sudo apt purge gnome-software-plugin-snap # 原生Ubuntu裡GNOME軟體商店的Snap擴充功能
sudo apt purge plasma-discover-backend-snap # Kubuntu裡Discover商店的Snap擴充功能
sudo apt autoremove --purge
```
3. 禁止Snap重新被安裝（以免更新時遭到背刺）
```sh
sudo tee /etc/apt/preferences.d/nosnap.pref <<EOF
Package: snapd
Pin: release *
Pin-Priority: -10
EOF
```
4. 更新軟體清單
```sh
sudo apt update
```

透過`sudo apt install snapd`手動重新安裝Snap檢查，如果顯示：
```txt
無法取得套件 snapd，但它卻被其它的套件引用了。
這意味著這個套件可能已經消失了、被廢棄了，或是只能由其他的來源取得

Error: 套件 snapd 沒有可安裝的候選版本
```
代表Snap已經被禁止安裝。

## 安裝Flatpak（可選）
依照發行版派系有所不同：
```sh
# Debian / Ubuntu
sudo apt install flatpak

# Arch / Manjaro / CachyOS
sudo pacman -S flatpak
```
Fedora與KDE neon、Linux Mint預設安裝了flatpak且設定好Flathub。

啟用Flathub：
```sh
flatpak remote-add --if-not-exists flathub https://dl.flathub.org/repo/flathub.flatpakrepo
```
RHEL跟Rocky預設安裝Flatpak，但是沒有Flathub

## 安裝必要軟體
依照發行版派系有所不同，以Chromium舉例：
```sh
# Debian / Ubuntu（Ubuntu系可能變成Snap版）
sudo apt install chromium

# Arch / Manjaro / CachyOS
sudo pacman -S chromium

# Fedora / RHEL / Rocky
sudo dnf install chromium

# Flatpak
flatpak install flathub org.chromium.Chromium

# Snap
sudo snap install chromium
```
此外也可以透過Discover、下載`deb` / `rpm` / `flatpakref`等方式安裝，這邊不過多展開。

## 還原設定、還原資料
匯入GPG金鑰：
```sh
gpg --import gpg_public.asc # 匯入公鑰
gpg --import gpg_private.asc # 匯入私鑰
```
還原ssh金鑰：
```sh
mkdir ~/.ssh
cp -r <隨身碟>/ssh/* ~/.ssh
chmod 644 ~/.ssh/*
chmod 600 ~/.ssh/id_ed25519 # 或改成id_rsa等
```

然後還原設定文件、匯入瀏覽器、還原資料、設定Git等就不過多展開。


~~好耶又水一篇文章~~
