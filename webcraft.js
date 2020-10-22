import { Component } from './lib/components.js'
import { Event } from './lib/events.js'
import { Service } from './lib/services.js'
import { config } from './lib/config.js'
import { utils } from './lib/utils.js'
/**
 * 
 */
export const craft = function () {
  return {
    /**
     * 
     * @param {Object} args 
     * @param {Function} callback 
     */
    init( args, callback ){
      const appName = config.name;
      document.title = appName;
    },
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
      
    }
  }
}()
