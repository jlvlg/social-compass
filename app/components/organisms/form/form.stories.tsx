import type { Meta, StoryObj } from "@storybook/react";
import Form from ".";
import Input from "@components/molecules/input";

const meta: Meta<typeof Form> = {
  component: Form,
};

export default meta;
type Story = StoryObj<typeof Form>;

export const Common: Story = {
  args: {
    title: { text: "Form", position: "start" },
    cancelButton: "Cancel",
    confirmButton: "Submit",
    children: (
      <>
        <Input placeholder="input 1" />
        <Input placeholder="input 2" icon="user" />
      </>
    ),
  },
};
