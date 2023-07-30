import { Injectable, inject } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpHeaders,
} from '@angular/common/http';
import { CatApiService } from '../services/cat-api.service';
import { finalize } from 'rxjs';
import { LoadingService } from '../services/loading.service';
import {  API_KEY } from '../configs';

@Injectable()
export class CatApiInterceptor implements HttpInterceptor {
  constructor() {}
  private loadingService = inject(LoadingService);
  private catApiService = inject(CatApiService);

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    const authReq = req.clone({
      params: req.params.set('api-key', `${API_KEY}`),
    });
	 this.loadingService.showLoading();
    return next.handle(authReq).pipe(
      finalize(() => {
        this.loadingService.hideLoading(); 
      })
    );
  }
}
