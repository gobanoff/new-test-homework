const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 3000;

// Sample data
let shops = [];
let items = [];

// Middleware
app.use(bodyParser.json());

// Routes for shops
app.get('/shops', (req, res) => {
  res.json(shops);
});

app.post('/shops', (req, res) => {
  const newShop = req.body;
  shops.push(newShop);
  res.status(201).json(newShop);
});

app.put('/shops/:id', (req, res) => {
  const { id } = req.params;
  const updatedShop = req.body;
  shops = shops.map(shop => {
    if (shop.id === id) {
      return { ...shop, ...updatedShop };
    }
    return shop;
  });
  res.status(200).json({ message: 'Shop updated successfully' });
});

app.delete('/shops/:id', (req, res) => {
  const { id } = req.params;
  shops = shops.filter(shop => shop.id !== id);
  res.status(200).json({ message: 'Shop deleted successfully' });
});

// Routes for items
app.get('/items', (req, res) => {
  res.json(items);
});

app.post('/items', (req, res) => {
  const newItem = req.body;
  items.push(newItem);
  res.status(201).json(newItem);
});

app.put('/items/:id', (req, res) => {
  const { id } = req.params;
  const updatedItem = req.body;
  items = items.map(item => {
    if (item.id === id) {
      return { ...item, ...updatedItem };
    }
    return item;
  });
  res.status(200).json({ message: 'Item updated successfully' });
});

app.delete('/items/:id', (req, res) => {
  const { id } = req.params;
  items = items.filter(item => item.id !== id);
  res.status(200).json({ message: 'Item deleted successfully' });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
