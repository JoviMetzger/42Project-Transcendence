const envConfig = {
    port: import.meta.env.VITE_PORT,
    logLevel: import.meta.env.VITE_LOG_LEVEL,
    userApi: import.meta.env.VITE_API_USER_KEY,
    postApi: import.meta.env.VITE_API_POST_KEY,
    dbFile: import.meta.env.VITE_DB_FILE
};

export default envConfig;