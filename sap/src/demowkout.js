//  import {Router, RouterConfiguration} from 'aurelia-router';

export class DemoWkOut{

  //router: Router;

  heading = 'Workout';
  theList = [{lift: 'Back squat', details:[{weight: 'BAR', unit: 'imperial',sets: 3, reps: 10},{weight: '135', unit: 'imperial',sets: 2, reps: 10},{weight: '155', unit: 'imperial',sets: 2, reps: 10}]},
                {lift: 'Hack squat', details:[{weight: 'BAR', unit: 'imperial',sets: 3, reps: 10},{weight: '135', unit: 'imperial',sets: 2, reps: 10}]}
  ];
  showAlert = function(){
      alert('hello world');
  }
//   configureRouter(config: RouterConfiguration, router: Router) {
//     config.map([
//       { route: ['', 'welcome'], name: 'welcome',       moduleId: './welcome',       nav: true, title: 'Welcome' },
//       { route: 'users',         name: 'users',         moduleId: './users',         nav: true, title: 'Github Users' },
//       { route: 'child-router',  name: 'child-router',  moduleId: './child-router',  nav: true, title: 'Child Router' },
//       { route: 'child-demowkout',  name: 'demowkout',  moduleId: './demowkout',  nav: true, title: 'Demo Workout' }
      
//     ]);

//     this.router = router;
//   }
    // constructor() {

    //}
}
