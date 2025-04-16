import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

export const UploadPage = () => {
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = e.target.files?.[0];
    if (selected) {
      setFile(selected);
      setPreview(URL.createObjectURL(selected));
    }
  };

  const handleSubmit = async () => {
    if (!file) return;
  
    const formData = new FormData();
    formData.append("file", file);
  
    setLoading(true);
    try {
      const res = await axios.post("http://localhost:8000/upload-invoice/", formData, {
        headers: { "Content-Type": "multipart/form-data" },
        validateStatus: (status) => status < 400,
      });
  
      setResult(res.data);
      toast.success("✅ Factura subida correctamente");
    } catch (err) {
      console.error("Error al subir factura:", err);
      toast.error("❌ Error al subir factura");
    } finally {
      setLoading(false);
    }
  };
  

  return (
    <div className="max-w-md mx-auto p-4 space-y-4">
      <h1 className="text-2xl font-bold text-center">📤 Subir Factura</h1>

      <input
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className="w-full p-2 border rounded"
      />

      {preview && (
        <img
          src={preview}
          alt="Preview"
          className="w-full h-auto rounded border"
        />
      )}

      <button
        onClick={handleSubmit}
        disabled={loading}
        className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
      >
        {loading ? "Subiendo..." : "Subir Factura"}
      </button>

      {result && (
        <div className="bg-green-100 p-2 rounded mt-2">
          ✅ Factura procesada con ID: <strong>{result.invoice_id}</strong>
        </div>
      )}
    </div>
  );
};
