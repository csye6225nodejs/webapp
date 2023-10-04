# webapp
NodeJS repository to run csye 6225 api calls

1. ssh: ssh -i /Users/abhishekvenkata/.ssh/digitalocean root@ip

2. scp: scp -i /Users/abhishekvenkata/.ssh/digitalocean -r webapp root@ip:/opt/ 

3. npm install
4. add .env variables

5. **Script.sh** : 
##!/bin/bash

# Install NVM (Node Version Manager)
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.38.0/install.sh | bash

# Load NVM into the current shell session
source ~/.nvm/nvm.sh

# Install Node.js version 20.7.0
nvm install 20.7.0

# Use Node.js version 20.7.0
nvm use 20.7.0

# Install MariaDB server
sudo apt update
sudo apt install -y mariadb-server
sudo apt install npm
# Start and enable the MariaDB service
sudo systemctl start mariadb
sudo systemctl enable mariadb
