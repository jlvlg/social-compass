import type { Meta, StoryObj } from "@storybook/react";
import Form from ".";

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
    onSubmit: () => {},
    validations: [
      { inputs: ["test2"], fn: (values) => values.test2 === "teste" },
    ],
    inputs: { test1: { label: "Teste 1" }, test2: { label: "Teste 2" } },
    render: [
      "test1",
      "test2",
      { name: "test2", message: "Teste 2 must be equal to 'test'" },
    ],
  },
};
