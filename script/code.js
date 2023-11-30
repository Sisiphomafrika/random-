
let peopleData = [];

// Fetch data from the provided link
fetch('https://randomuser.me/api?results=50')
  .then(response => response.json())
  .then(data => {
    peopleData = data.results;
    displayPeople(peopleData);
  })
  .catch(error => console.error('Error fetching data:', error));

function displayPeople(people) {
  const listElement = document.getElementById('peopleList');
  listElement.innerHTML = '';

  people.forEach(person => {
    const listItem = document.createElement('li');
    listItem.textContent = `${person.name.first} ${person.name.last}`;
    listElement.appendChild(listItem);
  });
}

function searchPeople() {
  const searchInput = document.getElementById('searchInput').value.toLowerCase();
  const filteredPeople = peopleData.filter(person =>
    person.name.first.toLowerCase().includes(searchInput)
  );

  if (searchInput === '') {
    displayPeople(peopleData);
    hideNotFoundMessage();
  } else if (filteredPeople.length > 0) {
    displayPeople(filteredPeople);
    hideNotFoundMessage();
  } else {
    displayPeople([]);
    showNotFoundMessage();
  }
}

function showNotFoundMessage() {
  document.getElementById('notFoundMessage').textContent = 'Name not found.';
}

function hideNotFoundMessage() {
  document.getElementById('notFoundMessage').textContent = '';
}

let ascendingOrder = true;

function toggleSort() {
  const sortedPeople = [...peopleData];
  sortedPeople.sort((a, b) => {
    const nameA = a.name.first.toLowerCase();
    const nameB = b.name.first.toLowerCase();
    return ascendingOrder ? nameA.localeCompare(nameB) : nameB.localeCompare(nameA);
  });

  ascendingOrder = !ascendingOrder;
  displayPeople(sortedPeople);
}