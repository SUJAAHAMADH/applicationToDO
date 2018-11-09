const uri = "https://localhost:44365/api/user";
let userlist = null;



$(document).ready(function () {
    getData();
});

function getData() {
    $.ajax({
        type: "GET",
        url: uri,
        cache: false,
        success: function (data) {
            const tBody = $("#userlist");

            $(tBody).empty();

            //getCount(data.length);

            $.each(data, function (key, item) {
                const tr = $("<tr></tr>")
                    .append($("<td></td>").text(item.userName))
                    .append($("<td></td>").text(item.email))
                    //.append($("<td></td>").text(item.password))
                    .append(
                        $("<td></td>").append(
                        $("<button  class='btn btn-icon btn-3 btn-primary'><i class='fas fa-edit'></i> Edit</button>").on("click", function () {
                                editItem(item.id);
                            })
                        )
                     )
                    .append(
                        $("<td></td>").append(
                        $("<button class='btn btn-icon btn-3 btn-danger' ><i class='fas fa-trash-alt'></i> Delete</button>").on("click", function () {
                                deleteItem(item.id);
                            })
                        )
                    );
                tr.appendTo(tBody);
            });

            userlist = data;
        }
    });
}

function addItem() {
    const item = {
        userName: $("#userName").val(),
        email: $("#email").val(),
        password: $("#password").val(),
    };
   
    $.ajax({
        type: "POST",
        accepts: "application/json",
        url: uri,
        contentType: "application/json",
        data: JSON.stringify(item),
        error: function (jqXHR, textStatus, errorThrown) {
            alert("Something went wrong!");
        },
        success: function (result) {
            getData();
            $("#userName").val("");
            $("#email").val("");
            $("#password").val("");
        }
    });
}

function editItem(id) {
    $.each(userlist, function (key, item) {
        if (item.id === id) {
            $("#edit_userName").val(item.userName);
            $("#uid").val(item.id);
            $("#edit_email").val(item.email);
            $("#edit_password").val(item.password);
           
        }
    });
    $("#spoiler").css({ display: "block" });
}

$(".my-form").on("submit", function () {
    const item = {
        userName: $("#edit_userName").val(),
        id: $("#uid").val(),
        email: $("#edit_email").val(),
       
        
    };

    $.ajax({
        url: uri + "/" + $("#uid").val(),
        type: "PATCH",
        accepts: "application/json",
        contentType: "application/json",
        data: JSON.stringify(item),
        success: function (result) {
            getData();
        }
    });

    closeInput();
    return false;
});

function deleteItem(id) {
    $.ajax({
        url: uri + "/" + id,
        type: "DELETE",
        success: function (result) {
            getData();
        }
    });
}

function closeInput() {
    $("#spoiler").css({ display: "none" });
}

function login() {
    const item = {
        userName: $("#userName").val(),
        password: $("#password").val(),
    };
    console.log(item);
    $.ajax({
        type: "POST",
        accepts: "application/json",
        url: uri+"/login",
        contentType: "application/json",
        data: JSON.stringify(item),
        error: function (jqXHR, textStatus, errorThrown) {
            alert("Please Enter Correct UserName and Password!");
            //$("#login_status_alert").css({ display: "none" });
            $("#userName").val("");
            $("#password").val("");

        },
        success: function (result) {
            Session["uname"] = $("#userName").val();
            location.href = "https://localhost:44365/src/examples/tables.html?username=" + $('#userName').val()
            
            $("#userName").val("");
            $("#password").val("");

        }
    });


}









