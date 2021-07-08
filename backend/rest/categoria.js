const daoCategorias = require("../models/dao_categorias");

const resource = {
    get : async (req, resp) => {
        const idCategory = req.params.id;
        const category = await daoCategorias.getCategoria(idCategory);
        resp.send(category);
    },
    post : async (req, resp) => {
        const category = await daoCategorias.insertCategoria(req.body);
        resp.send(category);
    },
    put : async (req, resp) => {
        const data = req.body;
        resp.send(await daoCategorias.updateCategoria(data.id, data));
    },
    delete : async (req, resp) => {
        const idCategory = req.params.id;
        resp.send(await daoCategorias.deleteCategoria(idCategory));
    },
    getAll : async (req, resp) => {
        const filtro = {};
        if (req.query.status != undefined){
            filtro.status = req.query.status;
        }
        const listaCategorias = await daoCategorias.getCategorias(filtro);
        resp.send(listaCategorias);
    }
};

module.exports = resource;