

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
    console.log(form);

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

  });


}
