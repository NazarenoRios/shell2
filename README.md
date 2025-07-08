# Application Shell - Microfrontends

Esta es una aplicación shell que permite conectar con múltiples microfrontends.

## Microfrontends Configurados

### 1. AEI GRC Voluntarias
- **URL**: https://vaxtpmde69.proteccion.com.co
- **Ruta**: `/liquideypaguevoluntarias`
- **Tipo**: Next.js

### 2. Portal Empresas
- **URL**: https://vaxtpmde69.proteccion.com.co
- **Ruta**: `/portalempresas`
- **Tipo**: Vite

### 3. Front Vite (Nuevo)
- **URL**: https://micro-vite1.vercel.app
- **Ruta**: `/vite1`
- **Tipo**: Vite

## Configuración para Vercel

### Variables de Entorno en Vercel

Configura las siguientes variables de entorno en tu proyecto de Vercel:

```bash
# Microfrontend Voluntarias
NEXT_PUBLIC_MF_VOLUNTARIAS_PATH=/liquideypaguevoluntarias
NEXT_PUBLIC_MF_VOLUNTARIAS_BASE_PATH=/liquideypaguevoluntarias
NEXT_PUBLIC_MF_VOLUNTARIAS_PORT=3001
NEXT_PUBLIC_MF_VOLUNTARIAS_URL=https://vaxtpmde69.proteccion.com.co

# Microfrontend Empresas
NEXT_PUBLIC_MF_EMPRESAS_PATH=/portalempresas
NEXT_PUBLIC_MF_EMPRESAS_BASE_PATH=/portalempresas
NEXT_PUBLIC_MF_EMPRESAS_PORT=3002
NEXT_PUBLIC_MF_EMPRESAS_URL=https://vaxtpmde69.proteccion.com.co

# Microfrontend Vite1
NEXT_PUBLIC_MF_VITE1_PATH=/vite1
NEXT_PUBLIC_MF_VITE1_BASE_PATH=/vite1
NEXT_PUBLIC_MF_VITE1_PORT=3003
NEXT_PUBLIC_MF_VITE1_URL=https://micro-vite1.vercel.app
```

### Despliegue en Vercel

1. Conecta tu repositorio a Vercel
2. El archivo `vercel.json` ya está configurado con:
   - Variables de entorno
   - Rewrites para los microfrontends
   - Headers de seguridad
3. Vercel detectará automáticamente que es una aplicación Next.js

## Configuración para AWS Amplify

### Variables de Entorno en Amplify

Configura las mismas variables de entorno en AWS Amplify:

```bash
# Microfrontend Voluntarias
NEXT_PUBLIC_MF_VOLUNTARIAS_PATH=/liquideypaguevoluntarias
NEXT_PUBLIC_MF_VOLUNTARIAS_BASE_PATH=/liquideypaguevoluntarias
NEXT_PUBLIC_MF_VOLUNTARIAS_PORT=3001
NEXT_PUBLIC_MF_VOLUNTARIAS_URL=https://vaxtpmde69.proteccion.com.co

# Microfrontend Empresas
NEXT_PUBLIC_MF_EMPRESAS_PATH=/portalempresas
NEXT_PUBLIC_MF_EMPRESAS_BASE_PATH=/portalempresas
NEXT_PUBLIC_MF_EMPRESAS_PORT=3002
NEXT_PUBLIC_MF_EMPRESAS_URL=https://vaxtpmde69.proteccion.com.co

# Microfrontend Vite1
NEXT_PUBLIC_MF_VITE1_PATH=/vite1
NEXT_PUBLIC_MF_VITE1_BASE_PATH=/vite1
NEXT_PUBLIC_MF_VITE1_PORT=3003
NEXT_PUBLIC_MF_VITE1_URL=https://micro-vite1.vercel.app
```

### Despliegue en Amplify

1. Conecta tu repositorio a AWS Amplify
2. El archivo `amplify.yml` ya está configurado con:
   - Comandos de build
   - Headers de seguridad
   - Configuración de CORS

## Desarrollo Local

```bash
# Instalar dependencias
npm install

# Ejecutar en modo desarrollo
npm run dev

# Construir para producción
npm run build

# Ejecutar tests
npm test
```

## Estructura del Proyecto

```
src/
├── components/
│   ├── Layout.tsx          # Layout principal con navegación
│   └── Layout.test.tsx
├── config/
│   ├── microfrontends.ts   # Configuración de microfrontends
│   └── enviroment.ts       # Variables de entorno
├── pages/
│   ├── [...mfe].tsx        # Página dinámica para microfrontends
│   ├── _app.tsx
│   ├── _document.tsx
│   ├── dashboard.tsx
│   └── index.tsx
└── utils/
    └── cookieService.ts    # Servicio de cookies
```

## Características

- ✅ Navegación automática a microfrontends
- ✅ Carga dinámica de iframes
- ✅ Manejo de errores
- ✅ Cookies para tracking
- ✅ Configuración para Vercel y Amplify
- ✅ Headers de seguridad
- ✅ Soporte para múltiples tipos de microfrontends (Next.js, Vite)

## Notas Importantes

- Los microfrontends se cargan en iframes para mantener el aislamiento
- Se configuran headers de seguridad para prevenir ataques XSS
- Las cookies se utilizan para tracking del estado de carga
- El routing dinámico permite agregar nuevos microfrontends fácilmente

## URLs de Acceso

Una vez desplegado, podrás acceder a:
- **Home**: `/`
- **AEI GRC Voluntarias**: `/liquideypaguevoluntarias`
- **Portal Empresas**: `/portalempresas`
- **Front Vite**: `/vite1` ← **Nuevo**
