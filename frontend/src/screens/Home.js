import React, { useState, useEffect } from 'react';
import Card from '../components/Card';
import NavBar from '../components/Navbar';
import Footer from '../components/Footer';
import Carousel from '../components/Carousel';

const Home = () => {
  const [foodItems, setFoodItems] = useState([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    fetchFoodData();
  }, []);

  const fetchFoodData = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/auth/foodData');
      const data = await response.json();
      setFoodItems(data[0]);
    } catch (error) {
      console.error('Error fetching food data:', error);
    }
  };

  const handleSearch = (value) => {
    setSearch(value);
  };

  const filteredFoodItems = foodItems.filter((item) =>
    item.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      <NavBar />
      <Carousel onSearch={handleSearch} />
      <div className='container '>
        <h1 >Food Items</h1>
        <div className='row'>
          {filteredFoodItems.length > 0 ? (
            filteredFoodItems.map((item) => (
              <div key={item.id} className='col-12 col-md-6 col-lg-3'>
                <Card
                  foodName={item.name}
                  item={item}
                  options={item.options[0]}
                  ImgSrc={item.img}
                />
              </div>
            ))
          ) : (
            <div>No matching food items found.</div>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Home;
