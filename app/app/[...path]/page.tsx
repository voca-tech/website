import { Suspense } from 'react';
import DeepLinkFallback from '@/components/DeepLinkFallback';

type AppDeepLinkPageProps = {
  params: {
    path: string[];
  };
};

export default function AppDeepLinkPage({ params }: AppDeepLinkPageProps) {
  return (
    <Suspense fallback={null}>
      <DeepLinkFallback pathSegments={params.path} />
    </Suspense>
  );
}
