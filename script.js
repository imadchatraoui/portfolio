function fetchPokemon() {
    const name = document.getElementById("name").value;

    fetch("https://pokeapi.co/api/v2/pokemon/" + name)
        .then(response => response.json())
        .then(data => {
            fetch(data.species.url)  
                .then(response => response.json())
                .then(speciesData => {
                    const description = speciesData.flavor_text_entries.find(entry => entry.language.name === "it").flavor_text;
                    
                    document.getElementById("root").innerHTML = 
                        "<h1>" + data.name + "</h1>" +
                        "<img src=" + data.sprites.front_default + ">" +
                        "<p>Height: " + data.height + "</p>" +
                        "<p>Weight: " + data.weight + "</p>" +
                        "<p>Description: " + description + "</p>";
                });
        });
}