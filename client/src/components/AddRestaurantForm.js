import React, { useContext, useState } from 'react';
import { useHistory } from 'react-router-dom';
import restaurantAPI from '../api/restaurantAPI';
import { RestaurantContext } from '../context';

export default function AddRestaurant() {
  const history = useHistory();
  const { addRestaurant } = useContext(RestaurantContext);
  const [name, setName] = useState('');
  const [location, setLocation] = useState('');
  const [priceRange, setPriceRange] = useState('Price Range');
  const onFormSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await restaurantAPI.post('/', {
        name,
        location,
        price_range: priceRange,
      });
      addRestaurant(data.data.restaurant);
      history.go(0);
    } catch (err) {
      console.log(err);
    }
  };
  // console.log(name, location, priceRange);
  return (
    <div className="restaurant-form mb-4">
      <form action="">
        <div className="form-row mx-2">
          <div className="col ">
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              type="text"
              className="form-control"
              placeholder="Restaurant"
            />
          </div>
          <div className="col">
            <input
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              type="text"
              className="form-control"
              placeholder="Location"
            />
          </div>
          <div className="col">
            <select
              value={priceRange}
              onChange={(e) => setPriceRange(e.target.value)}
              className="custom-select mr-sm-2"
            >
              <option disabled>Price Range</option>
              <option value="1">£</option>
              <option value="2">££</option>
              <option value="3">£££</option>
              <option value="4">££££</option>
              <option value="5">£££££</option>
            </select>
          </div>
          <button
            style={{ marginLeft: '4px', padding: '0 20px' }}
            onClick={(e) => onFormSubmit(e)}
            className="btn btn-primary"
            type="submit"
          >
            Add
          </button>
        </div>
      </form>
    </div>
  );
}
