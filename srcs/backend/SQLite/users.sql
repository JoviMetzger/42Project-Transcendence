CREATE TABLE users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    uuid TEXT NOT NULL UNIQUE,
    username TEXT NOT NULL UNIQUE,
    password TEXT NOT NULL,
    alias TEXT NOT NULL UNIQUE,
    profile_pic BLOB,
    language TEXT DEFAULT “en”,
    wins INTEGER DEFAULT 0,
    losses INTEGER DEFAULT 0
);

/*

id = indexing
uuid = unique identifier
uesrname = login-name
password = password (to be hashed)
alias = alias
profile_pic = profile picture in BLOB datatype (look up constraints)
language = language in "en","nl","de"
wins = amount of wins
losses = "amount of losses"

*/