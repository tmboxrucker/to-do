let object = [];                                           // Global storage of all lists in this module

export const addToFilter = (task, category, date) => {     // Add to the list of tasks; include category and date

    let array = [task, category, date];

    object.push(array);
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
    const taskName = document.createElement('p');
    taskName.textContent = e[0];
    return taskName;
}

const date = (e) => {
    const date = document.createElement('p');
    date.innerHTML = e[2];
    return date;
}

const task = (e) => {
    const task = document.createElement('div');
    task.appendChild(taskName(e));
    task.appendChild(date(e));
    return task;
}

const taskList = (e, tempArray) => {
    const taskList = document.createElement('h3');
    taskList.innerHTML = e[1];
    tempArray.push(e[1]);
    return taskList;
}

export const pullFilter = () => {                          // Return entire list of the object
                                                           // Add a checkbox pull for filtering
    const list = document.createElement('div');
    list.classList.add('task');

    object.forEach((e) => {
        if (e[1] == 'Chores') {                            // Temporarily chores, will have to pull selected from checkboxes
            list.appendChild(task(e));
        }
    });

    return list
}