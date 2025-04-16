import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";


interface Invoice {
  id: number;
  date: string;
  provider?: string; // opcional si aún no tenés este campo
}

export const HomePage = () => {
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchInvoices = async () => {
      try {
        const res = await axios.get("http://localhost:8000/invoices/");
        setInvoices(res.data);
      } catch (err) {
        toast.error("Error al obtener facturas");
      } finally {
        setLoading(false);
      }
    };

    fetchInvoices();
  }, []);

  return (
    <div className="max-w-3xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">📋 Facturas Cargadas</h1>

      <div className="mb-4">
        <Link to="/upload" className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">
          + Subir nueva factura
        </Link>
      </div>

      {loading ? (
        <p>Cargando...</p>
      ) : invoices.length === 0 ? (
        <p>No hay facturas cargadas.</p>
      ) : (
        <table className="w-full bg-white shadow rounded">
          <thead>
            <tr className="bg-gray-200 text-left">
              <th className="p-2">ID</th>
              <th className="p-2">Fecha</th>
              <th className="p-2">Proveedor</th>
              <th className="p-2">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {invoices.map((inv) => (
              <tr key={inv.id} className="border-t">
                <td className="p-2">{inv.id}</td>
                <td className="p-2">{inv.date}</td>
                <td className="p-2">{inv.provider || "N/D"}</td>
                <td className="p-2 space-x-2">
                  <Link to={`/invoices/${inv.id}`} className="text-blue-600 hover:underline">
                    Ver
                  </Link>
                  {/* Futuro: botón eliminar aquí */}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};
