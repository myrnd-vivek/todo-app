const todoName = document.getElementById("todoName");
const description = document.getElementById("description");
const todoContainer = document.getElementById("todo");
const completedTodoContainer = document.getElementById("completed-todo");

const URI = "https://crudcrud.com/api/344dc0be61c5492595fd5f0c6284522a/todos";

function createdTodo(e) {
	e.preventDefault();
	if (!todoName.value || !description.value) {
		alert("All fields are required !!");
		return;
	}
	const todo = {};
	todo.todoName = todoName.value;
	todo.description = description.value;
	todo.completed = false;

	axios
		.post(URI, todo)
		.then((res) => {
			console.log(res);
			getTodos();
		})
		.catch((err) => console.log(err));
}

function changeHandler(id) {
	axios.get(`${URI}/${id}`).then((res) => {
		const {todoName,description} = res.data;
		axios
			.put(`${URI}/${id}`, {
				todoName,
        description,
        completed: true
			})
			.then((res) => {
				console.log(res);
				getTodos();
			})
			.catch((err) => console.log(err));
	});
}

function deleteToto(id) {
	axios.delete(`${URI}/${id}`)
    .then(res => {
      console.log(res);
      getTodos()
    })
}

function getTodos() {
	axios
		.get(URI)
		.then((res) => {
			console.log(res.data);
			todoContainer.innerHTML = "";
			completedTodoContainer.innerHTML = "";
			const data = res.data;
			data.forEach((todo) => {
				const tr = document.createElement("tr");
				if (todo.completed) {
					tr.innerHTML = `
            <td>${todo.todoName} - ${todo.description}</td>
            <td>
              <button onclick="deleteToto('${todo._id}')"><i class="bi bi-trash3 delete"></i></button>
            </td>
          `;
					completedTodoContainer.appendChild(tr);
				} else {
					tr.innerHTML = `
            <td>
              <input type="checkbox" onChange="changeHandler('${todo._id}')" id="checkbox"/>
            </td>&nbsp;
            <td>${todo.todoName} - ${todo.description}</td>
          `;
					todoContainer.appendChild(tr);
				}
			});
		})
		.catch((err) => console.log(err));
}

document.addEventListener("DOMContentLoaded", () => {
	getTodos();
});
