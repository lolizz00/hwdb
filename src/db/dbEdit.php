<?php

include_once('db.php');


class hwdbEdit extends hwdb
{


  function editTable($name, $params)
  {
    $name = str_replace(" ", "", $name);
    $name =  "edit" . $name;

    if(!method_exists($this, $name))
    {
      return "Неизвестная таблица!";
    }

    $res = call_user_func(array($this, $name), $params);
    return $res;
  }


  /*
    Изменение устройств

    0 - Серийный номер
    1 - название типа

    2 - новый серийный номер
    3 - новое название типа
  */
  function editDevices($params)
  {
      if(count($params) != 4) { return "Неправильные аргументы!";}
      $stat = true;

      $typeID = $this->getIDbyNameTypes($params[1]);
      if($typeID === false){ return "Неизвестный тип!";}

      $devID = $this->getIDbySerialTypeDevices($params[0], $params[1]);
      if($devID === false) { return "Такого устройства не существует!";}

      $newSer =  $params[2];
      $newType = $params[3];

      $newTypeID = $this->getIDbyNameTypes($newType);
      if($newTypeID === false){ return "Неизвестный новый тип!";}


      $txt = "SELECT * FROM Devices WHERE `Serial Code` =  ? AND  `Type ID` = ?";
      $tmp = $this->queryDB($txt, [$newSer, $newTypeID], $stat)->fetchAll();
      if(count($tmp)) { return "Устройство такого типа с таким же серийным номером уже существует!";}

      $txt = "UPDATE Devices SET `Type ID` = ?,  `Serial Code` =  ? WHERE ID = ?";
      $res = $this->queryDB($txt, [$newTypeID, $newSer, $devID], $stat);
      if($stat) { return "Успешно!"; } else { return "Ошибка!"; }

  }

  /*
    Изменение мест

    0 - Name

    1 - новое Name
  */
  function editPlaces($params)
  {
    if(count($params) != 2) { return "Неправильные аргументы!";}
    $stat = true;

    $plID = $this->getIDbyNamePlaces($params[0]);
    if($plID === false) { return  'Неизвестное место!';}
    $txt = "UPDATE Places SET `Name` = ? WHERE ID = ?";
    $res = $this->queryDB($txt, [$params[1], $plID], $stat);
    if($stat) { return "Успешно!"; } else { return "Ошибка!"; }
  }

  /*
    Изменение таблицы истории мест

    0 - номер записи

    1 - серийник устройства
    2 - тип устройства
    3 - название места
    4 - время
    5 - логин рользователя
  */

  function editPlacesHistory($params)
  {
    if(count($params) != 6) { return "Неправильные аргументы!";}
    $stat = true;

    if(!$this->checkPlacesHistoryIDexists($params[0]))
    { return "Такой записи не существует!"; }

    $devID = $this->getIDbySerialTypeDevices($params[1], $params[2]);
    if($devID === false) { return "Неизвестное устройство!"; }

    $plID = $this->getIDbyNamePlaces($params[3]);
    if($plID === false) { return "Неизвестое место"; }

    $usrID = $this->getIDbyLoginUsers($params[5]);
    if($usrID === false) { return "Неизвестный пользователь!"; }

    $txt = "UPDATE `Places History` SET
    `Device ID` = ?,
    `Place ID`= ?,
    `Time` = ?,
    `User ID` = ?
     WHERE ID = ?";

    $res = $this->queryDB($txt,
    [$devID, $plID, $params[4], $usrID, $params[0]],
    $stat);

    if($stat) { return "Успешно!"; } else { return "Ошибка!"; }

  }

  /*
    Редактирование тестов

    0 - название теста

    1 - новое название теста
    2 - новое описание теста
  */
  function editTests($params)
  {
    if(count($params) != 3) { return "Неправильные аргументы!";}
    $stat = true;

    $tid = $this->getIDbyNameTests($params[0]);
    if($tid === false){ return "Такого теста не существует!";}

    $txt = "UPDATE Tests SET
    Name = ?,
    Description = ?
    WHERE ID = ?";

    $res = $this->queryDB($txt, [$params[1], $params[2], $tid], $stat);
    if($stat) { return "Успешно!"; } else { return "Ошибка!"; }
  }


  /*
    Изменение таблицов истории тестов


    0 - ID записи

    1 - серийник устройства
    2 - тип устройства
    3 - название теста
    4 - Время
    5 - результат
    6 - логин пользователя
  */
  function editTestsHistory($params)
  {
    if(count($params) != 7) { return "Неправильные аргументы!";}
    $stat = true;

    if(!$this->checkTestsHistoryIDexists($params[0]))
    {
      return "Такой записи не существует!";
    }

    $devID = $this->getIDbySerialTypeDevices($params[1], $params[2]);
    if($devID === false) { return "Неизвестное устройство!"; }

    $tstID = $this->getIDbyNameTests($params[3]);
    if($tstID === false) { return "Неизвестый тест!"; }

    $usrID = $this->getIDbyLoginUsers($params[6]);
    if($usrID === false) { return "Неизвестный пользователь!"; }

    $txt = "UPDATE `Tests History` SET
   `Device ID` = ?,
   `Test ID` = ?,
    Time = ?,
    Result = ?,
    `User ID` = ?
    WHERE ID = ?";

    $res = $this->queryDB($txt,
    [$devID, $tstID, $params[4], $params[5], $usrID, $params[0]],
    $stat);

    if($stat) { return "Успешно!"; } else { return "Ошибка!"; }

  }

  /*
    Изменение таблицы типов

    0 - Name
    1 - new Name
  */
  function editTypes($params)
  {
      if(count($params) != 2) { return "Неправильные аргументы!";}
      $stat = true;

      $typeID = $this->getIDbyNameTypes($params[0]);
      if($typeID === false){ return "Неизвестый тип!";}

      $txt = "UPDATE Types SET Name = ? WHERE ID = ?";

      $res = $this->queryDB($txt, [$params[1] , $typeID], $stat);
      if($stat) { return "Успешно!"; } else { return "Ошибка!"; }

  }

  /*
    Обновление таблицы пользователей

    0 - login

    1 - новый логин
    2 - новый пароль
    3 - новое имя
  */
  function editUsers($params)
  {
    if(count($params) != 4) { return "Неправильные аргументы!";}
    $stat = true;

    $usrID = $this->getIDbyLoginUsers($params[0]);
    if($usrID === false){ return "Неизвестый пользователь!";}


    $txt = "UPDATE Users SET
    Name = ?,
    Password = MD5(?),
    `Full Name` = ?
    WHERE ID = ?";

    $res = $this->queryDB($txt, [$params[1] , $params[2], $params[3], $usrID], $stat);
    if($stat) { return "Успешно!"; } else { return "Ошибка!"; }
  }



}


?>
