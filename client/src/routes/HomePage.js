import React from 'react';
import Header from '../components/Header';
import AddRestaurantForm from '../components/AddRestaurantForm';
import RestaurantList from '../components/RestaurantList';

export default function HomePage() {
  return (
    <div>
      <Header />
      <AddRestaurantForm />
      <RestaurantList />
    </div>
  );
}
