const { getVideojuegos, getVideojuego } = require("../models/dao_videojuegos");

const resource = {
    get : async (req, resp) => {
        const idVj = req.params.id;
        const videojuego = await getVideojuego(idVj);
        resp.send(videojuego);
    },
    post : (req, resp) => {

    },
    put : (req, resp) => {

    },
    delete : (req, resp) => {

    },
    getAll : async (req, resp) => {
        const listaVideojuegos = await getVideojuegos();
        resp.send(listaVideojuegos)
    }
};

module.exports = resource;