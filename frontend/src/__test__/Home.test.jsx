import { expect, test } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import Home from "../components/Home";

test("Al hacer clic en el botón, el usuario es redirigido a la página principal", async () => {
  render(<Home />);

  const enterButton = screen.getByText("ENTER");
  await fireEvent.click(enterButton);

  expect(screen.getByText("Página Principal")).toBeInTheDocument();
});
