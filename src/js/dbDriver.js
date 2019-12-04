/* Получение какой-либо таблицы */
function getTable(name)
{
  data = {table: name};
  target = 'tables.php';
  request = 'getTable';
  return sendPOST_prom(data, target, request);
}

function addTable(name, params)
{
  data = {table: name, params: params};
  target = 'tables.php';
  request = 'addTable';
  return sendPOST_prom(data, target, request);
}

function removeTable(name, params)
{
  data = { table: name, params: params};
  target = 'tables.php';
  request = 'remTable';
  return sendPOST_prom(data, target, request);
}

function deleteTable(name, params)
{
  data = { table: name, params: params};
  target = 'tables.php';
  request = 'delTable';
  return sendPOST_prom(data, target, request);
}

function editTable(name, selector, params)
{

  selector = Object.values(selector);
  params = Object.values(params);

  params = selector.concat(params);

  data = { table: name, params: params};
  target = 'tables.php';
  request = 'editTable';
  return sendPOST_prom(data, target, request);
}


function makeBackup()
{
  target = 'backup.php';
  request = 'makeBackup';
  return sendPOST_prom([], target, request);
}


function loginByName(name)
{
  return filterTable('Users', {'Имя' : name}).then(res => {
    return res['Логин'];
  });

}


/*
  Фильтрация уже существующей таблицы
*/
function filterData(data, filter, noArr=false)
{
  var keys = Object.keys(filter);
  var res = [];

  for(var i =0; i < data.length;i++)
  {
    var flg = true;
    for(var j =0; j < keys.length;j++)
    {
      if(data[i][keys[j]] != filter[keys[j]])
      {
        flg = false;
        break;
      }

    }
    if(flg)
    {
      res.push(data[i]);
    }
  }

  if(res.length == 1)
  {
    if(!noArr)
    {
      res = res[0];
    }
  }


  return res;
}

function filterTable(table, filter)
{
  return getTable(table)
  .then(res => {

    data = res.data;

    return filterData(data, filter);

  });
}



function getLastRowTestsHistory(data)
{
  if(data == null){return null;}

  if(data.length == undefined)
  {
    return data;
  }

  data =  data.sort( (prev, next) => {
      prev = new Date(prev['Время теста']);
      next = new Date(next['Время теста']);
      return prev < next;
  });

  return data[0];
}

function getLastRowPlacesHistory(data)
{
  return null;
}
