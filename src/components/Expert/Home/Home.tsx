import { useState } from 'react';
import Navbar from './Navbar';
import Sidebar from './Sidebar';
import Dashboard from './Dashboard';

const Home = () => {
  const [selectedOption, setSelectedOption] = useState('Dashboard');

  return (
    <div className="flex min-h-screen">
      <Sidebar
        selectedOption={selectedOption}
        setSelectedOption={setSelectedOption}
      />
      <div className="flex-grow flex flex-col">
        <Navbar />
        <div className="flex-grow p-6 bg-gray-100">
          <Dashboard />
        </div>
      </div>
    </div>
  );
};

export default Home;
