// Fetch data from JSON
async function fetchData() {
  try {
    const response = await fetch('artifact_api.json');
    const data = await response.json();
    console.log("Fetched data:", data);
    return data;
  } catch (error) {
    console.error("Error loading JSON:", error);
    return {};
  }
}

 //Search on enter press
const searchButton=document.getElementById('searchBtn');

  searchButton.onclick = searchKeyword;
document.addEventListener('keydown', function(event) {
   if (event.key === 'Enter') {
     searchKeyword();
   }
});

// Search Function
async function searchKeyword() {
  const keyword = document.getElementById('searchInput').value.toLowerCase().trim();
  const resultsContainer = document.getElementById('results');
  resultsContainer.innerHTML = '';

  if (!keyword) {
    resultsContainer.innerHTML = "<p>Please enter a keyword.</p>";
    return;
  }

  const data = await fetchData();
  const matchedResults = [];

  // Planet Search
  data.planets.forEach(planet => {
    if (planet.name.toLowerCase().includes(keyword)) {
      planet.biomes.forEach(biome => matchedResults.push({
        name: biome.name,
        imageUrl: biome.imageUrl,
        description: biome.description
      }));
    } else {
      planet.biomes.forEach(biome => {
        if (biome.name.toLowerCase().includes(keyword) || biome.description.toLowerCase().includes(keyword)) {
          matchedResults.push({
            name: biome.name,
            imageUrl: biome.imageUrl,
            description: biome.description
          });
        }
      });
    }
  });

  // Biome Search
  if (keyword.includes("biomes") || keyword === "biomes") {
    data.biomes.forEach(biome => matchedResults.push({
      name: biome.name,
      imageUrl: beiome.imageUrl,
      description: biome.description
    }));
  } else {
    data.biomes.forEach(temple => {
      if (biome.name.toLowerCase().includes(keyword)) {
        matchedResults.push({
        name: biome.name,
        imageUrl: biome.imageUrl,
        description: biome.description
        });
      }
    });
  }

  // Services Search
  if (keyword.includes("services") || keyword === "services") {
    data.services.forEach(service => matchedResults.push({
      name: service.name,
      imageUrl: service.imageUrl,
      description: service.description
    }));
  } else {
    data.services.forEach(service => {
      if (service.name.toLowerCase().includes(keyword)) {
        matchedResults.push({
          name: service.name,
          imageUrl: service.imageUrl,
          description: service.description
        });
      }
    });
  }

  // Items search
  if (keyword.includes("items") || keyword === "items") {
    data.items.forEach(item => matchedResults.push({
      name: item.name,
      imageUrl: item.imageUrl,
      description: item.description
    }));
  } else {
    data.items.forEach(item => {
      if (item.name.toLowerCase().includes(keyword)) {
        matchedResults.push({
          name: item.name,
          imageUrl: item.imageUrl,
          description: item.description
        });
      }
    });
  }
  // Display Results
  if (matchedResults.length === 0) {
    resultsContainer.innerHTML = "<p>No results found.</p>";
    return;
  }

  matchedResults.forEach(place => {
    const card = document.createElement('div');
    card.classList.add('card');
    card.innerHTML = `
      <h3>${place.name}</h3>
      <img src="${place.imageUrl}" width="300" alt="${place.name}">
      <p>${place.description}</p>
    `;
    resultsContainer.appendChild(card);
  });
}

// Clear Button Function
function clearResults() {
  document.getElementById('searchInput').value = '';
  document.getElementById('results').innerHTML = '';
}
