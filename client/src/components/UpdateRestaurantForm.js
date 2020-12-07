import React, { useState, useEffect, useContext } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import restaurantAPI from '../api/restaurantAPI';
import { RestaurantContext } from '../context';

export default function UpdateRestaurantForm(props) {
  const { restaurants, setRestaurants } = useContext(RestaurantContext);
  const history = useHistory();
  const { id } = useParams();

  useEffect(() => {
    const getRestaurant = async (id) => {
      const { data } = await restaurantAPI.get(`/${id}`);
      const { name, location, price_range } = data.data.restaurant;
      setName(name);
      setLocation(location);
      setPriceRange(price_range);
    };
    getRestaurant(id);
  }, [id]);

  const [name, setName] = useState('');
  const [location, setLocation] = useState('');
  const [priceRange, setPriceRange] = useState('');
  const onFormSubmit = async (e) => {
    e.preventDefault();
    const data = await restaurantAPI.put(`/${id}`, {
      name,
      location,
      price_range: priceRange,
    });
    history.push('/');
  };

  return (
    <div className="edit-form mt-5">
      <form>
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            type="text"
            id="name"
            className="form-control"
          />
        </div>
        <div className="form-group">
          <label htmlFor="location">Location</label>
          <input
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            type="text"
            id="location"
            className="form-control"
          />
        </div>
        <div className="form-group">
          <label htmlFor="price_range">Price Range</label>
          <select
            value={priceRange}
            onChange={(e) => setPriceRange(e.target.value)}
            type="number"
            id="price_range"
            className="form-control"
          >
            <option disabled>Price Range</option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
          </select>
        </div>
        <button onClick={onFormSubmit} className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
}
