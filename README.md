# 📲 Smart Invoice Frontend

Frontend en React + Vite para el sistema de facturación inteligente.

## 🧰 Stack Tecnológico

- ⚛️ React 18
- ⚡ Vite
- 💨 TailwindCSS
- 🔗 Axios
- 🍞 React Toastify

## 🧪 Funcionalidades

- 📷 Subida de facturas desde el celular o escritorio
- 🧾 Vista de detalle de facturas
- ✏️ Edición de ítems
- ❌ Eliminación de facturas
- ✅ Notificaciones visuales (toast)

## 🚀 Comandos

```bash
npm install       # Instalar dependencias
npm run dev       # Correr en modo desarrollo
npm run build     # Compilar para producción
```

## 📦 Requisitos
Backend debe estar corriendo en: - http://localhost:8000

## 🔄 Endpoints utilizados
- POST /upload-invoice/ – Subir factura
- GET /invoices/ – Obtener lista
- GET /invoices/:id – Ver detalles
- PUT /invoices/:id/items – Actualizar ítems
- DELETE /invoices/:id – Eliminar factura