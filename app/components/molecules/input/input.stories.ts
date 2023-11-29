import type { Meta, StoryObj } from "@storybook/react";
import Input from "./";

const meta: Meta<typeof Input> = {
  component: Input,
  args: { type: "text", placeholder: "placeholder" },
};

export default meta;
type Story = StoryObj<typeof Input>;

export const Common: Story = {};
