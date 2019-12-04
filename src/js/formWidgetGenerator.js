/*
  Создание форм для редактирования и записи в таблицы
*/

/* --- Вспомогалки --- */

function generateComboListDevices(data)
{
  result = [];
  for(var i = 0; i < data.length;i++)
  {
    tmp_name = data[i]['Серийный номер'] + '(' + data[i]['Тип устройства'] + ')';
    tmp_id = data[i]['Серийный номер'] + ' ' + data[i]['Тип устройства'];

    result.push({id: tmp_id, value: tmp_name});
  }

  return result;
}

function generateComboListUsers(data)
{
  result = [];
  for(var i = 0; i < data.length;i++)
  {
    name = data[i]['Имя'];
    login = data[i]['Логин'];
    result.push({id: login, value: name});
  }

  return result;
}

function generateComboList(data, row)
{
  result = [];
  for(var i = 0; i < data.length;i++)
  {
      tmp = { id: data[i][row], value: data[i][row]};
      result.push(tmp);
  }

  return result;

}

/* --- Формы ---- */


function generateFormDevices(widget)
{
  return getTable('Types')
  .then(res =>
  {
    types = res.data;


    var form  = new dhx.Form(widget, {
      cellCss: 'dhx_widget--bordered',
      height: 200,
      width: 500,
      rows: [
      {
        id: "serial",
        type: "input",
        label: "Серийный номер",
        required: true
      },
      {
        id: "type",
        type: "combo",
        label: "Тип устройства",
        data : generateComboList(types, 'Имя типа'),
        required: true
      },
      {
        type: "button",
        value: "Применить",
        size: "medium",
        id : "sendForm"
      }
    ]});

    return form;

  });
}

function generateFormPlaces(widget, addDelete=false)
{



  var _rows =  [
    {
      id: "name",
      type: "input",
      label: "Название места",
      required: true
    },
    {
      type: "button",
      value: "Применить",
      size: "medium",
      id : "sendForm"
    }
  ];

  if(addDelete)
  {
    _rows.push(  {
        type: "button",
        value: "Удалить",
        size: "medium",
        id : "delete"
      });
  }



  var form  = new dhx.Form(widget, {
    cellCss: 'dhx_widget--bordered',
    height: 200,
    width: 500,
    rows: _rows
  });

  return form;
}

function generateFormPlacesHistory(widget)
{

  var devices;
  var places;
  var users;

  return getTable('Devices')
  .then(res =>
  {
    devices = res.data;

    return getTable('Places');
  })
  .then(res =>
  {
    places = res.data;

    return getTable('Users');
  })
  .then(res =>
  {
    users = res.data;

    var form  = new dhx.Form(widget, {
      cellCss: 'dhx_widget--bordered',
      height: 500,
      width: 500,
      rows: [
        {
          id: "devBox",
          type: "combo",
          label: "Название устройства",
          data : generateComboListDevices(devices),
          required: true
        },
        {
            id: "placeBox",
            type: "combo",
            label: "Название места",
            data : generateComboList(places, 'Название места'),
            required: true
        },
        {
            id: "dateBox",
            type: "datepicker",
            label: "Время",
            dateFormat: "%Y-%m-%d",
            value: new Date(),
            required: true
        },
        {
            id: "userBox",
            type: "combo",
            label: "Имя пользователя",
            data : generateComboListUsers(users),
            required: true
        },
        {
          type: "button",
          value: "Применить",
          size: "medium",
          id : "sendForm"
        },

      ]
    });

    return form;

  });
}

function generateFormTests(widget, addDelete=false)
{

  /*
    А это можно рисовать заново
  */
  formName = widget + '_form';
  clearWidget(formName);
  $('#' + widget).append("<div id='"+  formName +"'></div>");

  var _rows = [
    {
      id: "nameInput",
      type: "input",
      label: "Название теста",
      required: true
    },
    {
      type: "button",
      value: "Применить",
      size: "medium",
      id : "sendForm"
    }
  ];


  if(addDelete)
  {
    _rows.push(  {
        type: "button",
        value: "Удалить",
        size: "medium",
        id : "delete"
      });
  }

  var form  = new dhx.Form(formName, {
    cellCss: 'dhx_widget--bordered',
    height: 200,
    width: 500,
    rows: _rows
  });

  $('#' + widget).append("</br></br><div id='descEditor'></div>");

  /*
    Нельзя перегенирировать - глючит
  */
  if(!checkExists('editor'))
  {
    createEditor('descEditor', 'Редактор описания', {
      width: "800px",
      height: "300px",
      resize_enabled: false
    });
  }

  return form;
}

function generateFormTestsForTypes(widget)
{
  var tests;
  var types;

  return getTable('Tests')
  .then(res =>
  {
    tests = res.data;
    return getTable('Types');
  })
  .then(res =>
  {
    types = res.data;

    var form  = new dhx.Form(widget, {
      cellCss: 'dhx_widget--bordered',
      height: 300,
      width: 500,
      rows: [
        {
          id: "typeCombo",
          type: "combo",
          label: "Название типа",
          data: generateComboList(types, 'Имя типа'),
          required: true
        },
        {
          id: "testCombo",
          type: "combo",
          label: "Название теста",
          data: generateComboList(tests, 'Название теста'),
          required: true
        },
        {
          type: "button",
          value: "Применить",
          size: "medium",
          id : "sendForm"
        }
      ]
    });

    return form;


  });
}

function generateFormTestsHistory(widget)
{

  var devices;
  var tests;
  var users;
  return getTable('Devices')
  .then(res =>
  {
    devices = res.data;

    return getTable('Tests');
  })
  .then(res =>
  {
    tests = res.data;

    return getTable('Users');
  })
  .then(res =>
  {
    users = res.data;

    var form  = new dhx.Form(widget, {
      cellCss: 'dhx_widget--bordered',
      height: 500,
      width: 500,
      rows: [
        {
          id: "devBox",
          type: "combo",
          label: "Название устройства",
          data : generateComboListDevices(devices),
          required: true
        },
        {
            id: "testBox",
            type: "combo",
            label: "Название  теста",
            data : generateComboList(tests, 'Название теста'),
            required: true
        },
        {
            id: "dateBox",
            type: "datepicker",
            label: "Время",
            dateFormat: "%Y-%m-%d",
            value: new Date(),
            required: true
        },
        {
            id: "result",
            type: "input",
            label: "Результат",
            required: true
        },
        {
            id: "userBox",
            type: "combo",
            label: "Имя пользователя",
            data : generateComboListUsers(users),
            required: true
        },
        {
          type: "button",
          value: "Применить",
          size: "medium",
          id : "sendForm"
        },

      ]
    });

    return form;

  });
}

function generateFormTypes(widget, addDelete=false)
{

  var _rows = [
    {
      id: "nameInput",
      type: "input",
      label: "Название типа",
      required: true
    },
    {
      type: "button",
      value: "Применить",
      size: "medium",
      id : "sendForm"
    },

  ];

  if(addDelete)
  {
    _rows.push(  {
        type: "button",
        value: "Удалить",
        size: "medium",
        id : "delete"
      });
  }

  var form  = new dhx.Form(widget, {
    cellCss: 'dhx_widget--bordered',
    height: 200,
    width: 500,
    rows: _rows
  });

  return form;
}
