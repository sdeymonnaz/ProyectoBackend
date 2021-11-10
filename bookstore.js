const fs = require('fs');

class Contenedor{
    constructor(fileName){
        this.fileName = fileName;
    }

    async save(objIn){
        try{
            const data = await fs.promises.readFile(this.fileName, 'utf-8');
            console.log('File read.');
            const products = await JSON.parse(data, null, 2);
            if (products.length != 0){
                const idsList = []
                for (let product of products){
                    idsList.push(product.id)
                }
                let top = Math.max.apply(Math, idsList) + 1
                products.push({...objIn, id: top});
                await fs.promises.writeFile(this.fileName, JSON.stringify(products, null, 2));
                return products[products.length-1];
            }
            console.log('File empty.');
            products.push({...objIn, id: 1});
            await fs.promises.writeFile(this.fileName, JSON.stringify(products, null, 2));
            return 'Id ingresado: 1';  
        }
        catch(err){
            console.log('Error reading the file.');
        }
    }

    async getById(idNumber){
        try{
            const data = await fs.promises.readFile(this.fileName, 'utf-8');
            const products = await JSON.parse(data, null, 2);
            let bookInquired = products.find(book => book.id === idNumber);
            if (bookInquired != null){
                return bookInquired;    
            }
            return { error : 'producto no encontrado' };
        }
        catch(err){
            console.log('Error reading the file.');
        }
    }

    async getAll(){
        try{
            const data = await fs.promises.readFile(this.fileName, 'utf-8');
            const products = await JSON.parse(data, null, 2);
            return products;
        }
        catch(err){
            console.log('Error reading the file.');
        }
    }

    async deleteById(idNumber){
        try{
            const data = await fs.promises.readFile(this.fileName, 'utf-8');
            let products = await JSON.parse(data, null, 2);
            let bookInquired = products.find(book => book.id === idNumber);
            let idToDelete = products.indexOf(bookInquired);
            console.log(idToDelete);
            if (idToDelete == -1){
                return { error : 'producto no encontrado' };                
            }
            products.splice(idToDelete, 1);
            await fs.promises.writeFile(this.fileName, JSON.stringify(products, null, 2));
        }
        catch(err){
            console.log('Error reading the file.');
        }
    }

    async deleteAll(){
        await fs.promises.writeFile(this.fileName, JSON.stringify([], null, 2));
    }
    catch(err){
        console.log('Error reading the file.');
    }


    async updateById(idNumber, newValue){
        try{
            const data = await fs.promises.readFile(this.fileName, 'utf-8');
            let products = await JSON.parse(data, null, 2);
            let bookInquired = products.find(book => book.id === idNumber);
            let idToUpdate = products.indexOf(bookInquired);
            if (idToUpdate == -1){
                return { error : 'producto no encontrado' };
            }
            else{products.splice(idToUpdate, 1);
                products.push({...bookInquired, ...newValue});
                await fs.promises.writeFile(this.fileName, JSON.stringify(products, null, 2))
                return products[products.length-1];
            }   

        }
        catch(err){
            console.log('Error reading the file.');
        }
    }

    async deleteAll(){
        await fs.promises.writeFile(this.fileName, JSON.stringify([], null, 2));
    }
    catch(err){
        console.log('Error reading the file.');
    }







}

module.exports = Contenedor