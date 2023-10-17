namespace ProjectRequisition;

 

entity PurchaseRequisitionHeader {
  key PurchaseRequisitionID: String(10);
  Supplier: String(10);
  CompanyCode: String(4);
  PurchasingOrganization: String(4);
  PurchasingGroup: String(10);
  Status: String(10) default 'NEW';
}

 

entity PurchaseRequisitionItem {
  key PurchaseRequisitionItemID: String(5);
  PurchaseRequisitionID: Association to PurchaseRequisitionHeader;
  MaterialNumber: String(18);
  MaterialDescription: String(40);
  Quantity: Decimal(15, 2);
  QuantityUnit: String(3);
  NetPrice: Decimal(15, 2);
  CurrencyKey: String(3);
  TaxAmount: Decimal(15, 2);
}
using {
    cuid,
    managed
} from '@sap/cds/common';

entity Files: cuid, managed{
    @Core.MediaType: mediaType
    content: LargeBinary;
    @Core.IsMediaType: true
    mediaType: String;
    fileName: String;
    size: Integer;
    url: String;
}