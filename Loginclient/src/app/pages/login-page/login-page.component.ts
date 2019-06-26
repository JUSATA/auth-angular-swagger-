import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup} from '@angular/forms';
import { DataService } from '../../services/data.service';
import { Router } from '@angular/router';
 
@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  providers: [DataService]
})
export class LoginPageComponent implements OnInit {
  public form: FormGroup;
  public errors: any[] = [];
 
  constructor(private fb: FormBuilder, private dataService: DataService, private router: Router) { 
    var tokenClient = localStorage.getItem('loginWebApp.token');
    if(tokenClient){
      this.router.navigateByUrl('/home');
    }
 
    this.form = this.fb.group({
      username: ['',Validators.compose([
        Validators.minLength(3),
        Validators.maxLength(30),
        Validators.required
      ])],
      password:['',Validators.compose([
        Validators.minLength(6),
        Validators.maxLength(20),
        Validators.required
      ])]
    });
  }
 
  ngOnInit() {
  }
 
  submit(){
    this.dataService
      .authenticate(this.form.value)
      .subscribe(result => {
        localStorage.setItem('loginWebApp.token', result.access_token);
        localStorage.setItem('loginWebApp.user', result.nome);
        this.router.navigateByUrl('/home');
      }, error => {
        if(error.status == 0){
          alert('Server Unavailable... :(')    
        }
        else {
          this.errors = JSON.parse(error._body);
          alert('Status: ' + error.status + ' \nResponse: ' + JSON.stringify(this.errors));
        }
      });
  }
 
}