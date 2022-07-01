// product.js
const express = require("express")
const productRoutes = express.Router();
const fs = require('fs');
const dataPath = './Details/product.json' 

// util functions 

const saveProductData = (data) => {
    const stringifyData = JSON.stringify(data)
    fs.writeFileSync(dataPath, stringifyData)
}

const getProductData = () => {
    const jsonData = fs.readFileSync(dataPath)
    return JSON.parse(jsonData)    
}


// reading the data
productRoutes.get('/product', (req, res) => {
    fs.readFile(dataPath, 'utf8', (err, data) => {
      if (err) {
        throw err;
      }

      res.send(JSON.parse(data));
    });
  });


  productRoutes.post('/product/addproduct', (req, res) => {
   
    var existProducts = getProductData()
    const newProductId = Math.floor(100000 + Math.random() * 900000)
   
    existProducts[newProductId] = req.body
     
    console.log(existProducts);

    saveProductData(existProducts);
    res.send({success: true, msg: 'product data added successfully'})
})

// Read - get all products from the json file
productRoutes.get('/product/list', (req, res) => {
  const products = getProductData()
  res.send(products)
})

// Update - using Put method
productRoutes.put('/product/:id', (req, res) => {
   var existProducts = getProductData()
   fs.readFile(dataPath, 'utf8', (err, data) => {
    const productId = req.params['id'];
    existProducts[productId] = req.body;

    saveProductData(existProducts);
    res.send(`products with id ${productId} has been updated`)
  }, true);
});

//delete - using delete method
productRoutes.delete('/product/delete/:id', (req, res) => {
   fs.readFile(dataPath, 'utf8', (err, data) => {
    var existProducts = getProductData()

    const userId = req.params['id'];

    delete existProducts[userId];  
    saveProductData(existProducts);
    res.send(`products with id ${userId} has been deleted`)
  }, true);
})
module.exports = productRoutes