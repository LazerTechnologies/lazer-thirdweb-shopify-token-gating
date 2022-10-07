const webpack = require("webpack");

module.exports = function override(config) {
  const fallback = config.resolve.fallback || {};
  config.resolve.fallback = fallback;
  config.plugins = (config.plugins || []).concat([
    new webpack.ProvidePlugin({
      process: "process/browser",
      Buffer: ["buffer", "Buffer"],
    }),
  ]);
  config.resolve.extensions.push(".mjs");
  config.module.rules.push({
    test: /\.m?js/,
    resolve: {
      fullySpecified: false,
    },
  });

  config.optimization.runtimeChunk = false;
  config.optimization.splitChunks = {
    cacheGroups: {
      default: false,
    },
  };
  config.output = Object.assign(config.output, {
    filename: "storefront.js",
  });

  config.plugins = [
    ...config.plugins, 
    new webpack.optimize.LimitChunkCountPlugin({
      maxChunks: 1,
    }),
  ]

  return {
    ...config,
    // This is needed to not show the warning about this modules don't have src files, only on dist (build)
    ignoreWarnings: [
      {
        module: /node_modules\/@walletconnect/,
      },
      {
        module: /node_modules\/eth-rpc-errors/,
      },
      {
        module: /node_modules\/json-rpc-engine/,
      },
      {
        module: /node_modules\/@metamask/,
      },
      {
        module: /node_modules\/@gnosis.pm/,
      },
    ],
  };
};
