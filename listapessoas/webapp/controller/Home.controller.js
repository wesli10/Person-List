sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel",
    "sap/ui/model/Filter",
    "sap/ui/model/FilterOperator"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller,
        JSONModel,
        Filter, FilterOperator) {
        "use strict";

        return Controller.extend("com.wsl.listapessoas.controller.Home", {
            onInit: function () {
                var oData = this.getOwnerComponent().getModel("myModel")
                var oModel = new JSONModel(oData).getData();

                this.getView().setModel(oModel, 'PersonModel')
            },

            onPress: function (oEvent) {
                var oPerson = oEvent.getSource().getBindingContext("PersonModel").getObject()

                this.getOwnerComponent().getRouter().navTo('Detail', {
                    id: oPerson.id
                });

            },

            onSearch: function (oEvent) {

                // build filter array
                var aFilter = [];
                var sQuery = oEvent.getParameter("query");


                // filter binding
                var oList = this.getView().byId("personList");

                var oBinding = oList.getBinding("items");

                if (sQuery) {
                    aFilter.push(new Filter("nome", FilterOperator.Contains, sQuery));
                }

                oBinding.filter(aFilter)
            },


        });
    });
