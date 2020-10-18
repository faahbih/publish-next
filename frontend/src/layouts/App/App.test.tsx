import React from 'react';
import { render } from '@testing-library/react';
import App from 'layouts/App';

test('renders app', () => {
  const { getByText } = render(<App />);
  const linkElement = getByText(/restore/i);
  expect(linkElement).toBeInTheDocument();
});
