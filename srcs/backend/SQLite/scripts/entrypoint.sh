#!/bin/sh
echo "RUNNING ENTRYPOINT SCRIPT FOR SQLite"

echo "Checking for database file..."
if [ ! -f /app/database/app.db ]; then
    echo "Database file not found, creating..."
    touch /app/database/app.db
    echo "Initializing users table..."
    cat /app/database/users.sql | sqlite3 /app/database/app.db
    echo "Initializing matches table..."
    cat /app/database/matches.sql | sqlite3 /app/database/app.db
    echo "Database initialization complete"
else
    echo "Database file already exists"
fi


exec "$@"