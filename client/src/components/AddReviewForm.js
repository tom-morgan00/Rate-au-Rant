import React, { useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import restaurantAPI from '../api/restaurantAPI';

export default function AddReviewForm({ id }) {
  const location = useLocation();
  const history = useHistory();
  const [name, setName] = useState('');
  const [review, setReview] = useState('');
  const [rating, setRating] = useState('Rating');
  const onReviewSubmit = async (e, id) => {
    e.preventDefault();
    try {
      await restaurantAPI.post(`/${id}/newReview`, {
        name,
        review,
        rating,
      });
      // const { review } = data.data;
      history.go(0);
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className="mb-2">
      <form onSubmit={(e) => onReviewSubmit(e, id)}>
        <div className="form-row">
          <div className="form-group col-8">
            <label htmlFor="name">Name</label>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              type="text"
              id="name"
              placeholder="name"
              className="form-control"
            />
          </div>
          <div className="form-group col-4">
            <label htmlFor="rating">Rating</label>
            <select
              value={rating}
              onChange={(e) => setRating(e.target.value)}
              id="rating"
              className="custom-select"
            >
              <option disabled>Rating</option>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
            </select>
          </div>
        </div>
        <div className="form-group">
          <label htmlFor="review">Review</label>
          <textarea
            value={review}
            onChange={(e) => setReview(e.target.value)}
            id="review"
            placeholder="Review goes here..."
            className="form-control"
          />
        </div>
        <button className="btn btn-primary">Submit</button>
      </form>
    </div>
  );
}
