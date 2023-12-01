import type { Meta, StoryObj } from "@storybook/react";
import Input from "./";

const meta: Meta<typeof Input> = {
  component: Input,
  args: { label: "placeholder", name: "placeholder" },
};

export default meta;
type Story = StoryObj<typeof Input>;

export const Common: Story = {};
export const Invalid: Story = {
  args: {
    isValid: false,
  },
};
