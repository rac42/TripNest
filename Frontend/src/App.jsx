import { Routes, Route, useLocation } from 'react-router-dom';
import './App.css';
import Home from './Pages/Home';
import ContactUs from './Pages/ContactUs';
import BookNow from './Pages/BookNow';
import AddDetails from './Pages/AddDetails'; // Import the AddDetails component
import Navbar from './Components/Navbar';
import Footer from './Components/Footer';
import LoginPage from './Pages/LoginPage';
import SignUp from './Pages/SignUp';
import SummaryPage from './Pages/SummaryPage';

function App() {
  const location = useLocation();
  const isAuthPage = location.pathname === '/login' || location.pathname === '/signup';

  return (
    <>
      {!isAuthPage && <Navbar />}

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/contact-us" element={<ContactUs />} />
        <Route path="/searchFlights" element={<BookNow />} />
        <Route path="/searchFlights/adddetails" element={<AddDetails />} /> {/* Nested route for AddDetails */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/searchFlights/adddetails/summarypage" element={<SummaryPage></SummaryPage>}></Route>
      </Routes>

      {!isAuthPage && <Footer />}
    </>
  );
}

export default App;
