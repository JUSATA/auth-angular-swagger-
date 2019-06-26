import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject,throwError } from 'rxjs';
import { Router } from '@angular/router';
import { Cliente } from './cliente';
import { map } from 'rxjs/operators';
export interface Todo{
  id: number | string;
  createdAt: number;
  value: string;
}


@Injectable()
export class ClienteService {
  private urlEndPoint: string = 'http://localhost:21018/api/Authentication/listar/';
  todos: Observable<Todo[]>
  private _todos: BehaviorSubject<Todo[]>;
  private baseUrl: string;
  private dataStore: {
    todos: Todo[]
  };
  constructor(private http: HttpClient, private router: Router) {
  }

  loadAll() {
    this.http.get<Todo[]>(`${this.baseUrl}/todos`).subscribe(data => {
      this.dataStore.todos = data;
      this._todos.next(Object.assign({}, this.dataStore).todos);
    }, error => console.log('Could not load todos.'));
  }

  load(id: number | string) {
    debugger;
    this.http.get<Todo>(`${this.urlEndPoint}/${id}` +id).subscribe(data => {
      let notFound = true;

      this.dataStore.todos.forEach((item, index) => {
        if (item.id === data.id) {
          this.dataStore.todos[index] = data;
          notFound = false;
        }
      });

      if (notFound) {
        this.dataStore.todos.push(data);
      }

      this._todos.next(Object.assign({}, this.dataStore).todos);
    }, error => console.log('Could not load todo.'));
  }

  create(todo: Todo) {
    this.http.post<Todo>(`${this.baseUrl}/todos`, JSON.stringify(todo)).subscribe(data => {
      this.dataStore.todos.push(data);
      this._todos.next(Object.assign({}, this.dataStore).todos);
    }, error => console.log('Could not create todo.'));
  }

  update(todo: Todo) {
    this.http.put<Todo>(`${this.baseUrl}/todos/${todo.id}`, JSON.stringify(todo)).subscribe(data => {
      this.dataStore.todos.forEach((t, i) => {
        if (t.id === data.id) { this.dataStore.todos[i] = data; }
      });

      this._todos.next(Object.assign({}, this.dataStore).todos);
    }, error => console.log('Could not update todo.'));
  }

  getCliente(id): Observable<any> {
    return this.http.get(this.urlEndPoint+id);
  }

  remove(todoId: number) {
    this.http.delete(`${this.baseUrl}/todos/${todoId}`).subscribe(response => {
      this.dataStore.todos.forEach((t, i) => {
        if (t.id === todoId) { this.dataStore.todos.splice(i, 1); }
      });

      this._todos.next(Object.assign({}, this.dataStore).todos);
    }, error => console.log('Could not delete todo.'));
  }
}