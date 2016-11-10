import {dataServices} from 'data-services';

@inject(dataServices)
export class dataWorkout {
    getURL: 'workouts'
    constructor(dataServices) {
        this.dataServices = dataServices;
    }
    getWorkouts(id){
        //if(!id){
        return this.dataServices.getJson(this.gerURL);
        //}
    }
}