var type="";

var layout;
var grid;
var form;

var comboData;

function showMessageBox(title, html)
{
  var win = new dhx.Window({width:300, height: 200, title: title, closable: true, html: html});
  win.show();
}


/* ---  Остройка формы ----*/
function generateForm(type)
{

  if(type == 'Devices')
  {
    generateFormDevices();
  }
  else if(type == 'Tests History')
  {
    generateFormTestsHistory();
  }
  else if (type == 'Places')
  {

  }
}

function sendData()
{

}


function formDataToArray(vals)
{
  ret = [];
  for(key in vals)
  {

    data = vals[key];

    if(typeof(data) == "object")
    {
      ret.push(data[0]);
    }
    else
    {
      ret.push(data);
    }
  }
  return ret;
}

function generateFormDevices()
{
  sendPOST( {table: 'Types'}, 'tables.php', "getTable", function(data)
  {
    if(data.status == "OK")
    {
      data = data.data;

      console.log('Data combo');
      console.log(data);

      comboData = [];

      for(var key in data)
      {
        comboData.push({id : "", value: data[key]['Имя типа']});
      }

      form  = new dhx.Form(null, {
        rows: [
        {
            id: "serial",
            type: "input",
            label: "Серийный номер"
        },
        {
            id: "typeBox",
            type: "combo",
            label: "Тип устройства",
            data : comboData
        },
        {
          type: "button",
          value: "send",
          size: "medium",
          id : "sendForm"
        }
        ]
      });

      form.events.on("ButtonClick", function(id, e)
      {
        alert("1223");
      });

      layout.cell("toolbar").attach(form);

    }
  });
}


function generateFormTestsHistory()
{
  var devsSerialList = [];
  var testsNameList = [];
  var userFullNameList = [];
  var currUser;


  sendPOST_prom( {table: 'Devices'}, 'tables.php', "getTable")
  .then(res =>
  {
    data = res.data;
    console.log(data);
    for(var key in data)
    {
      devsSerialList.push({id : data[key]['Серийный номер'], value: data[key]['Серийный номер'] + ' (' + data[key]['Тип устройства']  + ') '} );
    }
    return sendPOST_prom( {table: 'Tests'}, 'tables.php', "getTable")
  }).then(res =>
  {
    data = res.data;
    for(var key in data)
    {
      testsNameList.push({id : data[key]['Название теста'], value: data[key]['Название теста']});
    }
    return sendPOST_prom( {table: 'Users'}, 'tables.php', "getTable")
  }).then(res =>
  {
    data = res.data;
    for(var key in data)
    {
      userFullNameList.push({id : data[key]['Имя'], value: data[key]['Имя']});
    }
  return getCurrUser_prom();
  }).then(res =>
  {
    // ---

    currUser = res.data;

    console.log(devsSerialList);
    console.log(testsNameList);
    console.log(userFullNameList);
    console.log(currUser["Full Name"]);

    form  = new dhx.Form(null, {
      rows: [ {
          id: "serialBox",
          type: "combo",
          label: "Серийный Номер",
          data : devsSerialList,
          required: true
      },
      {
          id: "testBox",
          type: "combo",
          label: "Название теста",
          data : testsNameList,
          required: true
      },
      {
          id: "dateBox",
          type: "datepicker",
          label: "Время",
          dateFormat: "%Y-%m-%d %G:%i:%s",
          timePicker: true,
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
          data : userFullNameList,
          required: true
      },
      {
        type: "button",
        value: "Добавить",
        size: "medium",
        id : "sendForm",
        sumbit: true
      }
      ]
    });



    form.events.on("ButtonClick", function(id, e)
    {
      if(form.validate())
      {
        vals = form.getValue();

        vals = formDataToArray(vals);
        console.log(vals);

        sendPOST_prom({params: vals, table: 'Tests History'}, 'tables.php', 'addTable').then(res =>
        {
          console.log(res);
          showMessageBox('Результат', res.status);
        });

      }
    });

    layout.cell("toolbar").attach(form);
  });


}

function generateFormPlaces()
{

}

/* --- Создание основной таблицы ---*/

// считывание таблицы с последующей остройкой
function getTable(name)
{
  var targ = "get" + name;
  targ = targ.replace(/ /g, "");

  sendPOST( {table: name}, 'tables.php', "getTable", function(data)
  {
    //console.log(data);

    if(data.status == "OK")
    {
      generateData(data.data);
    }
    else
    {
        console.log("Fuck!");
    }
  });
}


// создание заголовков
function generateColums(data)
{
  var res = [];

  for(var key in data[0])
  {
    res.push({ width: 200, id: key, header: [{ text: key }]});
  }

  return res;
}



// подключение таблицы
function generateData(_data)
{
   grid = new dhx.Grid(null,
  {
    columns: generateColums(_data),
    data: _data
  });
   layout.cell("center").attach(grid);
}


/* --- Создание разметки --- */
function generateLayout(type)
{
  var style;

  if(type == 'Devices')
  {
    style =
    {
     css: "dhx_layout-cell--bordered",
     rows: [
       {
         id: "toolbar",
         css: "dhx_layout-cell--border_bottom",
       },
       {
         height: "200px",
         cols:[
           {

             id: "center",
             css: "dhx_layout-cell--border_right",

           }]
       }
     ]
   };
 }
 else if (type == 'Tests History')
 {
   style =
   {
    css: "dhx_layout-cell--bordered",
    rows: [
      {
        id: "toolbar",
        css: "dhx_layout-cell--border_bottom",
      },
      {
        height: "200px",
        cols:[
          {

            id: "center",
            css: "dhx_layout-cell--border_right",

          }]
      }
    ]
  };
 }




layout = new dhx.Layout("layout", style);

}



/* --- Дополнительно --- */

window.addEventListener('load', function ()
{
  checkLogged(function(res)
  {
    if(res.status == 'Not logged')
    {
      window.location.href = "login.html";
    }
    else
    {
      $("#userName").html(res.status);
      showMessage("Welcome, " + res.status + " !");
    }
  })

  $("#logOut").on("click", logOut);


  //type = getParameterByName('target');

  //type = 'Devices';
  type = 'Tests History';
  //type = 'Places';

  generateLayout(type);
  getTable(type);
  generateForm(type);


});



// выход из учетки
function logOut()
{
  sendPOST([], 'users.php', 'logout', function(res)
  {
    window.location.href = "login.html";
  });
}
