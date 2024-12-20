import { useState } from 'react';
import Navbar from '../Home/Navbar';
import Sidebar from '../Home/Sidebar';
import Wallet from './Wallet';

const EarningsPage = () => {
  const [selectedOption, setSelectedOption] = useState('Wallet');

  return (
    <div className="flex min-h-screen">
      <Sidebar
        selectedOption={selectedOption}
        setSelectedOption={setSelectedOption}
      />
      <div className="flex-grow flex flex-col">
        <Navbar />
        <div className="flex-grow p-6 bg-gray-100">
          <Wallet />
        </div>
      </div>
    </div>
  );
};

export default EarningsPage;
