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
  shops[index] = req.body;
  shops[index].id = id;
  res.json(shops[index]);
});
app.delete('/shops/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const index = shops.findIndex(shop => shop.id === id);
  if (index === -1) {
      return res.status(404).json({ error: 'Shop not found' });
  }
  const deletedShop = shops.splice(index, 1);
  res.json(deletedShop[0]);
});
//app.put("/shops/:id", (req, res) => {
  //const { id } = req.params;
  //const updatedShop = req.body;
  //shops = shops.map((shop) => {
   // if (shop.id === id) {
     // return { ...shop, ...updatedShop };
   // }
    //return shop;
 // });
 // res.status(200).json({ message: "Shop updated successfully" });
//});

//app.delete("/shops/:id", (req, res) => {
 // const { id } = req.params;
  //shops = shops.filter((shop) => shop.id !== id);
  //res.status(200).json({ message: "Shop deleted successfully" });
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
//app.put("/items/:id", (req, res) => {
  //const { id } = req.params;
  //const updatedItem = req.body;
 // items = items.map((item) => {
    //if (item.id === id) {
     // return { ...item, ...updatedItem };
   // }
   // return item;
 // });
 // res.status(200).json({ message: "Item updated successfully" });
///});

//app.delete("/items/:id", (req, res) => {
 // const { id } = req.params;
  //items = items.filter((item) => item.id !== id);
 // res.status(200).json({ message: "Item deleted successfully" });
//});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
