#!/bin/bash

echo "Start the databases..."
docker-compose up mongodb -d
docker-compose up mysqldb -d
echo "Start the app..."
docker-compose up email_app