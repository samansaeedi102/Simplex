export const CONFIG = () => {
    const APP_SECRET = process.env.APP_SECRET || "just_a_simple_secret_key";
    const MAIN_PORT = process.env.MAIN_PORT || 8000;
    const MAIN_URL = process.env.MAIN_URL || `http://localhost:${MAIN_PORT}`;
    const MAIN_MONGO_URI = process.env.MAIN_MONGO_URI ||
      "mongodb://localhost:27017/simplex";
  
    return {
      APP_SECRET,
      MAIN: {
        PORT: MAIN_PORT,
        URL: MAIN_URL,
        MONGO_URI: MAIN_MONGO_URI,
      },
    };
  };