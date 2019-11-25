<?php


class hwdb
{
  private $user = 'SWB';
  private $pass = 'SWB';

  private $db;

  function __construct()
  {
    $dst = 'mysql:host=localhost;dbname=SWB;charset=UTF8';
    $opt = array(PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION);
    $this->db = new PDO($dst, $this->user, $this->pass, $opt);
  }


  function queryDB($text, $params, &$stat)
  {
    try
    {
      $expr = $this->db->prepare($text);
      $expr->setFetchMode(PDO::FETCH_ASSOC);
      $expr->execute($params);
      $stat = true;
      return $expr;
    }
    catch (PDOException $e)
    {

      $stat = false;
      return $e->getMessage();
    }
  }

  /* --- User handle  --- */
  function getUser($name)
  {
    $res = "";
    $res = $this->queryDB("SELECT * FROM Users WHERE Name = ?", [$name], $stat);

    if(!$stat)
    {
      return false;
    }
    else
    {
        $res = $res->fetchAll();

        if(!$res)
        {
          return false;
        }
        else
        {
          return $res[0];
        }
    }


  }

  function addUser($name, $pass)
  {
    $stat = true;
    $res = "";
    $res = $this->queryDB("INSERT INTO Users (Name, Password) VALUES(? , MD5(?)) ", [$name, $pass], $stat);



    if(!$stat)
    {
      if(strpos($res, "Duplicate"))
      {
        $res = "User already exists";
      }
      else
      {
          $res = "Unknown Error";
      }
    }
    else
    {
        $res = "User " .  $name . " succ. add";
    }

    return $res;
  }



/* --- Edit Table --- */

/* --- Delete From Table --- */


function deleteTable($name)
{
  $name = str_replace(" ", "", $name);
  $res = call_user_func( array($this, "del" . $name), $params);
  return $res;
}

/* Serial Code */
// OK
function delDevices($params)
{
  if(count($params) != 1) { return false;}

  $txt = "SET @devid = (SELECT devs.ID FROM Devices devs WHERE `Serial Code` = ?);
         DELETE  FROM `Tests History`  WHERE  `Tests History`.`Device ID` = @devid ;
         DELETE  FROM `Places History` WHERE `Places History`.`Device ID` = @devid ;
         DELETE FROM Devices WHERE  ID = @devid";

  $stat = true;
  $res = $this->queryDB($txt, $params, $stat);


  return $stat;
}

/* Name */
// OK
function delPlaces($params)
{
  if(count($params) != 1) { return false;}

  $txt = "SET @plid = (SELECT pl.ID FROM Places pl WHERE `Name` = ?);
          DELETE  FROM `Places History` WHERE `Places History`.`Place ID` = @plid;
          DELETE FROM Places WHERE ID = @plid;";

  $stat = true;
  $res = $this->queryDB($txt, $params, $stat);
  return $stat;

}

/* ID */
// OK
function delPlacesHistory($params)
{
  if(count($params) != 1) { return false;}

  $txt =   "DELETE  FROM `Places History` WHERE `Places History`.`ID` = ?";;

  $stat = true;
  $res = $this->queryDB($txt, $params, $stat);
  return $stat;

}

/* Tests Name*/
// OK
function delTests($params)
{
  if(count($params) != 1) { return false;}



  $txt =   "SET @tid = (SELECT tst.ID FROM Tests tst WHERE Name = ?);
            DELETE  FROM `Tests History` WHERE `Tests History`.`Test ID` = @tid;
            DELETE  FROM  Tests WHERE ID = @tid";

  $stat = true;
  $res = $this->queryDB($txt, $params, $stat);
  return $stat;

}

/* ID */
// OK
function delTestsHistory($params)
{
  if(count($params) != 1) { return false;}

  $txt =   "DELETE  FROM `Tests History` WHERE `Tests History`.`ID` = ?";;

  $stat = true;
  $res = $this->queryDB($txt, $params, $stat);
  return $stat;

}

/* Name */
// OK
function delTypes($params)
{
  if(count($params) != 1) { return false;}


  //// TODO: check type

  // Get Id of type
  $txt =   "SELECT * FROM Types WHERE Types.Name = ?";
  $res = $this->queryDB($txt, $params, $stat)->fetchAll();
  $res = $res[0]["ID"];

  $txt =   "SELECT * FROM Devices WHERE Devices.`Type ID`= ?";
  $res = $this->queryDB($txt, [$res], $stat)->fetchAll();

  foreach ($res as $dev)
  {
      $name = $dev['Serial Code'];
      $this->delDevices([$name]);
  }


  $stat = true;
  $txt = "DELETE FROM Types WHERE Types.Name = ?";
  $res = $this->queryDB($txt, $params, $stat);
  return $stat;
}


