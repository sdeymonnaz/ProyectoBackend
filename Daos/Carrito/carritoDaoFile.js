import ContenedorFile from "../../Contenedores/ContenedorFile.js";
import fs, { readFile } from 'fs';
import { v4 as uuidv4 } from 'uuid';



class CarritoDaoFile extends ContenedorFile {
  constructor() {
    super('db/carrito.json');
  }

    //List all carts in carrito.json
    async getAll(cartId){
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
            console.log('Error: ', err);
        }
    }

     //Create new cart in carrito.json
     async save(){
        try{
            const cartData = await fs.promises.readFile(this.fileName, 'utf-8'); //Load file
            console.log('File carrito.txt read.');
            const cart = await JSON.parse(cartData, null, 2);
            if (cart.length != 0){ //If the file is not empty
                cart.push({id: uuidv4(), timestamp: new Date().toISOString(), producto: []}); //Create new cart and add it to the file
                await fs.promises.writeFile(this.fileName, JSON.stringify(cart, null, 2));
                console.log('New cart: ', cart[cart.length-1]);
                return cart[cart.length-1].id;
            }
            cart.push({id: uuidv4(), timestamp: new Date().toISOString(), producto: []}); //Add the new cart to the file
            await fs.promises.writeFile(this.fileName, JSON.stringify(cart, null, 2));
            console.log('New cart: ', cart[cart.length-1]);
            return cart[cart.length-1].id;  
        }
        catch(err){
            console.log('Error: ', err);
        }
    }

    //Delete all items in a particular cart from carrito.json
    async deleteAll(cartId){
        try{
            const cartData = await fs.promises.readFile(this.fileName, 'utf-8'); //Load file
            console.log('File carrito.json read.');
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
        }
    }


    //Add item to carrito.txt
    async updateById(cartId, productId){
        try{
            const cartData = await fs.promises.readFile(this.fileName, 'utf-8');
            const cart = await JSON.parse(cartData, null, 2);
            let cartToAdd = cart.find(cart => cart.id == cartId);
            console.log('Cart to add: ', cartToAdd);
            const data = await fs.promises.readFile(this.fileName, 'utf-8');
            const products = await JSON.parse(data, null, 2);
            console.log(productId);
            let productToAdd = await products.find(product => product.id == productId);
            console.log('Product to add: ', productToAdd);
            if (productToAdd == null){
                return { error : 'producto no encontrado' };
            }
            if (cartToAdd != undefined){
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




}

export default CarritoDaoFile;