import { FaHeart } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-offwhite py-8 mt-16">
      <div className="container mx-auto px-4 text-center">
        <p className="flex items-center justify-center text-verde-700">
          Feito com <FaHeart className="mx-1 text-verde-500" /> para Pedro & Geórgia
        </p>
        <p className="mt-2 text-gray-600">© {new Date().getFullYear()} - Nosso Grande Dia</p>
      </div>
    </footer>
  );
};

export default Footer;