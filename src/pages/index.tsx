import Head from 'next/head';
import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4">
      <Head>
        <title>Shell Microfrontends</title>
        <meta name="description" content="Shell de microfrontends" />
      </Head>

      <main className="text-center">
        <h1 className="text-4xl font-bold mb-6">
          Bienvenido Shell Microfrontends
        </h1>
        
        <p className="text-xl mb-8">
          Un shell diseñado para integrar microfrontends con tecnologias Next.js y Vite
        </p>

        <div className="space-y-4">
          <div className="p-4 bg-white/10 rounded-lg">
            <h2 className="text-2xl font-semibold mb-2">Inicio</h2>
            <p className="mb-4">Aqui puedes ver los microfrontends disponibles</p>
            <Link 
              href="/dashboard" 
              className="inline-block px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
            >
              Ir al dashboard
            </Link>
          </div>
        </div>
      </main>

      <footer className="mt-12 text-center text-sm text-gray-400">
        <p>Shell v1.0</p>
      </footer>
    </div>
  );
}
