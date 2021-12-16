import admin from 'firebase-admin';
import { v4 as uuidv4} from 'uuid';
import { createRequire } from 'module';
const require = createRequire(import.meta.url);
var serviceAccount = require('../db/ecommerce-4b8cb-firebase-adminsdk-l0lrv-60f42acfc4.json');


admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://ecommerce-4b8cb.firebaseio.com'
});

console.log('Firebase database connected');

const db = admin.firestore();


class ProductoFirebase{
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

//const newFirebase = new ProductoFirebase('productos');


// newFirebase.getAll().then(products => {
//   console.log('GetAll', products);
//   }
// );

// newFirebase.getById("L9ovcBzAPGJX2ptbitbi").then(product => {
//   console.log('getById', product);
//   }
// );

// newFirebase.save({
//   "nombre": "The storyteller",
//   "descripcion": "Having entertained the idea for years, and even offered a few questionable opportunities ('It's a piece of cake! Just do four hours of interviews, find someone else to write it, put your face on the cover, and voila!'), I have decided to write these stories just as I have always done, in my own hand.",
//   "codigo": "b1",
//   "foto": "https://d1w7fb2mkkr3kw.cloudfront.net/assets/images/book/lrg/9781/3985/9781398503700.jpg",
//   "precio": 12,
//   "stock": 35,
//   "id": "1",
// });

//newFirebase.deleteById("4");

//newFirebase.deleteAll();

export default ProductoFirebase;

