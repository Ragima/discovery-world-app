import { Component, OnInit } from '@angular/core';
import { Customer } from '../models/customer.model';
import { PagingConfig } from '../models/paging-config.model';
import { CustomerService } from '../../services/customer/customer.service';

@Component({
  selector: 'app-postpagin',
  templateUrl: './postpagin.component.html',
  styleUrls: ['./postpagin.component.scss']
})
export class PostpaginComponent implements PagingConfig {
  title = 'ngx-paging-sample';

  currentPage:number  = 1;
  itemsPerPage: number = 5;
  totalItems: number = 0;

  tableSize: number[] = [5, 10, 15, 20];
  pagingConfig: PagingConfig = {} as PagingConfig;
  
  customers = new Array<Customer>();


  constructor(private customerService: CustomerService){
    this.getCustomers();

    this.pagingConfig = {
      itemsPerPage: this.itemsPerPage,
      currentPage: this.currentPage,
      totalItems: this.totalItems
    }
  }

  getCustomers(){
    this.customerService.getCustomers()
    .subscribe((res: any)=> {
      console.log('res', res)
      this.customers = res;
      this.pagingConfig.totalItems = res.length;
    });
  }

  onTableDataChange(event:any){
    this.pagingConfig.currentPage  = event;
    this.getCustomers();
  }
  onTableSizeChange(event:any): void {
    this.pagingConfig.itemsPerPage = event.target.value;
    this.pagingConfig.currentPage = 1;
    this.getCustomers();
  }
}
