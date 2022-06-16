import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import LandingPage from './components/LandingPage/LandingPage';


test('renders the enter button', () => {
  render(<BrowserRouter><LandingPage /></BrowserRouter>);
  const enterButton = screen.getByText(/ENTRAR/i);
  expect(enterButton).toBeInTheDocument();
});
