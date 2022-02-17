/*!
* Start Bootstrap - Small Business v5.0.4 (https://startbootstrap.com/template/small-business)
* Copyright 2013-2021 Start Bootstrap
* Licensed under MIT (https://github.com/StartBootstrap/startbootstrap-small-business/blob/master/LICENSE)
*/
// This file is intentionally blank
// Use this file to add JavaScript to your project

//conexao com o solidity


// ENDEREÇO EHTEREUM DO CONTRATO
var contractAddress = "0x164362D5859CEFe37FccF0883a5Ccf03b50acE9F";

document.addEventListener('DOMContentLoaded', onDocumentLoad);
function onDocumentLoad() {
  DApp.init();
}

const DApp = {
  web3: null,
  contracts: {},
  account: null,


  init: function () {
    return DApp.initWeb3();
  },

  initWeb3: async function () {
    if (typeof window.ethereum !== 'undefined') {

      try {
        // Request account access if needed
        const accounts = await window.ethereum.request({
          method: 'eth_requestAccounts',
        });
        // Accounts now exposed, use them
        DApp.account = accounts[0];

        ethereum.autoRefreshOnNetworkChange = false;
        // When user changes to another account,
        // trigger necessary updates within DApp
        window.ethereum.on('accountsChanged', DApp.updateAccounts);
      } catch (error) {
        // User denied account access
        console.error('User denied web3 access');
        return;
      }
      DApp.web3 = new Web3(window.ethereum);
    }
    else if (window.web3) {
      // Deprecated web3 provider
      DApp.web3 = new Web3(web3.currentProvider);
      // no need to ask for permission
    }
    // No web3 provider
    else {
      console.error('No web3 provider detected');
      return;
    }
    return DApp.initContract();
  },

  updateAccounts: async function () {
    DApp.account = (await DApp.web3.eth.getAccounts())[0];
    atualizaInterface();
  },

  initContract: async function () {
    let networkId = await DApp.web3.eth.net.getId();
    console.log('networkId', networkId);

    let deployedNetwork = Pokard.networks[networkId];
    if (!deployedNetwork) {
      console.error('No contract deployed on the network that you are connected. Please switch networks.');
      return;
    }
    console.log('deployedNetwork', deployedNetwork);

    DApp.contracts.Pokard = new DApp.web3.eth.Contract(
      mySmartContractArtefact.abi,
      deployedNetwork.address,
    );
    console.log('Election', DApp.contracts.Pokard);

    return DApp.render();
  },



  // Associa ao endereço do seu contrato
  initContract: async function () {
    DApp.contracts.Pokard = new DApp.web3.eth.Contract(abi, contractAddress);
    
  },

};

// *** MÉTODOS (de consulta - view) DO CONTRATO ** //

function retornarPokemonsComprados() {
  return DApp.contracts.Pokard.methods.retornaPokemonsComprados().call({ from: DApp.account });
}

function mostrarPokemonsMercado() {
  return DApp.contracts.Pokard.methods.mostrarPokemonsMercado().call({ from: DApp.account });
}

// *** MÉTODOS (de escrita) DO CONTRATO ** //

function comprarCarta(numCartas) {
  console.log("comprar carta:" + numCartas)
  console.log(DApp.account)
  let preco = 100000000000000000 * numCartas;
  console.log(preco)
  return DApp.contracts.Pokard.methods.comprarCarta(numCartas).send({ from: DApp.account, value: preco }).then();
}


function comprarPokemonMercado(idCarta){
  return DApp.contracts.Pokard.methods.comprarCarta(idCarta).send({ from: DApp.account, value: idCarta }).then();
}


function colocarPokemonAvenda(idCarta) {
  //let idCarta = document.getElementById("idCarta").value;
  var preco = document.getElementById("preco-" + idCarta).value;
  console.log("a venda!");
  console.log(preco)


  return DApp.contracts.Pokard.methods.colocarPokemonAvenda(idCarta, preco).send({ from: DApp.account }).then();;
}


// *** ATUALIZAÇÃO DO HTML *** //


// =============== API ================== //

const baseUrl = 'https://pokeapi.co/api/v2/pokemon/';
var pokemonApi;

function requestPokeInfo(url, name, pokemon, interface) {
  pokemonApi = {};
  fetch(url + name)
    .then(response => response.json())
    .then(data => {
      pokemonApi = data;
      var div = document.getElementById(interface);
      div.innerHTML += gerarInterfaceCard(pokemonApi, pokemon,interface);
    })
    .catch(err => console.log(err));
}

