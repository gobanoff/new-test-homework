const express = require("express");
const bodyParser = require("body-parser");

const app = express();
const PORT = process.env.PORT || 3001;

// Sample data
let shops = [{ id: 1, name: " Shop", location: "555 liverpool st." }];
let items = [
  { id: 1, name: "Item 1", price: 50 },
  { id: 2, name: "Item 2", price: 20 },
  { id: 3, name: "Item 3", price: 30 },
];

// Middleware
app.use(bodyParser.json());

// Routes for shops
app.get("/shops", (req, res) => {
  res.json(shops);
});

app.post("/shops", (req, res) => {
  const newShop = req.body;
  newShop.id = shops.length + 1;
  shops.push(newShop);
  res.status(201).json(newShop);
});
app.put('/shops/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const index = shops.findIndex(shop => shop.id === id);
  if (index === -1) {
      return res.status(404).json({ error: 'Shop not found' });
  }
  
  const updatedShop = {
    id: id,
    name: req.body.name || shops[index].name,
    location: req.body.location || shops[index].location,
    // Add more properties as needed
  };

  shops[index] = updatedShop;
  res.json(updatedShop);
});

//app.put('/shops/:id', (req, res) => {
  //const id = parseInt(req.params.id);
  //const index = shops.findIndex(shop => shop.id === id);
  //if (index === -1) {
    //  return res.status(404).json({ error: 'Shop not found' });
  //}
 // shops[index] = req.body;
 // shops[index].id = id;
 // res.json(shops[index]);
//});
app.delete('/shops/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const index = shops.findIndex(shop => shop.id === id);
  if (index === -1) {
      return res.status(404).json({ error: 'Shop not found' });
  }
  shops.splice(index, 1);
  res.status(204).json({});
});

//app.delete('/shops/:id', (req, res) => {
  //const id = parseInt(req.params.id);
 // const index = shops.findIndex(shop => shop.id === id);
  //if (index === -1) {
     // return res.status(404).json({ error: 'Shop not found' });
  //}
  //const deletedShop = shops.splice(index, 1);
  //res.json(deletedShop[0]);
//});


// Routes for items
app.get("/items", (req, res) => {
  res.json(items);
});

app.post("/items", (req, res) => {
  const newItem = req.body;
  newItem.id = items.length + 1;
  items.push(newItem);
  res.status(201).json(newItem);
});
// Update an item
app.put('/items/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const index = items.findIndex(item => item.id === id);
  if (index === -1) {
      return res.status(404).json({ error: 'Item not found' });
  }
  items[index] = req.body;
  items[index].id = id;
  res.json(items[index]);
});

// Delete an item
app.delete('/items/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const index = items.findIndex(item => item.id === id);
  if (index === -1) {
      return res.status(404).json({ error: 'Item not found' });
  }
  const deletedItem = items.splice(index, 1);
  res.json(deletedItem[0]);
});


// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
