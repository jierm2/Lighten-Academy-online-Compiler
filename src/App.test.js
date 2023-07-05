import { render, screen } from '@testing-library/react';
import Home from './Home';

test('renders home title', () => {
  // Render the Home component
  render(<Home />);

  // Check if the home title is rendered
  const homeTitle = screen.getByText('Python Playground');
  expect(homeTitle).toBeInTheDocument();
});
