import { useState, useEffect } from 'react';
import Link from 'next/link';
import Layout from '@/components/Layout';
import { allMicrofrontends } from '@/config/microfrontends';

export default function Dashboard() {
  const [status, setStatus] = useState<Record<string, boolean>>({});
  const [isLoading, setIsLoading] = useState(true);

  // Simular verificación de estado de los microfrontends
  useEffect(() => {
    const checkStatus = async () => {
      const statusMap: Record<string, boolean> = {};
      
      for (const mfe of allMicrofrontends) {
        try {
          // En un caso real, aquí harías una petición al microfrontend
          // para verificar su estado
          statusMap[mfe.name] = mfe.status; // Simulamos que todos están activos
        } catch (error) {
          statusMap[mfe.name] = false;
        }
      }
      
      setStatus(statusMap);
      setIsLoading(false);
    };

    checkStatus();
  }, []);

  return (
    <Layout title="Dashboard">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Microfrontends Dashboard</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {allMicrofrontends.map((mfe) => (
            <div 
              key={mfe.name}
              className="bg-white/10 p-6 rounded-lg shadow-md hover:shadow-lg transition"
            >
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold flex items-center">
                  {mfe.title}
                </h2>
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                  status[mfe.name] 
                    ? 'bg-green-100 text-green-800' 
                    : 'bg-red-100 text-red-800'
                }`}>
                  {status[mfe.name] ? 'Online' : 'Offline'}
                </span>
              </div>
              
              <div className="space-y-2 text-sm text-gray-300">
                <p><span className="font-medium">Type:</span> {mfe.type}</p>
                <p><span className="font-medium">Path:</span> {mfe.path}</p>
                <p><span className="font-medium">Dev Port:</span> {mfe.devPort}</p>
              </div>
              
              <div className="mt-4 pt-4 border-t border-gray-700">
                <Link 
                  href={mfe.path}
                  className="text-blue-400 hover:text-blue-300 font-medium block mt-2"
                >
                  Abrir {mfe.title} →
                </Link>
              </div>
            </div>
          ))}
        </div>

        {allMicrofrontends.length === 0 && (
          <div className="text-center py-12">
            <p className="text-lg text-gray-400">No microfrontends configured yet.</p>
          </div>
        )}
      </div>
    </Layout>
  );
}
