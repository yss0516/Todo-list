function loadTodos() {
    $.get("/api/todos", function (data) {
        const $list = $("#list");
        $list.empty();
        data.forEach((todo) => {
            $list.append(
                `<li data-id=${todo.id}>${todo.task}
                    <button class="delete-btn">Delete</button>
                </li>`
        )});
    });
}

function postInput(input) {
    const task = input.val();
    if (!task) return alert("Input your task.");
    $.ajax({
        url: "/api/todos",
        method: "POST",
        contentType: "application/json",
        data: JSON.stringify({ task }),
        success: function() {
            input.val("").focus();
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
    const $input = $("#new-task");

    loadTodos();

    $("#add-btn").click(() => postInput($input));
    $input.keydown((e) => {
        if (e.key === "Enter") postInput($input);
    });

    $("#list").on("click", ".delete-btn", function() {
        const id = $(this).parent().data("id");
        deleteInput(id);
    });

})

