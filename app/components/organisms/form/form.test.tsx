import { render, screen } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";
import Form from "./";

describe("Test if form", () => {
  let submitted: any = {};

  describe("submits data correctly", () => {
    beforeEach(() => {
      render(
        <Form
          title={{ text: "test", position: "start" }}
          onSubmit={(data) => (submitted = data)}
          inputs={{
            input1: { label: "Input 1" },
            input2: { label: "Input 2" },
          }}
          confirmButton={{ label: "Confirm" }}
          validations={[
            { inputs: ["input2"], fn: (values) => values.input2 === "test" },
          ]}
          render={["input1", "input2"]}
        />,
      );
    });

    test("when valid", async () => {
      const form = screen.getByRole("form");
      const input2 = screen.getByRole("textbox", { name: "Input 2" });
      const button = screen.getByRole("button");

      await userEvent.type(input2, "test");
      await userEvent.click(button);
      expect(submitted).toStrictEqual({ input1: "", input2: "test" });
    });

    test("when invalid", async () => {
      const form = screen.getByRole("form");
      const input2 = screen.getByRole("textbox", { name: "Input 2" });
      const button = screen.getByRole("button");

      await userEvent.type(input2, "wrong text");
      await userEvent.click(button);
      expect(submitted).toStrictEqual({});
    });
  });
});
