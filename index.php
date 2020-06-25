<?php
require_once('conn/conn.php');
$sql = 'SELECT * FROM sistem_okupansi';
$result = $conn->query($sql);
$val = $result->fetch_assoc();

?>

<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>DS smart home and automation</title>
    <link rel="stylesheet" href="css/bootstrap.min.css" integrity="sha384-MCw98/SFnGE8fJT3GXwEOngsV7Zt27NXFoaoApmYm81iuXoPkFOJwJ8ERdknLPMO" crossorigin="anonymous">
    <link rel="stylesheet" href="main.css">
    <script src="js/a076d05399.js"></script>
    <script src="js/jquery.min.js"></script>
    <script src="scriptv3.js"></script>
</head>

<body>
    <div  id="dashboard">
        <div class="header">
            <div class="heading">
                <div id="title">
                    <strong>DS AUTOMATION</strong>
                </div>
                <div class="f fe">
                    <!--<h4 class="display-4">DS AUTOMATION </h4>-->
                    <div class="fa fa-cloud fa-4x" id="icon-w">
                    </div>
                    <div>  
                        <h5 class="date"> </h5>
                        <h2 class="cuaca"> Cerah </h2>
                    
                    </div>
                </div>
                
                <div class="weather f">
                    <div>
                        <strong id="getSuhu">°<sup>C</sup></strong>
                        <p>Class Temp.</p>
                    </div>

                    <div>
                        <strong id="gethumidity">%</strong>
                        <p>Class Humidity</p>
                    </div>

                    <div>
                        <strong id="countPeople"></strong>
                        <p>People Count</p>
                    </div>
                </div>
            </div>
        </div>
        <section>
            <div class="appliances">
                <div class="appliance" id="z">
                    <input type="checkbox" name="a" id="a" disabled="disabled">
                    <label for="a">
                        <i class="l"></i>
                        <strong>Lampu</strong>
                        <span data-o="On" data-c="Off"></span>
                        <small></small>
                    </label>
                </div>

                <div class="appliance" id="z">
                    <input type="checkbox" name="a" id="b" disabled="disabled">
                    <label for="b">
                        <i class="l"></i>
                        <strong>Lampu</strong>
                        <span data-o="On" data-c="Off"></span>
                        <small></small>
                    </label>
                </div>

                <div class="appliance" id="z">
                    <input type="checkbox" name="a" id="c" disabled="disabled">
                    <label for="c">
                        <i class="l"></i>
                        <strong>Lampu</strong>
                        <span data-o="On" data-c="Off"></span>
                        <small></small>
                    </label>
                </div>

                
                
                <div class="appliance">
                    <input type="checkbox" name="a" id="f" disabled="disabled">
                    <label for="f">
                        <i class="r"></i>
                        <strong>Tirai</strong>
                        <span data-o="opened" data-c="closed"></span>
                        <small></small>
                    </label>
                </div>
                
                <div class="appliance">
                    <input type="checkbox" name="a" id="g" disabled="disabled">
                    <label for="g">
                        <i class="a"></i>
                        <strong>FAN</strong>
                        <span data-o="On" data-c="Off"></span>
                        <small></small>
                    </label>
                </div>
                
            </div>

            <div class="control">
                <div>
                    <button class="btn button-deactivated" id="btn-manual">MANUAL</button>
                </div>

                <div>
                    <button class="btn button-activated" id="btn-auto">AUTOMATIC</button>
                </div>
            </div>
        </section>

    </div>
</body>
</html>