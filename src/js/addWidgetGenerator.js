

/*
  Создание видежтов для добавления новых данных
*/

/* --- Вспомогалки --- */
function formValuesToArray(vals)
{
  result = [];
  for(var key in vals)
  {
    tmp = vals[key];


    if(typeof(tmp) === 'object') // fix combo box
    {
      tmp = tmp[0];

      if(key == 'devBox') // разбиваем на тип и ID
      {
        tmp = tmp.split(' ');
        result.push(tmp[0]);
        result.push(tmp[1]);
        continue;
      }
    }


    result.push(tmp);

  }
  return result;
}

/* --- Добавление --- */

function generateAddDevicesWidget(widget)
{
  generateFormDevices(widget).then(form =>
  {
    form.events.on("ButtonClick", function(id, e)
    {
      if(id == 'sendForm') // на случай, что есть другие кнопки
      {
        if(!form.validate())
        {
          showMessageBox('Ошибка!', "<b>Форма заполнена неверно!</b>");
          return;
        }

        var vals = form.getValue();
        vals = formValuesToArray(vals);

        addTable('Devices', vals)
        .then(res =>
        {
          res = res.status;

          if(res != 'Успешно!')
          {
            showMessageBox('Ошибка!', "<b>" + res + "</b>");
          }
          else
          {
              showMessageTray('Успешно добавлено.')
          }
        });


      }
    }
    );

    return form;

  });


}

function generateAddPlacesWidget(widget)
{
   form = generateFormPlaces(widget);

    form.events.on("ButtonClick", function(id, e)
    {
      if(id == 'sendForm') // на случай, что есть другие кнопки
      {
        if(!form.validate())
        {
          showMessageBox('Ошибка!', "<b>Форма заполнена неверно!</b>");
          return;
        }

        var vals = form.getValue();
        vals = formValuesToArray(vals);

        addTable('Places', vals)
        .then(res =>
        {
          res = res.status;

          if(res != 'Успешно!')
          {
            showMessageBox('Ошибка!', "<b>" + res + "</b>");
          }
          else
          {
              showMessageTray('Успешно добавлено.')
          }
        });


      }
    }
    );

    return form;

}

function generateAddPlacesHistoryWidget(widget)
{
  generateFormPlacesHistory(widget).then(form =>
  {
    form.events.on("ButtonClick", function(id, e)
    {
      if(id == 'sendForm') // на случай, что есть другие кнопки
      {
        if(!form.validate())
        {
          showMessageBox('Ошибка!', "<b>Форма заполнена неверно!</b>");
          return;
        }

        var vals = form.getValue();
        vals = formValuesToArray(vals);

        addTable('Places History', vals)
        .then(res =>
        {
          res = res.status;

          if(res != 'Успешно!')
          {
            showMessageBox('Ошибка!', "<b>" + res + "</b>");
          }
          else
          {
              showMessageTray('Успешно добавлено.')
          }
        });


      }
    }
    );
    return form;
  });
}

function generateAddTestsWidget(widget)
{
    form = generateFormTests(widget);

    form.events.on("ButtonClick", function(id, e)
    {
      if(id == 'sendForm') // на случай, что есть другие кнопки
      {
        if(!form.validate())
        {
          showMessageBox('Ошибка!', "<b>Форма заполнена неверно!</b>");
          return;
        }

        var vals = form.getValue();
        vals = formValuesToArray(vals);

        addTable('Tests', vals)
        .then(res =>
        {
          res = res.status;

          if(res != 'Успешно!')
          {
            showMessageBox('Ошибка!', "<b>" + res + "</b>");
          }
          else
          {
              showMessageTray('Успешно добавлено.')
          }
        });


      }
    }
    );

    return form;
}

function generateAddTestsForTypesWidget(widget)
{
  generateFormTestsForTypes(widget).then(form =>
  {
    form.events.on("ButtonClick", function(id, e)
    {
      if(id == 'sendForm') // на случай, что есть другие кнопки
      {
        if(!form.validate())
        {
          showMessageBox('Ошибка!', "<b>Форма заполнена неверно!</b>");
          return;
        }

        var vals = form.getValue();
        vals = formValuesToArray(vals);

        addTable('Tests For Types', vals)
        .then(res =>
        {
          res = res.status;

          if(res != 'Успешно!')
          {
            showMessageBox('Ошибка!', "<b>" + res + "</b>");
          }
          else
          {
              showMessageTray('Успешно добавлено.')
          }
        });


      }
    }
    );
    return form;
  });
}

function generateAddTestsHistoryWidget(widget)
{
  generateFormTestsHistory(widget).then(form =>
  {
    form.events.on("ButtonClick", function(id, e)
    {
      if(id == 'sendForm') // на случай, что есть другие кнопки
      {
        if(!form.validate())
        {
          showMessageBox('Ошибка!', "<b>Форма заполнена неверно!</b>");
          return;
        }

        var vals = form.getValue();
        vals = formValuesToArray(vals);

        addTable('Tests History', vals)
        .then(res =>
        {
          res = res.status;

          if(res != 'Успешно!')
          {
            showMessageBox('Ошибка!', "<b>" + res + "</b>");
          }
          else
          {
              showMessageTray('Успешно добавлено.')
          }
        });


      }
    }
    );
    return form;
  });
}

function generateAddTypesWidget(widget)
{
  form = generateFormTypes(widget);

    form.events.on("ButtonClick", function(id, e)
    {
      if(id == 'sendForm') // на случай, что есть другие кнопки
      {
        if(!form.validate())
        {
          showMessageBox('Ошибка!', "<b>Форма заполнена неверно!</b>");
          return;
        }

        var vals = form.getValue();
        vals = formValuesToArray(vals);

        addTable('Types', vals)
        .then(res =>
        {
          res = res.status;

          if(res != 'Успешно!')
          {
            showMessageBox('Ошибка!', "<b>" + res + "</b>");
          }
          else
          {
              showMessageTray('Успешно добавлено.')
          }
        });


      }
    }
    );

    return form;
}
