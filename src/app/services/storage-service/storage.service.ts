import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BehaviorSubject } from 'rxjs';
import { UserData } from 'src/app/components/models/user-data';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class StorageService {
 
  public userData: UserData = {} as UserData;
  private behaviorSubjects: Map<string, BehaviorSubject<any>>;

  constructor() {

		console.warn('create storage service');
		this.behaviorSubjects = new Map<string, BehaviorSubject<any>>();
	}


  public getBehaviorSubject(identifier: string):BehaviorSubject<any> {

    let behaviorSubject: BehaviorSubject<any> | undefined = this.behaviorSubjects.get(identifier);
		if (!behaviorSubject) {
			behaviorSubject = new BehaviorSubject<any>(null);
			this.behaviorSubjects.set(identifier, behaviorSubject);
		}
    return behaviorSubject;
  }

  public getItem(identifier: string): BehaviorSubject<any> {
		const behaviorSubject = this.getBehaviorSubject(identifier);
		const item = localStorage.getItem('userData');
		behaviorSubject.next(item);
		return behaviorSubject;
	}

  public setItem(identifier: string, object: string): void {
		localStorage.setItem(identifier, object);
		this.getBehaviorSubject(identifier).next(object);
	}
  
  public removeItem(identifier: string): void {
		localStorage.removeItem(identifier);
		this.getBehaviorSubject(identifier).next(null);
	}

  public clear() {
		localStorage.clear();
		this.behaviorSubjects.forEach((behaviorSubject: BehaviorSubject<any>) => {
			behaviorSubject.next(null);
		});

		console.log('local storage cleared');
	}
}
