'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Image from 'next/image';

export default function Redirect() {
  const params = useParams();
  // const path = params.path as string;
  const [isMobile, setIsMobile] = useState(true)
  const [playStoreUrl, setPlayStoreUrl] = useState('https://play.google.com/store/apps/details?id=voca.app');
  const [appStoreUrl, setAppStoreUrl] = useState('https://apps.apple.com/br/app/voca/id1438359659');
  let destinationUrl = "https://www.voca.com.br/app";

  useEffect(() => {
    // Função para detectar o sistema operacional
    const getMobileOS = () => {
      const userAgent = navigator.userAgent || (window as any).opera;

      if (/android/i.test(userAgent)) {
        return 'Android';
      }

      if (/iPad|iPhone|iPod/.test(userAgent) && !(window as any).MSStream) {
        return 'iOS';
      }

      return 'web';
    };

    const os = getMobileOS();
    // URLs para cada plataforma
    if (os === 'web') {
      setIsMobile(false)
    } else if (os === 'Android') {
      destinationUrl = `voca.app://`;
    } else if (os === 'iOS') {
      destinationUrl = `com.vijja.voca.app://`;
    }

    if (os !== 'web') {
      window.location.href = destinationUrl;
    }
  }, []);

  return (
    <div className="flex flex-col items-center justify-center  p-4 text-center">

      {!isMobile && (
        <h1 className="text-2xl font-bold mb-4">Este link é exclusivo para uso em celulares</h1>
      )}

      <h1 className='text-xl font-bold'>Ainda não baixou o App?</h1>
      <p className="mb-4">Faça o download do nosso App de acordo com o sistema do seu celular</p>
      <div className="flex flex-row items-center space-x-4 justify-center">
        <a
          href={appStoreUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="transition-transform hover:scale-105"
        >
          <Image
            src="/images/app-store-badge.png"
            alt="Disponível na App Store"
            width={120}
            height={50}
          />
        </a>
        <a
          href={playStoreUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="transition-transform hover:scale-105"
        >
          <Image
            src="/images/google-play-badge.png"
            alt="Disponível no Google Play"
            width={120}
            height={50}
          />
        </a>
      </div>

      {isMobile && (
        <div className='flex flex-col items-center justify-center mt-8 mb-4'>
          <h1 className='text-xl font-bold'>Já possui o App do VOCA?</h1>
          <p className="mb-4">Você será redirecionado em instantes. Se preferir, clique no botão abaixo para abrir imediatamente.</p>
          <button
            onClick={() => { window.location.href = destinationUrl }}
            className="mb-4 text-voca-green border border-voca-green font-bold py-3 px-6 rounded-lg transition-all shadow-md hover:shadow-lg"
          >
            Abrir VOCA
          </button>
          <p className="mb-4 text-xs text-gray-500 italic">*Essa opção só funciona caso o aplicativo já esteja instalado no seu dispositivo</p>
        </div>
      )}
    </div>
  );
} 