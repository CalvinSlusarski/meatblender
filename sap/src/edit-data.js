import {DialogController} from 'aurelia-dialog';

export class EditData {
  static inject = [DialogController];
  data;// = { firstName: '' };
  hasFocus = true;
  constructor(controller){
    this.controller = controller;
  }
  activate(data){
    console.log(data);
    this.data = data;
  }
}