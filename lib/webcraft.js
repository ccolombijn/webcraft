import { Component } from './components.js'
import { Event } from './events.js'
import { Service } from './services.js'
import { Router } from './routes.js'
import { config } from './config.js'
import { utils } from './utils.js'
/**
 * 
 */
export const craft = function () {
  (()=>{
    config.then((config)=>{
      const router = new Router;
      config.routes.forEach((route)=>{
        router.add(route);
      });
      const appName = config.name;
      document.title = appName;
      document.getElementsByTagName('script')[0].remove()
    });
    
  })()
  return {
  
    
    /**
     * 
     * @param {Object} args 
     * @param {Function} callback 
     */
    component( args, callback ){
      return {
        create(){
          const component = new Component;
          component.create( args, callback );
          return component;
        }
      }
      
    },config : config
  }
}()
