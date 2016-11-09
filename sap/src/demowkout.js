import {EditData} from './edit-data';
import {DialogService} from 'aurelia-dialog';

export class DemoWkOut{
  static inject = [DialogService];


  heading = 'Workout';
  theList = [{lift: 'Back squat', details:[{weight: 'BAR', unit: 'imperial',sets: 3, reps: 10},{weight: '135', unit: 'imperial',sets: 2, reps: 10},{weight: '155', unit: 'imperial',sets: 2, reps: 10}]},
                {lift: 'Hack squat', details:[{weight: 'BAR', unit: 'imperial',sets: 3, reps: 10},{weight: '135', unit: 'imperial',sets: 2, reps: 10}]}];
  constructor(dialogService) {
    this.dialogService = dialogService;
  }

  addRep = function(item){
      let newRep = {weight: 'BAR', unit: 'imperial',sets: 3, reps: 10};
      item.details.push(newRep);
  }

  addExercise = function(){
    let newExercise = {lift: 'Back squat', details:[]}
    this.theList.push(newExercise);
  }
  removeExercise = function(item,detail){
    const index = item.details.indexOf(detail);
    setTimeout( () => {
      item.details.splice(index, 1);
    },0);
  }
  changeExcercise = function(item){
    this.dialogService.open({ viewModel: EditData, model: {title: 'Exercise Name', input: item.lift}}).then(response => {
      if (!response.wasCancelled) {
        item.lift = response.output;
        console.log('good - ', response.output);
      } else {
        // console.log('bad');
      }
      //console.log(response.output);
    });
  }
  changeWeight = function(detail){
    this.dialogService.open({ viewModel: EditData, model: {title: 'Weight', input: detail.weight}}).then(response => {
      if (!response.wasCancelled) {
        detail.weight = response.output;
        console.log('good - ', response.output);
      } else {
        // console.log('bad');
      }
      //console.log(response.output);
    });
  }
  changeSet = function(detail){
      this.dialogService.open({ viewModel: EditData, model: {title: 'Sets', input: detail.sets}}).then(response => {
      if (!response.wasCancelled) {
        detail.sets = response.output;
        console.log('good - ', response.output);
      } else {
        // console.log('bad');
      }
      //console.log(response.output);
    });
  }
  changeRep = function(detail){
      this.dialogService.open({ viewModel: EditData, model: {title: 'Reps', input: detail.reps}}).then(response => {
      if (!response.wasCancelled) {
        detail.reps = response.output;
        console.log('good - ', response.output);
      } else {
        // console.log('bad');
      }
      //console.log(response.output);
    });
  }
  

}
