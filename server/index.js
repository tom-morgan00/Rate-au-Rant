//IMPORTS
require('dotenv').config();
const express = require('express');
const db = require('./db');
const cors = require('cors');

//APP SETUP
const app = express();

//MIDDLEWARES
app.use(express.json());
app.use(cors());

//ROUTES
app.get('/api', (req, res) => {
  res.send('WELCOME TO JURASSIC PARK! DO DO DOO DO DO, DO DO DOOOOOO!');
});

//GET RESTAURANTS
app.get('/api/v1/restaurants', async (req, res) => {
  try {
    // const results = await db.query('SELECT * FROM restaurants');
    const results = await db.query(
      'SELECT * FROM restaurants left join (select restaurant_id, COUNT(*) as num_reviews, TRUNC(AVG(rating),1) as average_rating from reviews group by restaurant_id) reviews on restaurants.id = reviews.restaurant_id'
    );
    // console.log('reviews', results.rows);
    res.status(200).json({
      status: 'success',
      results: results.rows.length,
      data: {
        restaurants: results.rows,
      },
    });
  } catch (err) {
    console.log(err);
  }
});

('SELECT * FROM restaurants left join (select restaurant_id, COUNT(*) as num_reviews, TRUNC(AVG(rating),1) as average_rating from reviews group by restaurant_id) reviews on restaurants.id = reviews.restaurant_id where id = 1;');

//GET 1 RESTAURANT
app.get('/api/v1/restaurants/:id', async (req, res) => {
  try {
    const restaurantID = req.params.id;
    const restaurant = await db.query(
      //parametirezed query, avoid SQL injection attacks
      'SELECT * FROM restaurants left join (select restaurant_id, COUNT(*) as num_reviews, TRUNC(AVG(rating),1) as average_rating from reviews group by restaurant_id) reviews on restaurants.id = reviews.restaurant_id where id = $1',
      [restaurantID]
    );

    const reviews = await db.query(
      'SELECT * FROM reviews WHERE restaurant_id = $1',
      [restaurantID]
    );

    res.status(200).json({
      status: 'success',
      data: {
        restaurant: restaurant.rows[0],
        reviews: reviews.rows,
      },
    });
  } catch (err) {
    console.log(err);
  }
});

//CREATE RESTAURANT
app.post('/api/v1/restaurants', async (req, res) => {
  try {
    const { name, location, price_range } = req.body;
    const results = await db.query(
      'INSERT INTO restaurants (name, location, price_range) values ($1, $2, $3) returning *',
      [name, location, price_range]
    );
    res.status(201).json({
      status: 'success',
      data: {
        restaurant: results.rows[0],
      },
    });
  } catch (err) {
    console.log(err);
  }
});

//UPDATE RESTAURANT
app.put('/api/v1/restaurants/:id', async (req, res) => {
  try {
    const restaurantID = req.params.id;
    const { name, location, price_range } = req.body;
    const result = await db.query(
      'UPDATE restaurants SET name = $2, location = $3, price_range = $4 where id = $1 returning *',
      [restaurantID, name, location, price_range]
    );
    res.status(200).json({
      status: 'success',
      data: {
        restaurant: result.rows[0],
      },
    });
  } catch (err) {
    console.log(err);
  }
});

//DELETE RESTAURANT
app.delete('/api/v1/restaurants/:id', async (req, res) => {
  try {
    const restaurantID = req.params.id;
    //IMPROVISING DELETING TABLE FROM FOREIGN KEY TABLE
    await db.query('ALTER TABLE restaurants DISABLE TRIGGER ALL');
    await db.query('ALTER TABLE reviews DISABLE TRIGGER ALL');
    const restaurant = await db.query('DELETE FROM restaurants WHERE id = $1', [
      restaurantID,
    ]);
    // console.log(restaurant);
    const reviews = await db.query('DELETE FROM reviews WHERE id = $1', [
      restaurantID,
    ]);
    // console.log(reviews);
    await db.query('ALTER TABLE restaurants ENABLE TRIGGER ALL');
    await db.query('ALTER TABLE reviews ENABLE TRIGGER ALL');

    res.status(204).json({
      status: 'success',
    });
  } catch (err) {
    console.log(err);
  }
});

//CREATE REVIEW
app.post('/api/v1/restaurants/:id/newReview', async (req, res) => {
  try {
    const restaurantID = req.params.id;
    const { name, review, rating } = req.body;
    const result = await db.query(
      'INSERT INTO reviews (restaurant_id, name, review, rating) values ($1, $2, $3, $4) returning *',
      [restaurantID, name, review, rating]
    );
    res.status(201).json({
      status: 'success',
      data: {
        review: result.rows[0],
      },
    });
  } catch (err) {
    console.log(err);
  }
});

//SERVER LISTENING
const port = process.env.PORT || 4000;
app.listen(port, () =>
  console.log(`Listening on PORT ${port}, http://localhost:${port}`)
);
