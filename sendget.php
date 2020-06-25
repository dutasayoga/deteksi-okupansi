<?php
include "conn/conn.php";

$sql = 'SELECT * FROM control';
$result = $conn->query($sql);

if ($result->num_rows > 0) {
    while ($row = $result->fetch_assoc()) {
        $value = intval($row['a']);
        $value1 = intval($row['b']);
        $value2 = intval($row['c']);
        $value3 = intval($row['d']);
        $value4 = intval($row['e']);

        $str = array("a"=>$value, "b"=>$value1, "c"=>$value2, "d"=>$value3, "e"=>$value4);
        echo json_encode($str);
    }
}

?>
