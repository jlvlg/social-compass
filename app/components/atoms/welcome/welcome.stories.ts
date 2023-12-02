import type { Meta, StoryObj } from "@storybook/react";
import Welcome from "./";

const meta: Meta<typeof Welcome> = {
  component: Welcome,
};

export default meta;
type Story = StoryObj<typeof Welcome>;

export const Common: Story = { args: { message: "Test message" } };
