import { Dispatch, SetStateAction, useState } from "react";

export function useToggle(
  initialValue: boolean,
): [boolean, () => void, Dispatch<SetStateAction<boolean>>] {
  const [state, setState] = useState(initialValue);

  function toggle() {
    setState((prev) => !prev);
  }

  return [state, toggle, setState];
}
