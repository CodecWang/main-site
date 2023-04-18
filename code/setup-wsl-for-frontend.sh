#################################
# 快速初始化 WSL-Ubuntu 前端开发环境
#################################

# 更新 package
sudo apt update -y && sudo apt upgrade -y

# 安装 zsh
sudo apt install zsh -y

# 安装 oh-my-zsh
wget https://github.com/robbyrussell/oh-my-zsh/raw/master/tools/install.sh -O - | zsh || true

# 安装命令补全和高亮插件
git clone https://github.com/zsh-users/zsh-syntax-highlighting.git ~/.oh-my-zsh/plugins/zsh-syntax-highlighting
git clone https://github.com/zsh-users/zsh-autosuggestions ~/.oh-my-zsh/plugins/zsh-autosuggestions
sed -i 's/plugins=(git)/plugins=(git zsh-autosuggestions zsh-syntax-highlighting)/g' ~/.zshrc

# 启用 git 大小写敏感
git config --global core.ignorecase false

# 列表形式显示所有文件详情
echo 'alias ll="ls -alF"' >> ~/.zshrc
# 删除文件前需确认
echo 'alias rm="rm -i"' >> ~/.zshrc

# 安装 n
curl -fsSL https://raw.githubusercontent.com/tj/n/master/bin/n | sudo bash -s lts
sudo npm install -g n

# 安装 yarn、http-server(静态服务)、figlet-cli
sudo npm install -g yarn http-server figlet-cli

# 配置 figlet
echo 'figlet "Hi, WSL"' >> ~/.zshrc

# 将 zsh 设置为默认的shell
sudo chsh -s /bin/zsh

zsh
