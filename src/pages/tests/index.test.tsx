import { render, screen } from '@testing-library/react';
import Home from '../index';  // Fixed import path

// Mock next/head to track head elements
const mockHead = jest.fn();
jest.mock('next/head', () => {
  return {
    __esModule: true,
    default: ({ children }: { children: React.ReactNode }) => {
      mockHead(children);
      return <>{children}</>;
    },
  };
});

describe('Home Page', () => {
  it('renderiza el título principal', () => {
    render(<Home />);
    const heading = screen.getByRole('heading', { 
      level: 1,
      name: /bienvenido shell microfrontends/i 
    });
    expect(heading).toBeInTheDocument();
  });

  it('renderiza la descripción', () => {
    render(<Home />);
    const description = screen.getByText(
      /un shell diseñado para integrar microfrontends con tecnologias next\.js y vite/i
    );
    expect(description).toBeInTheDocument();
  });

  it('renderiza la sección', () => {
    render(<Home />);
    const section = screen.getByRole('heading', { 
      level: 2,
      name: /inicio/i 
    });
    expect(section).toBeInTheDocument();
  });

  it('renderiza el botón de ir al dashboard', () => {
    render(<Home />);
    const link = screen.getByRole('link', { 
      name: /ir al dashboard/i 
    });
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute('href', '/dashboard');
    expect(link).toHaveClass(
      'inline-block px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition'
    );
  });

  it('renderiza el footer con la versión', () => {
    render(<Home />);
    const footer = screen.getByText(/shell v1\.0/i);
    expect(footer).toBeInTheDocument();
  });

  it('contiene los metadatos correctos', () => {
    render(<Home />);
    
    // Get the head children from the mock
    const headChildren = mockHead.mock.calls.flatMap(call => 
      Array.isArray(call[0]) ? call[0] : [call[0]]
    );
    
    // Check for title
    const title = headChildren.find(
      (child: any) => child?.type === 'title'
    );
    expect(title).toBeDefined();
    expect(title?.props?.children).toBe('Shell Microfrontends');
    
    // Check for meta description
    const meta = headChildren.find(
      (child: any) => 
        child?.type === 'meta' && 
        child?.props?.name === 'description'
    );
    expect(meta).toBeDefined();
    expect(meta?.props?.content).toBe('Shell de microfrontends');
  });
});