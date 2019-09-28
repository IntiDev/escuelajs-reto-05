const $app = document.getElementById('app');
const $observe = document.getElementById('observe');
const API = 'https://us-central1-escuelajs-api.cloudfunctions.net/characters';
// const API = 'https://rickandmortyapi.com/api/character/';

window.onload = localStorage.clear();

const getData = api => {
  fetch(api)
    .then(response => response.json())
    .then(response => {
      const characters = response.results;
      localStorage.setItem('nextData',response.info.next);
      let output = characters.map(character => {
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

  const loadData = async () => {
    if(localStorage.getItem('nextData') === null){
      return await getData(API);
    }
    else if(localStorage.getItem('nextData') === ''){
      let messageContainer = document.createElement('h2');
      messageContainer.innerHTML = 'Ya no hay personajes..';
      $app.appendChild(messageContainer);
      intersectionObserver.unobserve($observe);
    }
    else {
      let next_fetch = localStorage.getItem('nextData');
      return await getData(next_fetch);
    }
  }

  const intersectionObserver = new IntersectionObserver(entries => {
    if (entries[0].isIntersecting) {
      loadData();
    }
}, {
  rootMargin: '0px 0px 100% 0px',
});

intersectionObserver.observe($observe);
