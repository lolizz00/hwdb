window.addEventListener('load', function ()
{
    $("#loginButton").on("click", loginIn);
});


function loginIn()
{
  var login = $('#login').val();
  var pass = $("#pass").val();

  // TODO: check

  var data = {login: login, pass: pass };
  console.log(data);


  sendPOST(data, 'users.php', 'login', function(res)
  {
    if(res.status == 'OK')
    {
        window.location.href = "index.html";
    }
    else
    {
      alert(res.status);
    }
  });

}
