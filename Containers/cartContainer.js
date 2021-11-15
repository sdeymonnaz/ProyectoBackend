const fs = require('fs');
const { v4: uuidv4 } = require('uuid');
const Product = require('./productsContainer');
const product = new Product('./db/productos.txt');


class ShoppingCart{
    constructor(fileName){
        this.fileName = fileName;
    }

    //Create new cart in carrito.txt
    async saveCart(){
        try{
            const cartData = await fs.promises.readFile(this.fileName, 'utf-8'); //Load file
            console.log('File carrito.txt read.');
            const cart = await JSON.parse(cartData, null, 2);
            if (cart.length != 0){ //If the file is not empty
                cart.push({id: uuidv4(), timestamp: Date.now(), producto: []}); //Create new cart and add it to the file
                await fs.promises.writeFile(this.fileName, JSON.stringify(cart, null, 2));
                console.log('New cart: ', cart[cart.length-1]);
                return cart[cart.length-1].id;
            }
            cart.push({id: uuidv4(), timestamp: Date.now(), producto: []}); //Add the new cart to the file
            await fs.promises.writeFile(this.fileName, JSON.stringify(cart, null, 2));
            console.log('New cart: ', cart[cart.length-1]);
            return cart[cart.length-1].id;  
        }
        catch(err){
            console.log('Error: ', err);
            console.log('Error reading the file.');
        }
    }

    //Delete all items in carrito.txt
    async deleteCartAll(cartId){
        try{
            const cartData = await fs.promises.readFile(this.fileName, 'utf-8'); //Load file
            console.log('File carrito.txt read.');
            const cart = await JSON.parse(cartData, null, 2);
            let cartToDelete = cart.find(cart => cart.id == cartId);
            console.log('Cart to delete: ', cartToDelete);
            if (cartToDelete != undefined){
                cart.splice(cart.indexOf(cartToDelete), 1);
                await fs.promises.writeFile(this.fileName, JSON.stringify(cart, null, 2));
                console.log('Cart deleted: ', cart);
            }
            //await fs.promises.writeFile(this.fileName, JSON.stringify([], null, 2));
        }
        catch(err){
            console.log('Error: ', err);
            console.log('Error reading the file.');
        }
    }

    //List all items in carrito.txt
    async getCartAll(cartId){
        try{
            const cartData = await fs.promises.readFile(this.fileName, 'utf-8');
            const cart = await JSON.parse(cartData, null, 2);
            console.log('file content: ', cart);
            let cartToGet = cart.find(cart => cart.id == cartId);
            console.log('Cart to get: ', cartToGet);
            if (cartToGet != undefined){
                return cartToGet;
            }
        }
        catch(err){
            console.log(err);
            console.log('Error reading the file.');
        }
    }

    //Add item to carrito.txt
    async addItemToCart(cartId, productId){
        try{
            const cartData = await fs.promises.readFile(this.fileName, 'utf-8');
            const cart = await JSON.parse(cartData, null, 2);
            let cartToAdd = cart.find(cart => cart.id == cartId);
            console.log('Cart to add: ', cartToAdd);
            if (cartToAdd != undefined){
                    let productToAdd = await product.getById(productId);
                cartToAdd.producto.push(productToAdd);
                await fs.promises.writeFile(this.fileName, JSON.stringify(cart, null, 2));
                console.log('Product added to: ', cartToAdd);
            }
        }
        catch(err){
            console.log(err);
            console.log('Error reading the file.');
        }
    }

    //Delete item from carrito.txt
    async deleteItemFromCart(cartId, productId){
        try{
            const cartData = await fs.promises.readFile(this.fileName, 'utf-8');
            const cart = await JSON.parse(cartData, null, 2);
            let cartToDelete = cart.find(cart => cart.id == cartId);
            console.log('Cart to delete: ', cartToDelete);
            if (cartToDelete != undefined){
                let productToDelete = cartToDelete.producto.find(product => product.id == productId);
                console.log('Product to delete: ', productToDelete);
                cartToDelete.producto.splice(cartToDelete.producto.indexOf(productToDelete), 1);
                await fs.promises.writeFile(this.fileName, JSON.stringify(cart, null, 2));
                console.log('Product deleted from: ', cartToDelete);
            }
        }
        catch(err){
            console.log(err);
            console.log('Error reading the file.');
        }
    }

}

module.exports = ShoppingCart;