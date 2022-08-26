import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem,
  CdkDrag
} from '@angular/cdk/drag-drop';
import { SplitwindowService } from 'src/app/services/splitwindow.service';

@Component({
  selector: 'app-join-page',
  templateUrl: './join-page.component.html',
  styleUrls: ['./join-page.component.css']
})
export class JoinPageComponent implements OnInit {
  operations: any = ['>', '<', '==', '!=', '>=', '<='];
  myJoinForm: FormGroup;
  leftcolumn:any=['cloumn_1','column_2','column_3'];
  statusClass = 'not-active';
  innerClass = 'not-active';
  leftClass = 'not-active';
  rightClass = 'not-active';
  rightcolumn:any=['cloumn_4','column_5','column_6'];
  dropdown1="";
  dropdown2="";
  dropdown3="";
  leftSource:boolean=false;
  rightSource:boolean=false;
  operation:boolean=false;
  leftSource1:boolean=false;
  rightSource1:boolean=false;
  operation1:boolean=false;
  outerClicked:boolean=false;
  selectedDomain:any;
  selectedDomainData: any = [];
  selectedSource1:any;
  selectedSource2:any;
  all: any = [];

  source: any = [];

  source1 = <any[]>[];
  source2 = <any[]>[];
  constructor(private router: Router,private _splitwindowService: SplitwindowService) {
    
   }

  ngOnInit(): void {
    this.formIntitialization();
    this._splitwindowService.retrieveSelectedDomainName().subscribe((res: any) => {  
      this.selectedDomain=res;
      console.log(this.selectedDomain);
      // this.selectedDomainData.push(this.selectedDomain);
      // console.log(this.selectedDomainData);
      
      this.selectedSource1=this.selectedDomain[0];
      console.log(this.selectedSource1.domainName)
      this.selectedSource2=this.selectedDomain[1];
      this.all=this.selectedSource1.entities;
      this.source=this.selectedSource2.entities;
     }) 
  }
  formIntitialization() {
    this.myJoinForm = new FormGroup({
      datasource: new FormControl('', [Validators.required]),
      table: new FormControl('', [Validators.required]),
      column: new FormControl('', [Validators.required]),
      operation: new FormControl('', [Validators.required]),
     
    });
  }
  onBackClick() {
    this.router.navigate(['/createManifest']);
  }
  drop(event: CdkDragDrop<any[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    } 
    else {
      this.source1 = [event.item.data];
      this.leftSource=true;
      this.rightSource=true;
      this.operation=true;
      
    }
  }
  evenPredicate(item: CdkDrag<any>) {
    // return item.data % 2 === 0;
    return item.data;
  }
  noReturnPredicate() {
    return false;
  }
  dropSource(event: CdkDragDrop<any[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    } 
    else {
      this.source2 = [event.item.data];
      this.leftSource1=true;
      this.rightSource1=true;
      this.operation1=true;
    }
  }
  evenPredicateSource(item: CdkDrag<any>) {
    // return item.data % 2 === 0;
    return item.data;
  }
  noReturnPredicateSource() {
    return false;
  }
  outerJoinClick(){

    this.outerClicked=true;

  }
 
  onClear() {
    this.formIntitialization();
  }
  setActiveClass(){
    this.statusClass = 'active';
    this.innerClass = 'not-active';
    this.leftClass = 'not-active';
    this.rightClass = 'not-active';
  }
  setActiveInner(){
    this.statusClass = 'not-active';
    this.innerClass = 'active';
    this.leftClass = 'not-active';
    this.rightClass = 'not-active';
  }
  setActiveLeft(){
    this.statusClass = 'not-active';
    this.innerClass = 'not-active';
    this.leftClass = 'active';
    this.rightClass = 'not-active';
  }
  setActiveRight(){
    this.statusClass = 'not-active';
    this.innerClass = 'not-active';
    this.leftClass = 'not-active';
    this.rightClass = 'active';
  }

}
