import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { BehaviorSubject, Observable, EMPTY } from 'rxjs';
import { catchError, map, retry, take, tap } from 'rxjs/operators';
import {
  BASE_URL,
  API_KEY,
  GET_PICTURE_ALL_CATS,
  GET_DESCRIPTIONS_ALL_CATS,
  GET_PICTURE,
} from '../configs';
import { ICatPhoto } from '../types/cat-photo.interfase';
import { ICatInfo } from '../types/cat-info.interface';
import { SpecialistCatsCardData } from '../utils/specialist-cats-card-data.helper';
import { ChooseRequestEnum } from '../enums/choose-request.enum';
import { ICatFlagData } from '../types/cat-flag-data.interface';

@Injectable({
  providedIn: 'root',
})
export class CatApiService {
  private setCatsImages$ = new BehaviorSubject<ICatFlagData<ICatInfo[]>>(
    {} as ICatFlagData<ICatInfo[]>
  );
  public getCatsImages$ = this.setCatsImages$.asObservable();
  private setAllBreeds$ = new BehaviorSubject<ICatInfo[] | []>([]);
  public getAllBreeds$ = this.setAllBreeds$.asObservable();
  constructor(private http: HttpClient) {
    this.getCatsImages$.subscribe((e) => {
    });
  }

  setAllBreeds() {
    this.http
      .get<ICatInfo[]>(BASE_URL + GET_DESCRIPTIONS_ALL_CATS)
      .pipe(
        catchError((e) => {
          return EMPTY;
        }),
        take(1),
        tap((breeds) => this.setAllBreeds$.next(breeds)),
        retry(3)
      )
      .subscribe();
  }

  requestCatsImages(breed: string = '', limit: number = 10) {
    let params = new HttpParams();
    params = params.set('limit', limit.toString());
    if (breed) {
      params = params.set('breed_ids', breed);
      this.http
        .get<ICatInfo[]>(BASE_URL + GET_PICTURE_ALL_CATS, {
          params,
        })
        .pipe(
          catchError((e) => {
            return EMPTY;
          }),
          take(1),
          retry(3)
        )
        .subscribe((elems) => {
          this.setCatsImages$.next(
            new SpecialistCatsCardData(ChooseRequestEnum.BREEDS, elems)
          );
        });
    } else {
      this.http
        .get<ICatInfo[]>(BASE_URL + GET_DESCRIPTIONS_ALL_CATS, {
          params,
        })
        .pipe(
          catchError((e) => {
            return EMPTY;
          }),
          take(1),
          retry(3)
        )
        .subscribe((elems) => {
          this.setCatsImages$.next(
            new SpecialistCatsCardData(ChooseRequestEnum.ALL, elems)
          );
        });
    }
  }

  getCatAndDescription(id: string) {
    if (id) {
      return this.http.get(BASE_URL + GET_PICTURE + '/' + id);
    }
    return;
  }

  // getCatsBreedsExample(breed: string, limit: number) {
  //   let params = new HttpParams();
  //   if (breed) {
  //     params = params.set('breed_ids', breed);
  //   }
  //   if (limit) {
  //     params = params.set('limit', limit.toString());
  //   }
  //   return this.http.get(BASE_URL + GET_PICTURE_ALL_CATS, { params });
  // }
}
