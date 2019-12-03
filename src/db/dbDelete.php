<?php

include_once('db.php');

/*
  Класс, отвечающий за удаление из базы данных
  Удаление окончательное, со всеми связками


  Проверено!
*/

class hwdbDelete extends hwdb
{

  function deleteTable($name, $params)
  {
    $name = str_replace(" ", "", $name);
    $name =  "del" . $name;

    if(!method_exists($this, $name))
    {
      return "Неизвестная таблица!";
    }

    $res = call_user_func(array($this, $name), $params);
    return $res;
  }

  /*
    Удаление из таблицы устройств
    0 - Serial Code
    1 - Type Name
  */
  function delDevices($params)
  {
    if(count($params) != 2) { return "Неправильные аргументы!";}


    $typeID = $this->getIDbyNameTypes($params[1]);
    if($typeID === false){ return "Неизвестный тип!";}

    $devID = $this->getIDbySerialTypeDevices($params[0], $params[1]);
    if($devID === false) { return "Такого устройства не существует!";}

    $txt = "SET @devid = ?; SET @typeid = ?;
         DELETE  FROM `Tests History`  WHERE  `Tests History`.`Device ID` = @devid ;
         DELETE  FROM `Places History` WHERE `Places History`.`Device ID` = @devid ;
         DELETE FROM Devices WHERE  ID = @devid AND `Type ID` = @typeid";

    $stat = true;
    $res = $this->queryDB($txt, [$devID, $typeID], $stat);

    if($stat) { return "Успешно!"; } else { return "Ошибка!"; }


   }


/*
  Удаление из таблицы мест
  0 - Name
*/
  function delPlaces($params)
  {
    if(count($params) != 1) { return "Неправильные аргументы!";}

    $plID = $this->getIDbyNamePlaces($params[0]);
    if($plID === false) { return "Такого места не существует!";}


    $txt = "SET @plid = ?;
            DELETE  FROM `Places History` WHERE `Places History`.`Place ID` = @plid;
            DELETE FROM Places WHERE ID = @plid;";

    $stat = true;
    $res = $this->queryDB($txt, $plID, $stat);

    if($stat) { return "Успешно!"; } else { return "Ошибка!"; }

  }

/*
  Удаление из таблицы истории места
  0 - ID
*/
  function delPlacesHistory($params)
  {
    if(count($params) != 1) { return "Неправильные аргументы!";}

    if(!$this->checkPlacesHistoryIDexists($params[0]))
    {
      return "Такой записи не существует!";
    }

    $txt =   "DELETE  FROM `Places History` WHERE `Places History`.`ID` = ?";;

    $stat = true;
    $res = $this->queryDB($txt, $params, $stat);

    if($stat) { return "Успешно!"; } else { return "Ошибка!"; }

  }

/*
  Удаление из таблицы тестов
  0 - Test Name
*/
  function delTests($params)
  {
    if(count($params) != 1) { return "Неправильные аргументы!";}

    $tid = $this->getIDbyNameTests($params[0]);
    if($tid === false){ return "Такого теста не существует!";}


    $txt =   "SET @tid = ?;
              DELETE  FROM `Tests History` WHERE `Tests History`.`Test ID` = @tid;
              DELETE FROM `Tests For Types` WHERE `Test ID` = @tid;
              DELETE  FROM  Tests WHERE ID = @tid";

    $stat = true;
    $res = $this->queryDB($txt, $tid, $stat);

    if($stat) { return "Успешно!"; } else { return "Ошибка!"; }

  }

/*
  Удаление из таблицы истории тестов
  0 - ID
*/
  function delTestsHistory($params)
  {
    if(count($params) != 1) { return "Неправильные аргументы!";}

    if(!$this->checkTestsHistoryIDexists($params[0]))
    {
      return "Такой записи не существует!";
    }

    $txt =   "DELETE  FROM `Tests History` WHERE `Tests History`.`ID` = ?";;

    $stat = true;
    $res = $this->queryDB($txt, $params, $stat);
    if($stat) { return "Успешно!"; } else { return "Ошибка!"; }

  }

/*
  Удаление из таблицы типов

  0 - название типа
*/
  function delTypes($params)
  {
    if(count($params) != 1) { return "Неправильные аргументы!";}

    $typeID = $this->getIDbyNameTypes($params[0]);
    if($typeID === false){ return "Неизвестый тип!";}

    $txt =   "SELECT * FROM Devices WHERE Devices.`Type ID`= ?";
    $res = $this->queryDB($txt, $typeID, $stat)->fetchAll();

    foreach ($res as $dev)
    {
        $name = $dev['Serial Code'];
        $this->delDevices([$name, $params[0]]);
    }

    $stat = true;
    $txt =  "DELETE FROM `Tests For Types` WHERE `Type ID` = ?;";
    $this->queryDB($txt, $typeID, $stat);



    $txt = "DELETE FROM Types WHERE Types.Name = ?";
    $res = $this->queryDB($txt, $params, $stat);

    if($stat) { return "Успешно!"; } else { return "Ошибка!"; }
  }

  /*
    Удаление привязки теста к типу


    0 - ID записи
  */
  function delTestsForTypes($params)
  {
        if(count($params) != 1) { return "Неправильные аргументы!";}
        $stat = true;

        if(!$this->checkTestsForTypesIDexists($params[0]))
        { return "Записи с таким номером не существует!"; }

        $txt = "DELETE FROM `Tests For Types` WHERE ID = ?";
        $res = $this->queryDB($txt, $params, $stat);
        if($stat) { return "Успешно!"; } else { return "Ошибка!"; }

  }



};


?>
