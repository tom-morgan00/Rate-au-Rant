import React, { createContext, useState } from 'react';

export const RestaurantContext = createContext();

export default function RestaurantContextProvider(props) {
  const [restaurants, setRestaurants] = useState([]);
  const [restaurant, setRestaurant] = useState(null);

  const addRestaurant = (restaurant) => {
    setRestaurants([...restaurants, restaurant]);
  };

  return (
    <RestaurantContext.Provider
      value={{
        restaurants,
        setRestaurants,
        restaurant,
        setRestaurant,
        addRestaurant,
      }}
    >
      {props.children}
    </RestaurantContext.Provider>
  );
}
