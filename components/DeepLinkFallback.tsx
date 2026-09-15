'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { usePathname, useSearchParams } from 'next/navigation';
import { Separator } from '@/components/ui/separator';

const PLAY_STORE_URL = 'https://play.google.com/store/apps/details?id=voca.app';
const APP_STORE_URL = 'https://apps.apple.com/br/app/voca/id1438359659';
const APP_HOST = 'voca.com.br';
const APP_SCHEME = 'voca';

type MobileOS = 'Android' | 'iOS' | 'web';

function getMobileOS(): MobileOS {
  if (typeof window === 'undefined') return 'web';

  const userAgent = navigator.userAgent || (window as Window & { opera?: string }).opera || '';

  if (/android/i.test(userAgent)) return 'Android';
  if (/iPad|iPhone|iPod/.test(userAgent) && !(window as Window & { MSStream?: unknown }).MSStream) {
    return 'iOS';
  }

  return 'web';
}

function normalizeAppPath(pathname: string): string {
  const normalized = pathname.startsWith('/') ? pathname : `/${pathname}`;
  return normalized.startsWith('/app') ? normalized : `/app${normalized}`;
}

function buildDeepLink(pathname: string, search: string): string {
  return `${APP_SCHEME}://${APP_HOST}${normalizeAppPath(pathname)}${search}`;
}

function buildAndroidIntent(pathname: string, search: string): string {
  const appPath = normalizeAppPath(pathname);
  const fallback = encodeURIComponent(`https://${APP_HOST}${appPath}${search}`);

  return (
    `intent://${APP_HOST}${appPath}${search}` +
    `#Intent;scheme=${APP_SCHEME};package=voca.app;` +
    `S.browser_fallback_url=${fallback};end`
  );
}

type DeepLinkFallbackProps = {
  /** Optional path segments from catch-all route, e.g. ["post", "27107"] */
  pathSegments?: string[];
};

export default function DeepLinkFallback({ pathSegments }: DeepLinkFallbackProps) {
  const pathnameFromRouter = usePathname();
  const searchParams = useSearchParams();
  const [isMobile, setIsMobile] = useState(false);
  const [os, setOs] = useState<MobileOS>('web');

  const pathname =
    pathSegments && pathSegments.length > 0
      ? `/app/${pathSegments.join('/')}`
      : pathnameFromRouter || '/app';
  const search = searchParams?.toString() ? `?${searchParams.toString()}` : '';

  const deepLink = buildDeepLink(pathname, search);
  const androidIntent = buildAndroidIntent(pathname, search);
  const openAppUrl = os === 'Android' ? androidIntent : deepLink;

  useEffect(() => {
    const detected = getMobileOS();
    setOs(detected);
    setIsMobile(detected !== 'web');

    if (detected === 'web') return;

    const target =
      detected === 'Android'
        ? buildAndroidIntent(pathname, search)
        : buildDeepLink(pathname, search);

    // Soft attempt: if the app is installed, the OS opens it.
    // If not, the user stays on this fallback page.
    window.location.href = target;
  }, [pathname, search]);

  return (
    <div className="flex flex-col items-center justify-center gap-8 my-4 p-4 text-center text-slate-700">
      {!isMobile && (
        <h1 className="text-2xl font-bold mb-4">Este link é exclusivo para uso em celulares</h1>
      )}

      <div className="flex flex-col items-center justify-center gap-2">
        <h1 className="text-xl font-bold">Ainda não baixou o App?</h1>
        <p className="text-sm text-slate-500">
          Faça o download do nosso App de acordo com o sistema do seu celular
        </p>
        <div className="flex flex-row items-center space-x-4 justify-center">
          <a
            href={APP_STORE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="transition-transform hover:scale-105"
          >
            <Image
              src="/images/app-store-badge.png"
              alt="Disponível na App Store"
              width={144}
              height={60}
            />
          </a>
          <a
            href={PLAY_STORE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="transition-transform hover:scale-105"
          >
            <Image
              src="/images/google-play-badge.png"
              alt="Disponível no Google Play"
              width={144}
              height={60}
            />
          </a>
        </div>
      </div>

      <Separator className="bg-slate-200" />

      {isMobile && (
        <div className="flex flex-col items-center justify-center gap-2">
          <h1 className="text-xl font-bold">Já possui o App do VOCA?</h1>
          <p className="text-sm text-slate-500">
            Você será redirecionado em instantes. Se preferir, clique no botão abaixo para abrir
            imediatamente.
          </p>
          <a
            href={openAppUrl}
            className="text-sm text-slate-500 border border-slate-400 font-bold py-2 px-10 rounded-md transition-all shadow-md hover:shadow-lg"
          >
            Abrir App VOCA
          </a>
          <p className="text-xs text-slate-400 italic">
            *Essa opção só funciona caso o aplicativo já esteja instalado no seu dispositivo
          </p>
        </div>
      )}
    </div>
  );
}
