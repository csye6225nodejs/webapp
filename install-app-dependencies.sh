#!/bin/bash

# Install NVM
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.38.0/install.sh | bash

# Source NVM (you don't need to provide 'nvm' as an argument)
source ~/.nvm/nvm.sh

# Install Node.js version 20.7.0 (assuming it's a valid version)
nvm install 20.7.0
nvm use 20.7.0

# Update package lists
sudo apt update

# Install MariaDB and npm
sudo apt install -y mariadb-server
sudo apt install -y npm

# Change directory to your application's location
npm init
# Install application dependencies using npm
npm install

# Start MariaDB service
sudo systemctl start mariadb
sudo systemctl enable mariadb


# Start your application (you should use the appropriate command for your application)

