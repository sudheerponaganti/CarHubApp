CarHub is a single page application to access all the car data and filter it accordinging to one's necessity.

It is a combination of Aura and Lightning Web Framework

These are the components created for CarHubApp

Aura Component
1) pageTemplate
Created a custom Home Page template using aura component which can host componets in 2 7 3 grid.


Lightning Web Components
1) carFilter
2) carTileList
3) carCard
4) similarCars
5) carPlaceHolder

carFilter:
1) Filter component is designed to provide an input box to filter based on carName and a slider to filter based on MSRP__c(Car Price) and categories checkBoxes (Category__c) and makeType checkBoxes (makeType__c).
2) Utilizing LMS(Lightning Message service) to publish filter Options to "CarTileList" component.

carTileList:
1) This component is used to display all the cars in a layout format By calling an apex class called "CarController.cls" using wire adapter.
2) Utilizing LMS(Lightning Message service) to subscribe to "carFiltered.messageChannel" so that if there any changes made in filter component those will be captured and call apex accordingly by leveraging Dynamic SOQL query.
3) By clicking on each car , publishing the recordId to carCard component using LMS.

carCard:
1) carCard component is used to showcase the required data of a particular car using Lightning record view form.
2) By subscribing to "carSelected.messageChaneel", getting the recordId to view the data of a particular car Record.

similarCars:
1) This is used in carRecordPage to show all the similar cars based on makeType By calling an apex method "getSimilarCars".