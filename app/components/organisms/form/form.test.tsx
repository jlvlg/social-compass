import { render, screen } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";
import Form from "./";
import React from "react";

describe("Test if form", () => {
  describe("submits data correctly", () => {
    test("when valid", async () => {
      render(
        <Form
          title={{ text: "test", position: "start" }}
          onSubmit={(data) =>
            expect(data).toStrictEqual({ input1: "", input2: "test" })
          }
          inputs={[
            { id: "input1", label: "Input 1", name: "input1" },
            {
              id: "input2",
              label: "Input 2",
              name: "input2",
              validation: { delay: "submit", fn: (value) => value === "test" },
            },
          ]}
          confirmButton={{ label: "Confirm", fn: () => {} }}
        />,
      );

      const form = screen.getByRole("form");
      const input2 = screen.getByRole("textbox", { name: "Input 2" });
      const button = screen.getByRole("button");

      await userEvent.type(input2, "test");
      await userEvent.click(button);
    });

    test("when invalid", async () => {
      render(
        <Form
          title={{ text: "test", position: "start" }}
          onSubmit={(data) => expect(data).toStrictEqual({})}
          inputs={[
            { id: "input1", label: "Input 1", name: "input1" },
            {
              id: "input2",
              label: "Input 2",
              name: "input2",
              validation: { delay: "submit", fn: (value) => value === "test" },
            },
          ]}
          confirmButton={{ label: "Confirm", fn: () => {} }}
        />,
      );

      const form = screen.getByRole("form");
      const input2 = screen.getByRole("textbox", { name: "Input 2" });
      const button = screen.getByRole("button");

      await userEvent.type(input2, "wrong text");
      await userEvent.click(button);
    });
  });
});
