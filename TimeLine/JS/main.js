function newTimelineForm() {
    $('.form_date').datetimepicker({
        language: 'fr',
        weekStart: 1,
        autoclose: 1,
        startView: 2,
        minView: 2,
        forceParse: 0
    });
    $('#cancel').click(function () {
        $('#newTimelineForm').empty();
    })
}
function validation(event){
    var target=event.target.id;
    var status=true;
    if(target=="title" || target=="save"){
        if($("#title").val().trim()==""){
            $("#title").addClass("error");
            status= false;
        }else{
            $("#title").removeClass("error");
        }
    }
    if(target=="content" || target=="save"){
        if($("#content").val().trim()==""){
            $("#content").addClass("error");
            status= false;
        }else{
            $("#content").removeClass("error");
        }
    }
    return status;
}
function retrieveFormData(){
    if(!$('#date').val()){
        var newDate = Date.parse(new Date());
    }else{
        newDate = Date.parse($('#date').val());
    }
    var newTitle = $('#title').val();
    var newContent = $('#content').val();
    var newbackground = $('#background').val();
    var newTL = {
        elmDate: newDate,
        title: newTitle,
        content: newContent,
        background: newbackground,
    };
    return (newTL);
}
function storeData() {
    var newElement=retrieveFormData();
    $.ajax({
    type: "POST",
    url: "http://localhost:4000/element",
    contentType: "application/json",
    data: JSON.stringify(newElement),
    success: function(res){
        getData()
    }
    });
}
function getData() {
    $.ajax({
        type: "GET",
        url: "http://localhost:4000/elements",
        dataType: "json",
        success: function(res){
            createTL(res);
        }
    });
} 
function createDateString(elmDate){
    var d1=new Date(parseInt(elmDate));
    var d = d1.getDate();
    var m = d1.getMonth() + 1;
    var y = d1.getFullYear();
    var h = d1.getHours();
    var min = d1.getMinutes();
    var dateString = y +'-' + (m <= 9 ? '0' + m : m) + '-' +(d <= 9 ? '0' + d : d) + '  ' + h+':'+min;
    return dateString;
}
function createTL(response){
    $('#timelineElements').empty();
    if(response.length>0){
        var data = [];
        var date=new Date(parseInt(response[0].elmDate))
        var month = date.getMonth();
        var year = date.getFullYear();
        $.each(response, function (idx, obj) {
            let elementDate=parseInt(response[idx].elmDate);
            if (year == new Date(elementDate).getFullYear() && month == new Date(elementDate).getMonth()) {
                data.push(response[idx]);
            } else {
                paintTL(data)
                data = [];
                month = new Date(elementDate).getMonth();
                year = new Date(elementDate).getFullYear()
                data.push(response[idx]);
            }
        })
        paintTL(data);
    }
}
function paintTL(response) {
    var element = "";
    var pos = "left";
    var lastDateOfMonth= new Date(parseInt(response[0].elmDate));
    var month = lastDateOfMonth.toLocaleDateString('en-us', {month: 'long' });
    var year = lastDateOfMonth.getFullYear();
    $('#timelineElements').append(`<div class=" d-flex justify-content-center" style="clear:both">
    <div class="flag">${month} ${year}</div>
    </div>`)
    $.each(response, function (idx, obj) {
       var dateString=createDateString(obj.elmDate);
        element += `
            <div class="element ${pos} col-md-6  col-xs-12">
                <div id="tlElement${obj._id}"  class=" tlElements"style="background:${obj.background};border-color:${obj.background}">
                    <div class="row">
                        <div class="col-md-6 d-flex justify-content-start" id="tlTitle">
                            ${obj.title}     
                        </div>
                        <div class="col-md-6 d-flex justify-content-end" id="tlDate">
                            ${dateString}  
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-md-12 pt-2" id="tlBody">
                            ${obj.content}    
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-md-12 d-flex justify-content-end">
                            <button type="button" class="btn btn-danger btn-md mr-2" id="del" data-delid="${obj._id}")></button>
                            <button type="button" class="btn btn-md btn-primary" id="edit" data-editid="${obj._id}"></button>
                        </div>
                    </div>
                </div>
            </div> 
        `;
        if (pos == "left") {
            pos = "right";
        } else {
            pos = "left";
        }
    })
    $('#timelineElements').append(element);
    $('.tlElements').click(function (e) {
        if (e.target.id == "del") {
            var id = e.target.dataset.delid;
            delElement(id); 
            e.stopImmediatePropagation(); 
        }
        if (e.target.id == "edit") {
            var key = e.target.dataset.editid;
            $(`#tlElement${key}`).replaceWith(newForm);
            getElement(key);
        }
    })
  $('#newTimelineForm').empty();
}
function delElement(key) {
    if (confirm("Are you sure to delete ?")) {
        $.ajax({
            type: "DELETE",
            url: `http://localhost:4000/element/${key}`,
            dataType: "json",
            success: function(res){
                getData();
            }
        });
        
    }
}
function getElement(key) {
    $.ajax({
        type: "GET",
        url: `http://localhost:4000/element/${key}`,
        dataType: "json",
        success: function(res){
            newTimelineForm();
            var dateString=createDateString(res.elmDate);
            $("#newTLForm #date").val(dateString);
            $("#newTLForm #title").val(res.title);
            $("#newTLForm #content").val(res.content);
            $("#newTLForm #background").val(res.background);
            $("#newTLForm #save").click(function(){ 
                $("#newTLForm #date").text=Date.parse($("#newTLForm #date").val());
                var updatedData= retrieveFormData();
                updateElement(key,updatedData);
            });
            $("#newTLForm #cancel").click(getData);
        }
    });  
}
function updateElement(key,updatedData){
    $.ajax({
        type: "PUT",
        url: `http://localhost:4000/element/${key}`,
        contentType: "application/json",
        data: JSON.stringify(updatedData),
        success: function(res){
            getData(res)
        }
    })
}

