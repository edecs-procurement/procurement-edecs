import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './Home.css';

const Home = () => {
  const [vendors, setVendors] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchVendors = async () => {
      try {
        const response = await axios.get('https://procurement-edecs-default-rtdb.firebaseio.com/vendors.json');
        
        // Check if data is received
        console.log('Raw data from Firebase:', response.data);

        // Map the data to extract vendor info
        const vendorsData = Object.entries(response.data).map(([id, data]) => ({
          id,
          ...data.vendorInfo,  // Spread the vendorInfo properties
        }));

        // Log the mapped vendor data
        console.log('Mapped vendors data:', vendorsData);

        setVendors(vendorsData);
      } catch (error) {
        console.error('حدث خطأ أثناء جلب البيانات:', error);
      }
    };

    fetchVendors();
  }, []);

  // Filter vendors based on search term
  const filteredVendors = vendors.filter(vendor =>
    vendor.registeredCompanyName?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container">
      <h1>قائمة الموردين</h1>
      <input
        type="text"
        placeholder="ابحث عن مورد..."
        value={searchTerm}
        onChange={e => setSearchTerm(e.target.value)}
        className="search-input"
      />
      <ul className="vendor-list">
        {filteredVendors.length > 0 ? (
          filteredVendors.map(vendor => (
            <li key={vendor.id} className="vendor-item">
              <Link to={`/vendor/${vendor.id}`} className="vendor-link">
                {vendor.registeredCompanyName || 'لا يوجد اسم'}
              </Link>
            </li>
          ))
        ) : (
          <li className="vendor-item">لا توجد بيانات موردين متاحة.</li>
        )}
      </ul>
    </div>
  );
};

export default Home;
