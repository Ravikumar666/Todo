import { DialogRef } from '@angular/cdk/dialog';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.scss'],
})
export class AddProductComponent {
  list: any = ['Brand New', 'Second Hand', 'Service'];
  productFrom!: FormGroup;
  constructor(
    private fb: FormBuilder,
    private api: ApiService,
    private DailogRef: DialogRef<AddProductComponent>
  ) {}
  ngOnInit() {
    this.productFrom = this.fb.group({
      ProductName: ['', Validators.required],
      catagory: ['', Validators.required],
      date: ['', Validators.required],
      freshness: ['Brand New'],
      Price: ['', Validators.required],
      comment: ['', Validators.required],
    });
  }
  addProduct() {
    if (this.productFrom.valid) {
      this.api.PostProduct(this.productFrom.value).subscribe({
        next: (res: any) => {
          alert('product Add success');
          this.productFrom.reset();
          this.DailogRef.close(res);
        },
        error: (err: any) => {
          console.log('error alert');
          console.log(err);
        },
      });
    }
  }
}
