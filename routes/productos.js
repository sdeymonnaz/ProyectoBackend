const express = require('express');
const {Router} = express;
const router = new Router();
const Contenedor = require('../bookstore')

let book = new Contenedor('./productos.txt')



// router.get('/', (req, res) => {
//     book.getAll().then(data => {
//     res.send(data)
//     })
// })


//Configuracion de rutas de handlebars para mostrar todos los productos
router.get('/', (req, res) => {
    res.render('productos')
})

// router.get('/', (req, res) => {
//     book.getAll().then(data => {
//     res.render('productos', {layout: 'index', listaProductos: data})
//     })
// })

// router.get('/form', (req, res) => {
//     res.render('form', {layout: 'index'})
// })


// router.post("/productos/form", (req, res) => {
//     book.save(req.body).then(data => {
//     res.redirect('/productos')
//     }) 
// })


// router.get("/form", (req, res) => {
//     res.sendFile(__dirname + '/public/form.html') 
// })

// router.get('/:id', (req, res) => {
//     book.getById(parseInt(req.params.id)).then(data => {
//     res.json(data)
//     })
// })

// router.post('/', (req, res) => {
//     book.save(req.body).then(data => {
//     res.send(data)
//     })
// })

// router.delete('/:id', (req, res) => {
//     book.deleteById(parseInt(req.params.id)).then(data => {
//     res.json(data)
//     })
// })

// router.put('/:id', (req, res) => {
//     book.updateById(parseInt(req.params.id), req.body).then(data => {
//     res.json(data)
//     })
// })

module.exports = router;