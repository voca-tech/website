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
      {isMobile ? (
        <div className='flex flex-col items-center justify-center mb-8'>
          <h1 className="text-2xl font-bold mb-4">Redirecionando...</h1>
          <p className="mb-1">Você será redirecionado para o aplicativo VOCA em instantes.</p>
          <p className="text-sm mb-1">Caso não for redirecionado, clique no botão abaixo para abrir o aplicativo</p>
          <button
            onClick={() => { window.location.href = destinationUrl }}
            className=" bg-voca-green hover:bg-teal-600 text-white font-bold py-3 px-6 rounded-lg transition-all shadow-md hover:shadow-lg"
          >
            Abrir VOCA
          </button>
        </div>
      )
        : (
          <h1 className="text-2xl font-bold mb-4">Este link é exclusivo para uso em celulares</h1>
        )
      }

      <p className="mb-8">Baixe o aplicativo VOCA em seu dispositivo móvel:</p>
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
    </div>
  );
} 