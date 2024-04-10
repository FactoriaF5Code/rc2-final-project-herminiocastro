import { describe,it, expect } from 'jest'; 
import { render, screen, fireEvent } from '@testing-library/react';
import  Home  from './Home';

describe('<Home />', () => {
  test('Renderiza correctamente el componente', () => {
    render( Home );
    const enterButton = screen.getByText('ENTER');
    expect(enterButton).toBeInTheDocument();
  });
  });

describe("<Counter />", () => {
  test("renders the counter component", () => {
    render( Counter );
    const countElement = screen.getByText(/Count:/i);
    const buttonElement = screen.getByText(/Increment:/i);

    expect(countElement).toBeInTheDocument();
    expect(buttonElement).toBeInTheDocument();
  });

  test("increments the count when the button is clicked", () => {
    render( Counter );
    const buttonElement = screen.getByText(/Increment/i);

    fireEvent.click(buttonElement);
    const countElement = screen.getByText(/Count: 1/i);

    expect(countElement).toBeInTheDocument();
  });

