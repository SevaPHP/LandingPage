<?php
// $name = $_POST['name'];
// $phone = $_POST['phone'];

// echo $name . $phone;
//Это строка позваляет работать только с json
$_POST = json_decode(file_get_contents("php://input"), true);
echo var_dump($_POST);


?>