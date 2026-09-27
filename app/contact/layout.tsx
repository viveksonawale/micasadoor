import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Contact Us | Micasa Doors Pvt. Ltd.',
  description: 'Get in touch with Micasa Doors Pvt. Ltd for inquiries, project consultations, and custom wooden door requirements.',
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
