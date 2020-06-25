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

$(document).ready(function(){
    var name = ['#a','#b','#c','#f','#g'];
    var isPaused = false;
    var newcahaya = "";

    localStorage.removeItem("lampuruang0");
    localStorage.removeItem("lampuruang1");
    localStorage.removeItem("lampuruang2");
    localStorage.removeItem("okupansi");
    localStorage.removeItem("cahaya");
    localStorage.removeItem("kipas");

    var myInterval = setInterval(function(){   
        if(!isPaused) {
            var date = new Date();
            var month = new Array();
            month[0] = "January";
            month[1] = "February";
            month[2] = "March";
            month[3] = "April";
            month[4] = "May";
            month[5] = "June";
            month[6] = "July";
            month[7] = "August";
            month[8] = "September";
            month[9] = "October";
            month[10] = "November";
            month[11] = "December";
            $('h5.date').html(date.getDate()+" "+ month[date.getMonth()] + " " +date.getFullYear()
                +",  "+ date.getHours() +"."+ date.getMinutes());
    
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
                        data.ruang_3_status
                    ];

                    var lsRuang = [
                        localStorage.getItem('lampuruang0'),
                        localStorage.getItem('lampuruang1'),
                        localStorage.getItem('lampuruang2')
                    ];

                    $(name[3]).attr('cahaya', newcahaya);
                    var conStatus = [data.a,data.b,data.c,data.d,data.e];

                    if (status.includes('yes')) {
                        $('.appliances').attr("status", "occupied");
                        //localStorage.setItem('okupansi', 'yes');
                    } else {
                        $('.appliances').attr("status", "nope");
                        //localStorage.setItem('okupansi', 'no');
                    }
                    var statusOkupansi = $('.appliances').attr('status');
                    var newTirai = localStorage.getItem('tirai');
                    var lsOkupansi = localStorage.getItem('okupansi');
                    var lscahaya = localStorage.getItem('cahaya');
                    var lsSuhu = localStorage.getItem('suhu');

                    localStorage.setItem("cahaya", light);
                    localStorage.setItem("suhu", suhu);
                    var pemLampu = [
                        $(name[0]).attr('data'),
                        $(name[1]).attr('data'),
                        $(name[2]).attr('data')
                    ];
                    // localStorage.setItem('lampuruang0', status[0]);
                    // localStorage.setItem('lampuruang1', status[1]);
                    // localStorage.setItem('lampuruang2', status[2]);

                    if($("#btn-auto").hasClass("button-activated")) { // Mode otomatis
                        if(statusOkupansi != lsOkupansi || lscahaya != light || lsSuhu != suhu || lsRuang[0] != status[0] || lsRuang[1] != status[1] || lsRuang[2] != status[2]) {
                            if(statusOkupansi == 'occupied' ){
                                if(light <= 250) {
                                    for(i=0; i<3; i++){
                                        n = i.toString();
                                        var ruangStatus = localStorage.getItem("lampuruang"+n);
                                        //if(status[i] != ruangStatus) {
                                            if(status[i] == 'yes') {
                                                $(name[i]).prop('checked', true);
                                                $(name[i]).attr('data', 'yes');
                                                var newStatus = name[i]+'yes';
                                                callAjax(newStatus);
                                                localStorage.setItem("lampuruang"+n, "yes");
                                            } else if(status[i] == 'no'){
                                                $(name[i]).prop('checked', false);
                                                $(name[i]).attr('data', 'no');
                                                var newStatus = name[i]+'no';
                                                callAjax(newStatus);
                                                localStorage.setItem("lampuruang"+n, "no");   
                                            }                                
                                        //}                          
                                    }
                                    //if($(name[3]).attr('data') != newTirai || ls) {
                                    $(name[3]).prop('checked', true);
                                    $(name[3]).attr('data', 'yes');
                                    var newStatus = name[3]+'yes';
                                    callAjax(newStatus);
                                    localStorage.setItem("tirai", "yes");
                                            
                                    //}

                                } else if(light > 250){
                                    $(name[3]).prop('checked', false);
                                    $(name[3]).attr('data', 'no');
                                    var newStatus = name[3]+'no';
                                    callAjax(newStatus);

                                    localStorage.setItem("tirai", "no");
                                    localStorage.setItem("cahaya", light);

                                    for (i=0;i<3;i++) {
                                        n = i.toString();
                                        var ruangStatus = localStorage.getItem("lampuruang"+n);
                                        $(name[i]).prop('checked', false);
                                        $(name[i]).attr('data', 'no');
                                        var newStatus = name[i]+'no';
                                        callAjax(newStatus);
                                        if(status[i] == 'yes') {
                                            localStorage.setItem("lampuruang"+n, "yes");  
                                        } else {
                                            localStorage.setItem("lampuruang"+n, "no");  
                                        }
                                    }
                                } 
                                
                                if (suhu > 24) {
                                    $(name[4]).prop('checked', true);
                                    $(name[4]).attr('data', 'yes');
                                    var newStatus = name[4]+'yes';
                                    callAjax(newStatus);

                                    localStorage.setItem("kipas", "yes");
                                    localStorage.setItem("suhu", suhu);

                                } else if (suhu < 25) {
                                    $(name[4]).prop('checked', false);
                                    $(name[4]).attr('data', 'no');
                                    var newStatus = name[4]+'no';
                                    callAjax(newStatus);
                                    localStorage.setItem("kipas", "no");
                                    localStorage.setItem("suhu", suhu);

                                }

                                localStorage.setItem("okupansi", "occupied");

                            } else if (statusOkupansi == 'nope'){

                                for(i=0; i<5; i++) {
                                    $(name[i]).prop('checked', false);
                                    $(name[i]).attr('data', 'no');
                                    var newStatus = name[i]+'no';
                                    callAjax(newStatus);
                                }
                                localStorage.setItem("okupansi", "nope");
                            }
                        } 
                    }
                }
            });
        }  
    },2000);    
    
    $(name[0]).change(function() { 
        if($(name[0]).is(':checked')) {
            $(name[0]).attr('data', 'yes');
            var newStatus = name[0]+'yes';
            callAjax(newStatus);
            localStorage.setItem("lampuruang0", "yes");
        } 
        else  {
            $(name[0]).attr('data', 'no');
            var newStatus2 = name[0]+'no';
            callAjax(newStatus2);
            localStorage.setItem("lampuruang0", "no");
        }   
    }); 

    $(name[1]).change(function() { 
        if($(this).is(':checked')) {
            $(name[1]).attr('data', 'yes');
            var newStatus = name[1]+'yes';
            callAjax(newStatus);
            localStorage.setItem("lampuruang1", "yes");
        } 
        else  {
            $(name[1]).attr('data', 'no');
            var newStatus2 = name[1]+'no';
            callAjax(newStatus2);
            localStorage.setItem("lampuruang1", "no");
        }   
    }); 

    $(name[2]).change(function() { 
        if($(this).is(':checked')) {
            $(name[2]).attr('data', 'yes');
            var newStatus = name[2]+'yes';
            callAjax(newStatus);
            localStorage.setItem("lampuruang2", "yes");
        } 
        else  {
            $(name[2]).attr('data', 'no');
            var newStatus2 = name[2]+'no';
            callAjax(newStatus2);
            localStorage.setItem("lampuruang0", "no");
        }   
    }); 

    $(name[3]).change(function() { 
        $(name[3]).attr('data', 'yes');
        if($(this).is(':checked')) {
            var newStatus = name[3]+'yes';
            callAjax(newStatus);
            localStorage.setItem("tirai", "yes");
        } 
        else  {
            $(name[3]).attr('data', 'no');
            var newStatus2 = name[3]+'no';
            callAjax(newStatus2);
            localStorage.setItem("tirai", "no");
        }   
    });
    
    $(name[4]).change(function() { 
        $(name[4]).attr('data', 'yes');
        if($(this).is(':checked')) {
            var newStatus = name[4]+'yes';
            callAjax(newStatus);
            localStorage.setItem("kipas", "yes");
        } 
        else  {
            $(name[4]).attr('data', 'no');
            var newStatus2 = name[4]+'no';
            callAjax(newStatus2);
            localStorage.setItem("kipas", "no");
        }   
    }); 

    $("#btn-manual").click(function(){
        $(this).removeClass("button-deactivated");
        $(this).addClass("button-activated");
        $("#btn-auto").removeClass("button-activated");
        $("#btn-auto").addClass("button-deactivated");
        $("#a, #b, #c ,#d ,#e ,#f, #g").removeAttr('disabled');
        isPaused = true;
    });

    $("#btn-auto").click(function() {
        $("#a, #b, #c ,#d , #e, #f , #g").attr('disabled', true);
        $("#btn-manual").removeClass("button-activated");
        $("#btn-manual").addClass("button-deactivated");
        $(this).removeClass("button-deactivated");
        $(this).addClass("button-activated");
        localStorage.setItem("okupansi", "");
        isPaused = false;
    });
});



