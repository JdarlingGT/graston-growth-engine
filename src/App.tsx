import { BrowserRouter as Router, Routes, Route, Outlet } from 'react-router-dom';
import { AuthProvider } from './hooks/useAuth';
import NavBar from './components/NavBar';
import FindProviderPage from './pages/FindProviderPage';
import ProviderProfilePage from './pages/ProviderProfilePage';

// Placeholder components for routes
const AboutPage = () => <div className="p-8">About Us</div>;
const ContactPage = () => <div className="p-8">Contact Us</div>;
const AdminPage = () => <div className="p-8">Admin Dashboard</div>;

const AppLayout = () => (
  <>
    <NavBar />
    <main>
      <Outlet />
    </main>
  </>
);

function App() {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route element={<AppLayout />}>
            <Route path="/" element={<FindProviderPage />} />
            <Route path="/provider/:providerId" element={<ProviderProfilePage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/admin" element={<AdminPage />} />
          </Route>
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;