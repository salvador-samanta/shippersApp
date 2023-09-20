import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { IShipper } from '../interface/IShipper';

@Injectable({
  providedIn: 'root'
})
export class ShippersService {
  private baseUrl: string = environment.baseUrl;
  constructor(private http: HttpClient) { }

  get(): Observable<IShipper[]>{
    return this.http.get<IShipper[]>(this.baseUrl);
  }
  
  post(json: IShipper): Observable<IShipper>{
    return this.http.post<IShipper>(this.baseUrl, json);
  }

  update(id: number, json: IShipper): Observable<IShipper>{
    return this.http.post<IShipper>(`${this.baseUrl}/${id}`,json);
  }

  delete(id: number){
    return this.http.delete(`${this.baseUrl}/${id}`);
  }
}
