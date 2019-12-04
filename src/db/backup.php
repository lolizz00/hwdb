<?php

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



      if($request == 'makeBackup')
      {
        $resp['status'] = 'Успешно!';
        $out = system('sh /srv/http/database/makeBackup');
      }
      elseif (0)
      {

      }
      else
      {
        $resp['status'] = 'Неизвестный метод!';
      }

  }

}


  echo json_encode($resp);

?>
