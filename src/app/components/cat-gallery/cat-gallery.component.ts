import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { ICatInfo } from 'src/app/types/cat-info.interface';

@Component({
  selector: 'app-cat-gallery',
  templateUrl: './cat-gallery.component.html',
  styleUrls: ['./cat-gallery.component.scss'],
})
export class CatGalleryComponent {
  @Input() catCards: ICatInfo[] = [];
  @Output() onCardBtnClick = new EventEmitter();
}
