
function setCommStatus(text)
{
   $("#statComm").html("<label class='badge badge-danger'>" + text + "</label>");
}


function sendRegisterForm()
{
  var login = $("#loginIn").val();
  var name = $("#nameIn").val();
  var pass = $("#passIn").val();
  var repass = $("#reppassIn").val();


  if(login == "")
  {
    setCommStatus("Wrong login!");
    return;
  }

  var data = {login : login, pass: pass};
  sendPOST(data, 'users.php', 'register', res => {
    if(res.status.includes("succ. add"))
    {
       window.location.href = "login.html";
    }
    else
    {
      setCommStatus(res.status);
    }
  });


  //// TODO: check params




}



window.addEventListener('load', function ()
{
    $("#registerButton").on("click", sendRegisterForm);
});
