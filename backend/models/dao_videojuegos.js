/*const data = {
    videojuegos : [
        {codigo: 1, nombre: "Demon Souls", categoria: "FP RPG", precio: 45},
        {codigo: 2, nombre: "FIFA 2021", categoria: "Deportes", precio: 40},
        {codigo: 3, nombre: "GTA V", categoria: "Open World", precio: 35}
    ],
    categorias : [
        {id: 1, nombre: "FP RPG"},
        {id: 2, nombre: "Deportes"},
        {id: 3, nombre: "Open World"}
    ]
};*/

const db = require('../sequelize/models');

const getVideojuegos = async () =>{
    //TODO: BD
    const vgs = await db.Videogame.findAll();
    const videogames = [];
    for (let vg of vgs){
        videogames.push({
            id : vg.id,
            name : vg.name,
            price : vg.price,
            //category: await db.Category.findOne({
            //    where : {
            //        id : vg.idCategory
            //    }
            //})
            category : await vg.getCategory()
        })
    };
    console.log(videogames);
    return videogames;
};

const getVideojuego = async (vjId) => {
    const vj = await db.Videogame.findOne({
        where: {
            id: vjId
        }
    });
    return vj;
};

const createVideojuego = async (vj) => {
    return await db.Videogame.create(vj);
};

const updateVideojuego = async (vj) =>{
    const vjAEditar = await getVideojuego(vj.id);
    vjAEditar.name = vj.name;
    vjAEditar.price = vj.price;
    vjAEditar.idCategory = vj.idCategory;
    await vjAEditar.save();
    return true;
};

const deleteVideojuego = async (idVj) =>{
    await db.Videogame.destroy({
        where: {
            id: idVj
        }
    });
    return true;
};

module.exports = {
    getVideojuegos : getVideojuegos,
    createVideojuego : createVideojuego,
    deleteVideojuego : deleteVideojuego,
    getVideojuego : getVideojuego,
    updateVideojuego : updateVideojuego
};