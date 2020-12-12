sap.ui.define([
    'sap/ui/core/mvc/Controller',
    'sap/ui/model/BindingMode',
    'sap/ui/model/json/JSONModel',
    'sap/viz/ui5/controls/common/feeds/FeedItem',
    'sap/viz/ui5/data/DimensionDefinition',
    'sap/viz/ui5/format/ChartFormatter',
    'sap/viz/ui5/api/env/Format',
    'sap/m/Table'
],

    function (Controller, BindingMode, JSONModel, FeedItem, DimensionDefinition, ChartFormatter, Format, InitPageUtil, Table) {
        "use strict";

        var Controller = Controller.extend("sap.viz.sample.Bubble.Bubble", {


            onInit: function (evt) {

            },

        });

        return Controller;

    });