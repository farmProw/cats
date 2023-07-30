import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select'
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatIconModule } from '@angular/material/icon';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CatSearchComponent } from './components/cat-search/cat-search.component';
import { CatGalleryComponent } from './components/cat-gallery/cat-gallery.component';
import { CatPhotoCardComponent } from './components/cat-photo-card/cat-photo-card.component';
import { CatApiInterceptor } from './interceptors/cat-api.interceptor';
import { LoaderComponent } from './shared/components/loader/loader.component';
import { CatDescriptionsCardComponent } from './components/cat-descriptions-card/cat-descriptions-card.component';
import { HeaderComponent } from './shared/components/header/header.component';
import { FooterComponent } from './shared/components/footer/footer.component';
import { StarRatingComponent } from './shared/components/star-rating/star-rating.component';


@NgModule({
  declarations: [
    AppComponent,
    CatSearchComponent,
    CatGalleryComponent,
    CatPhotoCardComponent,
    LoaderComponent,
    CatDescriptionsCardComponent,
    HeaderComponent,
    FooterComponent,
    StarRatingComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    MatAutocompleteModule,
    MatProgressSpinnerModule,
    MatIconModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: CatApiInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
