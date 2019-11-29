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

function generateViewDevices(widget)
{
  return getTable('Devices')
  .then(res =>
  {
    var data = res.data;

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

function generateViewPlaces(widget)
{
  return getTable('Places')
  .then(res =>
  {
    var data = res.data;

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

function generateViewPlacesHistory(widget)
{
  return getTable('Places History')
  .then(res =>
  {
    var data = res.data;
    width = [150, 150, 150, 150, 150, 200];


    var grid  = new dhx.Grid(widget,
    {
      height: 300,
      width: 953,
      columns:  getHeadersFromData(data, width),
      data: data
    });

    return grid;

  });
}

function generateViewTests(widget)
{
  return getTable('Tests')
  .then(res =>
  {
    var data = res.data;
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

function generateViewTestsForTypes(widget)
{
  return getTable('Tests For Types')
  .then(res =>
  {
    var data = res.data;
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

function generateViewTestHistory(widget)
{
  return getTable('Tests History')
  .then(res =>
  {
    var data = res.data;
    width = [150, 150, 220, 200, 150, 150, 150];


    var grid  = new dhx.Grid(widget,
    {
      height: 300,
      width: 1052, // TODO
      columns:  getHeadersFromData(data, width),
      data: data
    });

    return grid;

  });
}

function generateViewTypes(widget)
{
  return getTable('Types')
  .then(res =>
  {
    var data = res.data;
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
