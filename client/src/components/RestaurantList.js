import React, { useContext, useEffect } from 'react';
import restaurantAPI from '../api/restaurantAPI';
import RestaurantItem from './RestaurantItem';
import { RestaurantContext } from '../context';
import { useHistory } from 'react-router-dom';
import StarRating from './StarRating';

export default function RestaurantList(props) {
  const { restaurants, setRestaurants } = useContext(RestaurantContext);
  let history = useHistory();
  useEffect(() => {
    const getRestaurants = async () => {
      try {
        const { data } = await restaurantAPI.get('/');
        setRestaurants(data.data.restaurants);
      } catch (err) {
        console.log(err);
      }
    };
    getRestaurants();
  }, [setRestaurants]);

  const deleteHandler = async (e, id) => {
    e.stopPropagation();
    try {
      await restaurantAPI.delete(`/${id}`);
      const newArr = restaurants.filter((restaurant) => restaurant.id !== id);

      setRestaurants(newArr);
      // history.push(0);
    } catch (err) {
      console.log(err);
    }
  };

  const editHandler = (e, id) => {
    e.stopPropagation();
    history.push(`/restaurants/${id}/edit`);
  };

  const renderReviews = (num, avg) => {
    return num === null ? (
      <span>No reviews</span>
    ) : (
      <>
        <StarRating rating={avg} />
        {`(${num} reviews)`}
      </>
    );
  };

  // console.log(restaurants);
  return (
    <div className="list-group">
      <table className="table table-hover table-dark">
        <thead>
          <tr className="bg-primary">
            <th scope="col">Restaurant</th>
            <th scope="col">Location</th>
            <th scope="col">Price Range</th>
            <th scope="col">Ratings</th>
            <th scope="col">Edit</th>
            <th scope="col">Delete</th>
          </tr>
        </thead>
        <tbody>
          {restaurants &&
            restaurants.map((restaurant) => {
              return (
                <RestaurantItem
                  key={restaurant.id}
                  restaurant={restaurant}
                  deleteHandler={deleteHandler}
                  editHandler={editHandler}
                  renderReviews={renderReviews}
                />
              );
            })}
        </tbody>
      </table>
    </div>
  );
}
