import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Fire Rated Doors & Solutions | Micasa',
  description: 'Explore certified fire-rated wooden doors by Micasa Doors Pvt. Ltd, designed for safety, compliance, and aesthetic integration.',
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
