import { Metadata } from 'next';
import { DOORS } from '../../../lib/doorsData';

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const door = DOORS.find((d) => d.slug === params.slug);
  if (!door) {
    return { title: 'Door Details' };
  }
  return {
    title: `${door.name} | Micasa Doors`,
    description: door.description || `Learn more about the ${door.name} door from Micasa Doors Pvt. Ltd.`,
  };
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
