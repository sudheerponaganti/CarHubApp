CARHUB APPLICATION

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

![image](https://github.com/sudheerponaganti/CarHubApp/assets/85873651/9c97f1d0-665a-4800-bc6e-8baee2ebba00)

carTileList:
1) This component is used to display all the cars in a layout format By calling an apex class called "CarController.cls" using wire adapter.
2) Utilizing LMS(Lightning Message service) to subscribe to "carFiltered.messageChannel" so that if there any changes made in filter component those will be captured and call apex accordingly by leveraging Dynamic SOQL query.
3) By clicking on each car , publishing the recordId to carCard component using LMS.

![image](https://github.com/sudheerponaganti/CarHubApp/assets/85873651/97fa4dcb-df3a-4377-b6ad-6bf5380b80c6)


carCard:
1) carCard component is used to showcase the required data of a particular car using Lightning record view form.
2) By subscribing to "carSelected.messageChaneel", getting the recordId to view the data of a particular car Record.

![image](https://github.com/sudheerponaganti/CarHubApp/assets/85873651/452e0754-c70b-46c9-996f-a2947d39b34d)

similarCars:
1) This is used in carRecordPage to show all the similar cars based on makeType By calling an apex method "getSimilarCars".

![image](https://github.com/sudheerponaganti/CarHubApp/assets/85873651/d4df48cd-ae0a-4248-b31c-2d20d049cfcc)

![image](https://github.com/sudheerponaganti/CarHubApp/assets/85873651/fca6a46a-490b-44e2-910f-7454d24d2e54)

