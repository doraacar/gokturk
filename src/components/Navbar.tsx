import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X, Shield, LogOut } from 'lucide-react';
import { useAdmin } from '../context/AdminContext';
import AdminLoginModal from './AdminLoginModal';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { isAdmin, logout } = useAdmin();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setIsMobileMenuOpen(false);

    if (href === '/') {
      if (location.pathname === '/') {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else {
        navigate('/');
        setTimeout(() => {
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }, 100);
      }
    } else if (href.startsWith('/#')) {
      const sectionId = href.substring(2);

      if (location.pathname === '/') {
        const element = document.getElementById(sectionId);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      } else {
        navigate('/');
        setTimeout(() => {
          const element = document.getElementById(sectionId);
          if (element) {
            element.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }
        }, 100);
      }
    } else {
      navigate(href);
    }
  };

  const navLinks = [
    { name: 'Anasayfa', href: '/' },
    { name: 'Hakkımızda', href: '/#hakkimizda' },
    { name: 'Hizmetlerimiz', href: '/#hizmetlerimiz' },
    { name: 'İlanlar', href: '/ilanlar' },
    { name: 'İletişim', href: '/#iletisim' },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-200 ${
        isScrolled
          ? 'bg-white shadow-sm border-b border-gray-200'
          : 'bg-white/95 backdrop-blur-sm'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <Link to="/" className="flex items-center gap-3 flex-shrink-0">
            <img
              src="/gokturk_gyo.jpg"
              alt="Göktürk GYO Logo"
              className="h-12 w-12 md:h-14 md:w-14 rounded-full object-cover"
            />
            <span className="text-xl md:text-2xl font-semibold text-[#1A1A1A]">
              Göktürk GYO
            </span>
          </Link>

          <div className="hidden md:flex flex-1 justify-center space-x-8">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className="text-[#1A1A1A] hover:text-[#B22222] transition-colors duration-150 font-medium cursor-pointer"
              >
                {link.name}
              </a>
            ))}
          </div>

          <div className="hidden md:flex items-center gap-4">
            <a
              href="tel:+902121234567"
              className="text-[#1A1A1A] hover:text-[#B22222] transition-colors duration-150 font-medium"
            >
              +90 212 123 45 67
            </a>

            {isAdmin ? (
              <div className="flex items-center gap-2">
                <button
                  onClick={() => navigate('/admin')}
                  className="flex items-center gap-2 px-4 py-2 bg-[#B22222] text-white rounded-lg hover:bg-[#9B1C1C] transition-colors"
                >
                  <Shield size={18} />
                  <span className="font-medium">Admin Panel</span>
                </button>
                <button
                  onClick={logout}
                  className="flex items-center gap-2 px-4 py-2 border-2 border-[#B22222] text-[#B22222] rounded-lg hover:bg-[#B22222] hover:text-white transition-colors"
                >
                  <LogOut size={18} />
                </button>
              </div>
            ) : (
              <button
                onClick={() => setShowLoginModal(true)}
                className="flex items-center gap-2 px-4 py-2 bg-[#B22222] text-white rounded-lg hover:bg-[#9B1C1C] transition-colors"
              >
                <Shield size={18} />
                <span className="font-medium">Admin</span>
              </button>
            )}
          </div>

          <button
            className="md:hidden text-[#1A1A1A]"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {isMobileMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-200">
          <div className="px-4 py-6 space-y-4">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className="block text-[#1A1A1A] hover:text-[#B22222] transition-colors duration-150 font-medium text-lg cursor-pointer"
              >
                {link.name}
              </a>
            ))}
            {isAdmin ? (
              <>
                <button
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    navigate('/admin');
                  }}
                  className="flex items-center gap-2 w-full px-4 py-2 bg-[#B22222] text-white rounded-lg hover:bg-[#9B1C1C] transition-colors"
                >
                  <Shield size={18} />
                  <span className="font-medium">Admin Panel</span>
                </button>
                <button
                  onClick={() => {
                    logout();
                    setIsMobileMenuOpen(false);
                  }}
                  className="flex items-center gap-2 w-full px-4 py-2 border-2 border-[#B22222] text-[#B22222] rounded-lg hover:bg-[#B22222] hover:text-white transition-colors"
                >
                  <LogOut size={18} />
                  <span className="font-medium">Çıkış Yap</span>
                </button>
              </>
            ) : (
              <button
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  setShowLoginModal(true);
                }}
                className="flex items-center gap-2 w-full px-4 py-2 bg-[#B22222] text-white rounded-lg hover:bg-[#9B1C1C] transition-colors"
              >
                <Shield size={18} />
                <span className="font-medium">Admin</span>
              </button>
            )}
          </div>
        </div>
      )}

      <AdminLoginModal isOpen={showLoginModal} onClose={() => setShowLoginModal(false)} />
    </nav>
  );
}
