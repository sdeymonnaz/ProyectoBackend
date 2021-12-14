//const fs = require('fs');
import fs from 'fs';

class Product{
    constructor(fileName){
        this.fileName = fileName;
    }


    //List all products in products.txt
    async getAll(){
        try{
            const data = await fs.promises.readFile(this.fileName, 'utf-8');
            const products = await JSON.parse(data, null, 2);
            console.log('file content: ', products);
            return products;
        }
        catch(err){
            console.log('Error :', err);
        }
    }

    //Find product by id in products.txt
    async getById(idNumber){
        try{
            const data = await fs.promises.readFile(this.fileName, 'utf-8');
            const products = await JSON.parse(data, null, 2);
            let bookInquired = products.find(book => book.id === idNumber); //Find the product by id
            if (bookInquired != null){ //If the product is found
                //console.log('Product found: ', bookInquired);
                return bookInquired;    
            }
            return { error : 'producto no encontrado' };
        }
        catch(err){
            console.log('Error :', err);
        }
    }

    //Save new product in the file products.txt
    async save(objIn){
        try{
            const data = await fs.promises.readFile(this.fileName, 'utf-8'); //Load file
            console.log('File read.');
            const products = await JSON.parse(data, null, 2);
            if (products.length != 0){ //If the file is not empty
                const idsList = []
                for (let product of products){ //Create a list of ids
                    idsList.push(product.id)
                }
                let top = Math.max.apply(Math, idsList) + 1 //Get the highest id and increment by 1
                products.push({...objIn, id: top, timestamp: new Date().toLocaleString()}); //Add the new product
                await fs.promises.writeFile(this.fileName, JSON.stringify(products, null, 2));
                //console.log('New product id: ', products[products.length-1].id);
                return products[products.length-1];
            }
            console.log('File empty.'); //If the file is empty
            products.push({...objIn, id: 1}); //Add the new product with id 1
            await fs.promises.writeFile(this.fileName, JSON.stringify(products, null, 2));
            //console.log('New product id: ', products[products.length-1].id);
            return 'Id ingresado: 1';  
        }
        catch(err){
            console.log('Error :', err);
        }
    }



    //Delete product by id in products.txt
    async deleteById(idNumber){
        try{
            const data = await fs.promises.readFile(this.fileName, 'utf-8');
            let products = await JSON.parse(data, null, 2);
            let bookInquired = products.find(book => book.id === idNumber); //Filter the product by id
            let idToDelete = products.indexOf(bookInquired); //Find the index of the product
            //console.log(idToDelete);
            if (idToDelete == -1){ //If the product is not found
                return { error : 'producto no encontrado' };                
            }
            products.splice(idToDelete, 1); //If the product is found, delete it
            await fs.promises.writeFile(this.fileName, JSON.stringify(products, null, 2));
        }
        catch(err){
            console.log('Error :', err);
        }
    }
    
    //Delete all products in products.txt
    async deleteAll(){
        await fs.promises.writeFile(this.fileName, JSON.stringify([], null, 2));
    }
    catch(err){
        console.log('Error :', err);
    }

    //Update product by id in products.txt
    async updateById(idNumber, newValue){
        try{
            const data = await fs.promises.readFile(this.fileName, 'utf-8');
            let products = await JSON.parse(data, null, 2);
            let bookInquired = products.find(book => book.id === idNumber); //Filter the product by id
            let idToUpdate = products.indexOf(bookInquired); //Find the index of the product
            if (idToUpdate == -1){ //If the product is not found
                return { error : 'producto no encontrado' };
            }
            else{products.splice(idToUpdate, 1); //If the product is found, update it
                products.push({...bookInquired, ...newValue});
                await fs.promises.writeFile(this.fileName, JSON.stringify(products, null, 2))
                return products[products.length-1];
            }   

        }
        catch(err){
            console.log('Error :', err);
        }
    }

    // async deleteAll(){
    //     await fs.promises.writeFile(this.fileName, JSON.stringify([], null, 2));
    // }
    // catch(err){
    //     console.log('Error reading the file.');
    // }







}

export default Product;