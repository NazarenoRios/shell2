import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { useRouter } from 'next/router';
import Layout from './Layout';

// Create a mock for the router
const mockRouter = {
  pathname: '/',
  asPath: '/',
  push: jest.fn(),
  replace: jest.fn(),
  prefetch: jest.fn(),
  query: {},
  isFallback: false,
  events: {
    on: jest.fn(),
    off: jest.fn(),
    emit: jest.fn()
  }
};

// Mock useRouter
jest.mock('next/router', () => ({
  __esModule: true,
  default: jest.fn(() => mockRouter),
  useRouter: jest.fn(() => mockRouter)
}));

describe('Tests for Layout component', () => {
  const mockChildren = 'Test Content';

  beforeEach(() => {
    jest.clearAllMocks();
    // Reset router to default state
    mockRouter.pathname = '/';
    mockRouter.asPath = '/';
  });

  it('shows active state for home link when on home page', () => {
    render(<Layout>{mockChildren}</Layout>);
    const homeLink = screen.getByRole('link', { name: /home/i });
    expect(homeLink).toHaveClass('text-blue-400');
    expect(homeLink).toHaveClass('hover:text-blue-400');
  });

  it('shows inactive state for home link when on other page', () => {
    // Change router state
    mockRouter.pathname = '/about';
    mockRouter.asPath = '/about';

    render(<Layout>{mockChildren}</Layout>);
    const homeLink = screen.getByRole('link', { name: /home/i });
    expect(homeLink).not.toHaveClass('text-blue-400');
    expect(homeLink).toHaveClass('text-gray-300');
    expect(homeLink).toHaveClass('hover:text-blue-400');
  });

  // Rest of the tests...

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders the Layout component with children', () => {
    render(<Layout>{mockChildren}</Layout>);
    expect(screen.getByText('Test Content')).toBeInTheDocument();
  });

  it('applies the correct title with default value', () => {
    render(<Layout>{mockChildren}</Layout>);
    const title = screen.getByRole('heading', { name: /mfe shell/i });
    expect(title).toBeInTheDocument();
    expect(title).toHaveTextContent('MFE Shell');
    expect(title).toHaveClass('sr-only');
  });

  it('applies the correct title with custom value', () => {
    const customTitle = 'Custom Title';
    render(<Layout title={customTitle}>{mockChildren}</Layout>);
    const title = screen.getByRole('heading', { name: /custom title \| mfe shell/i });
    expect(title).toBeInTheDocument();
    expect(title).toHaveTextContent(`${customTitle} | MFE Shell`);
    expect(title).toHaveClass('sr-only');
  });

  it('renders navigation with home link', () => {
    render(<Layout>{mockChildren}</Layout>);
    const homeLink = screen.getByRole('link', { name: /home/i });
    expect(homeLink).toBeInTheDocument();
    expect(homeLink).toHaveAttribute('href', '/');
  });

  it('highlights active navigation link', () => {
    // Mock router with different pathname
    (useRouter as jest.Mock).mockReturnValue({ pathname: '/about' });
    render(<Layout>{mockChildren}</Layout>);
    const homeLink = screen.getByRole('link', { name: /home/i });
    expect(homeLink).toHaveClass('hover:text-blue-400');
  });

  it('renders footer with current year', () => {
    render(<Layout>{mockChildren}</Layout>);
    const currentYear = new Date().getFullYear();
    const footerText = `© ${currentYear} Microfrontend Shell`;
    expect(screen.getByText(footerText)).toBeInTheDocument();
  });

  it('applies correct structure and classes', () => {
    render(<Layout>{mockChildren}</Layout>);

    // Main container
    const mainContainer = screen.getByRole('main');
    expect(mainContainer).toBeInTheDocument();
    expect(mainContainer).toHaveClass('flex-grow');
    expect(mainContainer).toHaveClass('container');
    expect(mainContainer).toHaveClass('mx-auto');
    expect(mainContainer).toHaveClass('p-4');

    // Header
    const header = screen.getByRole('banner');
    expect(header).toBeInTheDocument();
    expect(header).toHaveClass('bg-gray-900');
    expect(header).toHaveClass('text-white');
    expect(header).toHaveClass('p-4');

    // Navigation
    const nav = screen.getByRole('navigation');
    expect(nav).toBeInTheDocument();
    const navList = screen.getByRole('list');
    expect(navList).toBeInTheDocument();
    expect(navList).toHaveClass('flex');
    expect(navList).toHaveClass('space-x-4');

    // Footer
    const footer = screen.getByRole('contentinfo');
    expect(footer).toBeInTheDocument();
    expect(footer).toHaveClass('bg-gray-900');
    expect(footer).toHaveClass('text-white');
    expect(footer).toHaveClass('p-4');
  });
});