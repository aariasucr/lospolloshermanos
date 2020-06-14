import { Injectable } from '@angular/core';
import {AngularFireDatabase} from '@angular/fire/database';
import {AngularFireAuth} from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class CommentService {

  constructor(private firebaseDatabase: AngularFireDatabase,
              private firebaseAuth: AngularFireAuth) { }


}
