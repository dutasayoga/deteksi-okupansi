<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <script src="js/jquery.min.js"></script>

</head>
<body>
    <div id="ouw"></div>
</body>
</html>

<script>
    $(document).ready(function () {
        setInterval(function(){
            $.ajax({
                type: "post",
                url: "sendget.php",
                data: "data",
                dataType: "json",
                success: function (data) {
                    $('#ouw').html(data.a+" "+data.b+" "+data.c+" "+data.d+" "+data.e);
                }
            });
        },10)
    });
</script>