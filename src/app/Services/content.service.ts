import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class ContentService {
  private jsonUrl = '../../../public/assets/story.json';
  constructor(private http: HttpClient) {}

  getContent(): Observable<any> {
    return this.http.get<any>(this.jsonUrl);
  }
}
