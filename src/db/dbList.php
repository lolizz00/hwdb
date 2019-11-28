<?php

include_once('db.php');


/*
    Проверено!

    Добавлена поддержка NULL
*/

class hwdbList extends hwdb
{
  function listTable($name)
  {
    $name = str_replace(" ", "", $name);
    $name =  "list" . $name;


    if(!method_exists($this, $name))
    {
      return "Неизвестная таблица!";
    }
    $params = [];
    $res = call_user_func(array($this, $name), $params);
    return $res;
  }

  function listUsers()
  {
    $stat = true;
    $res = $this->queryDB("SELECT usr.`Full Name` as 'Имя' FROM Users usr", [], $stat);

    if($stat)
    {
    return $res->fetchAll();
    }
    else
    {
      return $res;
    }
  }

  function listDevices()
  {
    $stat = true;
    $res = $this->queryDB("SELECT devs.`Serial code` as 'Серийный номер',
       T.Name as 'Тип устройства'
       FROM Devices devs
       JOIN Types T ON IFNULL(devs.`Type ID`, 0) = T.ID",

       [], $stat);

    if($stat)
    {
    return $res->fetchAll();
    }
    else
    {
      return $res;
    }
  }

  function listTypes()
  {
    $stat = true;
    $res = $this->queryDB("SELECT Types.Name as 'Имя типа' FROM Types", [], $stat);

    if($stat)
    {
    return $res->fetchAll();
    }
    else
    {
      return $res;
    }
  }

  function listPlaces()
  {
    $stat = true;
    $res = $this->queryDB("SELECT Places.Name as 'Название места' FROM Places", [], $stat);

    if($stat)
    {
      return $res->fetchAll();
    }
    else
    {
      return $res;
    }
  }

  function listTests()
  {

    $stat = true;
    $res = $this->queryDB("SELECT Tests.Name as 'Название теста', Tests.Description as 'Описание теста' FROM Tests", [], $stat);

    if($stat)
    {
      return $res->fetchAll();
    }
    else
    {
      return $res;
    }
  }


  function listPlacesHistory()
  {
    $text =
      "SELECT plhist.ID as 'Номер записи',
      D.`Serial Code` as 'Серийный номер',
      T.Name as 'Тип устройства',
      P.Name as 'Новое место',
      U.`Full Name` as 'Имя человека',
      plhist.Time as 'Момент перемещения'

      FROM `Places History` plhist
      JOIN Devices D ON  IFNULL(plhist.`Device ID`,0) = D.ID
      JOIN Places P  ON  IFNULL(plhist.`Place ID`,0) = P.ID
      JOIN Users U   ON  plhist.`User ID` = U.ID
      JOIN Types T   ON  IFNULL(D.`Type ID`,0) = T.ID";

    $stat = true;
    $res = $this->queryDB($text, [], $stat);

    if($stat)
    {
      return $res->fetchAll();
    }
    else
    {
      return $res;
    }
  }


  function listTestsHistory()
  {
    $txt = "SELECT
      th.ID as 'Номер записи',
      T.Name as 'Название теста',
      D.`Serial Code` as 'Серийный код устройства',
      T2.Name as 'Тип устройства',
      th.Result as 'Результат теста',
      th.Time as 'Время теста',
      U.`Full Name` as 'Имя человека'

      FROM `Tests History` th
      JOIN Tests T   ON   IFNULL(th.`Test ID`,0) = T.ID
      JOIN Devices D ON   IFNULL(th.`Device ID`,0) = D.ID
      JOIN Types T2  ON   IFNULL(D.`Type ID`, 0) = T2.ID
      JOIN Users U   ON th.`User ID` = U.ID";


  $stat = true;
  $res = $this->queryDB($txt, [], $stat);



    if($stat)
    {
      return $res->fetchAll();
    }
    else
    {
      return $res;
    }

  }

  function listTestsForTypes()
  {
      $txt = " SELECT
      tft.ID as 'Индекс записи',
      T.Name as 'Название теста',
      T2.Name as 'Название типа'
      FROM `Tests For Types` tft
      JOIN Types T2 on tft.`Type ID` = T2.ID
      JOIN Tests T on tft.`Test ID` = T.ID ";

      $stat = true;
      $res = $this->queryDB($txt, [], $stat);

      if($stat)
      { return $res->fetchAll();} else { return $res; }

}


}


?>
