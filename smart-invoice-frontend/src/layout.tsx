import { useState, useEffect, ReactNode } from "react";
import {
  FileText,
  Lock,
  Settings,
  ShoppingCart,
  SlidersHorizontal,
  UploadCloud,
  Users,
  Package,
  Menu,
  ArrowLeft
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ThemeToggle } from "./components/themetoggle";

interface LayoutProps {
  children: ReactNode;
}

export const Layout = ({ children }: LayoutProps) => {
  const [showSettings, setShowSettings] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const saved = localStorage.getItem("theme");
    if (saved === "dark") {
      document.documentElement.classList.add("dark");
    }
  }, []);

  const handleSidebarLinkClick = () => {
    if (window.innerWidth < 768) {
      setSidebarOpen(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row dark:bg-gray-900">
      {/* Top bar (mobile) */}
      <div className="md:hidden flex justify-between items-center p-4 bg-white dark:bg-gray-800 shadow-md">
        <button onClick={() => setSidebarOpen(!sidebarOpen)} className="text-gray-800 dark:text-white">
          <Menu className="w-6 h-6" />
        </button>
        <h1 className="text-lg font-semibold text-gray-800 dark:text-white">Smart Invoice</h1>
        <button
          onClick={() => navigate(-1)}
          className="px-3 py-1 bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-white rounded flex items-center gap-1 hover:bg-blue-200 dark:hover:bg-blue-800 text-sm"
        >
          <ArrowLeft className="w-4 h-4" /> Volver
        </button>
      </div>

      {/* Sidebar con animación */}
      <AnimatePresence>
        {(sidebarOpen || window.innerWidth >= 768) && (
          <motion.div
            initial={{ x: -300 }}
            animate={{ x: 0 }}
            exit={{ x: -300 }}
            transition={{ duration: 0.2 }}
            className="md:block w-64 bg-white dark:bg-gray-800 p-6 shadow-lg z-20 fixed md:relative md:z-0"
          >
            <h2 className="text-xl font-bold mb-6 text-gray-800 dark:text-white flex items-center gap-2">
              <FileText className="w-6 h-6" /> Menú
            </h2>
            <nav className="flex flex-col gap-3">
              <Link to="/invoices" onClick={handleSidebarLinkClick} className="text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-2">
                <FileText className="w-5 h-5" /> Facturas
              </Link>
              <Link to="/upload" onClick={handleSidebarLinkClick} className="text-green-600 dark:text-green-400 hover:underline flex items-center gap-2">
                <UploadCloud className="w-5 h-5" /> Subir Factura
              </Link>
              <Link to="/clients" onClick={handleSidebarLinkClick} className="text-purple-600 dark:text-purple-400 hover:underline flex items-center gap-2">
                <Users className="w-5 h-5" /> Clientes
              </Link>
              <Link to="/products" onClick={handleSidebarLinkClick} className="text-yellow-600 dark:text-yellow-400 hover:underline flex items-center gap-2">
                <Package className="w-5 h-5" /> Productos
              </Link>
              <Link to="/sales" onClick={handleSidebarLinkClick} className="text-red-600 dark:text-red-400 hover:underline flex items-center gap-2">
                <ShoppingCart className="w-5 h-5" /> Ventas
              </Link>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main content */}
      <div className="flex-1 p-6 md:ml-64">
        <div className="hidden md:flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold text-gray-800 dark:text-white flex items-center gap-2">
            <FileText className="w-6 h-6" /> Smart Invoice
          </h1>
          <div className="relative">
            <button
              onClick={() => setShowSettings(!showSettings)}
              className="text-sm px-3 py-2 bg-gray-200 dark:bg-gray-700 rounded hover:bg-gray-300 dark:hover:bg-gray-600 flex items-center gap-1"
            >
              <Settings className="w-4 h-4" /> Configuración
            </button>
            <AnimatePresence>
              {showSettings && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="absolute right-0 mt-2 w-56 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded shadow-md z-10 p-2"
                >
                  <ul className="space-y-2">
                    <li>
                      <ThemeToggle />
                    </li>
                    <li className="text-sm px-2 py-1 rounded hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer flex items-center gap-2">
                      <SlidersHorizontal className="w-4 h-4" /> Preferencias
                    </li>
                    <li className="text-sm px-2 py-1 rounded hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer flex items-center gap-2">
                      <Lock className="w-4 h-4" /> Seguridad
                    </li>
                  </ul>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {children}
      </div>
    </div>
  );
};
