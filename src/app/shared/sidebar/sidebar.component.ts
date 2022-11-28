import { Component, OnInit } from '@angular/core';
import { GifsService } from '../../gifs/services/gifs.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styles: [
  ]
})
export class SidebarComponent  {

  get historial(){
    return this.gisfsServices.historial;
  }
  constructor( private gisfsServices: GifsService) { }

  buscar(termino : string){
    this.gisfsServices.buscarGifs(termino);
    console.log(termino);
  }

}
