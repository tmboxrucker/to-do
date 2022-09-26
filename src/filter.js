import {newTask} from './add-task';
import deleteIcon from './images/delete.svg';
import editIcon from './images/edit.svg';
import { createNewFilter } from './page-load.js';
import { loadPage } from './main-page.js';

let object = [];                                           // Global storage of all lists in this module

export const addToFilter = (task, category, date, num) => {     // Add to the list of tasks; include category and date

    let array = [task, category, date, num];
    let newArray = [];

    if (num == 'new' && object.length == 0) {
        array[3] = 0;
        object[0] = array;
    }
    else if (object.length > 0) {
        let count = 0;
        object.forEach((e) => {
            newArray.push(e[3])
            if (e[3] == num) {
                object[count] = array;
            }
            else if (num >= object.length){
                object[num] = (array);

            }
            count++
        });
        count = 0;
    }
    else {
        object[num] = array;
    }

    newArray.sort(function(a, b) {
        var textA = a;
        var textB = b;
        return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
    });

    if (num == 'new' && newArray[0] != undefined) {
        let count = 0;
        newArray.every((e) => {
            if (e != count) {
                array[3] = count;
                object.push(array);
                return false
            }
            count++
            if (count == newArray.length) {
                array[3] = count;
                object.push(array);
                return false
            }
            return true
        })
        count = 0;
    }
}

export const removeFromList = (e) => {
    let divSelect = e.target.closest('div.definedTask');
    let objectSelect = divSelect.id.substring(11);

    let count = 0;
    object.forEach((e) => {
            if (e[3] == objectSelect) {
                delete object[count];
            }
        count++
    });
    count = 0;

    let object1 = [];

    object.forEach((e) => {
        if (e != undefined) {
            object1[count] = e;
            count ++;
        }
    })
    count = 0;

    object = object1;

    const mainPull = document.getElementById('main');
    const activeLoad = mainPull.getElementsByTagName('h2')[0].textContent;

    createNewFilter()
    loadPage(activeLoad);
    
    divSelect.remove();
}

export const replaceFromList = (task, category, date, count) => {
    for (let i = 0; i<object.length; i++) {
        if(object[i] = null)
        {
            object[i] = [task, category, date, count];
        }
    }

}

export const pullFilterList = () => {                      // Return only categories, filterd alphapetically (intended for nav)
    let tempArray = [];

    const list = document.createElement('div');

    object.sort(function(a, b) {
        var textA = a[0].toUpperCase();
        var textB = b[0].toUpperCase();
        return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
    });

    object.sort(function(a, b) {
        var textA = a[1].toUpperCase();
        var textB = b[1].toUpperCase();
        return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
    });

    list.classList.add('taskList');
    object.forEach((e) => {
        for (let i = 0; i < tempArray.length; i++) {
            if (e[1] == tempArray[i]) {
                return;
            }
        }
        list.appendChild(taskList(e,tempArray));
    });

    return list
}

const taskName = (e) => {
    const task = document.createElement('div');
    task.classList.add('checkbox');

    const taskCheckbox = document.createElement('input');
    taskCheckbox.setAttribute(`type`,`checkbox`);
    taskCheckbox.setAttribute(`id`,`object${e[3]}`);
    taskCheckbox.setAttribute(`name`,`object${e[3]}`);
    taskCheckbox.setAttribute(`value`,`${e[0]}`);

    const taskName = document.createElement('label');
    taskName.setAttribute(`for`,`object${e[3]}`)
    taskName.textContent = e[0];

    const taskCheck = document.createElement('span');
    taskCheck.classList.add('checkmark');

    taskName.appendChild(taskCheckbox);
    taskName.appendChild(taskCheck);
    task.appendChild(taskName);

    taskCheckbox.addEventListener("click", (e) => {
        let test = e.target.name.substring(6)
        if (e.target.checked) {
            e.target.setAttribute('checked','true');
            return addStrikethrough(test)
        }
        else {
            removeStrikethrough(test);
        }
    });

    return task;
}

export const addStrikethrough = (e) => {
    const strike = document.getElementById(`definedTask${e}`);
    strike.classList.add('strikethrough');
}

export const removeStrikethrough = (e) => {
    const strike = document.getElementById(`definedTask${e}`);
    strike.classList.remove('strikethrough');
}

const date = (e) => {
    const task = document.createElement('div');
    task.classList.add('date');

    const edit = new Image();
    edit.src = editIcon;


    const del = new Image();
    del.src = deleteIcon;

    const date = document.createElement('p');
    date.innerHTML = e[2];

    del.addEventListener("click", (e) => {
        return removeFromList(e);
    });

    edit.addEventListener("click", (u) => {
        return newTask(u,'edit',e);
    });


    task.appendChild(date);
    task.appendChild(edit);
    task.appendChild(del);

    return task;
}

const task = (e) => {
    const task = document.createElement('div');
    task.classList.add('definedTask');
    task.setAttribute(`id`,`definedTask${e[3]}`)
    task.appendChild(taskName(e));
    task.appendChild(date(e));
    return task;
}

const taskList = (e, tempArray) => {
    const task = document.createElement('div');
    task.classList.add('checkbox');

    const taskCheckbox = document.createElement('input');
    taskCheckbox.setAttribute(`type`,`checkbox`);
    taskCheckbox.setAttribute(`id`,`filterObject${e[3]}`);
    taskCheckbox.setAttribute(`name`,`filterObject${e[3]}`);
    taskCheckbox.setAttribute(`value`,`${e[1]}`);
    taskCheckbox.setAttribute(`checked`,`true`);

    const taskName = document.createElement('label');
    taskName.setAttribute(`for`,`filterObject${e[3]}`)
    taskName.textContent = e[1];

    const taskCheck = document.createElement('span');
    taskCheck.classList.add('checkmark');

    taskName.appendChild(taskCheckbox);
    taskName.appendChild(taskCheck);
    task.appendChild(taskName);

    taskCheckbox.addEventListener("click", (e) => {
        setFilter(e);
    });

    tempArray.push(e[1]);

    return task
}

const setFilter = (e) => {
    const body = document.getElementById('main');
    const bodyHolder = body.querySelector(('div'))
    bodyHolder.textContent = '';
    bodyHolder.appendChild(pullFilter());
}

export const pullFilter = (u) => {                          // Return entire list of the object
                                                           // Add a checkbox pull for filtering
    let checkedFilters = [];
    const container = document.querySelector('.taskList');
    const filterValues = container.querySelectorAll('div.checkbox > label');
    filterValues.forEach((e) => {
        const test = e.querySelector('input')
        if (test.checked) return checkedFilters.push(e.textContent);
    });
    const list = document.createElement('div');
    list.classList.add('task');

    object.forEach((e) => {
        if (Object.keys(checkedFilters).length === 0) {
            if (u != undefined) {
                u.forEach((o) => {                      // Add the check boxes (pulled with 'u') to the load page and keep them cheked

                })
            }
            else {
                list.appendChild(task(e));
            }
            console.log('Here i am')
        }
        checkedFilters.forEach((u) => {
            if (e[1] == u) {
                console.log('am I in here???')
                list.appendChild(task(e));
            }
        })
    });

    console.log(list)
    return list
}