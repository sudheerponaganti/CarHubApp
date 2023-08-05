import { LightningElement,wire,track} from 'lwc';
import getCars from '@salesforce/apex/CarController.getCars';
// Import message service features required for subscribing and the message channel
import {
    publish,
    subscribe,
    unsubscribe,
    MessageContext
  } from "lightning/messageService";
import CARS_FILTERED_MSGCHANNEL from "@salesforce/messageChannel/carsFiltered__c";
import CAR_SELECTED_MSGCHANNEL from "@salesforce/messageChannel/carSelected__c";

export default class CarTileList extends LightningElement {
    subscription = null;
    cars=[];
    error;
    @track filters={};

    @wire(MessageContext)
    messageContext;

    @wire(getCars, {filters : '$filters'})
    carsHandler({data,error}){
        if(data){
         this.cars = data;
        }
        if(error){
            this.error = error;
        }
    }

// Standard lifecycle hooks used to subscribe and unsubsubscribe to the message channel
  connectedCallback() {
    this.subscribeToMessageChannel();
  }

  disconnectedCallback() {
    this.unsubscribeToMessageChannel();
  }

// Encapsulate logic for Lightning message service subscribe and unsubsubscribe
  subscribeToMessageChannel() {
    if (!this.subscription) {
      this.subscription = subscribe(
        this.messageContext,
        CARS_FILTERED_MSGCHANNEL,
        (message) => this.handleFilterChanges(message)
      );
    }
  }

  unsubscribeToMessageChannel() {
    unsubscribe(this.subscription);
    this.subscription = null;
  }

  handleFilterChanges(msg){
//   console.log('mesg', msg.filters);
  this.filters = {...msg.filters};
  // console.log('filters are',JSON.parse(JSON.stringify(this.filters)))
  }

  carClickHandler(event){
    console.log('the id is ', event.currentTarget.dataset.id);
    const payload = {carId : event.currentTarget.dataset.id };
    publish(this.messageContext, CAR_SELECTED_MSGCHANNEL, payload);
  }
}