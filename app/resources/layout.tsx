import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Technical Data & Resources | Micasa Doors',
  description: 'Access product catalogues, technical specifications, and installation guides for Micasa Doors Pvt. Ltd products.',
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
