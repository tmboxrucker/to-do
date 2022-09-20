import {pullFilter} from './filter.js'

const createPage = (type) => {
    const main = document.createElement('div');
    main.classList.add('main');

    

    main.appendChild(addTask);
    main.appendChild(title);
    main.appendChild(pullFilter());

    return main;
}

const taskButton = () => {
    const addTask = document.createElement('button');
    addTask.classList.add('addTask');
    addTask.innerHTML = `Add Task`;

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
    body.appendChild(taskButton());
    body.appendChild(titleFilter(type));
    body.appendChild(pullFilter());
}