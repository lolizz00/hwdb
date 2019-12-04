function fillDeviceEditWidget(widget, params)
{

  filterTable('Devices', params).then(res =>
  {
    widget.setValue({
      "serial" : res['Серийный номер'],
      "type" : res['Тип устройства']
    });

  });

}


function fillPlacesEditWidget(widget, params)
{
  widget.setValue({
    "name" : params['Название места']
  });
}


function fillPlacesHistoryEditWidget(widget, params)
{
  var data;
  filterTable('Places History', params).then(res =>
  {
    data = res;
    loginByName(data['Имя человека']).then(login => {
      widget.setValue({
        devBox:    data['Серийный номер'] + ' ' + data['Тип устройства'],
        placeBox:  data['Новое место'],
        dateBox:   data['Момент перемещения'],
        userBox:   login
      });
    });

  });
}


function fillTestsEditWidget(widget, params)
{
  var data;
  filterTable('Tests', params).then(data =>
  {
      widget.setValue({
          nameInput : data['Название теста'],
      });

      
      setEditor( data["Описание теста"]);

  });

}


function fillTestsHistoryEditWidget(widget, params)
{
  var data;
  filterTable('Tests History', params).then(res =>
  {
    data = res;
    loginByName(data['Имя человека']).then(login => {
      widget.setValue({
        devBox:    data['Серийный номер'] + ' ' + data['Тип устройства'],
        testBox:   data['Название теста'],
        dateBox:   data['Время теста'],
        result:    data['Результат теста'],
        userBox:   login
      });
    });
  });
}

function  fillTypesEditWidget(widget, params)
{
  widget.setValue({
    "nameInput" : params['Название типа']
  });
}
