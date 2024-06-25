import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { IAlbum } from '../../albums/ialbum';
@Injectable({
  providedIn: 'root'
})
export class AlbumNotificationService {
  isValidForm$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  selectedAlbum$: BehaviorSubject<IAlbum> = new BehaviorSubject<IAlbum>({} as IAlbum);

  // public set setIsValidForm(value: boolean) { 
  //   this.isValidForm$.next(value);
  // }

  // public get getIsValidForm() { 
  //   return this.isValidForm$.getValue();
  // }


  constructor() { }

  ngOnDestroy(): void {

    this.isValidForm$.unsubscribe();
    this.selectedAlbum$.unsubscribe();
    
  }

}
