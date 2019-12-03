<?php

include_once('db.php');


/*
  Удаление из таблицы
  Но при этом данные в связанных таблицах сохраняются


  Вроде проверено
*/

class hwdbRemove extends hwdb
{

  function removeTable($name, $params)
  {
    $name = str_replace(" ", "", $name);
    $name =  "rem" . $name;

    if(!method_exists($this, $name))
    {
      return "Неизвестная таблица!";
    }

    $res = call_user_func(array($this, $name), $params);
    return $res;
  }

  /*
    Замещение из таблицы устройств
    0 - Serial Code
    1 - Type Name
  */
  function remDevices($params)
  {
    if(count($params) != 2) { return "Неправильные аргументы!";}

    $typeID = $this->getIDbyNameTypes($params[1]);
    if($typeID === false){ return "Неизвестный тип!";}

    $devID = $this->getIDbySerialTypeDevices($params[0], $params[1]);
    if($devID === false) { return "Такого устройства не существует!";}


    $txt = "SET @devid = ?; SET @typeid = ?;
         UPDATE `Tests History`  SET `Device ID` =  NULL  WHERE `Device ID` = @devid ;
         UPDATE `Places History` SET `Device ID` =  NULL  WHERE `Device ID` = @devid;
         DELETE FROM Devices WHERE  ID = @devid AND `Type ID` = @typeid";


    $stat = true;
    $res = $this->queryDB($txt, [$devID, $typeID], $stat);

    if($stat) { return "Успешно!"; } else { return "Ошибка!"; }

  }

  /*
    Замещение из таблицы мест

    0 - Name
  */
    function remPlaces($params)
    {
      if(count($params) != 1) { return "Неправильные аргументы!";}

      $plID = $this->getIDbyNamePlaces($params[0]);
      if($plID === false) { return "Такого места не существует!";}


      $txt = "SET @plid = ?;
              UPDATE `Places History` SET `Place ID` = NULL WHERE `Place ID` = @plid;
              DELETE FROM Places WHERE ID = @plid;";

      $stat = true;
      $res = $this->queryDB($txt, $plID, $stat);

      if($stat) { return "Успешно!"; } else { return "Ошибка!"; }

    }


    /*
      Замещение из таблицы тестов

      0 - Test Name
    */
      function remTests($params)
      {
        if(count($params) != 1) { return "Неправильные аргументы!";}

        $tid = $this->getIDbyNameTests($params[0]);
        if($tid === false){ return "Такого места не существует!";}


        $txt =   "SET @tid = ?;
                  UPDATE  `Tests History`   SET `Test ID` = NULL WHERE `Test ID` = @tid;
                DELETE FROM `Tests For Types` WHERE `Test ID` = @tid;
                  DELETE  FROM  Tests WHERE ID = @tid";

        $stat = true;
        $res = $this->queryDB($txt, $tid, $stat);

        if($stat) { return "Успешно!"; } else { return "Ошибка!"; }

      }

      /*
        Замещение из таблицы типов

        0 - название типа
      */
        function remTypes($params)
        {
          if(count($params) != 1) { return "Неправильные аргументы!";}

          $typeID = $this->getIDbyNameTypes($params[0]);
          if($typeID === false){ return "Неизвестый тип!";}

          $txt =   "SELECT * FROM Devices WHERE Devices.`Type ID`= ?";
          $res = $this->queryDB($txt, $typeID, $stat)->fetchAll();

          foreach ($res as $dev)
          {
              $name = $dev['Serial Code'];
              $this->remDevices([$name, $params[0]]);
          }

          $stat = true;
          $txt =   "DELETE FROM `Tests For Types` WHERE `Type ID` = ?;";
          $this->queryDB($txt, $typeID, $stat);


          $txt = "DELETE FROM Types WHERE Types.Name = ?";
          $res = $this->queryDB($txt, $params, $stat);

          if($stat) { return "Успешно!"; } else { return "Ошибка!"; }
        }


}


?>
