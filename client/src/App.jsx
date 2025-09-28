import { Route, Routes } from 'react-router-dom'
import { ToastContainer } from 'react-toastify';
import './App.css'
import Home from './pages/Home'
import ErrorPage from './pages/ErrorPage';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Shop from './pages/Shop';
import About from './pages/About';
import Contact from './pages/Contact';
import PrivacyPolicy from './pages/PrivacyPolicy';
import Login from './pages/Login';
import MyProfile from './pages/MyProfile';
import PartnerRegister from './pages/PartnerRegister';

function App() {
  return (
    <div className=' container mx-auto'>
      <ToastContainer />

      <Navbar />
      <Routes>
        <Route path="*" element={<ErrorPage />} />
        <Route path={'/'} element={<Home />} />
        <Route path={'/login'} element={<Login />} />
        <Route path={'/my-profile'} element={<MyProfile />} />
        <Route path={'/shop'} element={<Shop />} />
        <Route path={'/shop/:category'} element={<Shop />} />
        <Route path={'/about'} element={<About />} />
        <Route path={'/partner'} element={<PartnerRegister />} />
        <Route path={'/contact'} element={<Contact />} />
        <Route path={'/privacy-policy'} element={<PrivacyPolicy />} />
      </Routes>
      <Footer />

    </div>
  )
}

export default App
