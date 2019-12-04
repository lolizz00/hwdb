function reportCompletedTestsDevices(widget, device)
{
  var type = device['Тип устройства'];
  var serial = device['Серийный номер'];

  getTable('Tests For Types').then(res =>{
    var data = res.data;

    data = filterData(data, {
      'Название типа' : type
    });

    var tests = dictGetValuesKey(data, 'Название теста');

    getTable('Tests History').then(res => {
      var history = res.data;

      var headers = [];
      headers.push({width: 200, id : 'Название теста', header: [{text: 'Название теста'}]});
      headers.push({width: 200, id : 'Результат теста', header: [{text: 'Результат теста'}]});
      headers.push({width: 200, id : 'Время теста', header: [{text: 'Время теста'}]});

      var rows = [];

      // <span style='color: red'></span>
      for(var i =0; i < tests.length;i++)
      {
          last = filterData(history,
            {
              'Название теста' : tests[i],
              'Серийный номер' : serial,
              'Тип устройства' : type
            });
          last =  getLastRowTestsHistory(last);


          if(last == null)
          {
            rows.push( {
              'Название теста' : tests[i],
              'Результат теста': "<span style='color: red'>Не выполнялся</span>",
              'Время теста' :  "<span style='color: red'>Не выполнялся</span>"
            });
          }
          else
          {
            rows.push( {
              'Название теста' : tests[i],
              'Результат теста': last['Результат теста'],
              'Время теста' :  last['Время теста']
            });
          }
      }

      var grid = new dhx.Grid(widget,
      {
        height: 300,
        width:  605,
        columns: headers,
        data: rows
      });


    });



    console.log(data);


  });
}


function summaryReportDevices(widget, device)
{
  var type = device['Тип устройства'];
  var serial = device['Серийный номер'];

  /* Все ли тесты выполнены  */
  getTable('Tests For Types').then(res =>{
    var data = res.data;

    data = filterData(data, {
      'Название типа' : type
    });

    var tests = dictGetValuesKey(data, 'Название теста');

    getTable('Tests History').then(res => {
        var history = res.data;

        var allCompl = true;
        for(var i =0; i < tests.length;i++)
        {
          last = filterData(history,
            {
              'Название теста' : tests[i],
              'Серийный номер' : serial,
              'Тип устройства' : type
            });


          last =  getLastRowTestsHistory(last);

          if(last == null)
          {
            allCompl = false;
          }
        }

        if(allCompl)
        {
          console.log('Все тесты выполнены');
        }
        else
        {
          console.log('Не все тесты выполнены');
        }


    });

  });


  getTable('Places History').then(res => {
        var history = res.data;

      //  last = filterData(history, {'Название теста' : tests[i]});
    //    last =  getLastRowTestsHistory(last);

  });


}
