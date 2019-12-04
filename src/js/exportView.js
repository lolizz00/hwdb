function exportViewTests(obj ,name='Tests')
{
  obj.export.xlsx({
    name : name,
    url: '//export.dhtmlx.com/excel'
  });
}


function exportViewPlaces(obj, name='Places')
{
  obj.export.xlsx({
    name : name,
    url: '//export.dhtmlx.com/excel'
  });
}
