import { Component, Input, OnInit } from '@angular/core';
import { Product } from '../shared/app.const';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';

/**
 * Create a product component that has intuitive UI and UX.
 */
@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  standalone: true,
  imports: [IonicModule, CommonModule]
})
export class ProductComponent {
  @Input() productList: Product[] = []
  constructor() { }
}
