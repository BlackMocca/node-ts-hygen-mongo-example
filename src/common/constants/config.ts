export const env = {
  TZ: process.env.TZ,
  VERBOSE: process.env.VERBOSE || "false",
  PORT: process.env.PORT || 3000,
  MONGODB_URI:
    process.env.MONGODB_URI ||
    "mongodb+srv://username:password@localhost-cluster.com/test",
};
