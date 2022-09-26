import {addStrikethrough, addToFilter, removeFromList, removeStrikethrough} from './filter.js'
import { loadPage } from './main-page.js';
import { createNewFilter } from './page-load.js';
let verifyHold = '0';
let rejectHold = '0'

export const newTask = (e,edit,object) => {
    let divSelect;                                      // Removes existing content of div and replaces content with add task box
    let divSelectHold;
    let editTitle = ''
    let editProject = ''
    let editDate = ''
    let editObjectHold = '';
    let strikeThrough = '';

    if (edit != undefined) {
        divSelect = e.target.closest('div.definedTask');
        const divLabel = divSelect.querySelector('input');
        let test = divLabel.name.substring(6)
        if (divLabel.checked) {
            console.log('this should be checked')
            removeStrikethrough(test);
            strikeThrough = 1;
        }
        divSelectHold = divSelect.innerHTML;
        editObjectHold = divSelect.id.substring(11);
        editTitle = object[0];
        editProject = object[1];
        editDate = object[2];
    }
    else {
        editObjectHold = 'new';
        if (verifyHold == 0){
            divSelect = e.target.closest('div.addTask');
            if (divSelect != null) {
                divSelectHold = divSelect.innerHTML;
            }
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
    taskTitle.textContent = editTitle;
    taskTitle.setAttribute('maxlength','35');
    taskTitle.setAttribute('required','true');

    taskDueDate.setAttribute('type','date');
    taskDueDate.setAttribute('id','dueDate');
    taskDueDate.setAttribute('placeholder','Due Date');
    taskDueDate.setAttribute('value',editDate);
    taskDueDate.setAttribute('autocomplete','off');
    taskDueDate.setAttribute('class','addTaskButton');

    taskFilter.setAttribute('type','text');
    taskFilter.setAttribute('id','categoryFilter');
    taskFilter.setAttribute('placeholder','Category');
    taskFilter.setAttribute('value',editProject);
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

    taskAccept.addEventListener("click", (e) => {
        if (edit != undefined) {
            const mainPull = document.getElementById('main');
            const activeLoad = mainPull.getElementsByTagName('h2')[0].textContent;

            const container = e.target.closest('div');
            const titleAccept = container.getElementsByTagName('textarea')[0].value;
            const dateAccept = container.getElementsByTagName('input')[0].value;
            const profileAccept = container.getElementsByTagName('input')[1].value;

            if (titleAccept == undefined || titleAccept == null || titleAccept == '') {
                alert('Title cannot be an empty field');
                return
            }
            if (dateAccept == undefined || dateAccept == null || dateAccept == '') {
                alert('Date cannot be an empty field');
                return
            }
            if (profileAccept == undefined || profileAccept == null || profileAccept == '') {
                alert('Profile cannot be an empty field');
                return
            }

            addToFilter(titleAccept, profileAccept, dateAccept, editObjectHold);
            createNewFilter()
            loadPage(activeLoad);
            // import loadPage from main-page.js
        }
        else {

            console.log(editObjectHold);

            const mainPull = document.getElementById('main');
            const activeLoad = mainPull.getElementsByTagName('h2')[0].textContent;

            const container = e.target.closest('div');
            const titleAccept = container.getElementsByTagName('textarea')[0].value;
            const dateAccept = container.getElementsByTagName('input')[0].value;
            const profileAccept = container.getElementsByTagName('input')[1].value;

            if (titleAccept == undefined || titleAccept == null || titleAccept == '') {
                alert('Title cannot be an empty field');
                return
            }
            if (dateAccept == undefined || dateAccept == null || dateAccept == '') {
                alert('Date cannot be an empty field');
                return
            }
            if (profileAccept == undefined || profileAccept == null || profileAccept == '') {
                alert('Profile cannot be an empty field');
                return
            }

            addToFilter(titleAccept, profileAccept, dateAccept, editObjectHold);
            createNewFilter()
            loadPage(activeLoad);

            const get = e.target
            verifyHold = 0;
            rejectHold = 1;

        }
    });

    taskReject.addEventListener("click", (e) => {
        if (edit != undefined) {
            divSelect.innerHTML = divSelectHold;
            const addListener = divSelect.querySelectorAll('img');
            const addCheckboxListener = divSelect.querySelector('div.checkbox>label>input')
            if (strikeThrough == 1) {
                let input = addCheckboxListener.name.substring(6);
                addCheckboxListener.setAttribute('checked','true');
                addStrikethrough(input);
                strikeThrough = '';
            }
            else {
                addCheckboxListener.removeAttribute('checked');
            }
            addListener[0].addEventListener("click", (u) => {
                return newTask(u,'edit',object);
            });

            addListener[1].addEventListener("click", (e) => {
                return removeFromList(e);
            });

            addCheckboxListener.addEventListener("click", (e) => {
                let test1 = e.target;
                let test = test1.closest('input');
                let test2 = test.name.substring(6);
                if (e.target.checked) return addStrikethrough(test2);
                removeStrikethrough(test2);
            });
        }
        else {
            divSelect.innerHTML = divSelectHold;
            verifyHold = 0;
            rejectHold = 1;
        }
    });

}