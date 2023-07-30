import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CatApiService } from '../../services/cat-api.service';
import { Observable, Subject, EMPTY } from 'rxjs';
import {
  catchError,
  map,
  mergeMap,
  retry,
  startWith,
  takeUntil,
  tap,
} from 'rxjs/operators';
import { ICatFilterOptions } from 'src/app/types/cat-filter-options.interface';
import { ChooseRequestEnum } from 'src/app/enums/choose-request.enum';
import { ICatFlagData } from 'src/app/types/cat-flag-data.interface';
import { ICatInfo } from 'src/app/types/cat-info.interface';
import { ICatPhoto } from 'src/app/types/cat-photo.interfase';

@Component({
  selector: 'app-cat-search',
  templateUrl: './cat-search.component.html',
  styleUrls: ['./cat-search.component.scss'],
})
export class CatSearchComponent implements OnInit, OnDestroy {
  private readonly destroy$ = new Subject();
  componentToggler = true;
  searchForm: FormGroup;
  filteredBreeds: ICatFilterOptions[] = [];
  breedOptions$!: Observable<ICatFilterOptions[]>;
  catImages$!: Observable<ICatInfo>;
  catImages: any[] = [];
  filterList: ICatFilterOptions[] = [];
  filteredOptions$!: Observable<ICatFilterOptions[]>;
  constructor(private fb: FormBuilder, private catApiService: CatApiService) {
    this.searchForm = this.fb.group({
      breedInput: [''],
      breed: [''],
      limit: [10, Validators.min(1)],
    });
  }

  ngOnInit(): void {
    this.initSearch();
    this.initOptionsList();
    this.catApiService.setAllBreeds();
    this.breedOptions$ = this.catApiService.getAllBreeds$;
    this.catApiService.requestCatsImages();

    this.catApiService.getCatsImages$
      .pipe(
        catchError((e) => {
          return EMPTY;
        }),
        map((breeds: ICatFlagData<ICatInfo[]>) => {
          if (breeds.name == ChooseRequestEnum.ALL) {
            this.componentToggler = true;
            return breeds.data.map((elem: ICatInfo) => {
              return this.catApiService.getCatAndDescription(
                elem.reference_image_id
              );
            });
          } else if (breeds.name == ChooseRequestEnum.BREEDS) {
            this.componentToggler = false;
            return breeds.data.map((elem: ICatInfo) => {
              return this.catApiService.getCatAndDescription(elem.id);
            });
          } else {
            return null;
          }
        })
      )
      .subscribe((e) => {
        this.catImages = [];
        if (e) {
          e.forEach((element: any) => {
            if (element) {
              element.subscribe((e: ICatPhoto) => {
                const existingElement = this.catImages.find(
                  (item) => item.id === e.id
                );
                if (!existingElement) {
                  this.catImages.push(e);
                }
              });
            }
          });
        }
      });
  }

  private _filter(value: string): ICatFilterOptions[] | [] {
    if (typeof value == 'string') {
      const filterValue = (value || '').toLowerCase();

      return this.filterList.filter((option) =>
        option.name.toLowerCase().includes(filterValue)
      );
    } else {
      return this.filterList;
    }
  }

  initSearch() {
    this.search();
  }
  // work
  initOptionsList() {
    this.catApiService.getAllBreeds$
      .pipe(
        catchError((e) => {
          return EMPTY;
        }),
        takeUntil(this.destroy$),
        map((breeds) => {
          return breeds.map((elem: ICatInfo) => ({
            id: elem.id,
            name: elem.name,
          }));
        }),
        retry(3)
      )
      .subscribe((optionsList) => {
        this.filterList = optionsList;
        this.filteredOptions$ = this.searchForm.controls[
          'breedInput'
        ].valueChanges.pipe(
          startWith(this.filterList),
          map((value) => this._filter(value || ''))
        );
      });
  }

  selectBreed(breedId: string): void {
    this.searchForm.patchValue({ breed: breedId });
  }

  resetBreeds() {
    this.searchForm.controls['breedInput'].patchValue('');
    this.displayFn('');
  }

  search(): void {
    const breed = this.searchForm.value.breedInput.trim();
    const limit = this.searchForm.value.limit;
    this.catApiService.requestCatsImages(breed, limit);
  }

  displayFn(breed: any): string {
    console.log(breed)
    return breed ? breed : '';
  }

  onCardBtnClick(id: string) {
    const breed = id;
    const limit = this.searchForm.value.limit;
    this.catApiService.requestCatsImages(breed, limit);
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.complete();
  }
}
