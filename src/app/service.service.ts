import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})

export class ServiceService {

  constructor(private http: HttpClient) { }

  getUsers(): Observable<any> {
    return this.http.get<any>('https://jsonplaceholder.typicode.com/users');
  }

  saveUsers(data: any): Observable<any> {
    return this.http.post<any>('http://httpbin.org/post', data);
  }

}
