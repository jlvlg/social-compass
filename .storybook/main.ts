import { TsconfigPathsPlugin } from "tsconfig-paths-webpack-plugin";
import type { StorybookConfig } from "@storybook/nextjs";
import { RuleSetRule, RuleSetCondition } from "webpack";

import path from "path";

const config: StorybookConfig = {
  stories: [
    "../app/components/**/*.mdx",
    "../app/components/**/*.stories.@(js|jsx|mjs|ts|tsx)",
  ],
  addons: [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@storybook/addon-onboarding",
    "@storybook/addon-interactions",
  ],
  framework: {
    name: "@storybook/nextjs",
    options: {},
  },
  docs: {
    autodocs: "tag",
  },
  webpackFinal: async (config) => {
    if (config.resolve) {
      config.resolve.plugins = [
        ...(config.resolve.plugins || []),
        new TsconfigPathsPlugin({ extensions: config.resolve.extensions }),
      ];
    }

    if (config.module?.rules) {
      const fileLoaderRule = config.module.rules.find((rule) => {
        if (
          typeof rule !== "string" &&
          typeof rule !== "number" &&
          typeof rule !== "boolean" &&
          rule?.test instanceof RegExp
        ) {
          return rule.test.test(".svg");
        }
      });

      if (
        typeof fileLoaderRule !== "string" &&
        typeof fileLoaderRule !== "number" &&
        typeof fileLoaderRule !== "boolean"
      ) {
        fileLoaderRule!.exclude = /\.svg$/;

        config.module.rules.push({
          test: /\.svg$/i,
          issuer: fileLoaderRule?.issuer,
          use: ["@svgr/webpack"],
        });
      }
    }

    return config;
  },
};
export default config;
