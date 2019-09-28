const $app = document.getElementById('app');
const $observe = document.getElementById('observe');
const API = 'https://rickandmortyapi.com/api/character/';

const getData = api => {
  fetch(api)//window.fetch
    .then(response => response.json())
    .then(response => {
      // debugger
      const characters = response.results;
      const next_fetch = localStorage.setItem('nextData',response.info.next); //Primer problema
      // debugger
      const next_data = localStorage.getItem('nextData');
      let output = characters.map(character => { //función
        return `
      <article class="Card">
        <img src="${character.image}" />
        <h2>${character.id}<span>${character.name}</span><span>${character.species}</span></h2>
      </article>
    `
      }).join('');
      let newItem = document.createElement('section');
      newItem.classList.add('Items');
      newItem.innerHTML = output;
      $app.appendChild(newItem);
    })
    .catch(error => console.log(error));
}

const loadData = () => {
  getData(API);
}

const intersectionObserver = new IntersectionObserver(entries => {
  if (entries[0].isIntersecting) {
    loadData();
  }
}, {
  rootMargin: '0px 0px 100% 0px',
});

intersectionObserver.observe($observe);

