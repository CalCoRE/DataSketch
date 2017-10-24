/**
 * Created by bfinzer on 6/12/17.
 */

//var Globals = require('core/model/globals');

var codapHelper = {
  codapConnected: false,
  contexts: [],
  divForButtons: null,

  init: function () {
    // initialize the codapInterface
    codapInterface.init({
      name: 'Data Sketch',
      title: 'Data Sketch',
      dimensions: {width: 450, height: 400},
      version: '0.1',
      stateHandler: function (state) {
        if (state) {
          /*
           experimentNumber = state.experimentNumber || experimentNumber;
           variables = state.variables || variables;
           sampleSize = state.draw || sampleSize;
           numRuns = state.repeat || numRuns;
           speed = state.speed || speed;
           if (state.device) {
           switchState(null, state.device)
           }

           render();
           */
        }
      }
    }).then(function () {
          this.codapConnected = true;
          this.registerForNotifications();
          this.divForButtons = document.createElement('div');
          this.divForButtons.setAttribute('id', 'codap');
          document.body.appendChild(this.divForButtons);
          this.updateDataContextButtons();
        }.bind(this),
        function (err) {
          codapHelper.codapConnected = false;
        }
    );

  },

  updateDataContextButtons: function () {
    this.divForButtons.childNodes.forEach(function (iNode) {
      iNode.remove();
    });
    codapInterface.sendRequest({
          action: 'get',
          resource: 'dataContextList'
        }, function (result) {
          if (result.success) {
            console.log('found ' + result.values.length + ' data contexts');
            result.values.forEach(function (iInfo) {
              this.contexts.push(iInfo);
              var button = document.createElement('button');
              button.innerHTML = iInfo.name;
              button.onclick = this.clickButton;
              this.divForButtons.appendChild(button);
              console.log('id: ' + iInfo.id + ', name: ', iInfo.name);
            }.bind(this));
          }
        }.bind(this)
    )
  },

  registerForNotifications: function () {
    codapInterface.on('notify', 'documentChangeNotice', 'dataContextCountChanged', this.handleCreateDataContext);
  },

  handleCreateDataContext: function (iNotification) {
    codapHelper.updateDataContextButtons();
  },

  clickButton: function () {
    // 'this' is a button so we have to call via global
    codapHelper.setDataContext(this.innerHTML);
  },

  setDataContext: function (iName) {
   
    /* var csv = "a,b\n1,2\n3,4",*/
    this.getCsvForDataset(iName, function (csv) {
      // Remove previously rendered datatable .
      this.dsGlobals.get('App.view').removeChild(this.dataTableView);

      var d = this.dsPapaParse.parse(csv,
          {
            header: true,
            dynamicTyping: true
          });
          
      var ds = new this.dsDataStore(
          {
            rows: d.data,
            properties: d.meta.fields
          }
      );

      /*
      var ds = this.dsGlobals.get('DataStore');
      ds.set('rows', d.data, true);
      ds.set('properties', d.meta.fields, true);
      */
      
      this.dsGlobals.set(
          'DataStore', ds
      );
      // Call DSData run method which will add the child element.
      this.dsData.run();
      // Check whether the mode is data , if so show the data table.
      if(this.dsGlobals.get('Canvas').getMode()=="data"){
          $(".datatable").show();
      }

    }.bind( this)
  );
    
  //console.log(dsGlobals);

  },

// This gets the CODAP data from the table with the same name
// as the button selected
  getCsvForDataset: function (iDatasetName, iCallback) {
    console.log("getCsvForDataset");
    codapInterface.sendRequest({
      action: 'get',
      "resource": 'dataContext[' + iDatasetName + ']'
    }).then(function (iResult) {
      if (iResult.success && iResult.values.collections) {
        var tCollName = iResult.values.collections[0].name;
        codapInterface.sendRequest({
          action: 'get',
          "resource": 'dataContext[' + iDatasetName + '].collection[' + tCollName + '].allCases'
        }).then(function (iCasesResult) {
          if (iCasesResult.success) {
            var tCSV = '';
            iCasesResult.values.cases.forEach( function( iCase, iIndex) {
            
              var tValues = iCase.case.values;
              if( iIndex === 0) {
                tCSV = Object.keys( tValues).join(',');
                tCSV += '\n';
              }
              
              for (var iValue in tValues) {
                if (tValues.hasOwnProperty(iValue)) {
                  tCSV += tValues[iValue] + ',';
                }
              }
              
              tCSV = (iIndex === (iCasesResult.values.cases.length-1)) 
                          ? tCSV.replace(/,$/, '') : tCSV.replace(/,$/, '\n');
              
            });
            
            iCallback(tCSV);
          } else { console.log ("nope. "); console.log(iCasesResult);}
        })
      } else { console.log ("Nope!! "); console.log(iResult);}
    })
  }
};

