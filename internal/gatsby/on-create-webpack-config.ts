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
