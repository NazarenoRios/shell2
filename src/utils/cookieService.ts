// src/utils/cookieService.ts
export interface CookieOptions {
  httpOnly?: boolean;
  secure?: boolean;
  sameSite?: 'strict' | 'lax' | 'none';
  maxAge?: number;
  path?: string;
  domain?: string;
}

export class CookieService {
  private static isClient() {
    return typeof window !== 'undefined';
  }

  static set(name: string, value: string, options: CookieOptions = {}): void {
    if (!this.isClient()) return;

    console.log('CookieService desde service', name, value, options);
    const defaults: CookieOptions = {
      httpOnly: false,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 86400, // 24 horas por defecto
      path: '/'
    };

    const finalOptions = { ...defaults, ...options };

    // Crear la cookie
    const cookie = `${name}=${encodeURIComponent(value)}`;
    
    // Agregar opciones
    const optionsArray = [];
    
    if (finalOptions.httpOnly) optionsArray.push('HttpOnly');
    if (finalOptions.secure) optionsArray.push('Secure');
    if (finalOptions.sameSite) optionsArray.push(`SameSite=${finalOptions.sameSite}`);
    if (finalOptions.maxAge) optionsArray.push(`Max-Age=${finalOptions.maxAge}`);
    if (finalOptions.path) optionsArray.push(`Path=${finalOptions.path}`);
    if (finalOptions.domain) optionsArray.push(`Domain=${finalOptions.domain}`);

    // Establecer cookie
    document.cookie = `${cookie}; ${optionsArray.join('; ')}`;
  }

  static get(name: string): string | null {
    if (!this.isClient()) return null;

    const cookies = document.cookie.split(';');
    for (const cookie of cookies) {
      const [cookieName, cookieValue] = cookie.trim().split('=');
      if (cookieName === name) {
        return decodeURIComponent(cookieValue);
      }
    }
    return null;
  }

  static remove(name: string, options: CookieOptions = {}): void {
    if (!this.isClient()) return;

    this.set(name, '', { ...options, maxAge: 0 });
  }
}