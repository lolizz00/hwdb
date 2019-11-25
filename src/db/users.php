<?php

include 'db.php';

$resp = [];



if ($_SERVER['REQUEST_METHOD'] !== 'POST')
{
  $resp['status'] = 'Wrong method!';
}
else
{
  if(!isset($_POST['json']) || !isset($_POST['request']))
  {
      $resp['status'] = 'Not JSON data';
  }
  else
  {

    $request = $_POST['request'];
    $data = json_decode($_POST['json'], true);



    if($request == 'register')
    {
      if( !isset($data['login']) || !isset($data['pass']) )
      {
          $resp['status'] = 'Wrong params of request!';
      }
      else
      {

        $login = $data['login'];
        $pass = $data['pass'];

        // TODO: other params

        $db = new hwdb();
        $res = $db->addUser($login, $pass);
        $resp['status'] = $res;
      }

    }
    elseif ($request == 'checkLogged')
    {
      if(isset($_COOKIE['currUser']) && ($_COOKIE['currUser'] != ''))
      {
        $resp['status'] = $_COOKIE['currUser'];
      }
      else
      {
        $resp['status'] = 'Not logged';
      }
    }
    else if($request == 'login')
    {

      if( !isset($data['login']) || !isset($data['pass']) )
      {
          $resp['status'] = 'Wrong params of request!';
      }
      else
      {
        $login = $data['login'];
        $pass = $data['pass'];

        $db = new hwdb();

        $user = $db->getUser($login);
        if(!$user)
        {
          $resp['status'] = 'Unknown user!';
        }
        else
        {
          if($user['Password'] == md5($pass))
          {
            $resp['status'] = 'OK';
            setcookie('currUser', $login);
          }
          else
          {
            $resp['status'] = 'Wrong password!';
          }
        }


      }
    }
    elseif ($request == 'logout')
    {
      setcookie('currUser', '');
    }
    elseif($request == 'getcurr')
    {
      if(isset($_COOKIE['currUser']) && ($_COOKIE['currUser'] != ''))
      {
        $db = new hwdb();
        $user = $db->getUser($_COOKIE['currUser']);

        if($user === false)
        {
          $resp["status"] = 'No logged';
        }
        else
        {
            $resp["data"] = $user;
            $resp["status"] = 'OK';
        }
      }
      else
      {
          $resp["status"] = 'No logged';
      }
    }
    else
    {
        $resp['status'] = 'Wrong request!';
    }
  }


}

echo json_encode($resp);

?>