// =============== INVENTARIO ================
function atualizaInterfaceInventario() {
  setTimeout(() => {
    retornarPokemonsComprados().then((result) => {
      console.log(result)
      for (var i = 0; i < result.length; i++) {
        var pokemon = {}
        pokemon.idCarta = result[i].idCarta;
        pokemon.idPokemon = result[i].idPokemon;
        pokemon.ataque = result[i].ataque;
        pokemon.defesa = result[i].defesa;
        pokemon.preco = result[i].preco;
        criarCard(pokemon, "inventario");
      }
    });
  }, 1000)

};



function criarCard(pokemon, interface) {
  if(pokemon.idPokemon>0){
  requestPokeInfo(baseUrl, pokemon.idPokemon, pokemon, interface)
  }
}

function gerarInterfaceCard(pokemonApi, pokemon, interface) {
  if (interface === "inventario") {
    return gerarCardInventario(pokemonApi, pokemon);
  } else if (interface === "mercado") {
    return gerarCardMercado(pokemonApi, pokemon)
  }
}

function gerarCardMercado(pokemonApi, pokemon) {
  var card = `
  <div class="col mb-5">
  <div class="card h-100">
      <img class="card-img-top" src="${pokemonApi.sprites.front_default}" />
      <div class="card-body p-4">
          <div class="text-center">
              <h5 class="fw-bolder" id="idCarta">ID Carta: ${pokemon.idCarta}</h5>
          </div>
          <div class="text-center">
              <h5 class="fw-bolder">Nº Pokemon: ${pokemon.idPokemon}</h5>
          </div>
          <div class="text-center">
              <h5 class="fw-bolder">Nome: ${pokemonApi.name}</h5>
          </div>
          <div class="text-center">
              <h5 class="fw-bolder">Ataque: ${pokemon.ataque}</h5>
          </div>
          <div class="text-center">
              <h5 class="fw-bolder">Defesa: ${pokemon.defesa}</h5>
          </div>
          <div class="text-center">
              <h5 class="fw-bolder">Tipo: ${pokemonApi.types.map(item => item.type.name).toString()}</h5>
          </div>
          <div class="text-center">
              <h5 class="fw-bolder">Preço: ${pokemon.preco} wei</h5>
          </div>
      </div>
      <div class="card-footer p-4 pt-0 border-top-0 bg-transparent">
          <div class="text-center" onclick="comprarPokemonMercado(${pokemon.idCarta})"><a class="btn btn-outline-dark mt-auto"
                  href="#">Comprar</a></div>
      </div>
  </div>
</div>
    `
  return card
}

function gerarCardInventario(pokemonApi, pokemon) {

  var card = `
  <div class="col mb-5">
  <div class="card h-100">
      <img class="card-img-top" src="${pokemonApi.sprites.front_default}" />
      <div class="card-body p-4">
          <div class="text-center">
              <h5 class="fw-bolder" id="idCarta">ID Carta: ${pokemon.idCarta}</h5>
          </div>
          <div class="text-center">
              <h5 class="fw-bolder">Nº Pokemon: ${pokemon.idPokemon}</h5>
          </div>
          <div class="text-center">
              <h5 class="fw-bolder">Nome: ${pokemonApi.name}</h5>
          </div>
          <div class="text-center">
              <h5 class="fw-bolder">Ataque: ${pokemon.ataque}</h5>
          </div>
          <div class="text-center">
              <h5 class="fw-bolder">Defesa: ${pokemon.defesa}</h5>
          </div>
          <div class="text-center">
              <h5 class="fw-bolder">Tipo: ${pokemonApi.types.map(item => item.type.name).toString()}</h5>
          </div>
      </div>
      <div class="card-footer p-4 pt-0 border-top-0 bg-transparent">
          <div class="input-group mb-3">
              <input type="number" id="preco-${pokemon.idCarta}" class="form-control" aria-label="preço">
          </div>
          <div class="text-center" onclick="colocarPokemonAvenda(${pokemon.idCarta})"><a
                  class="btn btn-outline-dark mt-auto" href="#">Vender</a></div>
      </div>
  </div>
</div>
    `
  return card
}

function atualizaInterfaceMercado() {

  setTimeout(() => {
    mostrarPokemonsMercado().then((result) => {
      console.log(result)
      for (var i = 0; i < result.length; i++) {
        var pokemon = {}
        pokemon.idCarta = result[i].idCarta;
        pokemon.idPokemon = result[i].idPokemon;
        pokemon.ataque = result[i].ataque;
        pokemon.defesa = result[i].defesa;
        pokemon.preco = result[i].preco;
        criarCard(pokemon, "mercado");
      }
    });
  }, 1000)
};



