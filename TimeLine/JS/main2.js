var tlData=[];
function newTimelineForm() {
    $('.form_date').datetimepicker({
        language: 'fr',
        weekStart: 1,
        todayBtn: 1,
        autoclose: 1,
        todayHighlight: 1,
        startView: 2,
        minView: 2,
        forceParse: 0
    });
    $('#cancel').click(function () {
        $('#newTimelineForm').empty();
    })
}
function storeData() {
    var newDate = new Date($('#date').val());
    var newTitle = $('#title').val();
    var newContent = $('#content').val();
    var newbackground = $('#background').val();
    var newTL = {
        date: newDate,
        title: newTitle,
        content: newContent,
        background: newbackground,
        id: Math.floor((Math.random() * 100) + 1),
    };
    tlData.push(newTL);
    tlData = tlData.sort(function (d1, d2) {
        return new Date(d2.date) - new Date(d1.date);
    })
    getData();
}
function getData() {
    $('#timelineElements').empty();
    if (tlData.length != 0) {
        var data = [];
        var month = tlData[0].date.getMonth();
        var year = tlData[0].date.getFullYear();
        $.each(tlData, function (idx, obj) {
            if (year == tlData[idx].date.getFullYear() && month == tlData[idx].date.getMonth()) {
                data.push(tlData[idx]);
            } else {
                showTL(data)
                data = [];
                month = tlData[idx].date.getMonth();
                year = tlData[idx].date.getFullYear()
                data.push(tlData[idx]);
            }
        })
        showTL(data);
    }
}
function showTL(data) {
    var element = "";
    var pos = "left";
    var month = data[0].date.toLocaleDateString('en-us', { month: 'long' });
    var year = data[0].date.getFullYear();
    $('#timelineElements').append(`<div class=" d-flex justify-content-center">
    <div class="flag">${month} ${year}</div>
    </div>`)
    $.each(data, function (idx, obj) {
        element += `
            <div class="element ${pos} col-md-6  col-xs-12">
                <div id="tlElement${obj.id}"  class=" tlElements"style="background:${obj.background};border-color:${obj.background}">
                    <div class="row">
                        <div class="col-md-6 d-flex justify-content-start" id="tlTitle">
                            ${obj.title}     
                        </div>
                        <div class="col-md-6 d-flex justify-content-end" id="tlDate">
                            ${obj.date.toLocaleDateString('en-us', {  day: 'numeric' , month: 'long', year: 'numeric'})}  
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-md-12 pt-2" id="tlBody">
                            ${obj.content}    
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-md-12 d-flex justify-content-end">
                            <button type="button" class="btn btn-danger btn-md mr-2" id="del" data-delid="${obj.id}")></button>
                            <button type="button" class="btn btn-md btn-primary" id="edit" data-editid="${obj.id}"></button>
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
            var key = e.target.dataset.delid;
            delElement(key)
        } else if (e.target.id == "edit") {
            var key = e.target.dataset.editid;
            editElement(key, `tlElement${key}`);
        }
    })
    $('#newTimelineForm').empty();
}
function delElement(key) {
    if (confirm("Are you sure to delete ?")) {
        $.each(tlData, function (idx, obj) {
            if (obj.id == key) {
                tlData.splice(idx, 1);
                return false;
            }
        })
    }
    getData();
}
function editElement(key, elmID, e) {
    var indx;
    $(`#${elmID}`).replaceWith(newForm);
    $.each(tlData, function (idx, obj) {
        if (obj.id == key) {
            indx = idx;
            $("#newTLForm #date").val(tlData[idx].date.toLocaleDateString("nl"));
            $("#newTLForm #title").val(tlData[idx].title);
            $("#newTLForm #content").val(tlData[idx].content);
            $("#newTLForm #background").val(tlData[idx].background);
            $("#newTLForm #cancel").click(storeData);
        }
    })
    newTimelineForm()
    tlData.splice(indx, 1);
}