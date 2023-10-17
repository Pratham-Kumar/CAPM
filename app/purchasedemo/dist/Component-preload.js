//@ui5-bundle com/sap/purchasedemo/Component-preload.js
jQuery.sap.registerPreloadedModules({
"version":"2.0",
"modules":{
	"com/sap/purchasedemo/Component.js":function(){sap.ui.define(["sap/ui/core/UIComponent","sap/ui/Device","com/sap/purchasedemo/model/models"],function(e,t,i){"use strict";return e.extend("com.sap.purchasedemo.Component",{metadata:{manifest:"json"},init:function(){e.prototype.init.apply(this,arguments);this.getRouter().initialize();this.setModel(i.createDeviceModel(),"device")}})});
},
	"com/sap/purchasedemo/controller/App.controller.js":function(){sap.ui.define(["sap/ui/core/mvc/Controller"],function(e){"use strict";return e.extend("com.sap.purchasedemo.controller.App",{onInit(){}})});
},
	"com/sap/purchasedemo/controller/View1.controller.js":function(){sap.ui.define(["sap/ui/core/mvc/Controller","sap/ui/model/json/JSONModel","sap/m/MessageToast","sap/m/MessageBox"],function(e,t,n,s){"use strict";return e.extend("com.sap.purchasedemo.controller.View1",{onInit:function(){var e=new t({items:[]});this.getView().setModel(e)},onAddItemPress:function(){var e=this.getView().getModel();var t=e.getProperty("/items");t.push({PurchaseRequisitionItemID:"",MaterialNumber:"",MaterialDescription:"",Quantity:"",QuantityUnit:"",NetPrice:"",CurrencyKey:"",TaxAmount:""});e.setProperty("/items",t)},onCancelpress:function(){var e=this.getView();var t=e.getModel();e.byId("_IDGenInput1").setValue("");e.byId("_IDGenInput2").setValue("");e.byId("_IDGenInput3").setValue("");e.byId("_IDGenInput4").setValue("");e.byId("_IDGenInput5").setValue("");e.byId("groupE").setSelected(true);t.setProperty("/items",[]);t.refresh(true);n.show("Action cancelled successfully")},onDeleteItemPress:function(){var e=this.byId("itemsTable");var t=this.getView().getModel();var s=e.getSelectedItem();if(!s){n.show("Select an item to delete.");return}var i=s.getBindingContext();var o=i.getPath().split("/")[2];var a=t.getProperty("/items");a.splice(o,1);t.setProperty("/items",a);n.show("Item deleted successfully.")},onSave:function(){let e=this.getOwnerComponent().getModel();console.log(e);const t=this.getView().byId("_IDGenInput1").getValue();const n=this.getView().byId("_IDGenInput2").getValue();const i=this.getView().byId("_IDGenInput3").getValue();const o=this.getView().byId("_IDGenInput4").getValue();const a=this.getView().byId("_IDGenInput5").getValue();let u=this.getView().byId("groupE").getSelectedIndex();if(u==0){u="NEW"}if(u==1){u="DRAFT"}if(u==2){u="SUBMITTED"}let r={PurchaseRequisitionID:t,Supplier:n,CompanyCode:i,PurchasingOrganization:o,PurchasingGroup:a,Status:u};console.log(r);e.create("/PurchaseRequisitionHeaders",r,{success:function(e){s.success("saved successfully");console.log("done")},error:function(e){s.error("ERROR")}})},onSubmit:function(){let e=this.getOwnerComponent().getModel();console.log(e);const t=this.getView().byId("_IDGenInput1").getValue();const n=this.getView().byId("_IDGenInput2").getValue();const i=this.getView().byId("_IDGenInput3").getValue();const o=this.getView().byId("_IDGenInput4").getValue();const a=this.getView().byId("_IDGenInput5").getValue();let u=this.getView().byId("groupE").getSelectedIndex();if(u==0){u="NEW"}if(u==1){u="DRAFT"}if(u==2){u="SUBMITTED"}let r={PurchaseRequisitionID:t,Supplier:n,CompanyCode:i,PurchasingOrganization:o,PurchasingGroup:a,Status:u};let l={payload:JSON.stringify(r)};e.create("/Submit",l,{success:function(e){s.success("Submit successfully");console.log("done")},error:function(e){s.error("ERROR")},onAfterItemAdded:function(e){var t=e.getParameter("item");this._createEntity(t).then(e=>{this._uploadContent(t,e)}).catch(e=>{console.log(e)})},onUploadCompleted:function(e){var t=this.byId("uploadSet");t.removeAllIncompleteItems();t.getBinding("items").refresh()},onOpenPressed:function(e){},_createEntity:function(e){var t={mediaType:e.getMediaType(),fileName:e.getFileName(),size:e.getFileObject().size};var n={url:"/attachments/Files",method:"POST",headers:{"Content-type":"application/json"},data:JSON.stringify(t)};return new Promise((e,t)=>{$.ajax(n).done((t,n,s)=>{e(t.ID)}).fail(e=>{t(e)})})},_uploadContent:function(e,t){var n=`/attachments/Files(${t})/content`;e.setUploadUrl(n);var s=this.byId("uploadSet");s.setHttpRequestMethod("PUT");s.uploadItem(e)}})}})});
},
	"com/sap/purchasedemo/i18n/i18n.properties":'# This is the resource bundle for com.sap.purchasedemo\n\n#Texts for manifest.json\n\n#XTIT: Application name\nappTitle=Purchase Requisition\n\n#YDES: Application description\nappDescription=A Fiori application.\n#XTIT: Main view title\ntitle=Purchase Requisition\n\nflpTitle=Purchase Requisition\n\nflpSubtitle=\n',
	"com/sap/purchasedemo/manifest.json":'{"_version":"1.49.0","sap.app":{"id":"com.sap.purchasedemo","type":"application","i18n":"i18n/i18n.properties","applicationVersion":{"version":"0.0.1"},"title":"{{appTitle}}","description":"{{appDescription}}","resources":"resources.json","sourceTemplate":{"id":"@sap/generator-fiori:basic","version":"1.10.5","toolsId":"573e8c0a-0566-483c-9948-b04651f96b6a"},"dataSources":{"mainService":{"uri":"v2/odata/v4/catalog/","type":"OData","settings":{"annotations":[],"localUri":"localService/metadata.xml","odataVersion":"2.0"}}},"crossNavigation":{"inbounds":{"Purchase-Order":{"semanticObject":"Purchase","action":"Order","title":"{{flpTitle}}","subTitle":"{{flpSubtitle}}","signature":{"parameters":{},"additionalParameters":"allowed"}}}}},"sap.ui":{"technology":"UI5","icons":{"icon":"","favIcon":"","phone":"","phone@2":"","tablet":"","tablet@2":""},"deviceTypes":{"desktop":true,"tablet":true,"phone":true}},"sap.ui5":{"flexEnabled":true,"dependencies":{"minUI5Version":"1.117.0","libs":{"sap.m":{},"sap.ui.core":{},"sap.f":{},"sap.suite.ui.generic.template":{},"sap.ui.comp":{},"sap.ui.generic.app":{},"sap.ui.table":{},"sap.ushell":{}}},"contentDensities":{"compact":true,"cozy":true},"models":{"i18n":{"type":"sap.ui.model.resource.ResourceModel","settings":{"bundleName":"com.sap.purchasedemo.i18n.i18n"}},"":{"dataSource":"mainService","preload":true,"settings":{"synchronizationMode":"None","operationMode":"Server","autoExpandSelect":true,"earlyRequests":true}}},"resources":{"css":[{"uri":"css/style.css"}]},"routing":{"config":{"routerClass":"sap.m.routing.Router","viewType":"XML","async":true,"viewPath":"com.sap.purchasedemo.view","controlAggregation":"pages","controlId":"app","clearControlAggregation":false},"routes":[{"name":"RouteView1","pattern":":?query:","target":["TargetView1"]}],"targets":{"TargetView1":{"viewType":"XML","transition":"slide","clearControlAggregation":false,"viewId":"View1","viewName":"View1"}}},"rootView":{"viewName":"com.sap.purchasedemo.view.App","type":"XML","async":true,"id":"App"}}}',
	"com/sap/purchasedemo/model/models.js":function(){sap.ui.define(["sap/ui/model/json/JSONModel","sap/ui/Device"],function(e,n){"use strict";return{createDeviceModel:function(){var i=new e(n);i.setDefaultBindingMode("OneWay");return i}}});
},
	"com/sap/purchasedemo/view/App.view.xml":'<mvc:View controllerName="com.sap.purchasedemo.controller.App"\n    xmlns:html="http://www.w3.org/1999/xhtml"\n    xmlns:mvc="sap.ui.core.mvc" displayBlock="true"\n    xmlns="sap.m"><App id="app"></App></mvc:View>\n',
	"com/sap/purchasedemo/view/View1.view.xml":'<mvc:View\n    xmlns:uxap="sap.uxap"\n    controllerName="com.sap.purchasedemo.controller.View1"\n    xmlns:mvc="sap.ui.core.mvc"\n    displayBlock="true"\n    xmlns="sap.m"\n    xmlns:f="sap.ui.layout.form"\n    xmlns:upload="sap.m.upload"\n><Page\n        id="page"\n        title="{i18n>title}"\n    ><content><uxap:ObjectPageLayout\n                id="ObjectPageLayout"\n                upperCaseAnchorBar="false"\n            ><uxap:sections><uxap:ObjectPageSection><uxap:subSections><uxap:ObjectPageSubSection\n                                title="Purchase Requisition Header "\n                            ><uxap:blocks><f:SimpleForm id="_IDGenSimpleForm1"><Label\n                                            id="_IDGenLabel1"\n                                            text="Purchase Requisition ID"\n                                        /><Input\n                                            id="_IDGenInput1"\n                                            value=""\n                                        /><Label\n                                            id="_IDGenLabel2"\n                                            text="Supplier"\n                                        /><Input\n                                            id="_IDGenInput2"\n                                            value=""\n                                        /><Label\n                                            id="_IDGenLabel3"\n                                            text="Company Code"\n                                        /><Input\n                                            id="_IDGenInput3"\n                                            value=""\n                                        /><Label\n                                            id="_IDGenLabel4"\n                                            text="Purchasing Organization"\n                                        /><Input\n                                            id="_IDGenInput4"\n                                            value=""\n                                        /><Label\n                                            id="_IDGenLabel5"\n                                            text="Purchasing Group"\n                                        /><Input\n                                            id="_IDGenInput5"\n                                            value=""\n                                        /><Label\n                                            id="_IDGenLabel6"\n                                            text="Status"\n                                        /><RadioButtonGroup\n                                            id="groupE"\n                                            valueState="Information"\n                                            columns="3"\n                                        ><RadioButton\n                                                text="New"\n                                                selected="true"\n                                            /><RadioButton text="Draft" /><RadioButton text="Submitted" /></RadioButtonGroup></f:SimpleForm></uxap:blocks></uxap:ObjectPageSubSection><uxap:ObjectPageSubSection\n                                title="Purchase Requisition Items"\n                            ><uxap:blocks><Table\n                                        id="itemsTable"\n                                        inset="false"\n                                        items="{/items}"\n                                        mode="SingleSelectLeft"\n                                    ><headerToolbar><OverflowToolbar><Title text="Items" /><ToolbarSpacer /><Button\n                                                    text="Add"\n                                                    type="Accept"\n                                                    icon="sap-icon://add"\n                                                    press="onAddItemPress"\n                                                /><Button\n                                                    text="Delete"\n                                                    type="Reject"\n                                                    icon="sap-icon://Delete"\n                                                    press="onDeleteItemPress"\n                                                /></OverflowToolbar></headerToolbar><columns><Column id="itemColumn1"><Text\n                                                    id="itemIdColumnHeader"\n                                                    text="Purchase Requisition Item ID"\n                                                /></Column><Column id="itemColumn2"><Text\n                                                    id="materialNumColumnHeader"\n                                                    text="Material Number"\n                                                /></Column><Column id="itemColumn3"><Text\n                                                    id="materialDescColumnHeader"\n                                                    text="Material Description"\n                                                /></Column><Column id="itemColumn4"><Text\n                                                    id="quantityColumnHeader"\n                                                    text="Quantity"\n                                                /></Column><Column id="itemColumn5"><Text\n                                                    id="quantityUnitColumnHeader"\n                                                    text="Quantity Unit"\n                                                /></Column><Column id="itemColumn6"><Text\n                                                    id="netPriceColumnHeader"\n                                                    text="Net Price"\n                                                /></Column><Column id="itemColumn7"><Text\n                                                    id="currencyColumnHeader"\n                                                    text="Currency Key"\n                                                /></Column><Column id="itemColumn8"><Text\n                                                    id="taxAmountColumnHeader"\n                                                    text="Tax Amount"\n                                                /></Column></columns><items><ColumnListItem id="itemRow"><cells><Input\n                                                        value="{PurchaseRequisitionItemID}"\n                                                    /><Input\n                                                        value="{MaterialNumber}"\n                                                    /><Input\n                                                        value="{MaterialDescription}"\n                                                    /><Input value="{Quantity}" /><Input\n                                                        value="{QuantityUnit}"\n                                                    /><Input value="{NetPrice}" /><Input\n                                                        value="{CurrencyKey}"\n                                                    /><Input\n                                                        value="{TaxAmount}"\n                                                    /></cells></ColumnListItem></items></Table></uxap:blocks></uxap:ObjectPageSubSection><uxap:ObjectPageSubSection><uxap:blocks><upload:UploadSet\n                                        id="uploadSet"\n                                        instantUpload="true"\n                                        uploadEnabled="true"\n                                        uploadUrl="/attachments/Files"\n                                        items="{\n                                path: \'/Files\',\n                                parameters: {\n                                    $orderby: \'createdAt desc\'\n                                },\n                                templateShareable: false}"\n                                    ><upload:toolbar /><upload:items><upload:UploadSetItem\n                                                fileName="{fileName}"\n                                                mediaType="{mediaType}"\n                                                url="{url}"\n                                                enabledEdit="false"\n                                                visibleEdit="false"\n                                                openPressed="onOpenPressed"\n                                            ><upload:attributes><ObjectAttribute\n                                                        title="Uploaded By"\n                                                        text="{createdBy}"\n                                                        active="false"\n                                                    /><ObjectAttribute\n                                                        title="Uploaded on"\n                                                        text="{createdAt}"\n                                                        active="false"\n                                                    /><ObjectAttribute\n                                                        title="File Size"\n                                                        text="{size}"\n                                                        active="false"\n                                                    /></upload:attributes></upload:UploadSetItem></upload:items></upload:UploadSet></uxap:blocks></uxap:ObjectPageSubSection></uxap:subSections></uxap:ObjectPageSection></uxap:sections></uxap:ObjectPageLayout></content><footer><OverflowToolbar><ToolbarSpacer /><Button\n                    text="Save"\n                    type="Emphasized"\n                    press="onSave"\n                /><Button\n                    text="Submit"\n                    type="Success"\n                    press="onSubmit"\n                /><Button\n                    text="Cancel"\n                    type="Reject"\n                    press="onCancelpress"\n                /></OverflowToolbar></footer></Page></mvc:View>\n'
}});
