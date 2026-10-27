import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CurrencyPipe, NgClass, UpperCasePipe } from '@angular/common';
import { TruncatePipe } from '../../../pipes/truncate.pipe';

@Component({
  selector: 'app-product-card',
  imports: [NgClass,UpperCasePipe,CurrencyPipe, TruncatePipe],
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.css'
})
export class ProductCardComponent {
  @Input() product: any;
  @Output() viewDetails = new EventEmitter<number>();

  onViewDetails() {
    this.viewDetails.emit(this.product.id);
  }
}