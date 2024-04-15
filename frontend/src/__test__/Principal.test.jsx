import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { Principal } from "../components/Principal";
import { test, expect } from "vitest";
import axios from "axios";
import { BrowserRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import { vi } from "vitest";

test("Renderizado del componente con los elementos principales", () => {
  render(
    <BrowserRouter>
      <Principal />
    </BrowserRouter>
  );

  screen.debug();

  expect(screen.getByRole("img", { name: /logo/i })).toBeInTheDocument();
  expect(screen.getByPlaceholderText(/buscar/i)).toBeInTheDocument();
  expect(screen.getByRole("button", { name: /Botón1/i })).toBeInTheDocument();
  expect(screen.getByRole("button", { name: /Botón2/i })).toBeInTheDocument();
});

test("Carga de elementos desde la API y renderizado", async () => {
  const mockData = [
    { id: 1, titulo: "Test Funko", categoria: "Pops", imagen: "test.jpg" },
  ];

  vi.spyOn(axios, "get").mockResolvedValueOnce({ data: mockData });

  render(
    <BrowserRouter>
      <Principal />
    </BrowserRouter>
  );

  const funkoItem = await screen.findByText(
    /test funko/i,
    {},
    { timeout: 5000 }
  );
  expect(funkoItem).toBeInTheDocument();
});






  