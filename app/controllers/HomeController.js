import {Controller} from './../controllers.js'
import {Component} from './../components.js'
export class HomeController extends Controller {
  constructor(){
    super()
  }
  index(){
    const welcomeComponent = new Component;
    welcomeComponent.create({
      component : 'welcomeComponent',
      mount(){
        
      }
    })
    return ('Hello world!')
  }
}