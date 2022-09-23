import {pullFilter} from './filter.js';
import addIcon from './images/addTask.svg';
import {newTask} from './add-task'

const createPage = (type) => {
    const main = document.createElement('div');
    main.classList.add('main');

    

    main.appendChild(addTask);
    main.appendChild(title);
    main.appendChild(pullFilter());

    return main;
}

const taskButton = () => {
    const addTask = document.createElement('div');
    addTask.classList.add('addTask');

    const addTaskListener = document.createElement('div');
    addTaskListener.classList.add('addTaskListener');

    const addTaskImage = new Image();
    addTaskImage.src = addIcon;

    const addTaskText = document.createElement('p');
    addTaskText.innerHTML = `Add Task`;

    addTask.appendChild(addTaskImage);
    addTask.appendChild(addTaskText);

    addTask.addEventListener("click", (e) => {
        console.log(addTask.closest('div>div'));
        console.log(e.target)
        return newTask(e);
    });
    return addTask;
}

const titleFilter = (type) => {
    const title = document.createElement('h2');
    title.classList.add(`${type}Main`);
    title.innerHTML = `${type}`;

    return title;
}

const createParagraph = (text) => {
    const paragraph = document.createElement('p');
    paragraph.textContent = text;
    return paragraph;
}

export const loadPage = (type) => {
    const body = document.getElementById('main');
    body.textContent = '';
    body.appendChild(titleFilter(type));
    body.appendChild(pullFilter());
    body.appendChild(taskButton());
}