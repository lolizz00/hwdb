

/*
  widget - куда выводится форма для ввода параметров
  data - функция или массив с данными о текущем устройствe
*/
function generateEditDevicesWidget(widget, data)
{
  if(typeof(data) == 'function'){ data = data(); }

  if(lenDict(data) != 2)
  {
    console.log('Переданы невозможные параметры!');
    return;
  }

  generateFormDevices(widget).then(form =>
  {
    fillDeviceEditWidget(form, data);

    form.events.on("ButtonClick", function(id, e)
    {
      if(id == 'sendForm')
      {
        if(!form.validate())
        {
          showMessageBox('Ошибка!', "<b>Форма заполнена неверно!</b>");
          return;
        }

        var vals = form.getValue();
        vals = formValuesToArray(vals);

        data = renameKeys(data, ['Серийный номер', 'Тип устройста'], [0, 1]);

        editTable('Devices', data, vals)
        .then(res =>
        {
          res = res.status;

          if(res != 'Успешно!')
          {
            showMessageBox('Ошибка!', "<b>" + res + "</b>");
          }
          else
          {
              showMessageTray('Успешно изменено.')
          }
        });


      }
    });

  });

}

function generateEditPlacesWidget(widget, data)
{
  if(typeof(data) == 'function'){ data = data(); }

  if(lenDict(data) != 1)
  {
    console.log('Переданы невозможные параметры!');
    return;
  }

  form = generateFormPlaces(widget);

  fillPlacesEditWidget(form, data);

  form.events.on("ButtonClick", function(id, e)
  {
    if(id == 'sendForm')
    {
      if(!form.validate())
      {
        showMessageBox('Ошибка!', "<b>Форма заполнена неверно!</b>");
        return;
      }

      var vals = form.getValue();
      vals = formValuesToArray(vals);

      editTable('Places', data, vals)
      .then(res =>
      {
        res = res.status;

        if(res != 'Успешно!')
        {
          showMessageBox('Ошибка!', "<b>" + res + "</b>");
        }
        else
        {
            showMessageTray('Успешно изменено.')
        }
      });


    }
  });

}

function generateEditPlacesHistoryWidget(widget, data)
{
  if(typeof(data) == 'function'){ data = data(); }

  if(lenDict(data) != 1)
  {
    console.log('Переданы невозможные параметры!');
    return;
  }

  generateFormPlacesHistory(widget).then(form =>
  {
    fillPlacesHistoryEditWidget(form, data);

    form.events.on("ButtonClick", function(id, e)
    {
      if(id == 'sendForm')
      {
        if(!form.validate())
        {
          showMessageBox('Ошибка!', "<b>Форма заполнена неверно!</b>");
          return;
        }

        var vals = form.getValue();
        vals = formValuesToArray(vals);


        editTable('Places History', data, vals)
        .then(res =>
        {
          res = res.status;

          if(res != 'Успешно!')
          {
            showMessageBox('Ошибка!', "<b>" + res + "</b>");
          }
          else
          {
              showMessageTray('Успешно изменено.')
          }
        });


      }
    });


  });




}

function generateEditTests(widget, data)
{
  if(typeof(data) == 'function'){ data = data(); }

  if(lenDict(data) != 1)
  {
    console.log('Переданы невозможные параметры!');
    return;
  }


  form = generateFormTests(widget);

  fillTestsEditWidget(form, data);

  form.events.on("ButtonClick", function(id, e)
  {
    if(id == 'sendForm')
    {
      if(!form.validate())
      {
        showMessageBox('Ошибка!', "<b>Форма заполнена неверно!</b>");
        return;
      }

      var vals = form.getValue();
      vals = formValuesToArray(vals);


      editTable('Tests', data, vals)
      .then(res =>
      {
        res = res.status;

        if(res != 'Успешно!')
        {
          showMessageBox('Ошибка!', "<b>" + res + "</b>");
        }
        else
        {
            showMessageTray('Успешно изменено.')
        }
      });


    }
  });



}

function generateEditTestsHistory(widget, data)
{
  if(typeof(data) == 'function'){ data = data(); }

  if(lenDict(data) != 1)
  {
    console.log('Переданы невозможные параметры!');
    return;
  }

  generateFormTestsHistory(widget).then(form =>
  {

    fillTestsHistoryEditWidget(form, data);

    form.events.on("ButtonClick", function(id, e)
    {
      if(id == 'sendForm')
      {
        if(!form.validate())
        {
          showMessageBox('Ошибка!', "<b>Форма заполнена неверно!</b>");
          return;
        }

        var vals = form.getValue();
        vals = formValuesToArray(vals);


        editTable('Tests History', data, vals)
        .then(res =>
        {
          res = res.status;

          if(res != 'Успешно!')
          {
            showMessageBox('Ошибка!', "<b>" + res + "</b>");
          }
          else
          {
              showMessageTray('Успешно изменено.')
          }
        });


      }
    });
  });
}

function generateEditTypes(widget, data)
{
  if(typeof(data) == 'function'){ data = data(); }

  if(lenDict(data) != 1)
  {
    console.log('Переданы невозможные параметры!');
    return;
  }


  form = generateFormTypes(widget);

  fillTypesEditWidget(form, data);



  form.events.on("ButtonClick", function(id, e)
  {
    if(id == 'sendForm')
    {
      if(!form.validate())
      {
        showMessageBox('Ошибка!', "<b>Форма заполнена неверно!</b>");
        return;
      }

      var vals = form.getValue();
      vals = formValuesToArray(vals);

      editTable('Types', data, vals)
      .then(res =>
      {
        res = res.status;

        if(res != 'Успешно!')
        {
          showMessageBox('Ошибка!', "<b>" + res + "</b>");
        }
        else
        {
            showMessageTray('Успешно изменено.')
        }
      });


    }
  });

}
