sap.ui.define([
  "sap/ui/core/mvc/Controller",
  "sap/ui/model/json/JSONModel",
  "sap/m/MessageToast",
  "sap/m/MessageBox"
],
  function (Controller, JSONModel, MessageToast, MessageBox) {
    "use strict";

    return Controller.extend("com.sap.purchasedemo.controller.View1", {
      onInit: function () {
        // Initialize your model here
        var oModel = new JSONModel({
          items: [],
        });
        this.getView().setModel(oModel);
      },

      onAddItemPress: function () {
        var oModel = this.getView().getModel();
        var aItems = oModel.getProperty("/items");
        aItems.push({
          PurchaseRequisitionItemID: "",
          MaterialNumber: "",
          MaterialDescription: "",
          Quantity: "",
          QuantityUnit: "",
          NetPrice: "",
          CurrencyKey: "",
          TaxAmount: ""
        });
        oModel.setProperty("/items", aItems);
      },
      onCancelpress: function () {

        var oView = this.getView();
        var oModel = oView.getModel();
        oView.byId("_IDGenInput1").setValue("");
        oView.byId("_IDGenInput2").setValue("");
        oView.byId("_IDGenInput3").setValue("");
        oView.byId("_IDGenInput4").setValue("");
        oView.byId("_IDGenInput5").setValue("");
        oView.byId("groupE").setSelected(true);
        oModel.setProperty("/items", []);
        oModel.refresh(true);

        MessageToast.show("Action cancelled successfully");

      },

      onDeleteItemPress: function () {
        var oTable = this.byId("itemsTable");
        var oModel = this.getView().getModel();

        // Get the selected item context
        var oSelectedItem = oTable.getSelectedItem();
        if (!oSelectedItem) {
          MessageToast.show("Select an item to delete.");
          return;
        }

        var oContext = oSelectedItem.getBindingContext();
        var iIndex = oContext.getPath().split("/")[2];

        // Get the current items and remove the selected item
        var aItems = oModel.getProperty("/items");
        aItems.splice(iIndex, 1);

        // Update the model with the updated items
        oModel.setProperty("/items", aItems);

        MessageToast.show("Item deleted successfully.");
      },

      onSave: function () {
        // MessageBox.success("success");



        let oModel = this.getOwnerComponent().getModel();
        console.log(oModel);

        const oPurchaseRequisitionID = this.getView().byId("_IDGenInput1").getValue()
        const oSupplier = this.getView().byId("_IDGenInput2").getValue()
        const oCompanyCode = this.getView().byId("_IDGenInput3").getValue()
        const oPurchasingOrganization = this.getView().byId("_IDGenInput4").getValue()
        const oPurchasingGroup = this.getView().byId("_IDGenInput5").getValue()
        let oStatus = this.getView().byId("groupE").getSelectedIndex()


        if (oStatus == 0) {
          oStatus = "NEW"
        }
        if (oStatus == 1) {
          oStatus = "DRAFT"
        }
        if (oStatus == 2) {
          oStatus = "SUBMITTED"
        }

        let myData = {
          "PurchaseRequisitionID": oPurchaseRequisitionID,
          "Supplier": oSupplier,
          "CompanyCode": oCompanyCode,
          "PurchasingOrganization": oPurchasingOrganization,
          "PurchasingGroup": oPurchasingGroup,
          "Status": oStatus
        }

        console.log(myData);
        oModel.create("/PurchaseRequisitionHeaders", myData, {
          success: function (res) {
            MessageBox.success("saved successfully");
            console.log("done")
          },
          error: function (err) {
            MessageBox.error("ERROR");
          }
        })
      },
      onSubmit: function () {

        let oModel = this.getOwnerComponent().getModel();
        console.log(oModel);

        const oPurchaseRequisitionID = this.getView().byId("_IDGenInput1").getValue()
        const oSupplier = this.getView().byId("_IDGenInput2").getValue()
        const oCompanyCode = this.getView().byId("_IDGenInput3").getValue()
        const oPurchasingOrganization = this.getView().byId("_IDGenInput4").getValue()
        const oPurchasingGroup = this.getView().byId("_IDGenInput5").getValue()
        let oStatus = this.getView().byId("groupE").getSelectedIndex()


        if (oStatus == 0) {
          oStatus = "NEW"
        }
        if (oStatus == 1) {
          oStatus = "DRAFT"
        }
        if (oStatus == 2) {
          oStatus = "SUBMITTED"
        }

        let myData = {
          "PurchaseRequisitionID": oPurchaseRequisitionID,
          "Supplier": oSupplier,
          "CompanyCode": oCompanyCode,
          "PurchasingOrganization": oPurchasingOrganization,
          "PurchasingGroup": oPurchasingGroup,
          "Status": oStatus
        }
        let payload={
          payload:JSON.stringify(myData)
      }
        oModel.create("/Submit",payload, {
          success: function (res) {
            MessageBox.success("Submit successfully");
            console.log("done")
          },
          error: function (err) {
            MessageBox.error("ERROR");
          },
          onAfterItemAdded: function (oEvent) {
            var item = oEvent.getParameter("item")
            this._createEntity(item)
            .then((id) => {
              this._uploadContent(item, id);
            })
            .catch((err) => {
              console.log(err);
            })
          },
    
          onUploadCompleted: function (oEvent) {
            var oUploadSet = this.byId("uploadSet");
            oUploadSet.removeAllIncompleteItems();
            oUploadSet.getBinding("items").refresh();
          },
    
          onOpenPressed: function (oEvent) {	
            // to be implemented			
          },
    
          _createEntity: function (item) {
              var data = {
                mediaType: item.getMediaType(),
                fileName: item.getFileName(),
                size: item.getFileObject().size
              };
      
              var settings = {
                url: "/attachments/Files",
                method: "POST",
                headers: {
                  "Content-type": "application/json"
                },
                data: JSON.stringify(data)
              }
      
            return new Promise((resolve, reject) => {
              $.ajax(settings)
                .done((results, textStatus, request) => {
                  resolve(results.ID);
                })
                .fail((err) => {
                  reject(err);
                })
            })				
          },
    
          _uploadContent: function (item, id) {
            var url = `/attachments/Files(${id})/content`
            item.setUploadUrl(url);	
            var oUploadSet = this.byId("uploadSet");
            oUploadSet.setHttpRequestMethod("PUT")
            oUploadSet.uploadItem(item);
          }	
        })
      }
    });
  });
