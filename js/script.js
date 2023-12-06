let carregarPoke = 12
const POKEAPI = "https://pokeapi.co/api/v2/pokemon/";

function loadPokemons() {
  let carregarPoke = document.getElementById("carregar").value
}

const GetApi = function () {

  fetch(`${POKEAPI}` + `?limit=${carregarPoke}`).then(response => {
    const PokeList = response.json().then(container => {
      console.log(container.results)

      const divpokeContent = document.getElementById("Poke-content")

      container.results.map(poke => {
        fetch(poke['url']).then(response => {
          response.json().then(data => {
            // console.log(data.src)
            const createcard = document.createElement("div")
            const createimgcard = document.createElement("div")
            const PokeImg = document.createElement("img")
            const PokeName = document.createElement("h4")
            const details = document.createElement("button")
            PokeImg.classList.add("poke-size")


            PokeImg.src = data.sprites.other["official-artwork"]['front_default']
            PokeName.innerHTML = data['name']
            details.innerHTML = "Detalhes"
            details.id = "mostra-poke-details"
            details.value = data['id']
            console.log(details.value)

            createimgcard.appendChild(PokeImg)
            createcard.appendChild(createimgcard)
            createcard.appendChild(PokeName)
            createcard.appendChild(details)

            details.addEventListener("click", function (event) {
              const modal = document.querySelector('.modal')
              modal.style.display = "block"
              fetch(`${POKEAPI}` + `?limit=${carregarPoke}`).then(async (response) => {

                // let inputId = document.getElementById("idpokemon").value
                let imagemPokemon = document.getElementById("pokeImg")
                let nomePokemon = document.getElementById("nomePoke")
                let idPokemon = document.getElementById("PokeId")
                let buttonValue = details.value
                let altura = document.getElementById("PokeHeight")
                let peso = document.getElementById("PokeWeight")
                let categoria = document.getElementById("PokeCategory")
                let Habilidade = document.getElementById("PokeAbilitie")
                const erro = document.querySelector(".erro")
                erro.innerHTML = ""
                console.log(buttonValue)


                const lista = response.json().then((container) => {

                  console.log(container.results)

                  const pokemon = container.results

                  fetch(pokemon[buttonValue - 1]['url']).then(response => {
                    let createPokeList = document.getElementById("poke-list")

                    response.json().then(PokeInf => {
                      nomePokemon.innerHTML = 'Nome: ' + PokeInf['name']
                      console.log(PokeInf)
                      idPokemon.innerHTML = "Id: " + PokeInf['id']
                      imagemPokemon.style.height = ""
                      imagemPokemon.src = PokeInf['sprites']
                      ['other']["official-artwork"]
                      // ['versions']['generation-v']
                      // ['black-white']['animated']
                      ['front_default']
                      altura.innerHTML = "Altura: " + PokeInf['height'] + "cm"
                      peso.innerHTML = "Peso: " + PokeInf['weight'] + "g"
                      categoria.innerHTML = "Categoria: " + PokeInf['types']['0']['type']['name']
                      console.log(PokeInf['types'][0])
                      createPokeList.value = PokeInf['id']

                    })
                  })

                })
                console.log(nomePokemon)
              })
            }, false)

            createcard.classList.add("each-poke")
            createimgcard.classList.add("bck-imgCard")
            divpokeContent.appendChild(createcard)

            PokeImg.style.width = "15vw"

          })
        })
      })
    })
  })
}

GetApi()

function closeModal() {
  const modal = document.querySelector('.modal')
  modal.style.display = "none"
}

const pokeArray = []
const secPokeArray = []
let qtdPokemonsLista = 0;

function gerarLista() {

  const ListaPokemon = document.getElementById("poke-list")
  const barraLateral = document.querySelector('.side-bar')
  const listaBarra = document.querySelector(".side-bar-content")

  barraLateral.style.display = "block"

  fetch(`${POKEAPI}` + `?limit=${carregarPoke}`).then(async (response) => {

    const lista = response.json().then(async (container) => {

      const criarSidePokemon = document.createElement("img")
      const SidePokemonContent = document.createElement("div")
      const SidePokemonName = document.createElement("p")
      const pokemon = container.results

      fetch(pokemon[ListaPokemon.value - 1]['url']).then(response => {

        response.json().then(PokeInf => {

          let novo = pokeArray.filter((este, i, pokeArray) => pokeArray.indexOf(este) === i)


          novo.push(PokeInf['id'])

          console.log(novo)

          if (verificarPokemonadicionado(novo)) {

            exibirerro(qtdPokemonsLista)

          }
          else {
            if (qtdPokemonsLista >= 6) {
              exibirerro(qtdPokemonsLista)

            }
            else {
              pokeArray.push(PokeInf['id'])

              criarSidePokemon.src = PokeInf['sprites']
              ['other']["official-artwork"]
              // ['versions']['generation-v']
              // ['black-white']['animated']
              ['front_default']
              criarSidePokemon.style.width = "3.7vw"
              SidePokemonName.innerHTML = PokeInf['name']

              SidePokemonContent.appendChild(criarSidePokemon)
              SidePokemonContent.appendChild(SidePokemonName)
              listaBarra.appendChild(SidePokemonContent)
              SidePokemonContent.classList.add("each-side-poke")
              criarSidePokemon.classList.add("each-side-pokemon-size")
              

              qtdPokemonsLista++;

            }

          }

        })
      })

    })

  })
}

function verificarPokemonadicionado(array) {
  return (new Set(array)).size !== array.length;

}

const exibirerro = function (quantidade) {
  const mensagem = document.querySelector(".erro")
  mensagem.style.display = "block"
  if (quantidade >= 6) {
    mensagem.innerHTML = "O tamanho maximo da lista foi alcançado"
  }
  else {
    mensagem.innerHTML = "Este Pokemon já está na lista!"
  }

}






