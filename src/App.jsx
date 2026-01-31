import { BrowserRouter, Routes, Route } from 'react-router-dom'
import ScrollToTop from './components/ScrollToTop'
import { ThemeProvider } from "./context/ThemeProvider";
import { AuthProvider } from './context/AuthProvider';
import Layout from "./Layout/Layout";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import NotFound from "./pages/NotFound";
import Login from './pages/AuthPages/Login';
import SignUp from './pages/AuthPages/SignUp';
import EmailVerification from './pages/AuthPages/EmailVerification';
import ForgotPassword from './pages/AuthPages/ForgotPassword';
import UptadePassword from './pages/AuthPages/UptadePassword';
import AdminPage from './pages/AdminPage';
import Storage from './pages/Storage';
import ProductId from './pages/ProductId';
import TerminosyCondiciones from './pages/TerminosyCondiciones';
import { CartProvider } from './context/CartProvider';
import MyOrders from './pages/MyOrders';
import CheckoutPage from './pages/ChekoutPage';
import UnverifiedRoute from './pages/ProtectRoutes/UnverifiedRoute';
import GuestRoute from './pages/ProtectRoutes/GuestRoute';
import ProtectedRoute from './pages/ProtectRoutes/ProtectedRoute';
import EditProfile from './pages/EditProfile';
import NotificationsPage from './pages/NotificationsPage';
import CheckoutSuccess from './pages/CheckoutSuccess';
import CheckoutFailure from './pages/CheckoutFailure';
import { ProductsProvider } from './context/ProductProvider';

function App() {
  return (

   <BrowserRouter>
   <ScrollToTop/>
   <ThemeProvider>
      <AuthProvider>
        <ProductsProvider>
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
                  <Route element={<UnverifiedRoute />}>
                    <Route path="/verification-email" element={<EmailVerification />} />
                 </Route>
                   <Route path="/storage" element={<Storage />} />
                   <Route path="/product/:id" element={<ProductId />} />
                  <Route path="/terminosycondiciones" element={<TerminosyCondiciones/>} />

                  <Route element={<ProtectedRoute />}>
                          <Route path='/profile' element={<Profile/>} />   
                          <Route path="/edit-profile" element={<EditProfile />} />
                          <Route path="/my-orders" element={<MyOrders />} />
                          <Route path="/checkout" element={<CheckoutPage />} />
                          <Route path="/notifications" element={<NotificationsPage />} />
                           <Route path="/checkout/success" element={<CheckoutSuccess />} />
                          <Route path="/checkout/failure" element={<CheckoutFailure />} />
                  </Route>

                  <Route element={<ProtectedRoute adminOnly={true} />}>
                   <Route path="/admin-dashboard" element={<AdminPage />} />
                  </Route>

                  <Route path="*" element={<NotFound />} />
              </Route>
          </Routes>
          </CartProvider>
          </ProductsProvider>
      </AuthProvider>
   </ThemeProvider>
   </BrowserRouter>
  )
}

export default App
