import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Our Projects | Micasa Doors Portfolio',
  description: 'Explore the portfolio of projects by Micasa Doors Pvt. Ltd. See our premium wooden doors and frames installed in various architectural spaces.',
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
