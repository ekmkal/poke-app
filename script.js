'use strict'

function main() {
    // Creating button element
    const buttonDiv = document.createElement('div');
    const button = document.createElement('button');
    button.style.padding = '1rem';
    button.style.fontSize = '1.5rem';
    button.innerHTML = 'Get Pokemon!'
    buttonDiv.appendChild(button);
    document.body.appendChild(buttonDiv);

    // Creating select element
    const selectDiv = document.createElement('div');
    selectDiv.style.marginTop = '1rem'
    const select = document.createElement('select');
    select.style.minWidth = '10rem';
    select.style.minHeight = '2rem';
    selectDiv.appendChild(select);
    document.body.appendChild(selectDiv);

    // Creating image element
    const imgDiv = document.createElement('div');
    const pokeImg = document.createElement('img');
    pokeImg.style.width = '10rem'
    imgDiv.appendChild(pokeImg);
    document.body.appendChild(imgDiv);

    // fetchData function returns data
    function fetchData(url) {
        return fetch(url)
        .then(response => response.json())
        .then(data => {
            return data;
        })
        .catch(err => console.error(err));
    };

    // addPokemonToDOM function
    function addPokemonToDOM() {
        const pokeUrl = 'https://pokeapi.co/api/v2/pokemon?limit=150&offset=0';

        fetchData(pokeUrl)
        // Getting first 150 pokemons list
        .then(data => data.results)
        // Putting pokemons' names as options in select element 
        .then(pokeList => {
            pokeList.forEach(poke => {
                const opt = document.createElement('option');
                opt.innerText = poke.name;
                select.appendChild(opt);
            });

            // Getting the picture of chosen pokemon's image
            select.addEventListener('change', (event) => {
                const selectedPokeName = event.target.value;

                // Finding the chosen pokemon's data
                const selectedPoke = pokeList.filter(poke => {
                    if (poke.name === selectedPokeName) {
                        return poke;
                    };
                });

                const selectedPokeUrl = selectedPoke[0].url;

                fetchData(selectedPokeUrl)
                .then(data => {
                    const imageUrl = data.sprites.front_default;
                    pokeImg.src = imageUrl;
                });
            });
        });
    };
    
    button.addEventListener('click', addPokemonToDOM);
};

window.addEventListener('load', main);