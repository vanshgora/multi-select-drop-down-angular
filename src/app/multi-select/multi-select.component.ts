import { Component, Input, OnInit } from '@angular/core';


@Component({
  selector: 'app-multi-select',
  templateUrl: './multi-select.component.html',
  styleUrls: ['./multi-select.component.scss']
})
export class MultiSelectComponent implements OnInit {
  all: Array<{name:string, value:number, checked:boolean}> = [];
  selected = [];
  val:number;
  iterable = 0; 

  @Input()
  options: Array<any>;

  ngOnInit(){
    for(let option of this.options){
      this.iterable++;
      this.val = !isNaN(option[1])?option[1]:this.iterable
      this.all.push({name:option[0], value: this.val, checked:false})
    }
    this.iterable = 0;
  }

  onclicked(event: Event) {
    if (event.target instanceof HTMLInputElement) {
      this.all[+event.target.value - 1].checked = !this.all[+event.target.value - 1].checked;
      if (this.all[+event.target.value - 1].checked ) {
        this.selected.push(event.target.value);
      }
      else{
        this.selected.splice(this.selected.indexOf(event.target.value),1);
      }
    }
  }
}
