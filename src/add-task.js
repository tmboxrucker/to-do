import {removeFromList} from './filter.js'
let verifyHold = '0';
let rejectHold = '0'

export const newTask = (e,edit,object) => {
    let divSelect;                                      // Removes existing content of div and replaces content with add task box
    let divSelectHold;

    console.log(divSelect);
    console.log(divSelectHold);
    console.log(verifyHold);

    if (edit != undefined) {
        divSelect = e.target.closest('div.definedTask');
        divSelectHold = divSelect.innerHTML;
    }
    else {
        if (verifyHold == 0){
            divSelect = e.target.closest('div.addTask');
            if (divSelect != null) {
                divSelectHold = divSelect.innerHTML;
            }
            console.log(divSelectHold)
            if (rejectHold == 0) {
                verifyHold = 1;
            }
            else {
                rejectHold = 0;
            }
        }
    }

    if (divSelect != null) {
        divSelect.innerHTML = ''
    }

    if (divSelect == null) {
        return
    }

    const addTaskBox = document.createElement('div');
    addTaskBox.classList.add('addTaskBox');

    const taskTitle = document.createElement('textarea');
    const taskDueDate = document.createElement('input');
    const taskFilter = document.createElement('input');
    const taskAccept = document.createElement('button');
    const taskReject = document.createElement('button');

    taskTitle.setAttribute('name','title');
    taskTitle.setAttribute('id','title');
    taskTitle.setAttribute('placeholder','Title: Vacuum');
    taskTitle.setAttribute('maxlength','35');
    taskTitle.setAttribute('required','true');

    taskDueDate.setAttribute('type','text');
    taskDueDate.setAttribute('id','dueDate');
    taskDueDate.setAttribute('placeholder','Due Date');
    taskDueDate.setAttribute('autocomplete','off');
    taskDueDate.setAttribute('class','addTaskButton');

    taskFilter.setAttribute('type','text');
    taskFilter.setAttribute('id','categoryFilter');
    taskFilter.setAttribute('placeholder','Category');
    taskFilter.setAttribute('autocomplete','off');
    taskFilter.setAttribute('class','addTaskButton');

    taskAccept.classList.add('acceptButton');
    taskReject.classList.add('rejectButton');

    taskAccept.setAttribute('id','acceptButton');
    taskReject.setAttribute('id','rejectButton');

    taskAccept.innerHTML = 'Accept';
    taskReject.innerHTML = 'Reject';

    addTaskBox.appendChild(taskTitle);
    addTaskBox.appendChild(taskDueDate);
    addTaskBox.appendChild(taskFilter);
    addTaskBox.appendChild(taskAccept);
    addTaskBox.appendChild(taskReject);

    divSelect.appendChild(addTaskBox)
    
    console.log(divSelectHold)

    taskAccept.addEventListener("click", (e) => {
    });


    console.log(divSelect);
    console.log(divSelectHold);
    console.log(verifyHold);

    

    taskReject.addEventListener("click", (e) => {
        if (edit != undefined) {
            console.log('in the edit reject');
            divSelect.innerHTML = divSelectHold;
            const addListener = divSelect.querySelectorAll('img');
            addListener[0].addEventListener("click", (u) => {
                console.log('edit');
                return newTask(u,'edit',e);
            });

            addListener[1].addEventListener("click", (e) => {
                console.log('delete');
                return removeFromList(e);
            });
        }
        else {
            console.log('test123')
            console.log(divSelect)
            divSelect.innerHTML = divSelectHold;
            verifyHold = 0;
            rejectHold = 1;
        }
    });

}