import Link from 'next/link';

const Footer = () => {
  return (
    <div className='footer'>
      <p>&copy; 2024</p>
      <div className='footer__links'>
        {['About', 'Go to', 'Contact'].map((item, index) => (
          <Link href={'/'} className='footer__link' key={index} scroll={false}>
            {item}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Footer;
