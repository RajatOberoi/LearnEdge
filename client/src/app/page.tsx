import LandingPageNavbar from '@/components/LandingPageNavbar';
import Landing from '@/app/(Landing)/landing/page';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <div className='userlanding-layout'>
      <LandingPageNavbar />
      <div className='userlanding-layout__main'>
        <Landing />
      </div>
      <Footer />
    </div>
  );
}
