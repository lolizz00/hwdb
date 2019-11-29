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
