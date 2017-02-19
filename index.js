/**
 * Created by Shailesh 2/8/2017.
 */

$(document).ready(function(){
//add new row
    $("#new").click(function(){
        var name = $(".name").clear;
        var rollno = $(".rollno").clear;
        var age = $(".age").clear;
        var sex =$(".sex").clear;
        var addRow = "<tr><td><input type='checkbox' class='select' value='check'></td><td><input class='name' type='text' required></td><td><input class='rollno' type='number' required></td><td> <input class='age' type='number' required></td>" +
                     "<td><select class='sex'><option value='male'>male</option><option value='female'>female</option><option value='other'>other</option></select></td><td>" +
                     "<button class='submit'>save</button><button class='edit' style='display: none'>Edit</button><button class='remove'>Delete</button></td></tr>";
        $("tbody#some").append(addRow);
    });

//delete single row
    $(document).on('click','.remove',function(e) {
        debugger;
        var currentrow = $(e.target).closest('tr');
        var valIndex = currentrow.index();

        /* if($(".select").val()=="check"){
         /!* $("currentrow").remove();*!/*/

        var confresult = confirm("Do you really want to delete row ?");
        if (confresult == true) {
            currentrow.remove();



           jsondata.splice(valIndex,1);
            localStorage.setItem('jsondata',JSON.stringify(jsondata));

           /* var removeIteam = jsondata[valIndex];
            jsondata = $.grep(jsondata, function (value) {
                return value != removeIteam;
            })*/


            alert("you deleted row successfully");
        }
        else{
            alert("your row is not deleted");
        }

    })
//delete multiple row
    $(document).on('click','.multdel',function(e){
        debugger;
        var confresult = confirm("Do you really want to delete row ?");

        if(confresult === true) {
            $("table tbody").find("input.select").each(function () {
            if($(this).is (":checked")){
                var valIndex = $(this).closest('tr').index();
                $(this).parents("tr").remove();
                jsondata.splice(valIndex,1);

                }
        });
            localStorage.setItem('jsondata',JSON.stringify(jsondata));

        }
    });
//save button click
    $(document).on('click', '.submit',function(e) {

        var currentrow = $(e.target).closest('tr');

        var name = currentrow.find(".name").val();
        var rollno = currentrow.find(".rollno").val();
        var age = currentrow.find(".age").val();
        var sex = currentrow.find(".sex").val();
        var valIndex = $(e.target).closest('tr').index();


        var data ={
            name: name,
            rollno:rollno,
            age:age,
            sex:sex,
            ind:jsondata.length
        };


        jsondata[valIndex] = data;

        localStorage.setItem('jsondata', JSON.stringify(jsondata));

        var addRow = "<tr><td><input type='checkbox' class='select' value='check'></td><td class='name'>" +name+ "</td><td class='rollno'>" + rollno + "</td><td class='age'>" + age + "</td><td class='sex'>" + sex + "</td>" +
                     "<td><button class='edit'>Edit</button><button class='remove'>Delete</button><button class='submit' style='display: none'>save</button> </td></tr>";
        currentrow.replaceWith(addRow);
    });
//click on Edit
    $(document).on('click', '.edit',function(e){
        $('#delete').show();
        var currentrow = $(e.target).closest('tr');
        var name1 = currentrow.find(".name").text();
        var rollno1 =currentrow.find(".rollno").text();
        var age1 = currentrow.find(".age").text();
        var sex1 = currentrow.find(".sex").text();
        console.log(currentrow.find(".sex").text());
        var addRow = "<tr><td><input type='checkbox' class='select' value='check'> </td><td><input class='name' type='text' value='"+ name1 +"'required>"+
                     "</td><td><input class='rollno' type='number' value='"+rollno1+"'required>"+
                     "</td><td><input class='age' type='number' value='"+age1+"'required>"+"</td><td><select class='sex''>"+
                     "<option value='male'>male</option><option value='female'>female</option><option value='other'>other</option></select></td>" +
                     "<td><button class='submit'>Save</button><button class='edit' style='display:none'>Edit</button><button class='remove'>Delete</button></td></tr>";
        currentrow.replaceWith(addRow);
        $('.sex').val(sex1);
    });
//local storage
    var jsondata=[];
    if(localStorage.getItem('jsondata')){
        jsondata = JSON.parse(localStorage.getItem('jsondata'));
        for(i=0;i<jsondata.length;i++){
            console.log(jsondata[i]);
           $("table #some").append("<tr><td><input type='checkbox' class='select' value='check'></td><td class='name'>"+jsondata[i].name+"</td><td class='rollno'>"+jsondata[i].rollno+
               "</td><td class='age'>"+jsondata[i].age+"</td><td class='sex'>"+jsondata[i].sex +
               "</td><td><button class='submit' style='display:none'>save</button><button class='edit'>Edit</button><button class='remove'>Delete</button></td></tr>");
        }
    }

});