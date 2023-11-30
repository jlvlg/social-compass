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
    cancelButton: { label: "Cancel", fn: () => {} },
    confirmButton: { label: "Submit", fn: () => {} },
    inputs: [
      { id: "input 1", label: "input 1", name: "input1" },
      {
        id: "input 2",
        label: "input 2",
        name: "input2",
        icon: "user",
        validation: { delay: 500, fn: (value: string) => value === "aaaa" },
      },
    ],
  },
};
