import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { Layout } from "../layout";

interface Invoice {
  id: number;
  date: string;
  provider: string;
}

export const InvoiceListPage = () => {
  const [invoices, setInvoices] = useState<Invoice[]>([]);

  useEffect(() => {
    axios.get("http://localhost:8000/invoices/").then((res) => {
      setInvoices(res.data);
    });
  }, []);

  return (
    <Layout>
      <div className="bg-white dark:bg-gray-800 p-6 rounded shadow max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-gray-800 dark:text-white flex items-center gap-2">
            📄 Facturas Cargadas
          </h2>
          <Link
            to="/upload"
            className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded"
          >
            + Subir nueva factura
          </Link>
        </div>

        <table className="w-full text-left border border-gray-300 dark:border-gray-700">
          <thead className="bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-white">
            <tr>
              <th className="p-2 border">ID</th>
              <th className="p-2 border">Fecha</th>
              <th className="p-2 border">Proveedor</th>
              <th className="p-2 border">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {invoices.map((invoice) => (
              <tr key={invoice.id} className="hover:bg-gray-50 dark:hover:bg-gray-600">
                <td className="p-2 border">{invoice.id}</td>
                <td className="p-2 border">{invoice.date}</td>
                <td className="p-2 border">{invoice.provider || "N/D"}</td>
                <td className="p-2 border text-blue-600 dark:text-blue-400">
                  <Link to={`/invoices/${invoice.id}`}>Ver</Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Layout>
  );
};
