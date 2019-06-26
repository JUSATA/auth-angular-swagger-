import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions} from '@angular/http';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import swal from 'sweetalert';

@Injectable()
export class DataService{
    _apiUrl;

    constructor(private http: Http) {this._apiUrl = environment.apiendpoint;}
 
    authenticate(data: any){
        var dt = {password:data.password,username:data.username}
        let headers = new Headers({ 'Content-Type': 'application/json' }); 
        let options = new RequestOptions({ headers: headers });

        return this.http.post(this._apiUrl + 'api/Authentication/login', dt, options).pipe(map((res: Response) => res.json()));
        
    } 

    insert(data: any){
        console.log(data);
        var dt = {firstname: data.firstname, lastname: data.lastname,password: data.password,passwordrepeat: data.passwordrepeat,email: data.email, emailrepeat: data.emailrepeat, postcode: data.postcode}
        // "grant_type=password&username=" + data.username + "&password=" + data.password;
        let headers = new Headers({ 'Content-Type': 'application/json' }); 
        let options = new RequestOptions({ headers: headers });
        return this.http.post(this._apiUrl + 'api/Authentication/adduser', dt, options).pipe(map((res: Response) =>swal('Agregado correctamente')));

   
    } 
    update(data: any,ID){
        debugger;
        console.log(data);
        var dt = {ID: ID,firstname: data.firstname, lastname: data.lastname,password: data.password,passwordrepeat: data.passwordrepeat,email: data.email, emailrepeat: data.emailrepeat, postcode: data.postcode}
        console.log(dt);
        // "grant_type=password&username=" + data.username + "&password=" + data.password;
        let headers = new Headers({ 'Content-Type': 'application/json' }); 
        debugger;
        let options = new RequestOptions({ headers: headers });
        return this.http.post(this._apiUrl + 'api/Authentication/updateuser', dt, options).pipe(map((res: Response) =>swal('Agregado correctamente')));
    
    } 
    
}