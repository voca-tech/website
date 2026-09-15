import { Suspense } from 'react';
import DeepLinkFallback from '@/components/DeepLinkFallback';

export default function AppRedirectPage() {
  return (
    <Suspense fallback={null}>
      <DeepLinkFallback />
    </Suspense>
  );
}
