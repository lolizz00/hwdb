function showMessageBox(title, html)
{
  var win = new dhx.Window({width:300, height: 200, title: title, closable: true, html: html});
  win.show();
}

function showMessageTray(text)
{
    dhx.message({text: text, icon: "dxi-close", position: "bottom-left"});
}
