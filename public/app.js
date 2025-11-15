const listItemIcon = '<button class="icon-btn" aria-label="edit button"><span class="material-symbols-outlined">chevron_right</span></button>';

function loadTodos() {
    $.get("/api/todos", function (data) {
        const $list = $("#list");
        $list.empty();
        data.forEach((todo) => {
            $list.append(
                `<li data-id=${todo.id}>
                    <div class="left">
                        <input type="checkbox"/>
                        <span class="task-text">${todo.title}</span>
                    </div>
                    ${listItemIcon}
                </li>`
        )});
    });
}

function postInput($title, $desc) {
    const title = $title.val().trim();
    const description = $desc.val().trim();

    if (!title) return alert("Please enter a title.");
    $.ajax({
        url: "/api/todos",
        method: "POST",
        contentType: "application/json",
        data: JSON.stringify({ title, description }),
        success: function() {
            $title.val("").focus();
            $desc.val("");
            loadTodos();
        }
    });
}

function loadSpecificInput(id) {
    const $title = $("#task-title");
    const $description = $("#task-des");

    $.get(`/api/todos/${id}`, function (data) {
        $title.val(`${data.title}`);
        $description.val(`${data.description}`);
        $(".section2 h2").text("Edit task");
        $("#task-id").val(`${data.id}`);
    });
}

function editInput(id, $title, $desc) {
    const title = $title.val().trim();
    const description = $desc.val().trim();
    $.ajax({
        url: `/api/todos/${id}`,
        method: "PATCH",
        contentType: "application/json",
        data: JSON.stringify({ title, description }),
        success: function() {
            loadTodos();
        }
    });
}

function deleteInput(id) {
    $.ajax({
        url: `/api/todos/${id}`,
        method: "DELETE",
        success: function() {
            loadTodos();
        },
    });
}

$(document).ready(function() {
    const $title = $("#task-title");
    const $description = $("#task-des");

    loadTodos();
    $(".edit-btn-container").hide();

    $("#add-btn").click((e) => {
        e.preventDefault();
        postInput($title, $description);
    });

    $title.keydown((e) => {
        if (e.key === "Enter") {
            e.preventDefault();
            postInput($title, $description) ;
        }
    });

    $("#list").on("click", ".icon-btn", function() { // Event Delegation
        const id = $(this).closest("li").data("id");
        loadSpecificInput(id);
        $("#add-btn").hide();
        $(".edit-btn-container").show();
    })

    $(".new-btn").click(function() {
        $title.val(``);
        $description.val(``);
        $(".section2 h2").text("Add New Task");
        $("#add-btn").show();
        $(".edit-btn-container").hide();
        $("#task-id").val("");
    })

    $(".save-btn").click(function(e) {
        e.preventDefault();
        const id = $("#task-id").val();

        editInput(id, $title, $description);
    })


    $(".delete-btn").click(function(e) {
        e.preventDefault();
        const id = $("#task-id").val();
        
        if (!id) {
            return alert("There is no task to delete.");
        } else {
            deleteInput(id);
            $(".section2 h2").text("Add New Task");
            $("#add-btn").show();
            $(".edit-btn-container").hide();
            $title.val("");
            $description.val("");
            $("#task-id").val("");
        }
    })

})

