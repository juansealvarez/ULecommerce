const express = require('express');
const session = require('express-session');
const {getVideojuegos, createVideojuego, deleteVideojuego, getVideojuego, updateVideojuego} = require('./models/dao_videojuegos');
const restCategoria = require('./rest/categoria');
const restVideojuego = require('./rest/videojuego');
const bodyParser = require('body-parser');
const path = require('path');
const daoCategorias = require('./models/dao_categorias');
const app = express();
const PORT = 3000;

app.use(express.static(path.join(__dirname,'assets'))); //configurar archivos estaticos

app.set('view engine', 'ejs'); //configurar ejs template
app.set('views', path.join(__dirname,'/views')); //ruta para directorios de views

app.use(bodyParser.json()); //configurar bodyparser
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(session({
    secret: "123456789",
    resave: false,
    saveUninitialized: false
})); //para trabajar con formularios

app.get('/',(req, res)=>{
    //Valido si hay un usario en la sesion
    if (req.session.usuario != null){
        res.render('index',{
            usuario:req.session.usuario
        });
    }else{
        res.render("index",{
            usuario:{
                nombre: "",
                pais: "",
                mail: "",
                mensaje: ""
            }
        });
    };
});

app.get('/catalogo', async (req, res)=>{
    const listaVideojuegos = await getVideojuegos();
    res.render("catalogo",{
        videojuegos : listaVideojuegos
    })
});

app.post('/registro', (req, res)=>{
    const usuario = {
        nombre:req.body.nombre,
        pais:req.body.pais,
        mail:req.body.mail,
        mensaje:req.body.mensaje
    };
    //guardarlo en sesion
    req.session.usuario = usuario;
    
    res.redirect('/');
});

app.get('/catalogo/add', async (req, res)=>{
    //obtener las categorias que hay en la bd
    const listaCategorias = await daoCategorias.getCategorias();
    res.render('catalogo_registro', {
        categorias : listaCategorias
    });
});

app.post('/catalogo/add', async (req,res)=>{
    const vj = {
        name : req.body.vj_name,
        price : parseFloat(req.body.vj_price),
        idCategory : parseInt(req.body.vj_category)
    };
    const vjGuardado = await createVideojuego(vj);
    console.log(vjGuardado);
    res.redirect('/catalogo');
});

app.get('/catalogo/delete/:id', async (req,res)=>{
    const idVj = req.params.id;
    await deleteVideojuego(parseInt(idVj));
    res.redirect('/catalogo');
});

app.get('/catalogo/edit/:id', async (req, res) => {
    const vjId = req.params.id;
    const vj = await getVideojuego(parseInt(vjId));
    const listaCategorias = await daoCategorias.getCategorias();

    res.render('catalogo_edicion', {
        videojuego: vj,
        categorias: listaCategorias
    });
});

app.post('/catalogo/edit', async (req, res) => {
    const vj = {
        id: parseInt(req.body.vj_id),
        name: req.body.vj_name,
        price: parseFloat(req.body.vj_price),
        idCategory: parseInt(req.body.vj_category)
    };
    await updateVideojuego(vj);
    res.redirect('/catalogo');
});

// Definiendo recurso Categoria (path = /categoria)
app.get('/categoria/:id', restCategoria.get); // una categoria
app.post('/categoria', restCategoria.post);
app.put('/categoria', restCategoria.put);
app.delete('/categoria/:id', restCategoria.delete);
app.get('/categoria', restCategoria.getAll); // una lista de categorias

// Definiendo recurso Videojuego (path = /videojuego)
app.get('/videojuego/:id', restVideojuego.get); // una categoria
app.post('/videojuego', restVideojuego.post);
app.put('/videojuego', restVideojuego.put);
app.delete('/videojuego/:id', restVideojuego.delete);
app.get('/videojuego', restVideojuego.getAll); // una lista de videojuegos

app.listen(PORT,()=>{
    console.log(`Servidor iniciandose en el puerto ${PORT}`);
});