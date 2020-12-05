import React from 'react';
import { useHistory } from 'react-router-dom';

export default function RestaurantItem({
  restaurant,
  deleteHandler,
  editHandler,
  renderReviews,
}) {
  const history = useHistory();
  const onRestaurantSelect = (id) => {
    history.push(`restaurants/${id}`);
  };
  return (
    <tr onClick={() => onRestaurantSelect(restaurant.id)}>
      <td>{restaurant.name}</td>
      <td>{restaurant.location}</td>
      <td>{'£'.repeat(restaurant.price_range)}</td>
      <td>
        {renderReviews(restaurant.num_reviews, restaurant.average_rating)}
      </td>
      <td>
        <button
          onClick={(e) => editHandler(e, restaurant.id)}
          className="btn btn-warning"
        >
          Update
        </button>
      </td>
      <td>
        <button
          onClick={(e) => deleteHandler(e, restaurant.id)}
          className="btn btn-danger"
        >
          Delete
        </button>
      </td>
    </tr>
  );
}
