import { ChangeDetectionStrategy, EventEmitter, Input, Output } from '@angular/core';
import { Component } from '@angular/core';
import { ICatInfo } from 'src/app/types/cat-info.interface';



@Component({
  selector: 'app-cat-photo-card',
  templateUrl: './cat-photo-card.component.html',
  styleUrls: ['./cat-photo-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CatPhotoCardComponent {
  @Input() catCard: ICatInfo = {} as ICatInfo;
  @Output() onCardBtnClick = new EventEmitter();
}
