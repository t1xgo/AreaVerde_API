class Persona {

  constructor(nombre, cedula, usuario, password, fechanacimiento, celular) {
    this.nombre = nombre;
    this.cedula = cedula;
    this.usuario = usuario;
    this.password = password;
    this.fechanacimiento = fechanacimiento;
    this.celular = celular;
  }


  getnombre() {
    return this.nombre;
  }

  getcedula() {
    return this.cedula;
  }

  getusuario() {
    return this.usuario;
  }

  getpassword() {
    return this.password;
  }

  getfechanacimiento() {
    return this.fechanacimiento;
  }

  getcelular() {
    return this.celular;
  }

  setnombre(nombre) {
    this.nombre = nombre;
  }

  setcedula(cedula) {
    this.cedula = cedula;
  }

  setusuario(usuario) {
    this.usuario = usuario;
  }

  setpassword(password) {
    this.password = password;
  }

  setfechanacimmiento(fechanacimmiento) {
    this.fechanacimiento = fechanacimmiento;
  }

  setcelular(celular) {
    this.celular = celular;
  }
}