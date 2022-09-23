import {newTask} from './add-task';
import deleteIcon from './images/delete.svg';
import editIcon from './images/edit.svg';

let object = [];                                           // Global storage of all lists in this module

export const addToFilter = (task, category, date, num) => {     // Add to the list of tasks; include category and date

    let array = [task, category, date, num];

    object.push(array);
}

export const removeFromList = (e) => {
    let divSelect
    divSelect = e.target.closest('div.definedTask');
    console.log(divSelect);
    console.log(object)
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

    console.log(e)
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
        if (e.target.checked) return addStrikethrough(test);
        removeStrikethrough(test);
    });

    return task;
}

const addStrikethrough = (e) => {
    const strike = document.getElementById(`definedTask${e}`);
    strike.classList.add('strikethrough');
}

const removeStrikethrough = (e) => {
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
        console.log('delete');
        return removeFromList(e);
    });

    edit.addEventListener("click", (u) => {
        console.log('edit');
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

export const pullFilter = (e) => {                          // Return entire list of the object
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
            list.appendChild(task(e));
        }
        checkedFilters.forEach((u) => {
            if (e[1] == u) {
                list.appendChild(task(e));
            }
        })
    });

    return list
}