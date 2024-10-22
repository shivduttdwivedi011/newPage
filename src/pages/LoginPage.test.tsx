// src/pages/LoginPage.test.tsx
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom'; // Updated import
import { MemoryRouter } from 'react-router-dom';
import LoginPage from './LoginPage';

describe('LoginPage', () => {
  beforeEach(() => {
    render(
      <MemoryRouter>
        <LoginPage />
      </MemoryRouter>
    );
  });

  it('renders the login form', () => {
    expect(screen.getByText(/login/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /login/i })).toBeInTheDocument();
  });

  it('shows error message on invalid login', async () => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: false,
        json: () => Promise.resolve({ error: 'Invalid credentials' }),
      })
    ) as jest.Mock;

    fireEvent.change(screen.getByLabelText(/email/i), {
      target: { value: 'invalid@reqres.in' },
    });
    fireEvent.change(screen.getByLabelText(/password/i), {
      target: { value: 'wrongpassword' },
    });
    fireEvent.click(screen.getByRole('button', { name: /login/i }));

    const errorMessage = await screen.findByText(/invalid credentials/i);
    expect(errorMessage).toBeInTheDocument();
  });

  it('navigates to dashboard on successful login', async () => {
    const mockNavigate = jest.fn();
    jest.mock('react-router-dom', () => ({
      ...jest.requireActual('react-router-dom'),
      useNavigate: () => mockNavigate,
    }));

    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve({ token: '12345' }),
      })
    ) as jest.Mock;

    fireEvent.change(screen.getByLabelText(/email/i), {
      target: { value: 'eve.holt@reqres.in' },
    });
    fireEvent.change(screen.getByLabelText(/password/i), {
      target: { value: 'cityslicka' },
    });
    fireEvent.click(screen.getByRole('button', { name: /login/i }));

    await screen.findByText(/welcome to the dashboard/i);
    expect(mockNavigate).toHaveBeenCalledWith('/dashboard');
  });
});
