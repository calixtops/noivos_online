import Link from 'next/link';
import { useRouter } from 'next/router';
import { motion } from 'framer-motion';

const Header = () => {
  const router = useRouter();
  
  const navItems = [
    { path: '/', label: 'Home' },
    { path: '/historia', label: 'Nossa História' },
    { path: '/programacao', label: 'Programação' },
    { path: '/presentes', label: 'Presentes' },
    { path: '/contato', label: 'Contato' },
  ];

  return (
    <header className="bg-white/80 backdrop-blur-sm sticky top-0 z-50 shadow-sm">
      <div className="container mx-auto px-4 py-4 flex flex-col md:flex-row justify-between items-center">
        <Link href="/" className="text-2xl font-serif text-rose-600 mb-2 md:mb-0">
          Geórgia & Pedro
        </Link>
        
        <nav className="w-full md:w-auto">
          <ul className="flex flex-wrap justify-center md:justify-end space-x-4 md:space-x-6">
            {navItems.map((item) => (
              <li key={item.path}>
                <Link href={item.path}>
                  <span className={`cursor-pointer hover:text-rose-600 transition-colors ${
                    router.pathname === item.path 
                      ? 'text-rose-600 font-medium border-b-2 border-rose-400' 
                      : 'text-gray-700'
                  }`}>
                    {item.label}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
