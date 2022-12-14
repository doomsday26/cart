const fs= require('fs')
const path = require('path')

const p = path.join(
    path.dirname(process.mainModule.filename),
    'data',
    'carts.json'
  );

module.exports = class Cart{
  static addProduct(id,productPrice){

fs.readFile(p,(err,fileContent)=>{
    let cart={  products:[],totalPrice:0 };
    if(!err){cart= JSON.parse(fileContent)
    }
//analyze cart
const existingProductIndex= cart.products.findIndex(prod=>{prod.id===id})
let updatedProduct;

const existingProduct=cart.products[existingProductIndex]
// add new products
if(existingProduct){
updatedProduct={...existingProduct};
updatedProduct.qty=updatedProduct.qty+1;
cart.products=[...cart.products];
cart.products[existingProductIndex]=updatedProduct
}else{
    updatedProduct={id:id,qty:1}
    cart.products=[...cart.products,updatedProduct]
}

cart.totalPrice=cart.totalPrice+ +productPrice;
fs.writeFile(p,JSON.stringify(cart),err=>{console.log(err);}  )

})


  }



}