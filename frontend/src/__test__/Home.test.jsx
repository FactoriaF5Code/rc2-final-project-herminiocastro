import { describe,it, expect } from 'jest'; 
import { render, screen } from '@testing-library/react';
import { Home } from './Home';

describe('Home Component', () => {
  it('Renderiza correctamente el componente', () => {
    render(<Home />);
    const enterButton = screen.getByText('ENTER');
    expect(enterButton).toBeInTheDocument();
  });
});



