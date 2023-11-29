import type { Preview } from "@storybook/react";
import "@styles/fonts.scss";
import fonts from "@styles/fonts";
import "normalize.css";
import React from "react";

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: "^on[A-Z].*" },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
  decorators: [
    (Story) => (
      <div className={fonts}>
        <Story />
      </div>
    ),
  ],
};

export default preview;
