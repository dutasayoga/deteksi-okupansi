$(document).ready(function(){
    var name = ['#a','#b','#c','#f','#g'];
    var isPaused = false;
    var newcahaya = "";
    //var newStatusOkupansi = "";
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
                    var status = [
                        data.ruang_1_status,
                        data.ruang_2_status,
                        data.ruang_3_status
                    ];

                    $(name[3]).attr('cahaya', newcahaya);
                    var conStatus = [data.a,data.b,data.c,data.d,data.e];

                    if (status.includes('yes')) {
                        $('.appliances').attr("status", "occupied");
                    } else {
                        $('.appliances').attr("status", "nope");
                    }
                    var statusOkupansi = $('.appliances').attr('status');

                    if($("#btn-auto").hasClass("button-activated")) { // Mode otomatis
                        for(i=0; i<3; i++){
                            if($(name[i]).attr('data') != status[i] || $(name[3]).attr('cahaya') != light) {
                                if(status[i] == 'yes' && light < 250) {
                                    $(name[i]).prop('checked', true);
                                    $(name[i]).attr('data', 'yes');
                                    var newStatus = name[i]+'yes';
                                    $.ajax({
                                        type: "post",
                                        url: "sending.php",
                                        data: {'data':newStatus},
                                        dataType: "json",
                                        success: function (data) {                               
                                        }
                                    });
                                } else {
                                    $(name[i]).prop('checked', false);
                                    $(name[i]).attr('data', 'no');
                                    var newStatus = name[i]+'no';
                                    $.ajax({
                                        type: "post",
                                        url: "sending.php",
                                        data: {'data':newStatus},
                                        dataType: "json",
                                        success: function (data) {                               
                                        }
                                    });   
                                }                                
                            }                          
                        }
                        
                        if($(name[3]).attr('cahaya') != light || statusOkupansi != newStatusOkupansi) {
                            if(statusOkupansi == 'occupied') {
                                if(light <= 250) {
                                    $(name[3]).prop('checked', true);
                                    $(name[3]).attr('kipas', '1');
                                    $(name[3]).attr('cahaya', light);
                                    var newcahaya = light;
                                    var newStatusOkupansi = "occupied";
                                    $.ajax({
                                        type: "post",
                                        url: "sending.php",
                                        data: {'data':'#fyes'},
                                        dataType: "json",
                                        success: function (data) {                               
                                        }
                                    });
                                }                               
                            } else {
                                $(name[3]).prop('checked', false);
                                $(name[3]).attr('kipas', '0');
                                $(name[3]).attr('cahaya', light);
                                var newcahaya = light;
                                var newStatusOkupansi = "nope";
                                $.ajax({
                                    type: "post",
                                    url: "sending.php",
                                    data: {'data':'#fno'},
                                    dataType: "json",
                                    success: function (data) {                               
                                    }
                        
                                });
                                return newStatusOkupansi;                                 
                            } 
                        }
                    }           
                }
            });
        }  
    },4000);    
    
    setInterval(function() {
        var widget1 = $(name[0]).attr('data');
        var myJSON = JSON.stringify(widget1);
        localStorage.setItem("testJSON", myJSON);
    },1000)

    $(name[0]).change(function() { 
        if($(name[0]).is(':checked')) {
            $(name[0]).attr('data', 'yes');
        } 
        else  {
            $(name[0]).attr('data', 'no');

        }   
    }); 

    $(name[1]).change(function() { 
        if($(this).is(':checked')) {
            $(name[1]).attr('data', 'yes');

        } 
        else  {
            $(name[1]).attr('data', 'no');

        }   
    }); 

    $(name[2]).change(function() { 
        if($(this).is(':checked')) {
            $(name[2]).attr('data', 'yes');

           
        } 
        else  {
            $(name[2]).attr('data', 'no');

        }   
    }); 

    $(name[3]).change(function() { 

        if($(this).is(':checked')) {
            $(name[3]).attr('data', 'yes');
     
            
        } 
        else  {
            $(name[3]).attr('data', 'no');

        }   
    });
    
    $(name[4]).change(function() { 

        if($(this).is(':checked')) {
            $(name[4]).attr('data', 'yes');
           
        } 
        else  {
            $(name[4]).attr('data', 'no');
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
        $("#a, #b, #c ,#d , #e, #f , #g").attr('disabled', false);
        $("#btn-manual").removeClass("button-activated");
        $("#btn-manual").addClass("button-deactivated");
        $(this).removeClass("button-deactivated");
        $(this).addClass("button-activated");
        isPaused = false;

    });
});



