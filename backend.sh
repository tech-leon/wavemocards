#!/bin/bash

# 停止並移除容器
docker compose down

# 移除鏡像
docker rmi wavemocards-backend:1.6

rm -rf ./backend_code

# 重新構建鏡像
cp ../newenv/.env.compose .
docker compose up -d

chown -R ubuntu:ubuntu ./backend_code
cp ../newenv/wavemocards.json ../newenv/.env.app ./backend_code/
