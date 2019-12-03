
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
    $('#devTests').html('');
    $('#devTests').append('<b>История тестов</b>');
    generateViewTestHistory('devTests', dev);

    $('#devHistory').html('');
    $('#devHistory').append('<b>История перемещений</b>');
    generateViewPlacesHistory('devHistory', dev);

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
