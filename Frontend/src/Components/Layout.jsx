import Navbar from './Navbar'
import { Outlet } from 'react-router-dom'

const Layout = () => {
  return (
    <div className="bg-slate-700 min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow p-4">
        <Outlet /> 
      </main>
      <footer className="bg-dark bg-opacity-30">
       <div className="container">
         <p className="text-center text-white mb-0"> &copy; BMARKETO {new Date().getFullYear()}</p>
        </div>
      </footer>

    </div>
  );
};

export default Layout;
