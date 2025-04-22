// 'use client';

// import { useEffect, useState } from 'react';
// import { useParams } from 'next/navigation';
// import Image from 'next/image';

export default function AppPage() {
  return null;


  // const params = useParams();
  // // const path = params.path as string;
  // const [isMobile, setIsMobile] = useState(true)
  // const [playStoreUrl, setPlayStoreUrl] = useState('https://play.google.com/store/apps/details?id=voca.app');
  // const [appStoreUrl, setAppStoreUrl] = useState('https://apps.apple.com/br/app/voca/id1438359659');

  // useEffect(() => {
  //   // Função para detectar o sistema operacional
  //   const getMobileOS = () => {
  //     const userAgent = navigator.userAgent || (window as any).opera;

  //     if (/android/i.test(userAgent)) {
  //       return 'Android';
  //     }

  //     if (/iPad|iPhone|iPod/.test(userAgent) && !(window as any).MSStream) {
  //       return 'iOS';
  //     }

  //     return 'web';
  //   };

  //   const os = getMobileOS();
  //   let destinationUrl = "https://www.voca.com.br/app";

  //   // URLs para cada plataforma
  //   if (os === 'web') {
  //     setIsMobile(false)
  //   } else if (os === 'Android') {
  //     // Tenta abrir o app com scheme primeiro
  //     destinationUrl = `voca://`;

  //     // Após um timeout, redireciona para Google Play se o app não abrir
  //     // setTimeout(() => {
  //     //   window.location.href = playStoreUrl;
  //     // }, 1000);
  //   } else if (os === 'iOS') {
  //     // Tenta abrir o app com scheme primeiro
  //     destinationUrl = `voca://`;

  //     // Após um timeout, redireciona para App Store se o app não abrir
  //     // setTimeout(() => {
  //     //   // URL para produção
  //     //   window.location.href = appStoreUrl;
  //     // }, 1000);
  //   }

  //   if (os !== 'web') {
  //     // window.location.href = destinationUrl;
  //   }
  // }, [playStoreUrl, appStoreUrl]);

  // return (
  //   <div className="flex flex-col items-center justify-center h-screen p-4 text-center">
  //     {isMobile ? (
  //       <>
  //         <h1 className="text-2xl font-bold mb-4">Redirecionando...</h1>
  //         <p className="mb-8">Você será redirecionado para o aplicativo VOCA em instantes.</p>
  //         <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-teal-500"></div>
  //       </>
  //     ) : (
  //       <>
  //         <h1 className="text-2xl font-bold mb-4">Este link é exclusivo para uso em celulares</h1>
  //         <p className="mb-8">Baixe o aplicativo VOCA em seu dispositivo móvel:</p>
  //         <div className="flex flex-row items-center space-x-4 justify-center">
  //           <a
  //             href={appStoreUrl}
  //             target="_blank"
  //             rel="noopener noreferrer"
  //             className="transition-transform hover:scale-105"
  //           >
  //             <Image
  //               src="/images/app-store-badge.png"
  //               alt="Disponível na App Store"
  //               width={120}
  //               height={40}
  //             />
  //           </a>
  //           <a
  //             href={playStoreUrl}
  //             target="_blank"
  //             rel="noopener noreferrer"
  //             className="transition-transform hover:scale-105"
  //           >
  //             <Image
  //               src="/images/google-play-badge.png"
  //               alt="Disponível no Google Play"
  //               width={135}
  //               height={50}
  //             />
  //           </a>
  //         </div>
  //       </>
  //     )}
  //   </div>
  // );
} 