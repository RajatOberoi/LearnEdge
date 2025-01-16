import LandingPageNavbar from '@/components/LandingPageNavbar';
import Footer from '@/components/Footer';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className='userlanding-layout'>
      <LandingPageNavbar />
      <div className='userlanding-layout__main'>{children}</div>
      <Footer />
    </div>
  );
}
