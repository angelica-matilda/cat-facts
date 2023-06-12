const btnFact = document.getElementById("btn-fact")
const displayFact = document.getElementById("display-fact")
const btnBreed = document.getElementById("btn-breed")
const displayBreedTitle = document.getElementById("display-breed-title")
const displayBreedDetails = document.getElementById("display-breed-details")
const aside = document.getElementById("aside")

// Här hämtar vi ett slumpmässig kattfakta
btnFact.addEventListener("click", getRandomFact)
function getRandomFact() {
  fetch("https://catfact.ninja/fact?max_length=300")
    .then((response) => {
      return response.json()
    })
    .then((data) => {

      const wrapperFact = document.createElement("section")

      wrapperFact.style = 'display: block';

      // Första gången rutan skrivs ut finns ingen ruta att ta bort, så då gör koden ingenting.
      // När  man kör funktionen igen så försvinner den gamla faktarutan med hjälp av denna kod.
      for (let wrapper of document.getElementsByClassName('display-fact')) {
        wrapper.remove()
      }
      // Här lägger vi till en ny faktaruta
      aside.appendChild(wrapperFact)
      wrapperFact.classList.add('display-fact')

      // Här skapar vi en knapp för att kunna stänga ner faktarutan.
      const factClose = document.createElement("button")
      factClose.innerText = 'x'
      // Tar bort faktarutan vid klick
      factClose.addEventListener('click', () => {
        wrapperFact.remove()
      })
      // Här lägger vi i faktaparagrafen och knappen inuti faktarutan
      const displayFact = document.createElement("p")
      wrapperFact.append(factClose, displayFact)
      // Här lägger vi till datan inuti p-elementet
      displayFact.innerText = data.fact
    })
}

// Här hämtar vi en slumpmässig kattras
btnBreed.addEventListener("click", getRandomBreed)
function getRandomBreed() {
  // Här lägger vi till flex för att synliggöra faktarutan då det tidigare är display:none.
  document.getElementById('wrapper').style.display = 'flex';
  btnBreed.innerText = 'Find me a new cat!';
  let randomPage = Math.floor(Math.random() * 4) + 1
  // Här lägger vi till text som vi inte vill visa från början
  document.getElementById('funny-comment1').innerText = "Oh, that's the purrrfect one..."
  document.getElementById('funny-comment2').innerText = "..or is it..?"

  fetch(`https://catfact.ninja/breeds?page=${randomPage}`)
    .then((response) => {
      return response.json()
    })
    .then((jsData) => {
      let randomNumber = Math.floor(Math.random() * jsData.data.length)

      // Visar titel på kattras
      displayBreedTitle.innerText = jsData.data[randomNumber].breed

      // Nollställer elementet vid varje klick
      displayBreedDetails.innerHTML = ''

      // Cat tar in hela objektet för en katt
      let cat = jsData.data[randomNumber]
      for (let key in cat) {
        let value = cat[key]
        if (value === '') {
        } else if (key === 'breed') {
        } else {
          displayBreedDetails.innerHTML += `<li class="cat-property">${key}: ${value}</li>`
        }
      }
    })
}