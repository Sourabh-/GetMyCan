import { Injectable } from '@angular/core';

@Injectable()
export class StorageService {

  constructor() { }

  getFromLS(key = null, isJSON) {
    return key ?
      localStorage[key] && isJSON ? JSON.parse(localStorage[key]) :
      localStorage[key] : localStorage;
  }

  setInLS(key, value, isJSON?) {
    localStorage.setItem(key, isJSON ? JSON.stringify(value) : value);
  }

  deleteFromLS(key) {
    localStorage.removeItem(key);
  }
}
