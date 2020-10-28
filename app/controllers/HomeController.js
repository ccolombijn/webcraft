import {Controller} from './../controllers.js'
export class HomeController extends Controller {
  constructor(){
    super()
  }
  index(){
    return ('Hello world!')
  }
}