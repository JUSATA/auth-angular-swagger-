import { Component, OnInit, Input } from '@angular/core';
import { DataService } from '../services/data.service';
import { Router, ActivatedRoute } from '@angular/router';
import swal from 'sweetalert';
import { ClienteService } from './cliente.service';
import { Cliente } from './cliente';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { debug } from 'util';
import { Http, Response, Headers, RequestOptions} from '@angular/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
@Injectable()
@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  providers: [DataService]
})
@Injectable()
export class FormComponent implements OnInit {

 // id = this.actRoute.snapshot.params['id'];
  public member: Member; 
  cliente: Cliente[] = [];
 // public cliente: any[] = [];
  public nameForm: FormGroup; 
  public submitted: boolean;
  public CLIENTEID;
  public serverName : string;
  public id:number;
debugger;
  public events: any[] = [];
  constructor(private clienteService: ClienteService,private route:ActivatedRoute, private dataService: DataService,
     private router: Router,private http: Http,
    private HttpClient: HttpClient,
    private fb: FormBuilder){}
      ngOnInit() {
        debugger;

        var parametro;
        
        this.route.params.subscribe( params =>
          parametro=+params['id']);
          if (parametro) {
            this.clienteService.getCliente(parametro).subscribe(
              (cliente: any) => {
                this.cliente = cliente
                debugger;
                console.log("Success " + cliente);
              },
              (err) => {
                console.log("Error: " + JSON.stringify(err));
              }
            );
          }
          const emailRegex = '^[a-z0-9]+(\.[_a-z0-9]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,15})$';
          // Initialise form here: 
          this.nameForm = this.fb.group({
          firstname: [null, [<any>Validators.required, <any>Validators.minLength(2),<any> Validators.pattern('^[a-zA-Z0-9._-]+$')]],
          lastname: [null, [<any>Validators.required, <any>Validators.minLength(2)]],
          email: [null, [<any>Validators.required, <any>Validators.pattern(emailRegex)]], 
          emailrepeat: [null, [<any>Validators.required, <any>Validators.pattern(emailRegex)]], 
          password: [null, [<any>Validators.required]], 
          passwordrepeat: [null, [<any>Validators.required]], 
          postcode: null
        })
        
  }

  create(): void {

    this.dataService
    .insert(this.nameForm.value)
    .subscribe(result => {
      console.log(this.nameForm.value);
      this.router.navigateByUrl('/home');
      swal('se a creado con exito'); 
    }, error => {
      if(error.status == 0){
        swal('Error en el servidor');      
      }
      else {
        swal('Status: ' + error.status + ' \nResponse: ' );
      }
    });
    this.submitted = true;
  }

  update(): void {
    this.id =this.cliente[0].ID;
    debugger
    this.dataService
    .update(this.nameForm.value,this.id)
    .subscribe(result => {
      console.log(this.nameForm.value);
      this.router.navigateByUrl('/home');
      swal('se a actualizado con exito'); 
    }, error => {
      if(error.status == 0){
        swal('Error en el servidor');      
      }
      else {
        swal('Status: ' + error.status + ' \nResponse: ' );
      }
    });
    this.submitted = true;
  }

}
  
  export interface Member { 
  ID:number;
  firstname?: string; 
  lastname: string; 
  password: string; 
  passwordrepeat: string;
  email: string; 
  emailrepeat: string; 
  postcode?: number;
  }