import {addToFilter} from './filter.js';
import {pullFilterList} from './filter.js';
import {loadPage} from './main-page.js';

const createHeader = () => {
    const headerElement = document.createElement('div');
    headerElement.classList.add(`header`);

    const titleElement = document.createElement('h1');
    titleElement.classList.add(`title`);
    titleElement.innerHTML = `Todo List`;

    headerElement.appendChild(titleElement);

    return headerElement;
}

const createBody = () => {
    const bodyElement = document.createElement('div');
    bodyElement.classList.add('body');

    bodyElement.appendChild(createNav());
    bodyElement.appendChild(createMain());

    return bodyElement;
}

const createNav = () => {
    const navPanel = document.createElement('div');
    navPanel.classList.add('nav');

    const home = document.createElement('h2');
    const today = document.createElement('h2');
    const week = document.createElement('h2');
    const filter = document.createElement('div');

    home.classList.add('home', 'navSelection', 'active');
    today.classList.add('today', 'navSelection');
    week.classList.add('week', 'navSelection');
    filter.classList.add('filter');

    filter.setAttribute('id','filterNav')

    home.innerHTML = `Home`;
    today.innerHTML = `Today`;
    week.innerHTML = `Week`;

    home.addEventListener("click", (e) => {
        if (e.target.classList.contains('active')) return;
        setActiveNav(home);
        loadPage('Home');
    });
    today.addEventListener("click", (e) => {
        if (e.target.classList.contains('active')) return;
        setActiveNav(today);
        loadPage('Today');
    });
    week.addEventListener("click", (e) => {
        if (e.target.classList.contains('active')) return;
        setActiveNav(week);
        loadPage('Week');
    });

    navPanel.appendChild(home);
    navPanel.appendChild(today);
    navPanel.appendChild(week);
    navPanel.appendChild(createFilter(filter));

    return navPanel;
}

const createFilter = (filter) => {
    console.log(filter)
    filter.innerHTML = '';
    const filterTitle = document.createElement('h2');
    filterTitle.innerHTML = `Filter`;
    filter.appendChild(filterTitle);
    filter.appendChild(pullFilterList());

    return filter
}

export const createNewFilter = () => {
    const filterNav = document.getElementById('filterNav');
    createFilter(filterNav);
}

const createMain = () => {
    const mainBody = document.createElement('div');
    mainBody.setAttribute('id', 'main')

    return mainBody;
}

const createFooter = () => {
    const footerElement = document.createElement('div');

    footerElement.classList.add(`footer`);

    footerElement.innerHTML = 'Page made by Troy Boxrucker 2022';

    return footerElement;
}

const setActiveNav = (e) => {
    const nav = document.querySelectorAll('.navSelection');

    nav.forEach((e) => {
        if (e != this) {
            e.classList.remove('active');
        }
    });
    e.classList.add('active');
}

const initializeFilterList = () => {                        // initialize a list of To-Dos to show on screen
    addToFilter('Wash Dishes', 'Chores', '2022-09-22','new',false);
    addToFilter('Take out trash', 'Chores', '2022-09-27','new',true);
    addToFilter('Take out trash1', 'Chores', '2022-09-28','new',true);
    addToFilter('Take out trash2', 'Chores', '2022-09-27','new',true);
    addToFilter('Milk', 'Shopping', '2022-09-26','new',false);
    addToFilter('Bread', 'Shopping', '2022-09-26','new',false);
}

export const initialPageLoad = (title) => {
    const elem = document.getElementById('content');
    initializeFilterList();

    elem.appendChild(createHeader());
    elem.appendChild(createBody());
    elem.appendChild(createFooter());

    setActiveNav(document.querySelector('.nav'));
    loadPage(title);
}