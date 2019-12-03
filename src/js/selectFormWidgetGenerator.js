
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

    l_dev = dev;
  }







}
