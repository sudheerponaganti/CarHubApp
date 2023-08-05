import { LightningElement,wire} from 'lwc';
import { getFieldValue } from 'lightning/uiRecordApi';
// car Schema
import CAR_OBJECT from "@salesforce/schema/Car__c";
import NAME_FIELD from "@salesforce/schema/Car__c.Name";
import PICTURE_URL_FIELD from "@salesforce/schema/Car__c.Picture_URL__c";
import CATEGORY_FIELD from "@salesforce/schema/Car__c.Category__c";
import MAKE_FIELD from "@salesforce/schema/Car__c.Make__c";
import FUEL_FIELD from "@salesforce/schema/Car__c.Fuel_Type__c";
import SEATS_FIELD from "@salesforce/schema/Car__c.Number_of_Seats__c";
import MSRP_FIELD from "@salesforce/schema/Car__c.MSRP__c";
import CONTROL_FIELD from "@salesforce/schema/Car__c.Control__c";

// Import message service features required for subscribing and the message channel
import {
    subscribe,
    unsubscribe,
    MessageContext
  } from "lightning/messageService";
import CAR_SELECTED_MSGCHANNEL from "@salesforce/messageChannel/carSelected__c";

import { NavigationMixin } from 'lightning/navigation';
export default class CarCard extends NavigationMixin(LightningElement) {
    subscription = null;
    recordId;

    // exposing fields to make available in Template
    categoryField = CATEGORY_FIELD;
    msrpField = MSRP_FIELD;
    makeField = MAKE_FIELD;
    fuelField = FUEL_FIELD;
    seatsField = SEATS_FIELD;
    controlField  = CONTROL_FIELD;
    
    carName = "Car Card";
    carPictureUrl;


    @wire(MessageContext)
    messageContext;


    handleRecordLoaded(event){
     const {records} = event.detail;
     const recordData = records[this.recordId];
     this.carName = getFieldValue(recordData,NAME_FIELD);
     this.carPictureUrl = getFieldValue(recordData,PICTURE_URL_FIELD );
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
        CAR_SELECTED_MSGCHANNEL,
        (message) => this.handleSelectCarId(message)
      );
    }
  }

  unsubscribeToMessageChannel() {
    unsubscribe(this.subscription);
    this.subscription = null;
  }

  handleSelectCarId(msg){
      this.recordId = msg.carId;
      }


  handleNavigateToRecord(){
  // Navigate to Car record page
  this[NavigationMixin.Navigate]({
    type: 'standard__recordPage',
    attributes: {
        recordId: this.recordId,
        objectApiName: CAR_OBJECT.objectApiName,
        actionName: 'view'
    }
    })
  }
}