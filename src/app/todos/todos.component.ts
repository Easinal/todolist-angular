import { Component, OnInit, Input } from '@angular/core';
import { Todo } from '../todo';
import { TodoService } from '../todo.service';

@Component({
  selector: 'app-todos',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.css']
})
export class TodosComponent implements OnInit {
  todos: Todo[] = [];
  Filter: string = "all";

  constructor(
    private todoService: TodoService
  ) { }

  ngOnInit(): void {
    this.getTodos();
  }

  getTodos(): void {
    console.log("initializing");
    this.todoService.getTodos().subscribe(todos =>
      (this.todos = todos));
  }

  add(newname: string): void {
    newname = newname.trim();
    console.log("adding");
    
    if (!newname) { return; }
    const newtodo: Todo ={
      id: Math.random(),
      name: newname,
      checked: false
    };
    this.todos.push(newtodo);
  }

  delete(deleteid: number): void {
    console.log("deleting");
    var k = 0;
    for(let i of this.todos){
      if(i.id==deleteid){
        this.todos.splice(k, 1);
        break;
      }
      else{
        ++k;
      }
      
    }
  }

  changeFilter(newfilter: string): void{
    this.Filter = newfilter;
    console.log(newfilter);
  }

  CheckFilter(type: boolean){
    return this.todos.filter(todo => todo.checked == type);
  }
}
