#!/bin/bash


sudo apt update
sudo apt install unzip

cd /home/admin || exit
mkdir webapp
unzip /home/admin/webapp.zip -d /home/admin/webapp

cd /home/admin/webapp || exit

# Install NVM
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.38.0/install.sh | bash

# Source NVM (you don't need to provide 'nvm' as an argument)
source ~/.nvm/nvm.sh nvm

# Install Node.js version 20.7.0 (assuming it's a valid version)
nvm install 20.7.0
nvm use 20.7.0
    
# Update package lists
sudo apt update

# Install MariaDB and npm
sudo apt install -y mariadb-server
sudo apt install -y npm

# Install application dependencies using npm
npm install

# Start MariaDB service
sudo systemctl start mariadb
sudo systemctl enable mariadb

sudo systemctl stop mariadb

sudo apt-get purge mariadb-server mariadb-client mariadb-common
sudo apt-get autoremove
sudo apt-get update
sudo apt-get install mariadb-server
sudo systemctl start mariadb
sudo systemctl enable mariadb


mysql -u root <<MYSQL_SCRIPT
CREATE DATABASE IF NOT EXISTS cloudschema;
ALTER USER 'root'@'localhost' IDENTIFIED BY 'Abhi\$3534'

MYSQL_SCRIPT
