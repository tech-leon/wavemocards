#!/bin/bash

docker compose down

docker rmi wavemocards-backend:1.6

rm -rf ./backend_code

cp ../newenv/.env.compose .
docker compose up -d

sudo chown -R ubuntu:ubuntu ./backend_code
cp ../newenv/wavemocards.json ../newenv/.env.app ./backend_code/

sleep 1

sudo chown ubuntu:ubuntu ./backend_code/sql_app.db

exit 0