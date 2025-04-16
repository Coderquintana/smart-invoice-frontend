import { useState } from "react";
import { Layout } from "../layout";
import axios from "axios";
import { toast } from "react-toastify";

export const UploadPage = () => {
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [invoiceId, setInvoiceId] = useState<number | null>(null);

  const handleUpload = async () => {
    if (!file) return;
    setUploading(true);

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await axios.post("http://localhost:8000/upload-invoice/", formData, {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      });
      console.log("Respuesta del backend:", response);
      setInvoiceId(response.data.id);
      toast.success("Factura subida correctamente");
    } catch (error) {
      console.error("Error al subir factura:", error);
      toast.error("Error al subir factura");
    } finally {
      setUploading(false);
    }
  };

  return (
    <Layout>
      <div className="max-w-xl mx-auto bg-white dark:bg-gray-800 p-6 rounded shadow">
        <h2 className="text-xl font-bold mb-4 text-gray-800 dark:text-white flex items-center gap-2">
          📄 Subir Factura
        </h2>
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setFile(e.target.files?.[0] || null)}
          className="mb-4 w-full px-4 py-2 border rounded dark:bg-gray-700 dark:text-white"
        />

        {file && (
          <div className="mb-4">
            <img
              src={URL.createObjectURL(file)}
              alt="Preview"
              className="rounded shadow w-full h-auto"
            />
          </div>
        )}

        <button
          onClick={handleUpload}
          className="w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white rounded"
          disabled={uploading}
        >
          {uploading ? "Subiendo..." : "Subir Factura"}
        </button>

        {invoiceId && (
          <p className="mt-4 text-green-600 dark:text-green-400">
            ✅ Factura procesada con ID: <strong>{invoiceId}</strong>
          </p>
        )}
      </div>
    </Layout>
  );
};
