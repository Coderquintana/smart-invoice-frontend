import { Link } from "react-router-dom";
import { Layout } from "../layout";
import {
  FileText,
  UploadCloud,
  Users,
  Package,
  ShoppingCart
} from "lucide-react";

export const HomePage = () => {
  return (
    <Layout>
      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        <Link
          to="/invoices"
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-4 rounded shadow flex items-center justify-center gap-2"
        >
          <FileText className="w-5 h-5" /> Facturas de Proveedores
        </Link>
        <Link
          to="/upload"
          className="bg-green-600 hover:bg-green-700 text-white px-6 py-4 rounded shadow flex items-center justify-center gap-2"
        >
          <UploadCloud className="w-5 h-5" /> Subir Factura
        </Link>
        <Link
          to="/clients"
          className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-4 rounded shadow flex items-center justify-center gap-2"
        >
          <Users className="w-5 h-5" /> Clientes
        </Link>
        <Link
          to="/products"
          className="bg-yellow-500 hover:bg-yellow-600 text-white px-6 py-4 rounded shadow flex items-center justify-center gap-2"
        >
          <Package className="w-5 h-5" /> Productos
        </Link>
        <Link
          to="/sales"
          className="bg-red-500 hover:bg-red-600 text-white px-6 py-4 rounded shadow flex items-center justify-center gap-2"
        >
          <ShoppingCart className="w-5 h-5" /> Ventas
        </Link>
      </div>
    </Layout>
  );
};