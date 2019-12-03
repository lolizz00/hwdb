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


  function queryDB($text, $params, &$stat=NULL)
  {

    if(getType($params) !== getType([]))
    {
      $params = [$params];
    }

    try
    {
      $expr = $this->db->prepare($text);
      $expr->setFetchMode(PDO::FETCH_ASSOC);
      $expr->execute($params);
      if(!is_null($stat)) {$stat = true; }
      return $expr;
    }
    catch (PDOException $e)
    {

      if(!is_null($stat)) { $stat = false; }
      return $e->getMessage();
    }
  }

  /* Вспомогательные поиск */

  // ID устройства по имени
  function getIDbySerialCodeDevices($serial)
  {
    $tmp = "SELECT ID FROM Devices WHERE `Serial Code` = ?";
    $devID = $this->queryDB($tmp, $serial)->fetchAll();
    if(!count($devID)) { return false; }
    return   $devID = $devID[0]["ID"];
  }

  // ID теста по имени
  function getIDbyNameTests($name)
  {
    $tmp = "SELECT ID FROM Tests WHERE `Name` = ?";
    $tstID = $this->queryDB($tmp, $name)->fetchAll();
    if(!count($tstID)) { return false; }
    return $tstID[0]["ID"];
  }

  // ID пользователя по логину
  function getIDbyLoginUsers($login)
  {
    $tmp = "SELECT ID FROM Users WHERE `Name` =?";
    $usrID = $this->queryDB($tmp, $login)->fetchAll();
    if(!count($usrID)) { return false; }
    return $usrID[0]["ID"];
  }

  // ID пользователя по полному имени
  function getIDbyFullNameUsers($name)
  {
    $tmp = "SELECT ID FROM Users WHERE `Full Name` =?";
    $usrID = $this->queryDB($tmp, $name)->fetchAll();
    if(!count($usrID)) { return false; }
    return $usrID[0]["ID"];
  }


  // ID места по названию
  function getIDbyNamePlaces($name)
  {
    $tmp = "SELECT ID FROM Places WHERE `Name` = ?";
    $plID = $this->queryDB($tmp, $name)->fetchAll();
    if(!count($plID)) { return false; }
    return $plID[0]["ID"];
  }

  // ID типа по имени
  function getIDbyNameTypes($name)
  {
    $txt = "SELECT * FROM Types WHERE Name = ?";
    $tmp = $this->queryDB($txt, $name, $stat)->fetchAll();
    if(!count($tmp)) { return false; }
    return $tmp[0]["ID"];
  }

    function getIDbySerialTypeDevices($serial, $type)
    {
        $typeID = $this->getIDbyNameTypes($type);
        if($typeID === false) {return false; }
        $txt = "SELECT * FROM Devices WHERE `Serial Code` = ? AND `Type ID` = ?";
        $tmp = $this->queryDB($txt, [$serial, $typeID], $stat)->fetchAll();
        if(!count($tmp)) { return false; }
        return $tmp[0]["ID"];
    }

    function checkPlacesHistoryIDexists($id)
    {
        $txt = "SELECT * FROM `Places History` WHERE ID = ?";
        $tmp = $this->queryDB($txt, $id, $stat)->fetchAll();
        if(!count($tmp)) { return false; } else { return true; }
    }

    function checkTestsHistoryIDexists($id)
    {
        $txt = "SELECT * FROM `Tests History` WHERE ID = ?";
        $tmp = $this->queryDB($txt, $id, $stat)->fetchAll();
        if(!count($tmp)) { return false; } else { return true; }
    }

    function checkTestsForTypesIDexists($id)
    {
      $txt = "SELECT * FROM `Tests For Types` WHERE ID = ?";
      $tmp = $this->queryDB($txt, $id, $stat)->fetchAll();
      if(!count($tmp)) { return false; } else { return true; }
    }

    function checkTypeTestAlr($typeID, $tstID)
    {
      $txt = "SELECT * FROM `Tests For Types` WHERE `Type ID` = ?  AND `Test ID` = ?";
      $tmp = $this->queryDB($txt, [$typeID, $tstID], $stat)->fetchAll();
      if(count($tmp)) { return false; } else { return true; }
    }


}

?>
