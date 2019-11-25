window.addEventListener('load', function ()
{
  checkLogged(function(res)
  {
    if(res.status == 'Not logged')
    {
      window.location.href = "login.html";
    }
    else
    {
      $("#userName").html(res.status);
      dhx.message({text: "Welcome, " + res.status + " !", icon: "dxi-close", position: "bottom-left"});
    }
  })

  $("#logOut").on("click", logOut);

});

function logOut()
{
  sendPOST([], 'users.php', 'logout', function(res)
  {
    window.location.href = "login.html";
  });
}
