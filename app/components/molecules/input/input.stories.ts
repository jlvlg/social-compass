import type { Meta, StoryObj } from "@storybook/react";
import Input from "./";

const meta: Meta<typeof Input> = {
  component: Input,
  args: { label: "placeholder", name: "placeholder" },
};

export default meta;
type Story = StoryObj<typeof Input>;

export const Common: Story = {};
export const Validation: Story = {
  args: {
    validation: {
      delay: 500,
      fn: (value) => value === "test",
      message: "Must be equal to 'test'",
    },
  },
};
