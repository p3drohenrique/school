import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface IApiResult {
  logradouro: string;
  bairro: string;
  localidade: string;
  uf: string;
  erro?: boolean;
}

@Injectable({
  providedIn: 'root',
})
export class ZipCodeService {
  constructor(private http: HttpClient) {}

  getAddressByZipCode(zipCode: string): Observable<IApiResult> {
    return this.http.get<IApiResult>(
      `https://viacep.com.br/ws/${zipCode}/json`
    );
  }
}
