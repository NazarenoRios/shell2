import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';

// Mock de next/document
jest.mock('next/document', () => ({
  __esModule: true,
  Html: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="html">{children}</div>
  ),
  Head: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="head">{children}</div>
  ),
  Main: () => <div data-testid="main" />,
  NextScript: () => <div data-testid="next-script" />,
  default: function Document() {
    return (
      <div>
        <div data-testid="html">
          <div data-testid="head" />
          <div data-testid="main" />
          <div data-testid="next-script" />
        </div>
      </div>
    );
  },
}));

// Importar el componente después de los mocks
import Document from '../_document';

describe('Document Component', () => {
  it('renders without crashing', () => {
    expect(() => render(<Document />)).not.toThrow();
  });

  it('renders the document structure', () => {
    const { getByTestId } = render(<Document />);
    
    // Verificar que los elementos principales estén presentes
    expect(getByTestId('html')).toBeInTheDocument();
    expect(getByTestId('head')).toBeInTheDocument();
    expect(getByTestId('main')).toBeInTheDocument();
    expect(getByTestId('next-script')).toBeInTheDocument();
  });
});