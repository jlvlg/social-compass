import type { Meta, StoryObj } from "@storybook/react";
import Icon from ".";
import React from "react";

const meta: Meta<typeof Icon> = {
  component: Icon,
};

export default meta;
type Story = StoryObj<typeof Icon>;

export const Common: Story = {};
