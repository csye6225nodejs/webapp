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


# Entire script.sh file:
autorun.sh:

#!/bin/bash
curl -o- https: / /raw.githubusercontent.com/nvm-sh/nvm/v0.38.0/install.sh | bash
source ~/ .nvm/nvm.sh nvm 
Install 20.7.0
nvm use 20.7.0
sudo apt update
sudo apt install -y mariadb-server
sudo apt install npm
sudo systemctl start mariadb
sudo systemctl enable mariadb
mv -n /opt/user.csv /opt/webapp 
echo “user.csv has been moved”
service mysql start
mysql -u root <<MYSQL_SCRIPT
CREATE DATABASE IF NOT EXISTS cloudschema;
ALTER USER ‘root’@’localhost’ IDENTIFIED BY ‘Abhi\$3534’

MYSQL_SCRIPT
