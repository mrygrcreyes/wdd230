'use strict';

const linkBox = document.getElementById('card-1');

const baseUrl = 'https://mrygrcreyes.github.io/wdd230/';
const linksUrl = 'https://mrygrcreyes.github.io/wdd230/data/links.json';

const getLinks = async function () {
    const response = await fetch(linksUrl);
    const data = await response.json();
    displayLinks(data.weeks);
}

const displayLinks = function (data) {
    for (let index = 0; index < data.length; index++) {
        let listEl = document.createElement('li');

        listEl.innerHTML = `${data[index].week}: `;
        data[index].links.forEach((link, i) => {
            let linkEl = document.createElement('a');
            linkEl.href = link.url;
            linkEl.title = link.title;
            linkEl.innerHTML = link.title;
            linkEl.target = '_blank';

            listEl.appendChild(linkEl)
        });

        linkBox.appendChild(listEl);
    }
};

getLinks();