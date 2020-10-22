import { DOM } from './dom.js'
export class Component {
  constructor(){
    
  }
  create( args, callback ){
    if( typeof callback === 'function' ) args.mount = callback;
    DOM.shadow( args )
  }
}