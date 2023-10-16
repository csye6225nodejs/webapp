#!/bin/bash
# Install MySQL
sudo apt-get install -y mysql-server
# Start and enable MySQL service
sudo systemctl enable mysql
sudo systemctl start mysql
