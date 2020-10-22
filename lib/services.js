export class Service {
  constructor(){
    // Service workers require HTTPS (http://goo.gl/lq4gCo). If we're running on a real web server
      // (as opposed to localhost on a custom port, which is allowed), then change the protocol to HTTPS.
      if ((!location.port || location.port == "80") && location.protocol != 'https:') {
        location.protocol = 'https:';
      }
      this.registration = await navigator.serviceWorker.ready;
  }
  /**
   * 
   * @param {*} args 
   * @param {*} callback 
   */
  register( args, callback ){
    if ('serviceWorker' in navigator) {
      if( typeof args === 'string'){
        navigator.serviceWorker.register(`/${args}.js`, {scope: './'}).then((registration)=> {
          this.registration = registration;
          if(typeof callback === 'function'){
            callback(registration)
          }
        }).catch(function(error) {
          // registration failed
          console.error('Service.register failed with ' + error);
        });
      }
    }
  }
  /**
   * 
   * @param {*} args 
   * @param {*} callback 
   */
  unregister( args, callback ){
    if(this.registration){
      registration.unregister().then(function(success) {
        if(success){
          if(typeof callback === 'function')
            callback(args)
        }else{

        }
      });
    }
  }
  index(){
    if ('index' in this.registration) {

      // Content Index API functionality
      const contentIndex = this.registration.index;
    
    }
  }
}