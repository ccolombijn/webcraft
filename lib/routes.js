import {View} from './views.js';
import {Controller} from './controllers.js';
import {utils} from './utils.js'
export class Router{
  constructor(){
    this.routes = new Object({});
    this.views = new Array([]);
    this.controllers = new Object({});
    console.log('test')
    window.addEventListener('popstate',function(event) {
      event.preventDefault()
      console.log(`location: ${document.location}, state: ${JSON.stringify(event.state)}`)
    });
  }
  /**
   * Adds view / controller to 
   * @param {*} args 
   * @param {*} callback 
   */
  add( args, callback ){
    const view = new View;
    const controller = new Controller;
    const thisRoute = Object.getOwnPropertyNames(args)[0];
    const thisView = Object.getOwnPropertyNames(args[ thisRoute ])[0];
    this.routes[ thisRoute ] = thisView
    const thisController = args[ thisRoute ][ thisView ];
    const addView = view.add(thisView,callback);
    
    this.views.push(addView);
    const addController = controller.add(thisController);
    this.controllers[args] = addController;
    
  }
  /**
   * 
   * @param {*} route 
   */
  push( route ){
    const currentRoute = this.routes[ route ];
    window.history.pushState(currentRoute.id, `${id}`,currentRoute.route);
  }
}