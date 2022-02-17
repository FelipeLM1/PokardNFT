contract Pokard {

    struct Pokemon{
    address payable dono;
    uint idCarta;
    uint idPokemon; //reconhecer pela api
    uint ataque;
    uint defesa;
    uint preco; //valor default
}
    
    address payable owner;
    address payable jogador; //endereço do jogador
    mapping(address => Pokemon[]) private PokemonsPorJogador; //cada endereço tera um array de pokemons
    mapping(address => Pokemon[]) PokemonsMercado;
    address payable [] jogadorPokemons;
    Pokemon[] PokemonsMercado2; // vaicolocar o idDacarta
     uint256 valorCarta= 0.1 ether;
     uint idCarta = 0;
    
    
    constructor()public{  owner =  msg.sender; }

    //recebe a quantidade de cartas compradas e gera o pokemon
    function comprarCarta(uint quant) public payable
    {  
        
        require(msg.value==valorCarta*quant);
        for(uint i=0; i<quant; i++)
            {
                gerarPokemon(i, msg.sender);
                //PokemonsPorJogador[msg.sender].push(gerarPokemon());
            }    
    }

    //sorteia um valor correspondente ao id do pokemon
   function gerarPokemon(uint aux, address payable endereco) private
   { 
        //Pokemon memory pokemonGerado;
        uint ataque = aux+2;
        uint defesa = aux;
        Pokemon memory novoPokemon;
        novoPokemon.idCarta = idCarta;
        novoPokemon.dono = endereco;
        novoPokemon.ataque = uint(keccak256(abi.encodePacked(now*ataque, msg.sender))) % 100;
        novoPokemon.defesa = uint(keccak256(abi.encodePacked(now*defesa, msg.sender))) % 100;
        novoPokemon.idPokemon = uint(keccak256(abi.encodePacked(now*aux, msg.sender))) % 898;
        PokemonsPorJogador[endereco].push(novoPokemon);
        //jogadorPokemons.push(msg.sender);
        idCarta++;
      
   }
   
    //vai retornar todos os pokemons do jogador
   function retornaPokemonsComprados() public view returns (Pokemon[] memory)
   {   
       
       
        return PokemonsPorJogador[msg.sender];
   }

   function mostrarPokemonsMercado() public view returns (Pokemon[] memory)
   {
       return PokemonsMercado2;
   }

 
   function colocarPokemonAvenda(uint id, uint preco) public{

       PokemonsPorJogador[msg.sender];
       for(uint i=0; i<PokemonsPorJogador[msg.sender].length; i++){
            if( PokemonsPorJogador[msg.sender][i].idCarta== id)
            {
                PokemonsPorJogador[msg.sender][i].preco = preco;
                //PokemonsMercado[msg.sender].push(PokemonsPorJogador[msg.sender][i]);
                PokemonsMercado2.push(PokemonsPorJogador[msg.sender][i]);
            }
        } 

       
   }
   
   function comprarPokemonMercado( uint idCarta) public payable {
      
      for(uint i=0; i<PokemonsMercado2.length; i++){
            if( PokemonsMercado2[i].idCarta== idCarta)
            {
                require(msg.value==PokemonsMercado2[i].preco);
                address(PokemonsMercado2[i].dono).transfer(msg.value); //trenferir pro endereço vendedor
                //PokemonsMercado[msg.sender].push(PokemonsPorJogador[msg.sender][i]);
                delete PokemonsPorJogador[PokemonsMercado2[i].dono];
                delete PokemonsMercado2[i];
                break;
            }
        } 
   }

}