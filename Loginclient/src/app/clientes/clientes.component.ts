import { Component, OnInit ,ViewChild} from '@angular/core';
import { Cliente } from './cliente';
import { ClienteService } from './cliente.service';
import swal from 'sweetalert';
import { Http, Response, Headers, RequestOptions} from '@angular/http';
import { Observable, throwError } from 'rxjs';
import { map } from 'rxjs/operators';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html'
})
export class ClientesComponent implements OnInit {
 public clientes=[];
 collection = { count: 20, clientes: {}};

 config: any;
  constructor(private clienteService: ClienteService,private http: Http,private router: Router) { 


    this.config = {
      itemsPerPage: 5,
      currentPage: 1,
      totalItems: this.collection.count
    };
  }
  public ngOnInit(){
    debugger;
    return this.http.get('http://localhost:21018/api/Authentication/listar').subscribe(resp => {
      console.log(resp.json());
      this.clientes=resp.json();
  });
  
  }

  delete(cliente: Cliente) {
        return this.http.delete("http://localhost:21018/api/Authentication/delete/"+cliente).subscribe(resp => {
          swal({
            title: 'Eliminado con exito'
          })
          window.location.reload();

      });
  }

  pageChanged(event){
    this.config.currentPage = event;
  }
}
