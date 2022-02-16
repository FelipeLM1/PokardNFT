/*!
* Start Bootstrap - Small Business v5.0.4 (https://startbootstrap.com/template/small-business)
* Copyright 2013-2021 Start Bootstrap
* Licensed under MIT (https://github.com/StartBootstrap/startbootstrap-small-business/blob/master/LICENSE)
*/
// This file is intentionally blank
// Use this file to add JavaScript to your project

//conexao com o solidity


// ENDEREÇO EHTEREUM DO CONTRATO
var contractAddress = "0xdAC0bE8Cc2a8308315f9cf67DCce7dD27dD92Bf6";

document.addEventListener('DOMContentLoaded', onDocumentLoad);
function onDocumentLoad() {
  DApp.init();
}

const DApp = {
  web3: null,
  contracts: {},
  accounts: [],

 
  init: function() {
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
        DApp.updateAccounts(accounts);

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

  updateAccounts: async function(accounts) {
    const firstUpdate = !(DApp.accounts && DApp.accounts[0]);
    DApp.accounts = accounts || await DApp.web3.eth.getAccounts();
    console.log('updateAccounts', accounts[0]);
    if (!firstUpdate) {
      DApp.render();
    }
  },

  initContract: async function() {
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
    return DApp.render();
  },

  // Inicializa a interface HTML com os dados obtidos
  render: async function () {
    inicializaInterface();

  }
};

// *** MÉTODOS (de consulta - view) DO CONTRATO ** //


// *** MÉTODOS (de escrita) DO CONTRATO ** //

function comprarCarta(quant) {
  let preco = 100000000000000000 * quant;
  return DApp.contracts.Pokard.methods.comprarCarta(quant).send({ from: DApp.accounts, value: preco }).then(atualizaInterface);;
}


function ColocarPokemnonAvenda() {
  let idPokemon = document.getElementById("idPokemon").value;
  let preco = document.getElementById("preco").value;
  return DApp.contracts.Pokard.methods.ColocarPokemnonAvenda(idPokemon, preco).send({ from: DApp.accounts}).then(atualizaInterface);;
}


// *** ATUALIZAÇÃO DO HTML *** //

function inicializaInterface() {
    document.getElementById("btnComprar1").onclick = comprarCarta(1);
    document.getElementById("btnComprar2").onclick = comprarCarta(2);
    document.getElementById("btnComprar3").onclick = comprarCarta(3);
    document.getElementById("btnHeader").addEventListener("click", atualizaInterface());
   // DApp.contracts.Pokard.getPastEvents("RifaComprada", { fromBlock: 0, toBlock: "latest" }).then((result) => registraEventos(result));  
   // DApp.contracts.Rifa.events.RifaComprada((error, event) => registraEventos([event]));  
}



function atualizaInterface() {
    console.log("atualizando")
};



  /*verTotalDeRifas().then((result) => {
    document.getElementById("total-geral").innerHTML = result;
  });

  verPremio().then((result) => {
    document.getElementById("premio").innerHTML =
      result / 1000000000000000000 + " ETH";
  });

  verPreco().then((result) => {
    document.getElementById("preco").innerHTML =
      "Preço da Rifa: " + result / 1000000000000000000 + " ETH";
  });

  verGanhador().then((result) => {
    document.getElementById("ganhador").innerHTML = result;
  });

  document.getElementById("endereco").innerHTML = DApp.account;

  document.getElementById("btnSortear").style.display = "none";
  ehDono().then((result) => {
    if (result) {
      document.getElementById("btnSortear").style.display = "block";
    }
  });
}*/

function registraEventos(eventos) {
  let table = document.getElementById("events");
  eventos.forEach(evento => {
    let tr = document.createElement("tr");
    let td1 = document.createElement("td");
    td1.innerHTML = "<a href='https://ropsten.etherscan.io/address/"+ evento["returnValues"]["comprador"] +"'>" + evento["returnValues"]["comprador"] + "</a>";
    let td2 = document.createElement("td");
    td2.innerHTML = evento["returnValues"]["quant"];
    let td3 = document.createElement("td");  
    td3.innerHTML = "<a href='https://ropsten.etherscan.io/tx/"+ evento["transactionHash"] +"'>" + evento["transactionHash"] + "</a>";
    tr.appendChild(td1);
    tr.appendChild(td2);
    tr.appendChild(td3);
    table.appendChild(tr);
  });
}