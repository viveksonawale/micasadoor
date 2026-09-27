import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Product Range | Wooden Doors & Frames | Micasa',
  description: 'Browse the complete range of products by Micasa Doors Pvt. Ltd, including solid timber doors, engineered frames, and fire-rated solutions.',
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
