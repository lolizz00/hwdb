<?php

include 'db.php';


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

      $db = new hwdb();

      if($request == 'getTable')
      {
        if(isset($data['table']))
        {
          $res = $db->listTable($data['table']);

          if($res == NULL)
          {
              $resp['status'] = 'Wrong table name!';
          }
          else
          {
            $resp['status'] = 'OK';
            $resp['data'] = $res;
          }
        }
        else
        {
          $resp['status'] = 'Table name not set!';
        }
      }
      else if($request == 'addTable')
      {
        if(isset($data['table']) && isset($data['params']))
        {
          $res = $db->addTable($data['table'], $data['params'] );

          if($res === NULL)
          {
            $resp['status'] = 'Wrong table name!';
          }
          else if($res === false)
          {
            $resp['status'] = 'Wrong params!';
          }
          else
          {
            $resp['status'] = 'OK';
          }
        }
        else
        {
          $resp['status'] = 'Table name not set!';
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
