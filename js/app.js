// declaring variables
const clear = document.querySelector(".clear");
const date = document.getElementById("date");
const list = document.getElementById("list");
const input = document.getElementById("input");
const plusBtn = document.querySelector(".add-to-do i");

// classes
const CHECK = "fa-check-circle";
const UNCHECK = "fa-circle";
const LINE_THROUGH = "lineThrough";

// data and local storage
let data, id, LIST;
data = localStorage.getItem('TODO');
if (data) {
	LIST = JSON.parse(data);
	id = LIST.length;
	LIST.forEach(item => {
		addToDo(item.text, item.id, item.done, item.trash);
	});
} else {
	LIST = [];
	id = 0;
}

// clear the local storage
clear.addEventListener("click", function(){
    localStorage.clear();
    location.reload();
});

// showing date
let today = new Date();
const options = {
	weekday: "long",
	month: "short",
	day: "numeric"
}
date.innerHTML = today.toLocaleDateString("default", options)


// adding items to the list
function addToDo(text, id, done, trash) {
	if (trash) { return; };
	let DONE = done ? CHECK : UNCHECK;
	let LINE = done ? LINE_THROUGH : "";


	let insertHTML = `<li class="item" id="${id}">
	                    <i class="far ${DONE} co" job="complete"></i>
	                    <p class="text ${LINE}">${text}</p>
	                    <i class="far fa-trash-alt de" job="delete"></i> 
               		</li>`;

    list.insertAdjacentHTML("beforeend", insertHTML);
}


// adding event listeners to input field and plus sign next to it
input.addEventListener('keyup', function(e) {
	if (e.keyCode == 13 && e.target.value) {
		activateAddToDo();
	}
});

plusBtn.addEventListener('click', function(e) {
	if (input.value) {
		activateAddToDo();
	}

});

function activateAddToDo() {
	addToDo(input.value, id, false, false);
		LIST.push({
			text: input.value,
			id: id,
			done: false,
			trash:false
		});
		localStorage.setItem('TODO',JSON.stringify(LIST));
		input.value = "";
		id++;
}

// checking and deleting items
function deleteItem(item) {
	item.parentElement.removeChild(item);
	LIST[item.id].trash = true;
	localStorage.setItem('TODO', JSON.stringify(LIST));
}

function checkItem(item) {
	item.classList.toggle(CHECK);
	item.classList.toggle(UNCHECK);
	item.parentElement.querySelector("p").classList.toggle(LINE_THROUGH);
	LIST[item.parentElement.id].done = LIST[item.parentElement.id].done ? false : true;
	localStorage.setItem('TODO', JSON.stringify(LIST));
}

list.addEventListener("click", function(e) {
	if (e.target.hasAttribute("job")) {
		if (e.target.attributes.job.value == "complete") {
			checkItem(e.target);
		} else if (e.target.attributes.job.value == "delete") {
			deleteItem(e.target.parentElement);
		}
	}
});
