function showMessageBox(title, html)
{
  var win = new dhx.Window({width:300, height: 200, title: title, closable: true, html: html});
  win.show();
}

function showMessage(text)
{
    dhx.message({text: text, icon: "dxi-close", position: "bottom-left"});
}

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
