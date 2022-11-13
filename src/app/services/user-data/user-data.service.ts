import { Injectable } from '@angular/core';
import { Database, ref } from '@angular/fire/database';
import { onValue } from '@firebase/database';
import { BehaviorSubject } from 'rxjs';
import { User } from 'src/app/components/models/user';

@Injectable({
  providedIn: 'root'
})
export class UserDataService {
 private users: User[] = [];
 public  users$: BehaviorSubject<User[]> = new BehaviorSubject<User[]>(
  this.users
);
  constructor(
    public database: Database,
  ) { 
    const starCountRef = ref(this.database, '/users');             //GET
    onValue(starCountRef, (snapshot) => {
     const data = snapshot.val();
     this.users = Object.entries(data).map(item => item[1]) as User[];
     this.users$.next(this.users);
   });
  }
}
