[
	{
	  "inputs": [],
	  "payable": false,
	  "stateMutability": "nonpayable",
	  "type": "constructor"
	},
	{
	  "constant": false,
	  "inputs": [
		{
		  "internalType": "uint256",
		  "name": "id",
		  "type": "uint256"
		},
		{
		  "internalType": "uint256",
		  "name": "preco",
		  "type": "uint256"
		}
	  ],
	  "name": "colocarPokemonAvenda",
	  "outputs": [],
	  "payable": false,
	  "stateMutability": "nonpayable",
	  "type": "function"
	},
	{
	  "constant": false,
	  "inputs": [
		{
		  "internalType": "uint256",
		  "name": "quant",
		  "type": "uint256"
		}
	  ],
	  "name": "comprarCarta",
	  "outputs": [],
	  "payable": true,
	  "stateMutability": "payable",
	  "type": "function"
	},
	{
	  "constant": false,
	  "inputs": [
		{
		  "internalType": "uint256",
		  "name": "idCarta",
		  "type": "uint256"
		}
	  ],
	  "name": "comprarPokemonMercado",
	  "outputs": [],
	  "payable": true,
	  "stateMutability": "payable",
	  "type": "function"
	},
	{
	  "constant": false,
	  "inputs": [
		{
		  "internalType": "uint256",
		  "name": "aux",
		  "type": "uint256"
		}
	  ],
	  "name": "gerarPokemon",
	  "outputs": [],
	  "payable": false,
	  "stateMutability": "nonpayable",
	  "type": "function"
	},
	{
	  "constant": true,
	  "inputs": [],
	  "name": "mostrarPokemonsMercado",
	  "outputs": [
		{
		  "components": [
			{
			  "internalType": "address payable",
			  "name": "dono",
			  "type": "address"
			},
			{
			  "internalType": "uint256",
			  "name": "idCarta",
			  "type": "uint256"
			},
			{
			  "internalType": "uint256",
			  "name": "idPokemon",
			  "type": "uint256"
			},
			{
			  "internalType": "uint256",
			  "name": "ataque",
			  "type": "uint256"
			},
			{
			  "internalType": "uint256",
			  "name": "defesa",
			  "type": "uint256"
			},
			{
			  "internalType": "uint256",
			  "name": "preco",
			  "type": "uint256"
			}
		  ],
		  "internalType": "struct Pokard.Pokemon[]",
		  "name": "",
		  "type": "tuple[]"
		}
	  ],
	  "payable": false,
	  "stateMutability": "view",
	  "type": "function"
	},
	{
	  "constant": true,
	  "inputs": [],
	  "name": "retornaPokemonsComprados",
	  "outputs": [
		{
		  "components": [
			{
			  "internalType": "address payable",
			  "name": "dono",
			  "type": "address"
			},
			{
			  "internalType": "uint256",
			  "name": "idCarta",
			  "type": "uint256"
			},
			{
			  "internalType": "uint256",
			  "name": "idPokemon",
			  "type": "uint256"
			},
			{
			  "internalType": "uint256",
			  "name": "ataque",
			  "type": "uint256"
			},
			{
			  "internalType": "uint256",
			  "name": "defesa",
			  "type": "uint256"
			},
			{
			  "internalType": "uint256",
			  "name": "preco",
			  "type": "uint256"
			}
		  ],
		  "internalType": "struct Pokard.Pokemon[]",
		  "name": "",
		  "type": "tuple[]"
		}
	  ],
	  "payable": false,
	  "stateMutability": "view",
	  "type": "function"
	}
  ]