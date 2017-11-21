import * as firebase from 'firebase';
import { log } from 'util';
import { Router } from '@angular/router';
import { Injectable } from '@angular/core';

@Injectable()
export class AuthService{

    token: string;  

    constructor(private router: Router){

    }

    signupUser(email: string, password: string){
        firebase.auth().createUserWithEmailAndPassword(email, password)
            .catch(
                error => console.log(error)
            )
    }

    signinUser(email: string, password: string){
        firebase.auth().signInWithEmailAndPassword(email, password)
        .then(
            response => {
                this.router.navigate(['/']);
                firebase.auth().currentUser.getToken()
                .then(
                  (token: string) => this.token = token         
                )
            }         
        )
        .catch(
            error => console.log(error)
        )
            
    }

    getToken(){
        firebase.auth().currentUser.getToken()
        .then(
            (token: string) => this.token = token         
          )
        /*returns a promise - retrieves the token async, because it will not only retrieve it from local 
        storage, but it will also check if it's valid, and if it's not, it will
        reach to the backend and provide a new token */
        return this.token;
    }

    isAuthenticated(){
        return this.token != null;
    }

    logout(){
        firebase.auth().signOut();
        this.token = null;
    }
}