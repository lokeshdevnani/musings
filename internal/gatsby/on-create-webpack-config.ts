import path from "path";

import { type CompilerOptions } from "typescript";
import { type CreateWebpackConfigArgs } from "gatsby";

import { compilerOptions } from "../../tsconfig.json";

interface WebpackPlugin {
  constructor: {
    name: string;
  };
}

const onCreateWebpackConfig = (
  (options: Pick<CompilerOptions, "paths">) =>
  ({ actions, getConfig, stage }: CreateWebpackConfigArgs) => {
    const config = getConfig();
    const miniCssExtractPlugin = config.plugins.find(
      (plugin: WebpackPlugin) => plugin.constructor.name === "MiniCssExtractPlugin",
    );

    if (miniCssExtractPlugin) {
      miniCssExtractPlugin.options.ignoreOrder = true;
    }

    if (config.output) {
      config.output.module = false;
      config.output.chunkFormat = "array-push";
    }

    config.experiments = {
      ...(config.experiments || {}),
      outputModule: false,
    };

    // Optimize bundle splitting and tree shaking for production
    if (stage === "build-javascript") {
      config.optimization = {
        ...config.optimization,
        usedExports: true,
        sideEffects: false,
        concatenateModules: true,
        splitChunks: {
          chunks: "all",
          minSize: 20000,
          maxSize: 244000,
          cacheGroups: {
            vendor: {
              test: /[\\/]node_modules[\\/]/,
              name: "vendors",
              chunks: "all",
              priority: 10,
            },
            react: {
              test: /[\\/]node_modules[\\/](react|react-dom)[\\/]/,
              name: "react",
              chunks: "all",
              priority: 20,
            },
            gatsby: {
              test: /[\\/]node_modules[\\/]gatsby[\\/]/,
              name: "gatsby",
              chunks: "all",
              priority: 15,
            },
          },
        },
      };

      // Exclude unused code paths and development code
      config.resolve = {
        ...config.resolve,
        fallback: {
          ...config.resolve?.fallback,
          fs: false,
          path: false,
          crypto: false,
        },
      };

      // Exclude development code from production bundles
      config.plugins = config.plugins?.map((plugin: any) => {
        if (plugin.constructor.name === 'DefinePlugin') {
          return new plugin.constructor({
            ...plugin.definitions,
            'process.env.NODE_ENV': JSON.stringify('production'),
          });
        }
        return plugin;
      });
    }

    actions.replaceWebpackConfig(config);

    const isBrowserStage =
      stage === "develop" || stage === "develop-javascript" || stage === "build-javascript";

    const aliases = Object.entries(options.paths || []).reduce(
      (accumulator, [name, [target]]) => ({
        ...accumulator,
        [name.replace("/*", "")]: path.resolve(target.replace("/*", "")),
      }),
      isBrowserStage
        ? {
            camelcase: path.resolve("internal/shims/camelcase.ts"),
            "gatsby-core-utils/create-content-digest": path.resolve(
              "internal/shims/create-content-digest.ts",
            ),
          }
        : {},
    );

    actions.setWebpackConfig({
      resolve: {
        alias: aliases,
      },
    });
  }
)(compilerOptions);

export { onCreateWebpackConfig };
