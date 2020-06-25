/*
author : duta sayoga
company : DVRKcLan.IO
*/

$(document).ready(function(){
    var name = ['#a','#b','#c','#f','#g'];
    var isPaused = false;
    var newcahaya = "";
    $('#f').attr('data','');

    localStorage.removeItem("lampustatus0");
    localStorage.removeItem("lampustatus1");
    localStorage.removeItem("lampustatus2");
    localStorage.removeItem("mode");
    localStorage.removeItem("cahaya");
    localStorage.removeItem("data");
    localStorage.removeItem("tirai");
    localStorage.removeItem("kipas");

    var myInterval = setInterval(function(){   
        if(!isPaused) {
            var date = new Date();
            var month = [ "January","February","March","April","May","June","July","August","September","October","November","December"];
            $('h5.date').html(date.getDate()+" "+ month[date.getMonth()] + " " +date.getFullYear()+",  "+ date.getHours() +"."+ date.getMinutes());
            var lsStatus = localStorage.getItem('data');
            $.ajax({
                url: 'data.php',
                type: 'post',
                data: '',
                dataType : 'json',
                success: function(data)
                {   
                    $('#getSuhu').html(data.suhu + "°<sup>c</sup>");
                    $('#gethumidity').html(data.humidity + "%");
                    $('#countPeople').html(data.jumlah_orang);
                    var light = data.cahaya;
                    var suhu = data.suhu;
                    var status = [
                        data.ruang_1_status,
                        data.ruang_2_status,
                        data.ruang_3_status,
                        data.suhu,
                        data.cahaya,
                        data.time
                    ];
                    localStorage.setItem('data',status);

                    if (status.includes('yes')) {
                        var occupied = true;
                    } else occupied = false;
     
                    var dbTirai = $('#f').attr('data');
                    var dbKipas = $(name[4]).attr('data');
                    var a= $(name[0]).attr('data');
                    var b= $(name[1]).attr('data');
                    var c= $(name[2]).attr('data');
                    var dbLampu = [a,b,c ];
                    var mode = localStorage.getItem('mode');
                    var newLampuStatus = ['lampustatus0', 'lampustatus1', 'lampustatus2'];
                    if($("#btn-auto").hasClass("button-activated")){
                        $(".appliances").attr("mode", "auto");
                        var pemMode = $(".appliances").attr("mode");
                        if(lsStatus != status || pemMode != mode) {
                            localStorage.setItem('mode','auto');
                            if(occupied) {
                                if (light < 250) { // kondisi ketika cahaya kurang dari 250 lux
                                    for(i=0;i<3;i++) {
                                        if (dbLampu[i] !=status[i]) {
                                            if(status[i] == 'yes') {
                                                autoModeFunc(name[i], newLampuStatus[i], 'yes');
                                            } else {
                                                autoModeFunc(name[i], newLampuStatus[i], 'no');
                                            }
                                        }
                                    }
                                    localStorage.setItem('tirai', 'yes');
                                    var lsTirai = localStorage.getItem('tirai');
                                    if (lsTirai != dbTirai) {
                                        autoModeFunc(name[3], 'tirai', 'yes');

                                    }                                   
                                } else if (light >=250) { // kondisi ketika cahaya diatas 250 lux
                                    localStorage.setItem('tirai', 'no');
                                    localStorage.setItem('lampustatus0', 'no');
                                    localStorage.setItem('lampustatus1', 'no');
                                    localStorage.setItem('lampustatus2', 'no');
                                    var lsTirai = localStorage.getItem('tirai');
                                    var lsLampuStatus = [
                                        localStorage.getItem('lampustatus0'),
                                        localStorage.getItem('lampustatus1'),
                                        localStorage.getItem('lampustatus2')
                                    ]
                                    if (lsTirai != dbTirai) {
                                        autoModeFunc(name[3], 'tirai', 'no');

                                    }
                                    for(i=0;i<3;i++) {
                                        if ( lsLampuStatus[i] != dbLampu[i]) {
                                            autoModeFunc(name[i], newLampuStatus[i], 'no');
                                               
                                        } 
                                    }
                                } 
                                if (suhu>=25) { // kondisi ketika suhu diatas 25 derajat celcius
                                    localStorage.setItem('kipas', 'yes');
                                    var lsKipas =localStorage.getItem('kipas');
                                    if ( lsKipas!=dbKipas) {
                                        autoModeFunc(name[4], 'kipas', 'yes');
                                    }
                                } else if (suhu<25) { // kondisi ketika suhu dibawah 25 derajat celcius
                                    localStorage.setItem('kipas', 'no');
                                    var lsKipas =localStorage.getItem('kipas');
                                    if ( lsKipas!=dbKipas) {
                                        autoModeFunc(name[4], 'kipas', 'no');
                                    }
                                }                    
                            } else {
                                console.log('false');
                                for(i=0;i<5;i++) {
                                    autoModeFunc(name[i], newLampuStatus[i], 'no');
                                }       
                            }
                        } 
                    }
                    for (i=0;i<5;i++) {
                        if($(name[i]).attr('data') == 'yes') {
                            $(name[i]).prop('checked', true);                                             
                        } else $(name[i]).prop('checked', false);
                    }
                } 
            });
        }  
    },2000);    
    
    manualMode(name[0], 'lampustatus0'); 
    manualMode(name[1], 'lampustatus1'); 
    manualMode(name[2], 'lampustatus2'); 
    manualMode(name[3], 'tirai'); 
    manualMode(name[4], 'kipas'); 

    $("#btn-manual").click(function(){
        $(this).removeClass("button-deactivated");
        $(this).addClass("button-activated");
        $("#btn-auto").removeClass("button-activated");
        $("#btn-auto").addClass("button-deactivated");
        $("#a, #b, #c ,#d ,#e ,#f, #g").removeAttr('disabled');
        localStorage.setItem("mode", "manual");
        isPaused = true;
    });

    $("#btn-auto").click(function() {
        $("#a, #b, #c ,#d , #e, #f , #g").attr('disabled', true);
        $("#btn-manual").removeClass("button-activated");
        $("#btn-manual").addClass("button-deactivated");
        $(this).removeClass("button-deactivated");
        $(this).addClass("button-activated");
        isPaused = false;
    });
});

// dengan mode auto
function autoModeFunc(selector, item, status) {
    localStorage.setItem(item, status);
    $(selector).attr('data', status);
    var newStatus = selector + status;
    callAjax(newStatus);
    console.log(item+ status);
    return newStatus;
}

// dengan mode manual
function manualMode(name, a, b) {
    $(name).change(function () {
        if ($(name).is(':checked')) {
            $(name).attr('data', 'yes');
            var newStatus = name + 'yes';
            callAjax(newStatus);
            localStorage.setItem(a, "yes");
        }
        else {
            $(name).attr('data', 'no');
            var newStatus2 = name + 'no';
            callAjax(newStatus2);
            localStorage.setItem(a, "no");
        }
    });
}
// fungsi mengirimkan status alat ke control.db
// dengan post method ke sending.php
function callAjax(datax) {
    $.ajax({
        type: "post",
        url: "sending.php",
        data: {'data':datax},
        dataType: "json",
        success: function (data) {                               
        }
    });
}

