<?php
include "conn/conn.php";
$val = 1;
$val1 = 0;

if(isset($_POST['data'])) {
    switch($_POST['data']) {
        case '#ayes': //lampu 1 hidup
            $sql = "UPDATE control SET a=$val";
            $conn->query($sql);
            break;
        case '#ano': //lampu 1 mati
            $sql = "UPDATE control SET a=$val1";
            $conn->query($sql);
            break;
        case '#byes': //lampu 2 hidup
            $sql = "UPDATE control SET b=$val";
            $conn->query($sql);
            break;
        case '#bno': //lampu1 2 mati
            $sql = "UPDATE control SET b=$val1";
            $conn->query($sql);
            break;
        case '#cyes': //lampu 3 hidup
            $sql = "UPDATE control SET c=$val";
            $conn->query($sql);
            break;
        case '#cno': //lampu 3 mati
            $sql = "UPDATE control SET c=$val1";
            $conn->query($sql);
            break;
        case '#fyes': //lampu 4 hidup
            $sql = "UPDATE control SET d=$val";
            $conn->query($sql);
            break;
        case '#fno': //lampu 4 mati
            $sql = "UPDATE control SET d=$val1";
            $conn->query($sql);
            break;
        case '#gyes': //lampu 5 hidup
            $sql = "UPDATE control SET e=$val";
            $conn->query($sql);
            break;
        case '#gno': //lampu  5 mati
            $sql = "UPDATE control SET e=$val1";
            $conn->query($sql);
            break;
    }
}
?>