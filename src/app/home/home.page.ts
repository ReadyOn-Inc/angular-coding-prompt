import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { map, of } from 'rxjs';
import { ProductComponent } from '../components/product.component';
import { CategoryService } from '../services/category.service';
import { ProductService } from '../services/product.service';
import { Category, Product } from '../shared/app.const';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, ProductComponent],
})
export class HomePage {
  // private productService = inject(ProductService);
  // private categoryService = inject(CategoryService);


  productList: Product[] = []
  productListFiltered: Product[] = []



  categoryList: Category[] = [];
  categorySelected!: number;
  isAvailable = false;
  filterField!: string;
  
  constructor(
    private categoryService: CategoryService,
    private productService: ProductService
    ) {
    this.getCategoryData()
    this.getAllProducts()
  }

  selectionCategoryChange(e: any) {
    this.categorySelected = e.detail.value
    this.doFilter()
  }

  selectionAvaliableChange(e: any) {
    this.isAvailable = e.detail.checked
    this.doFilter()
  }

  inputFilterChange(e: any) {
    this.filterField = e.detail.value
    this.doFilter()
  }

  private filterMap(e: Product) {
    let valid = e.category.id == this.categorySelected && e.isAvailable == this.isAvailable
    if (this.filterField) {
      valid = e.category.id == this.categorySelected && e.isAvailable == this.isAvailable && (
        e.name.includes(this.filterField) || e.description.includes(this.filterField))
    }
    return valid
  }

  private doFilter() {
    of(this.productList).pipe(
      map(f => {
        return f.filter(e => this.filterMap(e))
      })).subscribe({
        next: (p: Product[]) => {
          this.productListFiltered = p
        }
      })
  }

  private getCategoryData() {
    this.categoryService.get().subscribe({
      next: (c: Category[]) => {
        this.categoryList = c
      }
    })
  }

  private getAllProducts() {
    this.productService.get().subscribe({
      next: (p: Product[]) => {
        this.productList = p
      }
    })
  }
}
