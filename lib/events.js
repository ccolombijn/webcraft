export class Event {
  constructor(){
    this.eventSource
  }
  /**
   * https://developer.mozilla.org/en-US/docs/Web/API/Server-sent_events
   * @param {*} args 
   * @param {*} callback 
   */
  source( args, callback ){
    const eventSource = new EventSource(args);
    this.eventSource = eventSource;
    if( typeof callback === 'function' )
      callback(eventSource);
    return eventSource;
  }
  /**
   * https://developer.mozilla.org/en-US/docs/Web/API/Server-sent_events/Using_server-sent_events#Event_stream_format
   * @param {*} args 
   * @param {*} callback 
   */
  listen( args = 'ping', callback ){
    this.eventSource.addEventListener(args,(event)=>{
      if( typeof callback === 'function' )
        callback(JSON.parse(event.data));
    })
  }
  /**
   * 
   */
  close(){
    this.eventSource.close(); 
  }
}