import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { User } from '@angular/fire/auth';
import { StorageService } from 'src/app/services/storage-service/storage.service';
const _ = require("lodash"); 

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavbarComponent implements OnInit {
  public isAuth: boolean = false;
  public user: any = '';

  constructor( 
    private storageService: StorageService,
    private changeDetectorRef: ChangeDetectorRef,
    ) {
      this.storageService.getItem('userData').subscribe(val => {
        const userData = JSON.parse(val);
        if(userData) {
          this.user = _.cloneDeep(userData?.user);          //clear
          this.isAuth = _.cloneDeep(userData?.isAuth);      //clear
          this.changeDetectorRef.markForCheck();            //clear
        } else {  
          this.isAuth = false;
          this.user = {} as User;
        }
       })

      window.addEventListener('storage',(event) => {
    })
   }

  ngOnInit(): void {
    this.storageService.getItem('userData').subscribe(val => {
      if(val) {
        const userData = JSON.parse(val);        
        this.user = userData?.user;
        this.isAuth = userData?.isAuth;
        this.changeDetectorRef.markForCheck();
      } else {
        this.isAuth = false;
        this.user = {} as User;
      }
     })

    window.addEventListener('storage',(event) => {
    })
    // window.addEventListener('storage',(event) => {
    //   console.log('window--------------', event)
    //   this.storageService.getItem('userData').subscribe(val => {
    //     console.log('navBAr-------------', val)
    //     const userData = JSON.parse(val);
    //     if(userData) {
    //       this.user = userData?.user;
    //       this.isAuth = userData?.isAuth;
    //     } else {
    //       this.isAuth = false;
    //       this.user = {} as User;
    //     }
    //    })
    // })
  //  this.storageService.getItem('userData').subscribe(val => {
  //   const userData = JSON.parse(val);
  //   if(userData) {
  //     this.user = userData?.user;
  //     this.isAuth = userData?.isAuth;
  //   } else {
  //     this.isAuth = false;
  //     this.user = {} as User;
  //   }
  //  })
  }  
  onLogout() {
    this.storageService.clear()
  }
}
