using ProjectRequisition as db from '../db/data-model';

service CatalogService {
     entity PurchaseRequisitionHeaders as projection on db.PurchaseRequisitionHeader;
     entity PurchaseRequisitionItems as projection on db.PurchaseRequisitionItem;
     action Submit(payload: String) returns String;
     entity Files as projection on db.Files
}
