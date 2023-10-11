# webapp
NodeJS repository to run csye 6225 api calls

1. ssh: ssh -i /Users/abhishekvenkata/.ssh/digitalocean root@ip

2. scp: scp -i /Users/abhishekvenkata/.ssh/digitalocean -r webapp root@ip:/opt/ 

3. npm install

4. **Script.sh** : 
##!/bin/bash

# Install NVM (Node Version Manager)
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.38.0/install.sh | bash

# Load NVM into the current shell session
source ~/.nvm/nvm.sh

# Install Node.js version 20.7.0
nvm install 20.7.0

# Use Node.js version 20.7.0
nvm use 20.7.0

# Move user.csv from /opt/ to /opt/webapp/ with a new name if it already exists
mv -n /opt/user.csv /opt/webapp/

echo "user.csv has been moved to /opt/webapp/ (if not already exists)"

# Install MariaDB server
sudo apt update
sudo apt install -y mariadb-server
sudo apt install npm
# Start and enable the MariaDB service
sudo systemctl start mariadb
sudo systemctl enable mariadb
# Start MySQL Server
service mysql start

# Define the SQL command
SQL_COMMAND="GRANT ALL PRIVILEGES ON *.* TO '127.0.0.1'@'%' IDENTIFIED BY 'Abhi3534';"

# Execute the SQL command using the `mysql` command-line tool
mysql -u root -p -e "$SQL_COMMAND"

# Stop MySQL Server (optional)
service mysql stop

# Output a completion message
echo "SQL command executed successfully."
# End of the script

test
