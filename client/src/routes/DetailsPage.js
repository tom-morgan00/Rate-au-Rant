import React, { useContext, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { RestaurantContext } from '../context';
import restaurantAPI from '../api/restaurantAPI';

import Reviews from '../components/Reviews';
import AddReviewForm from '../components/AddReviewForm';
import StarRating from '../components/StarRating';

export default function DetailsPage() {
  const { restaurant, setRestaurant } = useContext(RestaurantContext);
  const { id } = useParams();
  // console.log(restaurant);
  useEffect(() => {
    const getData = async (id) => {
      try {
        const { data } = await restaurantAPI.get(`/${id}`);
        setRestaurant(data.data);
      } catch (err) {
        console.log(err);
      }
    };
    getData(id);
  }, [id, setRestaurant]);

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
  // console.log(restaurant);

  return (
    <div>
      {restaurant && (
        <>
          <div
            className="header text-center
          p-3"
          >
            <h1 className="display-2">{restaurant.restaurant.name}</h1>
            <h4>
              {restaurant &&
                renderReviews(
                  restaurant.restaurant.num_reviews,
                  restaurant.restaurant.average_rating
                )}
            </h4>
          </div>
          <div className="mt-3 pt-4">
            <Reviews reviews={restaurant} />
            <AddReviewForm id={id} />
          </div>
        </>
      )}
    </div>
  );
}
