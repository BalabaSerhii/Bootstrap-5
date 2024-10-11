const catsList = document.getElementById("cats-list");
const breedsList = document.getElementById("breeds-list");

const fetchData = async () => {
  try {
    const results = await Promise.allSettled([
      fetch("https://catfact.ninja/facts?limit=2"),
      fetch("https://catfact.ninja/breeds?limit=2"),
    ]);

    const factsResponse = results[0];
    const breedsResponse = results[1];

    if (factsResponse.status === "fulfilled") {
      const facts = await factsResponse.value.json();
      displayCatsFacts(facts);
    } else {
      console.error("Error loading facts", factsResponse.reason);
      catsList.innerHTML = `<li>Error loading cat facts: ${factsResponse.reason}</li>`;
    }

    if (breedsResponse.status === "fulfilled") {
      const breeds = await breedsResponse.value.json();
      displayCatsBreeds(breeds);
    } else {
      console.error("Error loading breeds", breedsResponse.reason);
      breedsList.innerHTML = `<li>Error loading cat breeds: ${breedsResponse.reason}</li>`;
    }
  } catch (error) {
    console.error("Error executing requests", error);
  }
};

const displayCatsFacts = (facts) => {
  const catsHTML = facts.data
    .map(({ fact, length }) => {
      return `
        <ul>
        <li class="list-group-item list-group-item-primary ">Fact: ${fact}</li>
        <li class="list-group-item list-group-item-primary ">Fact: you have read: ${length} characters</li>
        </ul>
        `;
    })
    .join("");
  catsList.innerHTML = catsHTML;
};
const displayCatsBreeds = (breeds) => {
  const breedsHTML = breeds.data
    .map(({ breed, country, origin, coat, pattern }) => {
      return `
        <ul>
        <li class="list-group-item list-group-item-primary ">Breed: ${breed}</li>
        <li class="list-group-item list-group-item-primary ">Country: ${country} </li>
        <li class="list-group-item list-group-item-primary ">Origin: ${origin} </li>
        <li class="list-group-item list-group-item-primary ">Coat: ${coat} </li>
        <li class="list-group-item list-group-item-primary ">Pattern: ${pattern} </li>
        </ul>
        `;
    })
    .join("");
  breedsList.innerHTML = breedsHTML;
};

fetchData();
