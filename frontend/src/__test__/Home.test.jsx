import { render, fireEvent } from "@testing-library/react";
import { test } from "vitest";
import { Home } from "../components/Home";
import { BrowserRouter } from "react-router-dom";

test("Al hacer clic en el botón, el usuario es redirigido a la página principal", async () => {
  const { getByText } = render(
    <BrowserRouter>
      <Home />
    </BrowserRouter>
  );
  const enterButton = getByText("ENTER");

  fireEvent.click(enterButton);
});
