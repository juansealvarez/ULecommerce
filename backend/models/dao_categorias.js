const db = require('../sequelize/models');


const dao = {
    getCategorias : async (data) => {
        let filtro = {
            where : {}
        }
        if (data != undefined) {
            if (data.status != undefined) filtro.where.status = data.status
        }else{
            filtro = {}
        }
        const listaCategorias = await db.Category.findAll(filtro);
        return listaCategorias;
    },
    getCategoria : async (id) => {
        const category = await db.Category.findOne({
            where : {
                id: id
            }
        });
        return category;
    },
    insertCategoria: async (categoria) =>{
        return await db.Category.create({
            nombre: categoria.nombre,
            status: categoria.status
        });
    },
    updateCategoria: async (id, data) => {
        const category = await db.Category.findOne({
            where: {
                id : id
            }
        });
        if (data.nombre != undefined){
            category.nombre = data.nombre;
        }
        if (data.status != undefined){
            category.status = data.status;
        }
        return await category.save();
    },
    deleteCategoria: async (id) => {
        let respuesta = null;
        try{
            respuesta = await db.Category.destroy({
                where: {
                    id : id
                }
            });
            return respuesta;
        }catch (error){
            respuesta = {msg : error.name + " - No puedes borrar una entrada mientras otra entidad esta usandola"};
            return respuesta;
        };
    }
}

module.exports = dao;