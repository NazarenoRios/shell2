import { GetStaticPaths, GetStaticProps } from 'next';
import { useRouter } from 'next/router';
import { useEffect, useRef, useState } from 'react';
import Layout from '@/components/Layout';
import { allMicrofrontends, getMicrofrontendByName } from '@/config/microfrontends';
import { CookieService } from '../utils/cookieService';

interface MfePageProps {
  mfeName: string;
  mfeType: 'next' | 'vite';
}

export default function MfePage({ mfeName, mfeType }: MfePageProps) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const iframeContainerRef = useRef<HTMLDivElement>(null);
  const mfe = getMicrofrontendByName(mfeName);

  useEffect(() => {
    if (!mfe || !iframeContainerRef.current) {
      setIsLoading(false);
      return;
    }

    iframeContainerRef.current.innerHTML = '';

    const isProd = process.env.NODE_ENV === 'production';
    const baseUrl = mfe.prodUrl;
    //const baseUrl = isProd
    //? `${window.location.protocol}//${window.location.host}${mfe.path}`
    //: `https://localhost:${mfe.devPort}`;
    const redirectPath = mfe.path && !isProd ? mfe.path : '';

    const iframe = document.createElement('iframe');
    iframe.src = `${baseUrl}${redirectPath}`;
    iframe.style.width = '100%';
    iframe.style.height = 'calc(100vh - 64px)';
    iframe.style.border = 'none';
    iframe.style.display = 'none';

    iframe.onload = () => {
      setIsLoading(false);
      iframe.style.display = 'block';

      if (typeof window !== 'undefined') {
        CookieService.set('lastMfeLoad', Date.now().toString(), {
          maxAge: 3600, // 1 hora
          path: '/'
        });

        
        CookieService.set('mfeLoadStatusPrueba', 'success', {
          maxAge: 3600,
          path: '/'
        });

        
        CookieService.set('currentMfe', mfe.name, {
          maxAge: 3600,
          path: '/'
        });

      
        CookieService.set('currentMfeUrl', `${baseUrl}${redirectPath}`, {
          maxAge: 3600,
          path: '/'
        });
      }
    };
    iframe.onerror = () => {
      setIsLoading(false);
      if (typeof window !== 'undefined') {
        CookieService.set('mfeLoadStatus', 'error', {
          maxAge: 3600,
          path: '/'
        });
      }
    };

    iframeContainerRef.current.appendChild(iframe);

    // Limpiar cuando el componente se desmonte
    return () => {
      if (iframeContainerRef.current) {
        const iframe = iframeContainerRef.current.querySelector('iframe');
        if (iframe) {
          iframe.remove();
        }
      }
      if (typeof window !== 'undefined') {
        // Limpiar todas las cookies al desmontar
        CookieService.remove('lastMfeLoad');
        CookieService.remove('mfeLoadStatus');
        CookieService.remove('currentMfe');
        CookieService.remove('currentMfeUrl');
      }
    };
  }, [mfe]);

  // Verificar estado de carga solo en el cliente
  const loadStatus = typeof window !== 'undefined' ? CookieService.get('mfeLoadStatus') : null;
  if (loadStatus === 'error') {
    return (
      <Layout title="Error">
        <div className="bg-red-900/50 border border-red-700 text-red-200 p-4 rounded-lg">
          <h2 className="text-xl font-bold mb-2">Error</h2>
          <p>Hubo un error al cargar el microfrontend: {mfeName}</p>
        </div>
      </Layout>
    );
  }

  if (!mfe) {
    return (
      <Layout title="Error">
        <div className="bg-red-900/50 border border-red-700 text-red-200 p-4 rounded-lg">
          <h2 className="text-xl font-bold mb-2">Error</h2>
          <p>Microfrontend no encontrado: {mfeName}</p>
        </div>
      </Layout>
    );
  }

  return (
    <Layout title={mfe.title}>
      <div className="microfrontend-wrapper">
        {isLoading && (
          <div className="flex items-center justify-center h-64">
            <p>Cargando {mfe.title}...</p>
          </div>
        )}
        <div 
          ref={iframeContainerRef} 
          className="w-full h-[calc(100vh-64px)]"
        />
      </div>
    </Layout>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  // Generar rutas para todos los microfrontends
  const paths = allMicrofrontends.map(mfe => ({
    params: { 
      mfe: mfe.path.split('/').filter(Boolean) 
    }
  }));

  return {
    paths,
    fallback: false, // Devuelve 404 si la ruta no existe
  };
};

export const getStaticProps: GetStaticProps = async (context) => {
  const { mfe } = context.params || {};
  const mfePath = Array.isArray(mfe) ? `/${mfe.join('/')}` : `/${mfe || ''}`;
  
  // Buscar el microfrontend que coincida con la ruta
  const microfrontend = allMicrofrontends.find(mfe => 
    mfePath.startsWith(mfe.path)
  );

  if (!microfrontend) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      mfeName: microfrontend.name,
      mfeType: microfrontend.type,
    },
  };
};