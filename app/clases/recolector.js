// Clase hija
class Recolector extends Persona {

  constructor(categoria, nombre, cedula, usuario, password, fechanacimiento, celular) {
    super(nombre, cedula, usuario, password, fechanacimiento, celular);
    this.categoria = categoria;
  }

  getcategoria() {
    return this.categoria;
  }
  setcategoria(categoria) {
    this.categoria = categoria;
  }
}