import Footer from './components/footer/Footer';
import Header from './components/header/Header';
import Navbar from './components/navbar/Navbar';
import { Outlet, useLocation } from 'react-router-dom';
import { ReactNotifications } from 'react-notifications-component';
import 'react-notifications-component/dist/theme.css';

function App() {
  return (
    <div>
      <ReactNotifications />
      <Header />
      <Navbar />
      <Outlet />
      {useLocation().pathname !== '/receiver' && <Footer  />}
    </div>
  )
}

export default App;
