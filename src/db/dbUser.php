<?php

/*
  Проверено!
*/

include_once('db.php');

class hwdbUser extends hwdb
{
  /*
      Чтение данных о пользователе

      name - логин пользователя
  */
  function getUser($name)
  {
    $res = "";
    $stat = true;
    $res = $this->queryDB("SELECT * FROM Users WHERE Name = ?", $name, $stat);


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


  /*
    Добавление пользователя

    name - логин
    pass - пароль
  */
  function addUser($name, $pass, $fullname=NULL)
  {
      $stat = true;
      $res = "";
      $res = $this->queryDB("INSERT INTO Users VALUES(null, ? , MD5(?), ?) ", [$name, $pass, $fullname], $stat);

      if(!$stat)
      {
        if(strpos($res, "Duplicate"))
        {
          $res = "Такой пользователь уже существует!";
        }
        else
        {
            $res = "Неизвестная ошибка!";
        }
      }
      else
      {
          $res = "Пользователь " .  $name . " успешно  добавлен.";
      }

      return $res;
    }


};


?>
