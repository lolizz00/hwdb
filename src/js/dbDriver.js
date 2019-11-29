/* Получение какой-либо таблицы */
function getTable(name)
{
  data = {table: name};
  target = 'tables.php';
  request = 'getTable';
  return sendPOST_prom(data, target, request);
}
