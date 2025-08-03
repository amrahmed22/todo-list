const audio = document.getElementById('myAudio');

var input = document.getElementById("taskInput");

var array;

if (localStorage.getItem('todolist') != null) {

    array = JSON.parse(localStorage.getItem('todolist'))
    display(array)
}
else {
    array = []
}

function addTask() {

    var TaskDetails = {

        name: document.getElementById("taskInput").value,
        isDone: false,
    }

    if (validName(TaskDetails.name) == true && nameRepeat(TaskDetails.name)) {
        array.push(TaskDetails)
        input.value = ''
        localStorage.setItem("todolist", JSON.stringify(array))
        display(array)
    }


}

function deleteTask(i) {

    array.splice(i, 1)
    localStorage.setItem("todolist", JSON.stringify(array))
    display(array)


}


function checkTask(i) {
    if (array[i].isDone == false) {
        audio.play();
        fire()
    }
    var checkbox = document.getElementById(`check${i}`)
    array[i].isDone = checkbox.checked
    localStorage.setItem("todolist", JSON.stringify(array))
    display(array)

}

// function displayAll() {
//     display(array)



// }


// function displayDone() {


//     var DoneArray = array.filter((value) => value.isDone == true)
//     console.log(DoneArray);
//     display(DoneArray)


// }
// function displayNotDone() {
//     var notDoneArray = array.filter((value) => value.isDone == false)
//     display(notDoneArray)
// }

// function handleSelectChange() {
//     var selected = document.getElementById("select").value
//     if (selected == "done") {
//         displayDone()
//     }
//     else if (selected == "notDone") {
//         displayNotDone()
//     }
//     else {
//         displayAll()
//     }
// }

function display(arr) {

    // document.getElementById("numberOftasks").innerText =  " Tasks : "+arr.length 
    if (arr.length == 0) {
        document.getElementById("noTasks").innerHTML = "<div class='alert alert-danger text-center mt-5 w-100 fs-3'> No Tasks </div>"
        document.getElementById("here").innerHTML = ""
    }
    else {
        document.getElementById("noTasks").innerHTML = ""
        var temp = ' '
        var count;
        for (let i = 0; i < arr.length; i++) {
            if (arr[i].isDone) {
                temp += `
                <tr class="fs-4">
        
                <td class=" pt-2">${i + 1}</td>
                <td><input type="checkbox" checked  onclick="checkTask(${i})" id="check${i}" class="check mt-2"></td>
                <td id="name${i}" class="pt-2 text-decoration-line-through">${arr[i].name}</td>
              
                <td><button onclick="deleteTask(${i})" class="delete" id="delete${i}"><i class="fa fa-trash "></i><span class="d-none"> ${i}</span></button></td>
            </tr>`
            }
            else {
                temp += `
                <tr class="fs-4">
        
                <td class=" pt-2">${i + 1}</td>
                <td><input type="checkbox"  onclick="checkTask(${i}) " id="check${i}" class="check mt-2"></td>
                <td id="name${i}" class="pt-2 text-decoration-none">${arr[i].name}</td>
              
                <td><button onclick="deleteTask(${i})" class="delete" id="delete${i}"><i class="fa fa-trash "></i><span class="d-none"> ${i}</span></button></td>
            </tr>`
            }







        }

        document.getElementById("here").innerHTML = temp



    }


}


function validName(name) {
    var regex = /\p{L}{2,}/gu;
    if (regex.test(name) == true) {
        document.getElementById("nameError").classList.replace("d-block", "d-none")
        //  
        return true
    }
    else {

        document.getElementById("nameError").classList.replace("d-none", "d-block")
        document.getElementById("nameError").innerText = " invalid name min 2 letters  "
        return false
    }


}

function nameRepeat(name) {
    let flag = true
    if (array.length === 0) {
        flag = true
        return flag
    }
    else {
        for (let i = 0; i < array.length; i++) {
            if ((array[i].name).toString().toLowerCase() == (name).toString().toLowerCase()) {
                document.getElementById("nameError").innerText = "invalid name is repeated"
                document.getElementById("nameError").classList.replace("d-none", "d-block")
                flag = false
            }
        }
    }
    return flag
}





function toggleMode() {
    const body = document.body;
    body.classList.toggle('dark-mode');
    body.classList.toggle('light-mode');



    if (body.classList.contains("dark-mode")) {
        document.querySelector(".toggle-button").innerHTML = '<i class=" fa fa-sun"></i>'
    }
    else {
        document.querySelector(".toggle-button").innerHTML = '<i class=" fa fa-moon"></i>'

    }
}