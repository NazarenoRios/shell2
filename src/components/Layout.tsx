import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { allMicrofrontends } from '@/config/microfrontends';

interface LayoutProps {
  children: React.ReactNode;
  title?: string;
}

export default function Layout({ children, title }: LayoutProps) {
  const router = useRouter();

  const isActive = (pathname: string) => router.pathname === pathname;

  return (
    <div className="min-h-screen flex flex-col">
      <Head>
        <title>{title ? `${title} | MFE Shell` : 'MFE Shell'}</title>
        <meta name="description" content="Microfrontend Shell" />
      </Head>

      <header role="banner" className="bg-gray-900 text-white p-4">
        <div className="container mx-auto flex justify-between items-center">
          <nav role="navigation">
            <ul className="flex space-x-4">
              <li>
                <Link href="/" className={`hover:text-blue-400 ${isActive('/') ? 'text-blue-400' : 'text-gray-300'}`}>
                  Home
                </Link>
              </li>
              {allMicrofrontends.map((mfe) => (
                <li key={mfe.name}>
                  <Link 
                    href={mfe.path} 
                    className={`hover:text-blue-400 ${isActive(mfe.path) ? 'text-blue-400' : 'text-gray-300'}`}
                  >
                    {mfe.title}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </header>

      <main role="main" className="flex-grow container mx-auto p-4">
        <h1 className="sr-only">{title ? `${title} | MFE Shell` : 'MFE Shell'}</h1>
        {children}
      </main>

      <footer role="contentinfo" className="bg-gray-900 text-white p-4">
        <div className="container mx-auto text-center">
          <p>© {new Date().getFullYear()} Microfrontend Shell</p>
        </div>
      </footer>
    </div>
  );
}