  /* --- DELETE SAVE --- */



  /*  ---  List Table  --- */

  function listTable($name)
  {
    $name = str_replace(" ", "", $name);
    $res = call_user_func( array($this, "list" . $name) );
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
    $res = $this->queryDB("SELECT devs.`Serial code` as 'Серийный номер', T.Name as 'Тип устройства'  FROM Devices devs  JOIN Types T ON devs.`Type ID` = T.ID", [], $stat);

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
      JOIN Devices D on plhist.`Device ID` = D.ID
      JOIN Places P on plhist.`Place ID` = P.ID
      JOIN Users U on plhist.`User ID` = U.ID
      JOIN Types T on D.`Type ID` = T.ID";

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
      JOIN Tests T on th.`Test ID` = T.ID
      JOIN Devices D on th.`Device ID` = D.ID
      JOIN Types T2 on D.`Type ID` = T2.ID
      JOIN Users U on th.`User ID` = U.ID ";


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

  /* --- Insert Table ---  */

  function addTable($name, $params)
  {
    $name = str_replace(" ", "", $name);
    $res = call_user_func( array($this, "add" . $name), $params);
    return $res;
  }


  // Serial,Type ID
  function addDevices($params)
  {

    if(count($params) != 2) { return false;}

    $txt = "INSERT INTO Devices
    SET `Serial Code` = ?,
    `Type ID` = (SELECT ID FROM Types WHERE Name = ?)";

    $stat = true;
    $res = $this->queryDB($txt, $params, $stat);

    return $stat;

  }

  /* Name */
  function addTypes($params)
  {
    if(count($params) != 1) { return false;}

    $txt = "INSERT INTO Types(Name) VALUES(?)";
    $stat = true;
    $res = $this->queryDB($txt, $params, $stat);
    return $stat;

  }

  /* Name */
  function addPlaces()
  {
    if(count($params) != 1) { return false;}

    $txt = "INSERT INTO Places(Name) VALUES(?)";
    $stat = true;
    $res = $this->queryDB($txt, $params, $stat);
    return $stat;
  }

  /*Name, Description */
  function addTests($params)
  {
    if(count($params) != 2) { return false;}

    $txt = "INSERT INTO Tests(Name, Description) VALUES(?, ?)";
    $stat = true;
    $res = $this->queryDB($txt, $params, $stat);
    return $stat;
  }

  /* Device  Serial,   Place Name,    Time,    User Fullname*/
  function addPlacesHistory($params)
  {
    if(count($params) != 4) { return false;}

    $txt = "INSERT INTO `Places History`
    SET `Device ID` = (SELECT ID FROM Devices WHERE `Serial Code` = ?),
    `Place ID`  = (SELECT ID FROM Places WHERE `Name` = ?),
    `Time` = ?,
    `User ID`  = (SELECT ID FROM Users WHERE `Full Name` = ?)";

    $stat = true;
    $res = $this->queryDB($txt, $params, $stat);


    return $stat;
  }

  /* Device Serial,     Test name,    Time,    Result,   User Fullname */
  function addTestsHistory($params)
  {
    if(count($params) != 5) { return false;}

    $txt = "INSERT INTO `Tests History`
     SET `Device ID` = (SELECT ID FROM Devices WHERE `Serial Code` = ?),
    `Test ID`  = (SELECT ID FROM Tests WHERE `Name` = ?),
    `Time` = ?,
    `Result` = ?,
    `User ID`  = (SELECT ID FROM Users WHERE `Full Name` = ?)";

    $stat = true;
    $res = $this->queryDB($txt, $params, $stat);


    return $stat;
  }



}



/* -- DBG --- */

//$db = new hwdb();
//$stat = $db->delTypes(['Panorama']);

//var_dump($db->listTable('Places History'));
//$db->listDevices();
//$res = $db->addUser("rot", "abc");

//echo "Stop";

?>
