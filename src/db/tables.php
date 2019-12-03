<?php

include('dbList.php');
include('dbAdd.php');
include('dbUser.php');
include('dbDelete.php');
include('dbRemove.php');
include('dbEdit.php');

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



      if($request == 'getTable')
      {
        $db = new hwdbList();

        if(isset($data['table']))
        {
          $res = $db->listTable($data['table']);
          $resp['data'] = $res;
        }
        else
        {
          $resp['status'] = 'Table name not set!';
        }
      }
      else if($request == 'addTable')
      {
        $db = new hwdbAdd();

        if(isset($data['table']) && isset($data['params']))
        {
          if(!is_array($data['params']))
          {
            $resp['status'] = 'Wrong params format!';
          }
          else
          {
            $res = $db->addTable($data['table'], $data['params'] );
            $resp['status'] = $res;
          }



        }
        else
        {
          $resp['status'] = 'Table name not set!';
        }

      }
      else if($request == 'delTable')
      {
        $db = new hwdbDelete();

        if(isset($data['table']) && isset($data['params']))
        {
          if(!is_array($data['params']))
          {
            $resp['status'] = 'Wrong params format!';
          }
          else
          {
            $res = $db->deleteTable($data['table'], $data['params']);
            $resp['status'] = $res;
          }
        }
        else
        {
          $resp['status'] = 'Table name not set!';
        }
      }
      else if($request == 'remTable')
      {
        $db = new hwdbRemove();

        if(isset($data['table']) && isset($data['params']))
        {
          if(!is_array($data['params']))
          {
            $resp['status'] = 'Wrong params format!';
          }
          else
          {
            $res = $db->removeTable($data['table'], $data['params']);
            $resp['status'] = $res;
          }
        }
        else
        {
          $resp['status'] = 'Table name not set!';
        }
      }
      else if($request == 'editTable')
      {
        $db = new hwdbEdit();

        if(isset($data['table']) && isset($data['params']))
        {
          if(!is_array($data['params']))
          {
            $resp['status'] = 'Wrong params format!';
          }
          else
          {
            $res = $db->editTable($data['table'], $data['params']);
            $resp['status'] = $res;
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
