import { Component, OnInit } from '@angular/core';
import { of } from 'rxjs';
import { Videojuego } from '../entidades/videojuego'; //Añadimos la clase que vamos a utilizar

@Component({
  selector: 'app-videogames',
  templateUrl: './videogames.component.html',
  styleUrls: ['./videogames.component.css'],
})
export class VideogamesComponent implements OnInit {
  //listaVideojuegos : Videojuego[] = []
  arrayVideojuegos: Array<Videojuego> = [];
  videojuego: Videojuego | null = null;

  //Datos del formulario
  id: number = 0;
  titulo: string = '';
  compania: string = '';
  valoracionMedia: number = 0;
  //Control de botones
  insertarDeshabilitado = false;
  modificarDeshabilitado = true;
  borrarDeshabilitado = true;
  idDeshabilitada = true;
  camposDeshabilitado = false;
  //Control de errores
  tituloObligatorioOculto = true;
  companiaObligatorioOculto = true;
  valoracionMediaObligatorioOculto = true;
  errorIDOculto = true;

  constructor() {
    let videojuego: Videojuego = new Videojuego("League of Legends","Riot Games",8.3);
    this.arrayVideojuegos.push(videojuego);
    videojuego = new Videojuego("Mass Effect","BioWare",8.5);
    this.arrayVideojuegos.push(videojuego);
    videojuego = new Videojuego("Elder Ring","Bandai Namco Entertainment",8.8);
    this.arrayVideojuegos.push(videojuego);
    videojuego = new Videojuego("Counter Strike","Valve",7.9);
    this.arrayVideojuegos.push(videojuego);
  }


  ngOnInit() {}

  public insertar() {
    this.ocultarMensajesError();
    if (!this.erroresEnFormulario()) {
      this.videojuego = new Videojuego(
        this.titulo,
        this.compania,
        this.valoracionMedia
      );
      this.arrayVideojuegos.push(this.videojuego);
      this.id = this.videojuego.id;
      this.vaciar();
    }
    
  }

  public modificar() {
    this.ocultarMensajesError();
    if (!this.errorID() && !this.erroresEnFormulario()) {
      for (let i = 0; i < this.arrayVideojuegos.length; i++) {
        if (this.arrayVideojuegos[i].id == this.id) {
          this.arrayVideojuegos[i].titulo = this.titulo;
          this.arrayVideojuegos[i].compania = this.compania;
          this.arrayVideojuegos[i].valoracionMedia = this.valoracionMedia;
          break;
        }
      }
      this.vaciar();
    }
  }

  public borrar() {
    this.ocultarMensajesError();
    if (!this.errorID()) {
      for (let i = 0; i < this.arrayVideojuegos.length; i++) {
        if (this.arrayVideojuegos[i].id == this.id) {
          this.arrayVideojuegos.splice(i, 1);
          break;
        }
      }
      this.vaciar();
    }
  }

  public vaciar() {
    this.id = 0;
    this.titulo = '';
    this.compania = '';
    this.valoracionMedia = 0;

    this.ocultarMensajesError();
  }
  public desHabilitarBotones() {
    this.vaciar();
    if (
      this.modificarDeshabilitado == true &&
      this.borrarDeshabilitado == true
    ) {
      this.insertarDeshabilitado = true;
      this.modificarDeshabilitado = false; //Cambiar a modificar
      this.idDeshabilitada = false;
    } else if (
      this.insertarDeshabilitado == true &&
      this.borrarDeshabilitado == true
    ) {
      this.modificarDeshabilitado = true;
      this.borrarDeshabilitado = false; //Cambiar a borrar
      this.camposDeshabilitado = true;
    } else if (
      this.insertarDeshabilitado == true &&
      this.modificarDeshabilitado == true
    ) {
      this.borrarDeshabilitado = true;
      this.insertarDeshabilitado = false; //Cambiar a insertar
      this.idDeshabilitada = true;
      this.camposDeshabilitado = false;
    }
  }
  public erroresEnFormulario(): boolean {
    let nota: number = Number(this.valoracionMedia);
    console.log(typeof this.valoracionMedia);
    let error: boolean = false;
    if (this.titulo.trim().length == 0) {
      this.tituloObligatorioOculto = false;
      error = true;
    }
    if (this.compania.trim().length == 0) {
      this.companiaObligatorioOculto = false;
      error = true;
    }
    if (!(this.valoracionMedia >= 0 && this.valoracionMedia <= 10)) {
      this.valoracionMediaObligatorioOculto = false;
      error = true;
    }
    return error;
  }
  public errorID(): boolean {
    let error: boolean = false;
    let encontrado : boolean = false;
    for (let i = 0; i < this.arrayVideojuegos.length; i++) {
      if (this.arrayVideojuegos[i].id == this.id) {
        encontrado=true;
      }
    }
    if (!encontrado){
      error = true;
      this.errorIDOculto=false;
    }
    return error;
  }
  public ocultarMensajesError() {
    this.tituloObligatorioOculto = true;
    this.companiaObligatorioOculto = true;
    this.valoracionMediaObligatorioOculto = true;
    this.errorIDOculto = true;
  }
}
