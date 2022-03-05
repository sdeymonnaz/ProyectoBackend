import admin from 'firebase-admin';
import { v4 as uuidv4} from 'uuid';
import { createRequire } from 'module';
const require = createRequire(import.meta.url);
var serviceAccount = require(process.env.FIREBASE_SERVICE_ACCOUNT);


admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: FIREBASE_DATABASE_URL
});

console.log('Firebase database connected');

const db = admin.firestore();


export class ProductoFirebase{
    constructor(collection){
      this.collection = collection;
        this.query = db.collection(this.collection);;
    }

    async getAll(){
      try{
        const products = [];
        const snapshot = await this.query.get();
        snapshot.forEach(doc => {
            products.push({
                id: doc.id,
                ...doc.data()
            });
        });
        return products;
      }
      catch(error){
        console.log('Error en getAll', error);
      }
    }

    async getById(id){
      try{
        const doc = await this.query.doc(id).get();
        return {
          id: doc.id,
          ...doc.data()
        };
      }
      catch(error){
        console.log('Error en getById', error);
      }
    }

    async save(product){
      try{
        let doc = this.query.doc(uuidv4());
        await doc.create({
          "nombre": product.nombre,
          "descripcion": product.descripcion,
          "codigo": product.codigo,
          "foto": product.foto,
          "precio": product.precio,
          "stock": product.stock,
          "timestamp": new Date().toLocaleString()
          });
      }
      catch(error){
        console.log('Error en save', error);
      }
    }

    async deleteById(id){
      try{
        let doc = this.query.doc(id);
        await doc.delete();
      }
      catch(error){
        console.log('Error en deleteById', error);
      }
    }

    async updateById(id, product){
      try{
        let doc = this.query.doc(id);
        await doc.update(product);
      }
      catch(error){
        console.log('Error en updateById', error);
      }  
    }

    async deleteAll(){
      try{
        const allDocs = await this.query.get();
        allDocs.forEach(doc => {
          doc.ref.delete();
        });
      }
      catch(error){
        console.log('Error en deleteAll', error);
      }
    }
}

//Class carrito to handle items in the cart
export class CarritoFirebase{
  constructor(collection){
    this.collection = collection;
      this.query = db.collection(this.collection);;
  }

  async saveCart(){
    try{
      let doc = this.query.doc(uuidv4());
      await doc.create({
        "timestamp": new Date().toLocaleString(),
        "productos": []
        });
    }
    catch(error){
      console.log('Error en saveCart', error);
    }
  }

  async deleteCartById(id){
    try{
      let doc = this.query.doc(id);
      await doc.delete();
    }
    catch(error){
      console.log('Error en deleteById', error);
    }

  }

  async getCartById(id){
    try{
      const doc = await this.query.doc(id).get();
      return {
        id: doc.id,
        ...doc.data()
      };
    }
    catch(error){
      console.log('Error en getById', error);
    }
  }

  async updateCart(nuevoElem){
    try{
      let doc = this.query.doc(nuevoElem.id);
      await doc.update(nuevoElem);
    }
    catch(error){
      console.log('Error en updateById', error);
    }
  }


}