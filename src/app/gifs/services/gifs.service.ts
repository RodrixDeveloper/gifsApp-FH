import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Gif, SearchResponse } from '../interface/gifs.interface';

@Injectable({
  providedIn: 'root',
})
export class GifsService {
  public gifList: Gif[] = [];

  private _tagsHistory: string[] = [];
  private serviceUrl: string = 'https://api.giphy.com/v1/gifs';
  private apiKey: string = 'WpzMaifaH2CC2QiuWVNpiCIo5c3T9Yzu';

  constructor(private http: HttpClient) {
    this.loadLocalStorage();
    console.log('Gifs del localStorage');
  }

  get tagsHistory() {
    return [...this._tagsHistory];
  }

  private organizeHistory(tag: string): void {
    tag = tag.toLocaleLowerCase(); // toLocaleLowerCase, convertir todo a minuscula

    if (this._tagsHistory.includes(tag)) {
      this._tagsHistory = this._tagsHistory.filter((oldTag) => oldTag !== tag); // Remover el tag si es igual del _tagsHistory
    }

    this._tagsHistory.unshift(tag); // insertar el elmento al principio del array (_tagsHistory)

    this._tagsHistory = this.tagsHistory.splice(0, 10); //limitar el array a 10
    this.saveLocalStorage();
  }

  /**
   * LOCAL STORAGE
   */
  // metodo para guardar en localStorage, JSON.stringify para convertir el json a string
  private saveLocalStorage(): void {
    localStorage.setItem('history', JSON.stringify(this.tagsHistory));
  }

  private loadLocalStorage(): void {
    if (!localStorage.getItem('history')) return; //Si no tenemos data no hara nada y return salga de la funcion
    this._tagsHistory = JSON.parse(localStorage.getItem('history')!); //Convertir de string a json
    if (this.tagsHistory.length === 0) return;
    this.searhTag(this._tagsHistory[0]);
  }

  searhTag(tag: string): void {
    if (tag.length === 0) return; //Validar a no mandar vacio
    this.organizeHistory(tag);

    //this.http.get(`${this.serviceUrl}/search?api_key=${this.apiKey}&q=${tag}&limit=10`)  otra manera

    //Otra manera de enviar parametros con params
    const params = new HttpParams()
      .set('api_key', this.apiKey)
      .set('limit', '10')
      .set('q', tag);

    this.http
      .get<SearchResponse>(`${this.serviceUrl}/search`, { params: params })
      .subscribe((resp) => {
        this.gifList = resp.data;
        console.log(this.gifList);
      });
  }
}
