import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About Us | Micasa Doors',
  description: 'Learn about Micasa Doors Pvt. Ltd, our history, manufacturing excellence, and commitment to precision-engineered wooden doors and frames.',
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
