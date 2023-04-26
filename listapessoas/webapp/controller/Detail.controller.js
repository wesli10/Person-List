sap.ui.define([
  "sap/ui/core/mvc/Controller",
  "sap/m/MessageToast",
  "sap/m/MessageBox"
],
  /**
   * @param {typeof sap.ui.core.mvc.Controller} Controller
   */
  function (Controller,
    MessageToast,
    MessageBox) {
    "use strict";

    return Controller.extend("com.wsl.listapessoas.controller.Detail", {
      onInit: function () {

        this.oRouter = this.getOwnerComponent().getRouter();

        this.oRouter.getRoute('Detail').attachPatternMatched(this._onObjectMatched, this)


      },

      _onObjectMatched: function (oEvent) {
        var sObjectId = oEvent.getParameter('arguments').id;

        var oObject = this.getView().getModel("myModel").getProperty("/pessoas/" + sObjectId)


        this.getView().bindElement({
          path: "/pessoas/" + sObjectId,
          model: "myModel"
        })

        var sName = `${oObject.nome}`;
        this.getView().byId("personName").setValue(sName);
        var sLastName = `${oObject.sobrenome}`;
        this.getView().byId("personLastName").setValue(sLastName)
        var sAddress = `${oObject.endereco}`;
        this.getView().byId("personAddress").setValue(sAddress)
        var sDate = `${oObject.ano_nascimento}`;
        this.getView().byId("personDate").setValue(sDate);
        var sAge = `${oObject.idade}`;
        this.getView().byId("personAge").setValue(sAge);
        var sCPF = `${oObject.cpf}`;
        this.getView().byId("personCPF").setValue(sCPF);
      },

      onSave: function () {


        var sName = this.getView().byId("personName").getValue()
        var sLastName = this.getView().byId("personLastName").getValue()
        var sAddress = this.getView().byId("personAddress").getValue()
        var sDate = this.getView().byId("personDate").getValue()
        var sAge = this.getView().byId("personAge").getValue()
        var sCPF = this.getView().byId("personCPF").getValue()

        var oModel = this.getOwnerComponent().getModel("myModel")
        var sPath = this.getView().getElementBinding("myModel").getPath();

        oModel.setProperty(sPath + "/nome", sName)
        oModel.setProperty(sPath + "/sobrenome", sLastName)
        oModel.setProperty(sPath + "/endereco", sAddress)
        oModel.setProperty(sPath + "/ano_nascimento", sDate)
        oModel.setProperty(sPath + "/idade", sAge)
        oModel.setProperty(sPath + "/cpf", sCPF)


        MessageBox.success("Dados salvos com sucesso!")
      }
    });
  });
