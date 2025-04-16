import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Layout } from "../layout";

interface InvoiceItem {
  id: number;
  description: string;
  quantity: number;
  price: number;
}

interface Invoice {
  id: number;
  date: string;
  provider: string;
  total: number;
  items: InvoiceItem[];
}

export const InvoiceDetailPage = () => {
  const { id } = useParams();
  const [invoice, setInvoice] = useState<Invoice | null>(null);

  useEffect(() => {
    axios.get(`http://localhost:8000/invoices/${id}`).then((res) => {
      setInvoice(res.data);
    });
  }, [id]);

  return (
    <Layout>
      <div className="bg-white dark:bg-gray-800 p-6 rounded shadow max-w-4xl mx-auto">
        <h2 className="text-xl font-bold mb-4 text-gray-800 dark:text-white">
          Detalle de Factura #{invoice?.id}
        </h2>

        {invoice ? (
          <>
            <p className="mb-2 text-gray-700 dark:text-gray-300">
              <strong>Fecha:</strong> {invoice.date}
            </p>
            <p className="mb-2 text-gray-700 dark:text-gray-300">
              <strong>Proveedor:</strong> {invoice.provider}
            </p>
            <p className="mb-4 text-gray-700 dark:text-gray-300">
              <strong>Total:</strong> {invoice.total.toFixed(2)}
            </p>

            <h3 className="text-lg font-semibold mb-2 text-gray-800 dark:text-white">
              Ítems
            </h3>
            <table className="w-full text-left border border-gray-300 dark:border-gray-700">
              <thead className="bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-white">
                <tr>
                  <th className="p-2 border">Descripción</th>
                  <th className="p-2 border">Cantidad</th>
                  <th className="p-2 border">Precio</th>
                </tr>
              </thead>
              <tbody>
                {invoice.items.map((item) => (
                  <tr key={item.id} className="hover:bg-gray-50 dark:hover:bg-gray-600">
                    <td className="p-2 border">{item.description}</td>
                    <td className="p-2 border">{item.quantity}</td>
                    <td className="p-2 border">{item.price.toFixed(2)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </>
        ) : (
          <p className="text-gray-500 dark:text-gray-400">Cargando...</p>
        )}
      </div>
    </Layout>
  );
};
