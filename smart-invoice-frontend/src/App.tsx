import { Routes, Route } from "react-router-dom";
import { HomePage } from "./pages/HomePage";
import { UploadPage } from "./pages/UploadPage";
import { InvoiceListPage } from "./pages/InvoiceListPage";
import { InvoiceDetailPage } from "./pages/InvoiceDetailPage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/upload" element={<UploadPage />} />
      <Route path="/invoices" element={<InvoiceListPage />} />
      <Route path="/invoices/:id" element={<InvoiceDetailPage />} />
    </Routes>
  );
}


export default App;
