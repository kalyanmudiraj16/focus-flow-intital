const requiredEnv = (name) => {
  const value = process.env[name];

  if (!value) {
    throw new Error(`Missing required environment variable: ${name}`);
  }

  return value;
};

module.exports = {
  PORT: process.env.PORT || 5000,
  MONGO_URI: requiredEnv("MONGO_URI"),
  NODE_ENV: process.env.NODE_ENV || "development",
};