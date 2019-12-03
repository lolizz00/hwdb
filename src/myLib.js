function sendPOST(data, target, _request, callback)
{
  target = 'src/db/' + target;
  $.ajax({
    type: 'POST',
    url: target,
    data : {json: JSON.stringify(data), request: _request},
    dataType: 'json'
  })
.done(function(data)
{
  if(callback)
  {
    callback(data);
  }
});

}


function sendPOST_prom(data, target, _request)
{
    return $.ajax({
            type: 'POST',
            url: 'src/db/' +  target,
            data : {json: JSON.stringify(data), request: _request},
            dataType: 'json'
          });

}


function lenDict(obj)
{
  return (Object.keys(obj)).length;
}

function renameKeys(obj, oldkeys, newkeys)
{
  if(oldkeys.length != newkeys.length)
  {
    return undefined;
  }

  for(var i = 0; i < oldkeys.length;i++)
  {
    obj = renameKey(obj, oldkeys[i], newkeys[i]);
  }

  return obj;
}

function renameKey(obj, oldkey, newkey)
{
  res = {};
  keys = Object.keys(obj);

  for(var i =0; i < keys.length;i++)
  {
    if(oldkey == keys[i])
    {
      res[newkey] = obj[oldkey];
    }
    else
    {
      res[keys[i]] = obj[keys[i]];
    }
  }

  return res;
}

function eqDict(a, b)
{
  return JSON.stringify(a) == JSON.stringify(b);
}

function splitDevID(id)
{
  id = id.split(' ');

  return {
    'Серийный номер' : id[0],
    'Тип устройства' :  id[1]
  };

}

function getCurrUser_prom()
{
  return sendPOST_prom([], 'users.php', 'getcurr');
}

function checkLogged(callback)
{
  sendPOST([], 'users.php', 'checkLogged', callback);
}

function getParameterByName(name, url)
{
  if (!url) url = window.location.href;
  name = name.replace(/[\[\]]/g, '\\$&');
    var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, ' '));
}
