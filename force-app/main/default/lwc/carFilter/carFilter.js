import { LightningElement, wire } from 'lwc';
import { getObjectInfo, getPicklistValues } from "lightning/uiObjectInfoApi";
import CARS_FILTERED_MSGCHANNEL from "@salesforce/messageChannel/carsFiltered__c";
// Import message service features.
import {
  publish,
  MessageContext
} from 'lightning/messageService';
// car Schema
import CAR_OBJECT from "@salesforce/schema/Car__c";
import CATEGORY_FIELD from "@salesforce/schema/Car__c.Category__c";
import MAKE_FIELD from "@salesforce/schema/Car__c.Make__c";
const CATEGORY_ERROR = "Error Loading Categories"
const MAKE_ERROR = "Error Loading Make Data"
export default class CarFilter extends LightningElement {
  filters = {
    searchKey: '',
    maxPrice: 999999
  }
  categoryError = CATEGORY_ERROR;
  makeError = MAKE_ERROR;
 timer;

  // To pass scope, you must get a message context.
  @wire(MessageContext)
  messageContext;

  // fetching Car Object Data 
  @wire(getObjectInfo, { objectApiName: CAR_OBJECT })
  carObjectInfo;
  // fetching Category picklist values
  @wire(getPicklistValues, { recordTypeId: '$carObjectInfo.data.defaultRecordTypeId', fieldApiName: CATEGORY_FIELD })
  categories
  // fetching Make picklist values
  @wire(getPicklistValues, { recordTypeId: '$carObjectInfo.data.defaultRecordTypeId', fieldApiName: MAKE_FIELD })
  makeType

  //   search key handler
  handleSearchKeyChange(event) {
    this.filters = { ...this.filters, "searchKey": event.target.value };
    this.sendDataToCarList();
  }

  // Price Range Handler
  handleMaxPriceChange(event) {
    this.filters = { ...this.filters, "maxPrice": event.target.value };
    this.sendDataToCarList();
  }

  handleCheckBox(event) {
    if(!this.filters.categories){
        const categories = this.categories.data.values.map((item)=> item.value);
        const makeType = this.makeType.data.values.map((item)=> item.value);
        this.filters = { ...this.filters, categories,makeType};
    }
    const {checked} = event.target
    const { name, value } = event.target.dataset;

    if(checked){
      if(!this.filters[name].includes(value)){
            this.filters[name] = [...this.filters[name], value];
         }
    }else{
      this.filters[name] = this.filters[name].filter((item) => item !== value)
    }
    
    this.sendDataToCarList();
  }

  
  sendDataToCarList() {
    window.clearTimeout(this.timer);
    this.timer = window.setTimeout(()=>{
      const payload = { filters: this.filters };
      publish(this.messageContext, CARS_FILTERED_MSGCHANNEL, payload);
    },400);
    
  }

}