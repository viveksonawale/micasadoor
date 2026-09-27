import { Metadata } from 'next';
import { FRAMES } from '../../../lib/framesData';

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const frame = FRAMES.find((f) => f.slug === params.slug);
  if (!frame) {
    return { title: 'Frame Details' };
  }
  return {
    title: `${frame.name} | Micasa Frames`,
    description: frame.seo?.description || frame.description || `Learn more about the ${frame.name} frame from Micasa Doors Pvt. Ltd.`,
  };
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
