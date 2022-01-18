import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EnvService {
  baseUrl = "oldBase";
  constructor() { }
}


export class EnvExService{
  baseUrl="exBase";
}