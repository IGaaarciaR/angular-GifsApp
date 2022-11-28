import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Gif, SearchGifsResponse } from '../interface/gifs.interface';

@Injectable({
  providedIn: 'root'
})
export class GifsService {
  //constructor() { }
  private apiKey: string = 'SA4udh7WzI6NN2wNRAbpzcCjVXpGaWgG';
  private servicioUrl: string = 'https://api.giphy.com/v1/gifs';
  private _historial: string[]= [];
  //cambiar any por el tipo de propiedad
  public resultados :  Gif[] = [];
  get historial(){
    return [...this._historial];
  }

  //contructor para inyectar el servicio
  constructor(private http: HttpClient){
    //cargar del localstorage
   // localStorage.getItem('historial');

  // if(localStorage.getItem('historial')){
   // this._historial = JSON.parse(localStorage.getItem('historial')!);
   //}

   this._historial = JSON.parse(localStorage.getItem('historial')!) || []
   this.resultados = JSON.parse(localStorage.getItem('resultados')!) || []
  
  }

  buscarGifs(query: string = ''){
    
    query = query.trim().toLowerCase();
    //this._historial.unshift(query);

    if(!this._historial.includes(query)){
        this._historial.unshift(query);
        this._historial = this._historial.splice(0,10);

        localStorage.setItem( 'historial', JSON.stringify(this._historial));
    }
    //modulo propio de angular para hacer peticiones http
    //mapear respuestas 

    const params = new HttpParams().set('api_key', this.apiKey)
      .set('limit','10')
      .set('q', query);

    console.log(params);

    this.http.get<SearchGifsResponse>(`${this.servicioUrl}/search`,{params})
        .subscribe( (response ) => {
            console.log(response.data);
            this.resultados = response.data;
            localStorage.setItem( 'resultados', JSON.stringify(this.resultados));
        })
    //fetch -> evitar un try catch

    console.log(this._historial);
  }

}
