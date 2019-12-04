/*
  Создание форм просмотра таблиц
*/

/* --- Вспомогалки --- */

/* Генериуем заголовки для таблиц*/
function getHeadersFromData(data, width)
{
  data = data[0];
  var headers = [];


  var i =0;
  for(var key in data)
  {
    if(typeof(width) === 'object')
    {
      _width = width[i]
    }
    else
    {
      _width = width;
    }
    headers.push( {width: _width, id: key, header: [{text: key}]});
    i = i + 1;
  }
   return headers;
}


/* --- Таблицы --- */

function generateViewDevices(widget, filter=null)
{
  return getTable('Devices')
  .then(res =>
  {
    var data = res.data;

    if(filter) { data = filterData(data, filter);}


    var grid  = new dhx.Grid(widget,
    {
      height: 300,
      width: 402,
      columns:  getHeadersFromData(data, 200),
      data: data
    });

    return grid;

  });
}

function generateViewPlaces(widget, filter=null)
{
  return getTable('Places')
  .then(res =>
  {
    var data = res.data;
    if(filter) { data = filterData(data, filter);}
    var grid  = new dhx.Grid(widget,
    {
      height: 300,
      width: 202,
      columns:  getHeadersFromData(data, 200),
      data: data
    });

    return grid;

  });
}

function generateViewPlacesHistory(widget, filter=null, selection=false)
{
  return getTable('Places History')
  .then(res =>
  {
    var data = res.data;
    if(filter) { data = filterData(data, filter);}
    width = [150, 150, 150, 150, 150, 200];

    if(selection)
    {
      var _selection = 'row';
    }
    else
    {
        _selection = "";
    }

    if(!data.length)
    {
      $('#' + widget).append('</br><b>Пусто!<b>');
    }

    var grid  = new dhx.Grid(widget,
    {
      height: 300,
      width: 953,
      columns:  getHeadersFromData(data, width),
      data: data,
      selection : _selection
    });

    return grid;

  });
}

function generateViewTests(widget, filter=null)
{
  return getTable('Tests')
  .then(res =>
  {
    var data = res.data;
    if(filter) { data = filterData(data, filter);}
    width = 200;


    var grid  = new dhx.Grid(widget,
    {
      height: 300,
      width: 402,
      columns:  getHeadersFromData(data, width),
      data: data
    });

    return grid;

  });
}

function generateViewTestsForTypes(widget, filter=null)
{
  return getTable('Tests For Types')
  .then(res =>
  {
    var data = res.data;
    if(filter) { data = filterData(data, filter);}
    width = [150, 150, 150];


    var grid  = new dhx.Grid(widget,
    {
      height: 300,
      width: 452,
      columns:  getHeadersFromData(data, width),
      data: data
    });

    return grid;

  });
}

function generateViewTestHistory(widget, filter=null, selection=false)
{
  return getTable('Tests History')
  .then(res =>
  {
    var data = res.data;
    if(filter) { data = filterData(data, filter, true);}
    width = [150, 150, 220, 200, 150, 150, 150];

    if(selection)
    {
      var _selection = 'row';
    }
    else
    {
        _selection = "";
    }

    if(!data.length)
    {
      $('#' + widget).append('</br><b>Пусто!<b>');
    }

    var grid  = new dhx.Grid(widget,
    {
      height: 350,
      width: 1175, // TODO
      columns:  getHeadersFromData(data, width),
      data: data,
      selection: _selection
    });

    return grid;

  });
}

function generateViewTypes(widget, filter=null)
{
  return getTable('Types')
  .then(res =>
  {
    var data = res.data;
    if(filter) { data = filterData(data, filter);}
    width = 150;
    var grid  = new dhx.Grid(widget,
    {
      height: 300,
      width: 202,
      columns:  getHeadersFromData(data, width),
      data: data
    });

    return grid;

  });
}
