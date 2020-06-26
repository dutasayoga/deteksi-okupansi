<?php

include "conn/conn.php";

$sql = 'SELECT sistem_okupansi.*, control.* FROM sistem_okupansi JOIN control ON sistem_okupansi.no=control.id';
$result = $conn->query($sql);

if ($result->num_rows > 0) {
    while ($row = $result->fetch_assoc()) {
        echo json_encode($row);
    }
}
?>