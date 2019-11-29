<?php

/*

      Проверено!
*/


include_once('db.php');

class hwdbAdd extends hwdb
{
  function addTable($name, $params)
  {
    $name = str_replace(" ", "", $name);
    $name =  "add" . $name;

    if(!method_exists($this, $name))
    {
      return "Неизвестная таблица!";
    }

    $res = call_user_func(array($this, $name), $params);
    return $res;
  }

  /*
    Добавление в таблицу устройств

    0 - Серийный номер
    1 - Название типа
  */
  function addDevices($params)
  {

    if(count($params) != 2) { return "Неправильные аргументы!";}

    $typeID = $this->getIDbyNameTypes($params[1]);
    if($typeID === false) { return "Неизвестный тип!"; }

    $txt = "SELECT * FROM Devices WHERE `Serial Code` =  ? AND  `Type ID` = ?";
    $tmp = $this->queryDB($txt, [$params[0], $typeID], $stat)->fetchAll();


    if(count($tmp)) { return "Устройство такого типа с таким же серийным номером уже существует!";}

    $txt = "INSERT INTO Devices SET `Serial Code` = ?, `Type ID` = ?";
    $this->queryDB($txt, [$params[0], $typeID], $stat);
    return "Успешно!";

  }

  /*
    Добавление в таблицу типов

    0 - название типа
   */
  function addTypes($params)
  {
    if(count($params) != 1) { return "Неправильные аргументы!";}

    $txt = "INSERT INTO Types(Name) VALUES(?)";
    $stat = true;
    $res = $this->queryDB($txt, $params, $stat);

    if(!$stat)
    {
      return "Такой тип уже существует!";
    }

    return "Успешно!";

  }

  /*
    Добавление в таблицу мест

    0 - название места

  */
  function addPlaces($params)
  {
    if(count($params) != 1) { return "Неправильные аргументы!";}

    $txt = "INSERT INTO Places(Name) VALUES(?)";
    $stat = true;
    $res = $this->queryDB($txt, $params, $stat);

    if(!$stat)
    {
      return "Такое место уже существует!";

    }

    return "Успешно!";
  }

  /*
    Добавление нового теста

    0 - Название теста
    1 - Описание теста
  */
  function addTests($params)
  {
    if(count($params) != 2) { return "Неправильные аргументы!";}

    $txt = "INSERT INTO Tests(Name, Description) VALUES(?, ?)";
    $stat = true;
    $res = $this->queryDB($txt, $params, $stat);

    if(!$stat)
    {
      return "Такой тест уже существует!";
    }

    return "Успешно!";

  }

  /*
   Добавление в историю перемещений

   0 - Серийный номер устройства
   1 - тип устройства

   2 - Название места

   3 - Время

   4 - логин
*/
  function addPlacesHistory($params)
  {
    if(count($params) != 5) { return "Неправильные аргументы!";}

    $devID = $this->getIDbySerialTypeDevices($params[0], $params[1]);
    if($devID === false) { return "Неизвестное устройство!"; }

    $plID = $this->getIDbyNamePlaces($params[2]);
    if($plID === false) { return "Неизвестное место!"; }

    $usrID = $this->getIDbyLoginUsers($params[4]);
    if($usrID === false) { return "Неизвестный пользователь!"; }

    $txt = "INSERT INTO `Places History` VALUES(null, ?, ?, ?, ?)";
    $params = [$devID, $plID, $params[3], $usrID];
    $stat = true;
    $res = $this->queryDB($txt, $params, $stat);

    if($stat)
    {
      return "Успешно!";
    }
    else
    {
        // других вариантов просто нет
        return "Неверный формат даты!";
    }

    return ;
  }

/*
  Добавление нового теста в историю

  0 - серийник устройства
  1 - тип устройства

  2 - название теста

  3 - время

  4 - результат

  5 - логин пользователя
*/
  function addTestsHistory($params)
  {
    if(count($params) != 6) { return "Неправильные аргументы!"; }

    $devID = $this->getIDbySerialTypeDevices($params[0], $params[1]);
    if($devID === false) { return "Неизвестное устройство!"; }

    $tstID = $this->getIDbyNameTests($params[2]);
    if($tstID === false) { return "Неизвестый тест!"; }

    $usrID = $this->getIDbyLoginUsers($params[5]);
    if($usrID === false) { return "Неизвестный пользователь!"; }


    $txt = "INSERT INTO `Tests History` VALUES(null, ?, ?, ?, ?, ?)";

    $stat = true;
    $params = [$devID, $tstID, $params[3], $params[4], $usrID];
    $res = $this->queryDB($txt, $params, $stat);


    if($stat)
    {
      return "Успешно!";
    }
    else
    {
      // других ввариантов нет
      return "Неверный формат даты!";
    }


    return $stat;
  }


  /*
    Добавление необходимых тестов для типа устройств

    0 - название типа
    1 - название теста
  */
  function addTestsForTypes($params)
  {
    if(count($params) != 2) { return "Неправильные аргументы!"; }
    $stat = true;

    $tstID = $this->getIDbyNameTests($params[1]);
    if($tstID === false) { return "Неизвестый тест!"; }

    $typeID = $this->getIDbyNameTypes($params[0]);
    if($typeID === false) { return "Неизвестый тип!";}

    if(!$this->checkTypeTestAlr($typeID, $tstID))
    { return "Такая привязка уже существует!"; }

    $txt = "INSERT INTO `Tests For Types` VALUES(NULL, ?, ?)";
    $res = $this->queryDB($txt, [$typeID, $tstID], $stat);

    if($stat){return "Успешно!";} else { return "Ошибка!";}


  }


}

?>
