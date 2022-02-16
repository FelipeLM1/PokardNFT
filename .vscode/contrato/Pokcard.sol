pragma solidity ^0.5.0;


contract Pokard {

    enum  raridade {BABY, LEGENDARY, MYTHICAL}

    struct Pokemon{
    uint idCarta;
    uint idPokemon; //reconhecer pela api
    uint  raridadePokemon; //legendary, baby ou mythical
    uint preco; //valor default
}
    
    address payable owner;
    address payable jogador; //endereço do jogador
    mapping(address => uint[]) PokemonsPorJogador; //cada endereço tera um array de pokemons
    mapping(address => uint[]) PokemonsMercado;
    uint256 valorCarta= 0.1 ether;
    
    
    constructor()public{  owner =  msg.sender; }

    //recebe a quantidade de cartas compradas e gera o pokemon
    function comprarCarta(uint quant) public payable
    {  
        
        require(msg.value==valorCarta*quant);
        for(uint i=0; i<quant; i++){ PokemonsPorJogador[msg.sender].push(gerarPokemon());}    
    }

    //sorteia um valor correspondente ao id do pokemon
   function gerarPokemon() public view returns  (uint)
   { 
        //Pokemon memory pokemonGerado;
       uint id = uint(keccak256(abi.encodePacked(now, msg.sender))) % 100;
      
      return id;
   }
   
    //vai retornar todos os pokemons do jogador
   function retornaPokemonsComprados() public view returns (uint[] memory)
   {
        uint[] memory pokemons;
        for(uint i=0; i<3; i++){
            pokemons[i] = PokemonsPorJogador[msg.sender][i];
        } 
        return pokemons;
   }

   function colocarPokemonAvenda(uint id) public{
       //Pokemon pokemonVenda;
       uint pokemonVenda = id;
      // uint novo2= preco;
       PokemonsMercado[msg.sender].push(pokemonVenda);
   }
   
}