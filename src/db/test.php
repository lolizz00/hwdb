<?php
  include('dbList.php');
  include('dbAdd.php');
  include('dbUser.php');
  include('dbDelete.php');
  include('dbRemove.php');

  $date = "2019-11-15 21:11:10";


  $list = new hwdbList();
  $add = new hwdbAdd();
  $user = new hwdbUser();
  $del = new hwdbDelete();
  $rem = new hwdbRemove();

  //$add->addTable('Tests History', ['123', 'DRFF', 'Ящк', '2019-11-26 12:12:12', 'OK', 'root']);

  var_dump($res);
?>
