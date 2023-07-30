import { AfterViewInit, Component, Input, OnInit, inject } from '@angular/core';
import { defineComponents, IgcRatingComponent } from 'igniteui-webcomponents';
import { ICatInfo } from 'src/app/types/cat-info.interface';

defineComponents(IgcRatingComponent);


@Component({
  selector: 'app-cat-descriptions-card',
  templateUrl: './cat-descriptions-card.component.html',
  styleUrls: ['./cat-descriptions-card.component.scss'],
  // changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CatDescriptionsCardComponent implements OnInit, AfterViewInit {
  @Input() catCards: any;
  starCount = 5;
  ngOnInit(): void {}
  ngAfterViewInit(): void {}
}
