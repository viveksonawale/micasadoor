import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Manufacturing Facility & Process | Micasa Doors',
  description: 'Discover the advanced manufacturing processes and facility behind Micasa Doors Pvt. Ltd precision-engineered wooden doors.',
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
