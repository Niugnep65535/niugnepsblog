set -e

# build
hugo --gc --minify

# 保存生成結果
rm -rf ~/.tmp-file_public
cp -r public ~/.tmp-file_public

# 回 master，提交原始碼
git add .
git commit -m "Update blog"
git push origin master

# 切 pages
git checkout pages

# 清空舊 pages
rm -rf *

# 放入 Hugo 產物
cp -r ~/.tmp-file_public/* .

# 提交部署結果
git add .
git commit -m "Deploy Hugo site"
git push origin pages

# 回主分支
git checkout master
