export async function pokeSprite(){
    try{
      const pokemonName = document.getElementById("pokemonName").value.toLowerCase();
      const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`);
      if(!response.ok){
        throw new Error("cant do that");
      }
      const data = await response.json();
      const sprite = data.sprites.front_default;
      const name = data.name;
      const imgElement = document.getElementById("sprite");
     
      const element = JSON.stringify(name);
      const unquoted = name.replace(/"([^"]+)":/g, '$1:');
      const capitalized = unquoted.charAt(0).toUpperCase() + unquoted.slice(1)
      const display = document.getElementById("name").innerHTML = capitalized;
      
      imgElement.src = sprite;
      imgElement.style.display = "block";
    }
    catch(error){
      console.log(error);
    }
  }