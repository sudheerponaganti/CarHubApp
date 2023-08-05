import { LightningElement,api,wire} from 'lwc';
import getSimilarCars from '@salesforce/apex/CarController.getSimilarCars';
import { getRecord } from 'lightning/uiRecordApi';
import MAKE_FIELD from "@salesforce/schema/Car__c.Make__c";
import { NavigationMixin } from 'lightning/navigation';

export default class SimilarCars extends NavigationMixin(LightningElement) {
    @api recordId;
     @api objectApiName
similarCars=[];
error;

    @wire(getRecord, {
        recordId: '$recordId',
        fields: [MAKE_FIELD]
    })
    car;

    fetchSimilarCars(){
        getSimilarCars({
            carId : this.recordId,
            makeType : [this.car.data.fields.Make__c.value]
        }).then((data)=>{
         this.similarCars = data;
        }).catch((error)=>{
            this.error = error
        })
    }

    handleViewDetails(event){
  // Navigate to Car record page
  this[NavigationMixin.Navigate]({
    type: 'standard__recordPage',
    attributes: {
        recordId: event.target.dataset.id,
        objectApiName: this.objectApiName,
        actionName: 'view'
    }
    })
    }
}