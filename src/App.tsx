import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./components/layout/Layout";
import Index from "./pages/Index";
import About from "./pages/About";
import ProviderDetail from "./pages/ProviderDetail";
import AdminLayout from "./components/layout/AdminLayout";
import AdminPage from "./pages/admin/DashboardPage";
import ProvidersPage from "./pages/admin/ProvidersPage";
import AiAssistantPage from "./pages/admin/AiAssistantPage";
import AnalyticsPage from "./pages/admin/AnalyticsPage";
import "./App.css";

// For now, we'll create a placeholder ProtectedRoute.
// In a real app, this would check for authentication.
const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  return <>{children}</>;
};

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Index />} />
          <Route path="about" element={<About />} />
          <Route path="providers/:providerId" element={<ProviderDetail />} />
          <Route path="admin" element={<ProtectedRoute><AdminLayout /></ProtectedRoute>}>
            <Route index element={<AdminPage />} />
            <Route path="providers" element={<ProvidersPage />} />
            <Route path="ai-assistant" element={<AiAssistantPage />} />
            <Route path="analytics" element={<AnalyticsPage />} />
          </Route>
        </Route>
      </Routes>
    </Router>
  );
}

export default App;