import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

interface InvoiceItem {
  id: number;
  description: string;
  quantity: number;
  price: number;
}

interface Invoice {
  id: number;
  provider: string;
  total: number;
  date: string;
  items: InvoiceItem[];
}

export const InvoiceDetailPage = () => {
  const { id } = useParams();
  const [invoice, setInvoice] = useState<Invoice | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchInvoice = async () => {
      try {
        const res = await axios.get(`http://localhost:8000/invoices/${id}`);
        setInvoice(res.data);
      } catch (err) {
        toast.error("Error al cargar factura");
      } finally {
        setLoading(false);
      }
    };

    fetchInvoice();
  }, [id]);
  
  const handleDelete = async () => {
    if (!invoice) return;

    const confirmar = confirm("¿Estás seguro que querés eliminar esta factura?");
    if (!confirmar) return;

    try {
      await axios.delete(`http://localhost:8000/invoices/${invoice.id}`);
      toast.success("Factura eliminada correctamente");
      navigate("/");
    } catch (err) {
      console.error(err);
      toast.error("Error al eliminar la factura");
    }
  };

  const handleChange = (
    index: number,
    field: keyof InvoiceItem,
    value: string | number
  ) => {
    if (!invoice) return;
    const updatedItems = [...invoice.items];
    updatedItems[index] = { ...updatedItems[index], [field]: value };
    setInvoice({ ...invoice, items: updatedItems });
  };

  const handleSave = async () => {
    if (!invoice) return;
    setSaving(true);
    try {
      const payload = {
        items: invoice.items.map(({ description, quantity, price }) => ({
          description,
          quantity,
          price,
        })),
      };

      await axios.put(
        `http://localhost:8000/invoices/${invoice.id}/items`,
        payload
      );

      toast.success("Ítems actualizados correctamente");
    } catch (err) {
      console.error(err);
      toast.error("Error al guardar los cambios");
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <p className="p-4">Cargando...</p>;
  if (!invoice) return <p className="p-4">Factura no encontrada</p>;

  return (
    <div className="max-w-2xl mx-auto p-4 space-y-4">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">🧾 Factura #{invoice.id}</h1>
        <Link to="/" className="text-blue-600 hover:underline">← Volver</Link>
      </div>

      <div className="bg-white p-4 rounded shadow space-y-1">
        <p><strong>Proveedor:</strong> {invoice.provider}</p>
        <p><strong>Fecha:</strong> {invoice.date}</p>
        <p><strong>Total:</strong> {invoice.total.toFixed(2)} Gs</p>
      </div>

      <div>
        <h2 className="text-xl font-semibold mb-2">✏️ Editar Ítems</h2>
        <table className="w-full bg-white rounded shadow text-sm">
          <thead>
            <tr className="bg-gray-200 text-left">
              <th className="p-2">Descripción</th>
              <th className="p-2">Cantidad</th>
              <th className="p-2">Precio</th>
            </tr>
          </thead>
          <tbody>
            {invoice.items.map((item, index) => (
              <tr key={item.id} className="border-t">
                <td className="p-2">
                  <input
                    className="w-full border rounded p-1"
                    value={item.description}
                    onChange={(e) =>
                      handleChange(index, "description", e.target.value)
                    }
                  />
                </td>
                <td className="p-2">
                  <input
                    type="number"
                    className="w-full border rounded p-1"
                    value={item.quantity}
                    onChange={(e) =>
                      handleChange(index, "quantity", Number(e.target.value))
                    }
                  />
                </td>
                <td className="p-2">
                  <input
                    type="number"
                    className="w-full border rounded p-1"
                    value={item.price}
                    onChange={(e) =>
                      handleChange(index, "price", Number(e.target.value))
                    }
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <button
          onClick={handleSave}
          disabled={saving}
          className="mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          {saving ? "Guardando..." : "Guardar cambios"}
        </button>
        <button
          onClick={handleDelete}
          className="mt-2 bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
        >
          🗑️ Eliminar factura
        </button>
      </div>
    </div>
  );
  
};
