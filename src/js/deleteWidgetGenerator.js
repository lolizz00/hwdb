
/*
  Отображение статуса в левом нижнем углу
*/
function trayCallback(status)
{
  showMessageTray(status);
}

function formAddCheckBox()
{

}

/*
  Дата - параметры удаляемого устройства или callback
    0 - серийник
    1 - название типа

  finishCallback - вызывается после выполнения
*/
function generateDeleteDevicesWidget(data, finishCallback=trayCallback)
{
  if(typeof(data) == 'function'){ data = data(); }

  if(data.length != 2)
  {
    console.log('Переданы невозможные параметры!');
    return;
  }

  text = "<center><div style='width: 400px' id ='formAlert'></div></center>";

  var form;

  showWindowYesNo('Вы уверены, что хотите удалить?', text)
  .then(res =>
  {
    if(!res)
    {
      showMessageTray('Отменено')
      return;
    }

      var remove = form.getValue()['remove'];

      if(remove)
      {
         removeTable('Devices', data)
         .then(
         res =>
         {
           finishCallback(res.status);
         });
      }
      else
      {
        deleteTable('Devices', data).then(res =>
        {
          finishCallback(res.status);
        });
      }



  });

   form = new dhx.Form('formAlert', {
    padding: "30",
    rows: [
      {
        type: "checkbox",
        labelInline: false,
        label: "Сохранить привязанные записи",
        checked: true,
        id: "remove"
      }
    ]
  });

}

/*
  data[0] - название места
*/
function generateDeletePlacesWidget(data, finishCallback=trayCallback)
{
  if(typeof(data) == 'function'){ data = data(); }

  if(data.length != 1)
  {
    console.log('Переданы невозможные параметры!');
    return;
  }

  text = "<center><div style='width: 400px' id ='formAlert'></div></center>";

  var form;

  showWindowYesNo('Вы уверены, что хотите удалить?', text)
  .then(res =>
  {
    if(!res)
    {
      showMessageTray('Отменено')
      return;
    }

      var remove = form.getValue()['remove'];

      if(remove)
      {
         removeTable('Places', data)
         .then(
         res =>
         {
           finishCallback(res.status);
         });
      }
      else
      {
        deleteTable('Places', data).then(res =>
        {
          finishCallback(res.status);
        });
      }



  });

   form = new dhx.Form('formAlert', {
    padding: "30",
    rows: [
      {
        type: "checkbox",
        labelInline: false,
        label: "Сохранить привязанные записи",
        checked: true,
        id: "remove"
      }
    ]
  });
}

/*
  data[0] - ID записи
*/
function generateDeletePlacesHistoryWidget(data, finishCallback=trayCallback)
{
  if(typeof(data) == 'function'){ data = data(); }

  if(data.length != 1)
  {
    console.log('Переданы невозможные параметры!');
    return;
  }

  text = '';
  showWindowYesNo('Вы уверены, что хотите удалить?', text)
  .then(res =>
  {
    if(!res)
    {
      showMessageTray('Отменено')
      return;
    }


    deleteTable('Places History', data).then(res =>
    {
      finishCallback(res.status);
    });




  });
}

/*
  data[0] - название теста
*/
function generateDeleteTestsWidget(data, finishCallback=trayCallback)
{
  if(typeof(data) == 'function'){ data = data(); }

  if(data.length != 1)
  {
    console.log('Переданы невозможные параметры!');
    return;
  }

  text = "<center><div style='width: 400px' id ='formAlert'></div></center>";

  var form;

  showWindowYesNo('Вы уверены, что хотите удалить?', text)
  .then(res =>
  {
    if(!res)
    {
      showMessageTray('Отменено')
      return;
    }

      var remove = form.getValue()['remove'];

      if(remove)
      {
         removeTable('Tests', data)
         .then(
         res =>
         {
           finishCallback(res.status);
         });
      }
      else
      {
        deleteTable('Tests', data).then(res =>
        {
          finishCallback(res.status);
        });
      }



  });

   form = new dhx.Form('formAlert', {
    padding: "30",
    rows: [
      {
        type: "checkbox",
        labelInline: false,
        label: "Сохранить привязанные записи",
        checked: true,
        id: "remove"
      }
    ]
  });
}


/*
  data[0] - ID записи
*/
function generateDeleteTestsHistoryWidget(data, finishCallback=trayCallback)
{
  if(typeof(data) == 'function'){ data = data(); }

  if(data.length != 1)
  {
    console.log('Переданы невозможные параметры!');
    return;
  }

  text = '';
  showWindowYesNo('Вы уверены, что хотите удалить?', text)
  .then(res =>
  {
    if(!res)
    {
      showMessageTray('Отменено')
      return;
    }


    deleteTable('Tests History', data).then(res =>
    {
      finishCallback(res.status);
    });


  });
}

/*
  data[0] - название типа
*/
function generateDeleteTypesWidget(data, finishCallback=trayCallback)
{
  if(typeof(data) == 'function'){ data = data(); }

  if(data.length != 1)
  {
    console.log('Переданы невозможные параметры!');
    return;
  }

  text = "<center><div style='width: 400px' id ='formAlert'></div></center>";

  var form;

  showWindowYesNo('Вы уверены, что хотите удалить?', text)
  .then(res =>
  {
    if(!res)
    {
      showMessageTray('Отменено')
      return;
    }

      var remove = form.getValue()['remove'];

      if(remove)
      {
         removeTable('Types', data)
         .then(
         res =>
         {
           finishCallback(res.status);
         });
      }
      else
      {
        deleteTable('Types', data).then(res =>
        {
          finishCallback(res.status);
        });
      }



  });

   form = new dhx.Form('formAlert', {
    padding: "30",
    rows: [
      {
        type: "checkbox",
        labelInline: false,
        label: "Сохранить привязанные записи",
        checked: true,
        id: "remove"
      }
    ]
  });
}


/*
  data[0] - ID записи
*/
function generateDeleteTestsForTypes(data, finishCallback=trayCallback)
{
  if(typeof(data) == 'function'){ data = data(); }

  if(data.length != 1)
  {
    console.log('Переданы невозможные параметры!');
    return;
  }

  text = '';
  showWindowYesNo('Вы уверены, что хотите удалить?', text)
  .then(res =>
  {
    if(!res)
    {
      showMessageTray('Отменено')
      return;
    }


    deleteTable('Tests For Types', data).then(res =>
    {
      finishCallback(res.status);
    });




  });
}
