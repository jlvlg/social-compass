import type { Meta, StoryObj } from "@storybook/react";
import Button from "./";

const meta: Meta<typeof Button> = {
  component: Button,
  args: {
    label: "label",
  },
};

export default meta;
type Story = StoryObj<typeof Button>;

export const Primary: Story = {
  args: {
    type: "primary",
  },
};

export const Secondary: Story = {
  args: {
    type: "secondary",
  },
};
