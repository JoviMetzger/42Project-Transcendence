CREATE TABLE matches (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    uuid TEXT NOT NULL UNIQUE,
    p1Alias TEXT NOT NULL,
    p2Alias TEXT NOT NULL,
    p1_id TEXT NOT NULL,
    p2_id TEXT NOT FULL,
    status TEXT NOT NULL CHECK (status IN ('completed', 'interrupted')),
    winner_id TEXT,
    start_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    end_time TIMESTAMP,
    duration INTEGER,
    FOREIGN KEY (player1_id) REFERENCES users(uuid),
    FOREIGN KEY (player2_id) REFERENCES users(uuid),
    FOREIGN KEY (winner_id) REFERENCES users(uuid)
);

/*
id = indexing
uuid = unique identifyer
player1Alias = alias belonging to p1
player2Alias = alias belonging to p2
p1_id = uuid related to player -- can be NULL if guest user
p2_id = ^
status = whether game was completed or interupted
winner_id TEXT = alias of winner
start_time
end_time
duration = time in seconds
FOREIGN KEY is database references
*/