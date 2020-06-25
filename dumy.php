<?php
include "conn/conn.php";
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <link rel="stylesheet" href="css/bootstrap.min.css" integrity="sha384-MCw98/SFnGE8fJT3GXwEOngsV7Zt27NXFoaoApmYm81iuXoPkFOJwJ8ERdknLPMO" crossorigin="anonymous">
    <script src="https://kit.fontawesome.com/a076d05399.js"></script>
    <link href="https://cdn.jsdelivr.net/gh/gitbrent/bootstrap4-toggle@3.6.1/css/bootstrap4-toggle.min.css" rel="stylesheet">
    <script src="https://cdn.jsdelivr.net/gh/gitbrent/bootstrap4-toggle@3.6.1/js/bootstrap4-toggle.min.js"></script>
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>

</head>

<body>
    <div class="custom-control custom-switch">
        <input type="checkbox" class="custom-control-input" id="custom">
        <label class="custom-control-label" for="custom">Toggle this switch element</label>
    </div>

    <div class="box">
        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Voluptate perferendis est ducimus velit maiores facilis aliquam ab consequuntur hic nobis ratione, iure enim asperiores cum blanditiis error vitae temporibus unde.
    </div>
</body>
</html>

<script>

$(document).ready(function(){
    var $check = $('custom');

    
    $.ajax({
        type: "post",
        url: "data.php",
        data: "",
        dataType: "json",
        success: function (data) {
            if(data.ruang_1_status == 'no') {
                $('#custom').prop('checked', true);
            }    
        }
    });
        
    

    


});

</script>