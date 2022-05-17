const express = require('express');
const mongoose = require('mongoose');

const Sifaka = require("sifaka").Sifaka;

const Backend = require("sifaka").backends.inmemory_test
const backend = new Backend();
const Policy = require("sifaka").cache_policies.static
const policy = new Policy({expiryTime: 30, staleTime: 3});
const cache = new Sifaka(backend, {policy});

const workFunction = (id) => (callback) => {
  console.log(`Work function called with id ${id}`);
  Item.count().then(count => console.log(`Total number of records: ${count}`))
  .then(() => {
    return Item.find({ name: `Item ${id}` })
    .then(item => callback(null, item))
    .catch(err => callback(err, null))
  })
};

const app = express();

app.set('view engine', 'ejs');

app.use(express.urlencoded({ extended: false }));

// Connect to MongoDB
mongoose
  .connect(
    'mongodb://mongo:27017/docker-node-mongo',
    { useNewUrlParser: true }
  )
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log(err));

const Item = require('./models/Item');

function randomInteger(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

app.post('/items', async (req, res) => {
  console.log(`Populate test data`);
  for (let index = 1; index < 2000000; index++) {
    const newItem = new Item({
      _id: index,
      name: `Item ${index}`,
    });
    await newItem.save()
  }
});

app.get('/item/random', (req, res) => {
  console.log(`Requesting random item`);
  const id = randomInteger(1, 10);
  if (req.query.cache) {
    console.log(`Requesting item ${id} from cache`);
    cache.get(id, workFunction(id), {}, function(err, data, meta, extra){
      console.log(err)
      console.log(data)
      res.render('index', { items: data })
      if (err) {
        res.status(500).json({ msg: err.msg })
      }
    });    
  } else {
    workFunction(id)(function(err, data){
      console.log(err)
      console.log(data)
      res.render('index', { items: data })
      if (err) {
        res.status(500).json({ msg: err.msg })
      }
    })
  }
});

const port = 3000;

app.listen(port, () => console.log('Server running...'));
