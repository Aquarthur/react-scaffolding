module.exports = (api) => {
  api.cache.using(() => process.env.NODE_ENV);
  return {
    presets: [
      ["@babel/env", { useBuiltIns: "usage", corejs: 2 }],
      "@babel/react",
    ],
    plugins: [
      "@babel/plugin-proposal-class-properties",
      "@babel/plugin-proposal-object-rest-spread",
    ],
    env: {
      development: {
        plugins: ["react-refresh/babel"],
      },
    },
  };
};
