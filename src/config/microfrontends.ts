
export interface Microfrontend {
  name: string;
  type: 'next' | 'vite' | 'other';
  title: string;
  path: string;
  basePath: string;
  devPort: number;
  prodUrl: string;
  status: boolean;
}

// Array de microfrontends Next.js
export const nextMicrofrontends: Microfrontend[] = [
  {
    name: "aei-grc-voluntarias",
    type: "next",
    title: "aei-grc-voluntarias",
    path: "/liquideypaguevoluntarias",
    basePath: "/liquideypaguevoluntarias",
    devPort: 3001,
    prodUrl: "https://vaxtpmde69.proteccion.com.co",
    status: true,
  },
];

// Array de microfrontends Vite
export const viteMicrofrontends: Microfrontend[] = [
  {
    name: "Empresas",
    type: "vite",
    title: "Front Empresas",
    path: "/portalempresas",
    basePath: "/portalempresas",
    devPort: 3002,
    prodUrl: "https://vaxtpmde69.proteccion.com.co",
    status: true,
  },
  {
    name: "Preventores",
    type: "vite",
    title: "Front vite",
    path: "/vite1",
    basePath: "/vite1",
    devPort: 3003,
    prodUrl: "https://micro-vite1.vercel.app",
    status: true,
  }
];

// Todos los microfrontends combinados
export const allMicrofrontends: Microfrontend[] = [
  ...nextMicrofrontends,
  ...viteMicrofrontends,
];

/**
 * Obtiene un microfrontend por su nombre
 */
export function getMicrofrontendByName(name: string): Microfrontend | undefined {
  return allMicrofrontends.find((mfe) => mfe.name === name);
}

// Exportación por defecto para compatibilidad
export default {
  nextMicrofrontends,
  viteMicrofrontends,
  allMicrofrontends,
  getMicrofrontendByName,
};
 