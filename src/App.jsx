import { BrowserRouter, Routes, Route } from 'react-router-dom'
import ScrollToTop from './components/ScrollToTop'
import { ThemeProvider } from "./context/ThemeProvider";
import { AuthProvider } from './context/AuthProvider';
import Layout from "./Layout/Layout";
import Home from "./pages/Home";
import ProtectedRoute from "./components/ProtectedRoute"; 
import Profile from "./pages/Profile";
import NotFound from "./pages/NotFound";
import Login from './pages/AuthPages/Login';
import SignUp from './pages/AuthPages/SignUp';
import GuestRoute from './components/GuestRoute';
import EmailVerification from './pages/AuthPages/EmailVerification';
import ForgotPassword from './pages/AuthPages/ForgotPassword';
import UptadePassword from './pages/AuthPages/UptadePassword';
import AdminPage from './pages/AdminPage';
import Storage from './pages/Storage';
import ProductId from './pages/ProductId';
import TerminosyCondiciones from './pages/TerminosyCondiciones';
import { CartProvider } from './context/CartProvider';

function App() {
  return (

   <BrowserRouter>
   <ScrollToTop/>
   <ThemeProvider>
      <AuthProvider>
      <CartProvider>
          <Routes>
              <Route  path="/" element={<Layout />}>
                  <Route index element={<Home />} />
                  <Route element={<GuestRoute />}>
                    <Route path="/login" element={<Login />} />
                    <Route path="/signup" element={<SignUp />} />
                    <Route path="/forgot-password" element={<ForgotPassword />} />
                  </Route>
                    <Route path="/update-password/:token" element={<UptadePassword />} />
                    <Route path="/verification-email" element={<EmailVerification />} />
                   <Route path="/storage" element={<Storage />} />
                   <Route path="/product/:id" element={<ProductId />} />
                  <Route path="/terminosycondiciones" element={<TerminosyCondiciones/>} />

                  <Route element={<ProtectedRoute />}>
                          <Route path='/profile' element={<Profile/>} />   
                  </Route>

                  <Route element={<ProtectedRoute adminOnly={true} />}>
                   <Route path="/admin-dashboard" element={<AdminPage />} />
                  </Route>

                  <Route path="*" element={<NotFound />} />
              </Route>
          </Routes>
      </CartProvider>
      </AuthProvider>
   </ThemeProvider>
   </BrowserRouter>
  )
}

export default App
