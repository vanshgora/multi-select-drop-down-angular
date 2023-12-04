import { Component, Input, Output, OnInit, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';


@Component({
  selector: 'app-multi-select',
  templateUrl: './multi-select.component.html',
  styleUrls: ['./multi-select.component.scss']
})
export class MultiSelectComponent implements OnInit, OnChanges {
  all: Array<{count:number, name:string, value:any, checked:boolean}> = [];
  selected : Array<any> = [];
  val:number;
  iterable = 0; 
  checksTop = 0;
  isdropped = false;
  value:any;
  selectedItemIndex:string;

  @Input()
  options: any;
  
  @Input()
  checksDropped: boolean;

  @Output()
  selectedArrayChange: EventEmitter<any> = new EventEmitter<any>

  // async consoleopt(data:any){
  //   await console.log(data)
  // }

    ngOnInit(){
      
    // console.log(this.options);
    // this.initializeAll();
    this.checksTop = 150; 
    this.iterable = 0;
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['options'] && changes['options'].currentValue) {
      // 'options' has changed, and it has a value
      console.log(this.options)
      this.initializeAll();
    }
  }

  initializeAll(){
    for(let option of this.options){
      this.iterable++;
      // this.val = !isNaN(option[1])?option[1]:this.iterable
      this.all.push({count:this.iterable ,name:option, value: option , checked:false})
    }
  }

  onclicked(event: Event) {
    if (event.target instanceof HTMLInputElement) {
      this.selectedItemIndex = event.target.value;
      this.all[+this.selectedItemIndex - 1].checked = !this.all[+event.target.value - 1].checked;
      this.value = this.all.find(item => item.count === +this.selectedItemIndex)?.value
      if (this.all[+this.selectedItemIndex - 1].checked ) {
        console.log(this.value);
        this.selected.push(this.value);
      }
      else{
        this.selected.splice(this.selected.indexOf(this.value),1);
      }
    }
    this.selectedArrayChange.emit(this.selected);

    console.log(11)
  }

  onDisplayClick(){
    this.isdropped = !this.isdropped;
  }
}