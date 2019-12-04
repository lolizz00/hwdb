
/* Device */
function generateSelectFormDevice(widget, onChange=null)
{
  return getTable('Devices')
  .then(res =>
  {
     devices = res.data;

     var form  = new dhx.Form(widget, {
      cellCss: 'dhx_widget--bordered',
      height: 100,
      width: 250,
      rows: [
        {
          id: "devBox",
          type: "combo",
          label: "Название устройства",
          data : generateComboListDevices(devices),
        }
      ]
    });

    if(onChange)
    {
      form.events.on("Change", onChange);
    }
    return form;
  });


}


var l_dev = null;
var testGrid = null;
var histGrid = null;
function selectDeviceCallBack_devInfo(id, e)
{

  if(id != 'devBox')
  {
    console.log('Неизвестный элемент формы!');
    return;
  }

  if(e == undefined) { return;} /* хз, так работает либа */
  dev = splitDevID(e);

  /*
    Обработчик из либы вызывается несколько разбиваем
    Приходится проверять
  */
  if(!eqDict(l_dev, dev))
  {


    /* Сводка */
    summaryReportDevices('shortReport', dev);


    /* История тестирования   */
    $('#devTests').html('');
    $('#devTests').append('<b>История тестов</b>');
    generateViewTestHistory('devTests', dev, true).then(grid =>
    {
      testGrid = grid;

      $('#devTests').append("<button id='exportTest' class='dhx_sample-btn dhx_sample-btn--flat'>Экспорт</button>");
      $('#exportTest').on('click', _ => {
        exportViewTests(testGrid);
      });

      $('#devTests').append("<button id='delTestRow' class='dhx_sample-btn dhx_sample-btn--flat'>Удалить запись</button>");
      $('#delTestRow').on('click', _ =>{
        var cell = testGrid.selection.getCell();
        cell = cell.row['Номер записи'];

        generateDeleteTestsHistoryWidget([cell]);
      });

      $('#devTests').append("<button id='editTestRow' class='dhx_sample-btn dhx_sample-btn--flat'>Редактировать запись</button>");
      $('#editTestRow').on('click', _ =>{
        var cell = testGrid.selection.getCell();
        cell = cell.row['Номер записи'];

        generateEditTestsHistory(null, {'Номер записи' : cell}).then(form =>
        {
            var win = new dhx.Window({
              width: 600,
              height: 700,
              closable: true
            });
            win.attach(form);
            win.show();

          fixFormOnWindow();

        });
      });
    });


    /* История перемещений */
    $('#devHistory').html('');
    $('#devHistory').append('<b>История перемещений</b>');

    generateViewPlacesHistory('devHistory', dev, true).then(grid => {
        histGrid = grid;

        $('#devHistory').append("<button id='exportPlaces' class='dhx_sample-btn dhx_sample-btn--flat'>Экспорт</button>");
        $('#exportPlaces').on('click', _ => {
            exportViewPlaces(histGrid);
        });

        $('#devHistory').append("<button id='delPlaceRow' class='dhx_sample-btn dhx_sample-btn--flat'>Удалить запись</button>");
        $('#delPlaceRow').on('click', _ =>{
          var cell = histGrid.selection.getCell();
          cell = cell.row['Номер записи'];

          generateDeletePlacesHistoryWidget([cell]);
        });

        $('#devHistory').append("<button id='editPlaceRow' class='dhx_sample-btn dhx_sample-btn--flat'>Редактировать запись</button>");
        $('#editPlaceRow').on('click', _ =>{
          var cell = histGrid.selection.getCell();
          cell = cell.row['Номер записи'];

          generateEditPlacesHistoryWidget(null, {'Номер записи' : cell}).then(form =>
          {
              var win = new dhx.Window({
                width: 600,
                height: 700,
                closable: true
              });
              win.attach(form);
              win.show();

            fixFormOnWindow();

          });
        });





    });

    /* Сводка о нобходимых тестах */
    $('#testReport').html('');
    $('#testReport').append('<b>Отчет о выполненных тестах</b>');
    reportCompletedTestsDevices('testReport', dev);

    l_dev = dev;
  }







}

/*
  Type
  Помещается в typeTests
*/

function generateSelectFormType(widget, onChange=null)
{
  return getTable('Types').then(res =>
  {
       types = res.data;
       var form  = new dhx.Form(widget, {
        cellCss: 'dhx_widget--bordered',
        height: 100,
        width: 250,
        rows: [
          {
            id: "type",
            type: "combo",
            label: "Название типа",
            data : generateComboList(types, 'Имя типа')
          }
        ]
      });

      if(onChange)
      {
        form.events.on("Change", onChange);
      }
      return form;


    });
}

var l_type = null;

/* Для привязок*/
function selectTypeCallBack(id, e)
{
  if(id != 'type')
  {
    console.log('Неизвестный элемент формы!');
    return;
  }

  if(e == undefined) { return;}
  type = e;
  if(type != l_type)
  {
    l_type = type;
    filter = {'Название типа' : type};

    $('#typeTests').html('');
    $('#typeTests').append('<b>Зависимости выбранного типа</b>');
    generateViewTestsForTypes('typeTests', filter);

  }





}

/* Для обзора */
function selectTypeCallBack_Control(id,e)
{
  if(id != 'type')
  {
    console.log('Неизвестный элемент формы!');
    return;
  }

  if(e == undefined) { return;}
  type = e;
  if(type != l_type)
  {
    l_type = type;



    $('#typesControl').html('');
    generateEditTypes('typesControl', {'Название типа' : type});

  }
}

/*
  Tests
  Помещается в testsControl
*/



var l_test = null;
function generateSelectFormTest(widget, onChange=null)
{
  return getTable('Tests').then(res => {
    tests = res.data;

    var form  = new dhx.Form(widget, {
     cellCss: 'dhx_widget--bordered',
     height: 100,
     width: 250,
     rows: [
       {
         id: "testBox",
         type: "combo",
         label: "Название теста",
         data : generateComboList(tests, 'Название теста'),
       }
     ]
   });

   if(onChange)
   {
     form.events.on("Change", onChange);
   }
   return form;


  });
}


function selectTestCallBack(id, e)
{
  if(id != 'testBox')
  {
    console.log('Неизвестный элемент формы!');
    return;
  }

  if(e == undefined) { return;}
  test = e;

  if(test != l_test)
  {
    l_test = test;
    //$('#testsControl').html('');

    generateEditTests('testsControl' , {'Название теста' : test});
  }


}


/*
  Place

  Помещается в plControl

*/

function generateSelectFormPlace(widget, onChange=null)
{
  return getTable('Places').then(res => {
    pl = res.data;

    var form  = new dhx.Form(widget, {
     cellCss: 'dhx_widget--bordered',
     height: 100,
     width: 250,
     rows: [
       {
         id: "placeBox",
         type: "combo",
         label: "Название места",
         data : generateComboList(pl,  'Название места'),
       }
     ]
   });

   if(onChange)
   {
     form.events.on("Change", onChange);
   }
   return form;


  });
}

var l_place = null;
function selectPlaceCallBack(id, e)
{
  if(id != 'placeBox')
  {
    console.log('Неизвестный элемент формы!');
    return;
  }

  if(e == undefined) { return;}
  pl = e;

  if(pl != l_place)
  {
    l_place = pl;
    $('#plControl').html('')

    generateEditPlacesWidget('plControl' , {'Название места' : pl});
  }
}
