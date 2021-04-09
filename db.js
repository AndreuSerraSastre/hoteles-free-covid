var hoteles = require("./public/json/hotel.json")
var comentarios = require("./public/json/comentarios.json")
var puntuaciones = require("./public/json/puntuaciones.json")
var usuarios = require("./public/json/usuario.json")

module.exports = () => ({
  hoteles: hoteles,
  comentarios: comentarios,
  puntuaciones: puntuaciones,
  usuarios: usuarios,
});