#!/bin/bash

# Check if /app is empty.
if [ -z "$(ls -A /backend)" ]; then
    echo "/backend is empty, copying files..."
    mkdir /backend/app
    cp -r /app_backup/* /backend/app/
    rm -rf /app_backup
    echo "/backend files copied."
else
    echo "/backend is not empty."

    # If /backend is not empty.
    if [ -d "/app_backup" ]; then
        rm -rf /app_backup
    fi
fi

cd /backend

exec "$@"