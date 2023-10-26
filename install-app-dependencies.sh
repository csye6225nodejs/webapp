#!/bin/bash


sudo mv /tmp/webapp.zip /opt/webapp.zip
cd /opt || exit

sudo apt update
sudo apt install unzip

sudo unzip webapp.zip -d webapp
sudo chmod 755 /opt/webapp
cd /opt/webapp || exit

# Install NVM
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.38.0/install.sh | bash

# Source NVM (you don't need to provide 'nvm' as an argument)
source ~/.nvm/nvm.sh nvm

# Install Node.js version 20.7.0 (assuming it's a valid version)
sudo nvm install 20.7.0
sudo nvm use 20.7.0
    
# Update package lists
sudo apt update
# Install MariaDB and npm
sudo apt install -y mariadb-server
sudo apt install -y npm

sudo npm install


sudo apt-get remove git -y
sudo apt-get clean



sudo mv /tmp/webapp.service /etc/systemd/system/webapp.service


# Start MariaDB service

