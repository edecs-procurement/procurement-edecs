// src/components/Home.js
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
        const vendorsData = Object.entries(response.data).map(([id, data]) => ({
          id,
          ...data.vendorInfo
        }));
        setVendors(vendorsData);
      } catch (error) {
        console.error('حدث خطأ أثناء جلب البيانات:', error);
      }
    };

    fetchVendors();
  }, []);

  const filteredVendors = vendors.filter(vendor =>
    vendor.vendorName?.toLowerCase().includes(searchTerm.toLowerCase())
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
        {filteredVendors.map(vendor => (
          <li key={vendor.id} className="vendor-item">
            <Link to={`/vendor/${vendor.id}`} className="vendor-link">
              {vendor.vendorName || 'لا يوجد اسم'}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Home;
