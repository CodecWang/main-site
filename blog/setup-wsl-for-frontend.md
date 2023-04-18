---
date: 2023-04-16
authors: arthur
image: https://cos.codec.wang/wsl2-frontend-microsoft-loves-linux.jpg
tags: [WSL, "前端", "开发环境", zsh, frontend]
---

# 用 WSL2 搭建 Windows 更好用的前端开发环境

🧑🏻‍💻 Windows 我一直认为并不适合一些方向的开发，尤其 frontend/server，没有 bash 和好用的终端。不过巨硬从 Win10 开始引入 WSL(Windows Linux 子系统)，到后面的 Windows Terminal，都对开发者更加友好。我平常 Mac/Windows 会切着用，服务器是 CentOS/Ubuntu，之前经常做一些前端基础设施的搭建，目前 WSL 的这套配置：`Ubuntu`、`zsh/oh-my/zsh`、`n/node/npm`、`Windows Terminal`、`VSCode`...用着还是很舒服的，所以分享下最佳实践～

- 配置脚本：[setup-wsl-for-frontend.sh](https://gist.github.com/CodecWang/83fee91efa153ec67ddccdd1cd22d1b2)

![](https://cos.codec.wang/wsl2-frontend-microsoft-loves-linux.jpg)

<!--truncate-->

## 前提

Windows 10 2004 或 Windows 11 可以直接用`wsl`指令安装，如果是之前的系统就要手动安装，参考[旧版 WSL 的手动安装步骤](https://learn.microsoft.com/zh-cn/windows/wsl/install-manual)。

- 官方文档：https://learn.microsoft.com/zh-cn/windows/wsl/install

## Ubuntu

右键开始菜单，以管理员身份打开命令行或 Powershell，然后输入：

```bash
wsl --install
```

**安装完成后需要重启电脑**。默认会安装 Ubuntu，如果想安装其他 Linux 系统的话，可以先`wsl —list —online`列出可用的系统，然后`wsl —install -d <Distribution Name>`安装对应系统。

![](https://cos.codec.wang/wsl2-frontend-install.jpg)

- 用户名和密码

装好之后，在开始菜单找到 Ubuntu 并打开，第一次是需要设置用户名和密码的，这个用户名密码也是具备管理员`sudo`权限的。

## zsh/oh-my-zsh

zsh 比 bash 更加强大也更好看，配合 oh-my-zsh 和相关插件，可以实现命令高亮、命令补全、git 快捷操作等等。

```bash
# 更新 package
sudo apt update && sudo apt upgrade

# 安装 zsh
sudo apt install zsh -y

# 安装 oh-my-zsh
wget https://github.com/robbyrussell/oh-my-zsh/raw/master/tools/install.sh -O - | zsh || true

# 安装命令补全和高亮插件
git clone https://github.com/zsh-users/zsh-syntax-highlighting.git ~/.oh-my-zsh/plugins/zsh-syntax-highlighting
git clone https://github.com/zsh-users/zsh-autosuggestions ~/.oh-my-zsh/plugins/zsh-autosuggestions
sed -i 's/plugins=(git)/plugins=(git zsh-autosuggestions zsh-syntax-highlighting)/g' ~/.zshrc

# 将 zsh 设置为默认的shell
chsh -s /bin/zsh
```

配置好之后下次打开默认就是 zsh 了，也可以输入`zsh`进入 zsh 环境。另外，我会在 zsh 的配置文件中设置一些常用的指令。编辑配置文件`vim .zshrc`，不习惯 vim 的话，可以用 VSCode 打开`code .zshrc`，在最后加入：

```bash
# 列表形式显示所有文件详情
alias ll="ls -alF"
# 删除文件前需确认
alias rm="rm -i"
```

## Git

Git 默认会忽略大小写，很多人都遇到过这个坑，所以最好配环境的时候配好：

```bash
# 启用大小写敏感
git config --global core.ignorecase false
```

剩下的就是常规配置了，比如用户名和邮箱、生成 public key 等等：

```bash
# 配置用户名和密码
git config --global user.name "Your Name"
git config --global user.email "youremail@domain.com"

# 生成 ssh key
# 用 Github 的话，可以拷贝生成的公钥到 https://github.com/settings/keys
ssh-keygen
```

## n/node/npm

[n](https://github.com/tj/n) 是一个 Node.js 的多版本管理工具，由于不同的项目可能用到不同的 Node 版本，所以用 n 的就可以很方便地切换。

```bash
# 安装 n
curl -fsSL https://raw.githubusercontent.com/tj/n/master/bin/n | sudo bash -s lts
sudo npm install -g n
```

安装好之后输入`n`指令，就可以看到当前已安装的 Node.js 版本列表，需要哪个版本选择切换就行。接下来安装一些常用的 Node 工具，比如[yarn](https://yarnpkg.com/)、[http-server](https://github.com/http-party/http-server)(静态服务器)、[figlet-cli](https://github.com/patorjk/figlet.js)(每次 zsh 启动的时候显示酷炫的 ASCII 字符)：

```bash
sudo npm install -g yarn http-server figlet-cli

vim .zshrc
# 编辑zsh配置文件，在最后添加：figlet "Hi, arthur"
source .zshrc
```

## Windows Terminal

Windows Terminal 是巨硬搞的一个好看又好用的终端，Windows 10 18362/11 自带，如果没有的话，可以在[商店](https://apps.microsoft.com/store/detail/windows-terminal/9N0DX20HK701?hl=en-gb&gl=gb&rtc=1)中安装。

Ubuntu 的 WSL 装好后，在 Windows Terminal 的新建选项卡里就已经有了。如果经常在 WSL 里开发的话，可以将 Ubuntu 设置为默认：

![](https://cos.codec.wang/wsl2-frontend-config-windows-terminal.jpg)

## VSCode

在 VSCode 中安装[Remote Development](https://marketplace.visualstudio.com/items?itemName=ms-vscode-remote.vscode-remote-extensionpack)插件就能在 VSCode 中直接将 WSL 作为开发环境，非常方便：

![](https://cos.codec.wang/wsl2-frontend-vscode-remote.jpg)

另外如果目录是存储在 WSL 下面，那么在 Windows 下用 VSCode 打开这个目录的时候就会提示让你在 WSL 环境下打开：

![](https://cos.codec.wang/wsl2-frontend-vscode-reopen-in-wsl.jpg)

## 文件系统

需要注意的是我们现在有了两套系统，两者的文件类型并不一致，跨系统访问和传输文件的话效率会下降很多，最好各存各的，以用户目录为例：

- 如果在 Windows 上开发，就将文件放在：`C:\Users\<UserName>\`
- 如果在 Ubuntu 上开发，就将文件放在：`\\wsl$\ubuntu\home\<UserName>\`

想在 WSL 里用资源管理器打开目录的话，可以输入`explorer.exe .`。另外，Windows 的文件路径在 Ubuntu 上会挂载到`/mnt/`，比如在 WSL 里访问 Windows C 盘的用户目录就是`cd /mnt/c/Users/<UserName>/`。

## 运行多个 Linux 发行版

WSL 理论上支持安装运行任意多个不同的 Linux 发行版，比如我再安装一个`Debian`：

```bash
wsl --install -d Debian
```

使用时可以在不同的发行版之间切换，可以用`wsl --list`来查看已安装的发行版，当然新的环境需要重新配置。

![](https://cos.codec.wang/wsl2-frontend-multi-os.jpg)

## 卸载

每个发行版可以理解为都是独立的系统，一旦卸载，**所有数据/软件/设置都会删除**，所以要提前将数据拷贝到 Windows 目录哦。卸载的话很简单：

```bash
# 比如卸载Ubuntu：wsl --unregister Ubuntu
wsl --unregister <DistributionName>
```

通常一台 Windows 电脑上配一个 WSL 环境足够，配置好之后基本不会去动它。现在我们就既能使用 Windows 的强大生态和兼容性，又能有性能不错的 Linux shell 环境。
