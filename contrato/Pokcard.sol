pragma solidity ^0.5.0;
pragma experimental ABIEncoderV2;

 //global idCarta

contract Pokard {

    struct Pokemon{
    uint idCarta;
    uint idPokemon; //reconhecer pela api
    uint ataque;
    uint defesa;
    uint preco; //valor default
}
    
    address payable owner;
    address payable jogador; //endereço do jogador
    mapping(address => Pokemon[]) PokemonsPorJogador; //cada endereço tera um array de pokemons
    mapping(address => Pokemon[]) PokemonsMercado;
    uint256 valorCarta= 0.1 ether;
    
    
    constructor()public{  owner =  msg.sender; }

    //recebe a quantidade de cartas compradas e gera o pokemon
    function comprarCarta(uint quant) public payable
    {  
        
        require(msg.value==valorCarta*quant);
        for(uint i=0; i<quant; i++)
            {
                gerarPokemon();
                //PokemonsPorJogador[msg.sender].push(gerarPokemon());
            }    
    }

    //sorteia um valor correspondente ao id do pokemon
   function gerarPokemon() public
   { 
        //Pokemon memory pokemonGerado;
        Pokemon memory novoPokemon;
        novoPokemon.ataque = uint(keccak256(abi.encodePacked(now, msg.sender))) % 100;
        novoPokemon.defesa = uint(keccak256(abi.encodePacked(now, msg.sender))) % 100;
        novoPokemon.idPokemon = uint(keccak256(abi.encodePacked(now, msg.sender))) % 898;
        PokemonsPorJogador[msg.sender].push(novoPokemon);
      
   }
   
    //vai retornar todos os pokemons do jogador
   function retornaPokemonsComprados() public view returns (Pokemon[] memory)
   {   // string memory retorno[];
         //uint constant n = 32**22 + 8;
        //uint [5] memory pokemons;
       /* for(uint i=0; i<PokemonsPorJogador[msg.sender].length; i++){
            uint valor = PokemonsPorJogador[msg.sender][i];
            pokemons[i] = valor;
           // pokemons.push(valor);
          
            
        } */
    
        //string memory listaPokemons = pokemonToString(pokemons);
       
        return PokemonsPorJogador[msg.sender];
   }

   /*function pokemonToString(Pokemon [] memory pokemons) private returns (string memory)
   {
       string memory retorno;
       for(uint i=0; i<PokemonsPorJogador[msg.sender].length; i++){
           
           uint a = pokemons[i].idCarta;
           uint b = pokemons[i].ataque;
           uint c = pokemons[i].forca;
           string pokemonString = string(abi.encodePacked(",[",a, b, c, d, e, "],"));
            
            
        }
        return retorno;
   }*/

   function colocarPokemonAvenda(uint id, uint preco) public{

       PokemonsPorJogador[msg.sender];
       for(uint i=0; i<PokemonsPorJogador[msg.sender].length; i++){
            if( PokemonsPorJogador[msg.sender][i].idPokemon== id)
            {
                PokemonsPorJogador[msg.sender][i].preco = preco;
                PokemonsMercado[msg.sender].push(PokemonsPorJogador[msg.sender][i]);
                delete PokemonsPorJogador[msg.sender][i];
            }
        } 

       
   }
   
}