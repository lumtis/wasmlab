module.exports = function override(config, env) {
  console.log("override");
  let loaders = config.resolve;
  loaders.fallback = {
    buffer: false,
    crypto: false,
    events: false,
    path: false,
    stream: false,
    string_decoder: false,
  };

  return config;
};
