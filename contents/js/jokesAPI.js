const joukList = document.getElementById("jouk-list");

const fetchData = async () => {
  try {
    const response = await fetch(
      "https://official-joke-api.appspot.com/jokes/ten"
    );
    if (!response.ok) {
        throw new Error("Что-то с запросом!");
    }
    
    const jokes = await response.json();
    console.log("🚀 ~ fetchData ~ response:", jokes)

    displayJouks(jokes);
  } catch (error) {
    console.error("Ошибка при загрузке данных", error);
    joukList.innerHTML = `<li>Error loading data: ${error.message}</li>`;
  }
};

const displayJouks = (jokes) => {
  const jokesHTML = jokes
    .map((joke) => {
      return `
      <div  class="card m-3" style="width: 18rem;">
      
      <ul  class="list-group list-group-flush text-primary " >
           <li class="list-group-item list-group-item-primary ">Number Joke: ${joke.id}</li>
           <li class="list-group-item ">Type: ${joke.type}</li>
           <li id="setup" class="list-group-item ">- ${joke.setup}</li>
           <li id="punchline" class="list-group-item ">- ${joke.punchline}</li>
         </ul>
      </div>

         `;
    })
    .join("");
  joukList.innerHTML = jokesHTML;
};

fetchData();
