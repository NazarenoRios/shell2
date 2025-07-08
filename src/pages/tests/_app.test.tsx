import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { useRouter } from 'next/router';

// Mock CSS modules
jest.mock('@/styles/globals.css', () => ({}));

// Mock next/head
jest.mock('next/head', () => ({
  __esModule: true,
  default: ({ children }: { children: React.ReactNode }) => {
    return <>{children}</>;
  },
}));

// Mock next/router
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
    emit: jest.fn(),
  },
};

jest.mock('next/router', () => ({
  __esModule: true,
  useRouter: jest.fn(() => mockRouter),
}));

// Importar el componente después de los mocks
import App from '../_app';

describe('App Component', () => {
  const TestComponent = () => <div>Test Component</div>;
  const mockPageProps = {};

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders the app with head elements', () => {
    render(
      <App
        Component={TestComponent}
        pageProps={mockPageProps}
        router={mockRouter as any}
      />
    );

    // Verificar que el componente de prueba se renderiza
    expect(screen.getByText('Test Component')).toBeInTheDocument();
    
    // Verificar el título del documento
    expect(document.title).toBe('Microfrontend Shell');
  });

  it('passes pageProps to the component', () => {
    const testProps = { test: 'test' };
    const ComponentWithProps = (props: any) => {
      return <div data-testid="props-test">{JSON.stringify(props)}</div>;
    };

    render(
      <App
        Component={ComponentWithProps}
        pageProps={testProps}
        router={mockRouter as any}
      />
    );

    expect(screen.getByTestId('props-test')).toHaveTextContent(JSON.stringify(testProps));
  });

  it('renders with custom component', () => {
    const CustomComponent = () => <div data-testid="custom-component">Custom Test Component</div>;
    
    render(
      <App
        Component={CustomComponent}
        pageProps={mockPageProps}
        router={mockRouter as any}
      />
    );

    expect(screen.getByTestId('custom-component')).toHaveTextContent('Custom Test Component');
  });
});