import type { StorybookConfig } from "@storybook/nextjs";

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
      config.resolve.alias = {
        ...config.resolve.alias,
        "@": path.resolve(__dirname, ".."),
        "@components": path.resolve(__dirname, "../app/components"),
        "@styles": path.resolve(__dirname, "../app/styles"),
        "@tests": path.resolve(__dirname, "../app/tests"),
        "@assets": path.resolve(__dirname, "../app/assets"),
      };
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
