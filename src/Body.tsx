import {useState, useRef} from "react";


import Pokedex from "./Pokedex"
import ExtendedPokeStats from "./ExtendedPokeStats";


interface AbilityDetails{
  name: string
  url: string
}

interface Ability{
  ability: AbilityDetails
  is_hidden: boolean
  slot: number
}



function Body() {
    {/* searchbar variables */}
    const addRef = useRef<HTMLInputElement>(null)
    const names: Array<string> = [];
    const [sugNames, setSugNames] = useState<Array<string>>([])
    const [sugPics, setSugPics] = useState<Array<string>>([])

    {/* function to create suggestions */}
    const searchBar = async () => {
          if(addRef.current){
            const response = await fetch(`https://pokeapi.co/api/v2/pokemon/?limit=151/`);
            const data = await response.json();
            for(let i = 0; i < data.results.length; i++){
            names.push(data.results[i].name)
            }
            let result: number = 0;
            let filterNames = names;
            const search = addRef.current.value;
            const results: Array<string> = [];
            const picResults: Array<string> = [];
            if(addRef.current.value !== ''){
                for(let i = 0; i < 5; i++){
                    result = filterNames.findIndex((element) => element.startsWith(search))
                  
                    if(result !== -1){
                        results.push(filterNames[result])
                        filterNames = filterNames.slice(result + 1)
                        const picResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${results[i]}/`);
                        const picData = await picResponse.json();
                        picResults.push(picData.sprites.front_default)
                    }
                  
                }
            }
            setSugNames([])
            setSugPics([])
            setSugNames(results)
            setSugPics(picResults)            
        }
    }       



    {/* search functions variables */}
    let pokeName: string = ''
    let pokeWeight: string = ''
    let pokeHeight: string = ''
    let pokeType1: string = ''
    let pokeType2: string = ''
    let pokePhoto: string = ''
    let pokeEntry: string = ''
    const [pokeInfo, setPokeInfo] = useState<Array<string>>([])

    const [pokeStats, setPokeStats] = useState<Array<number>>([])
    const [pokeAbilities, setPokeAbilities] = useState<Array<Ability>>([])
    const [pokeMoves, setPokeMoves] = useState<Array<string>>([])
    const [pokeTypes, setPokeTypes] = useState<Array<string>>([])

    const [baseEvolution, setBaseEvolution] = useState<string>('')
    const [baseEvolutionPic, setBaseEvolutionPic] = useState<string>('')
    const [secondEvolutions, setSecondEvolutions] = useState<Array<string>>([])
    const [secondEvolutionPics, setSecondEvolutionPics] = useState<Array<string>>([])
    const [thirdEvolutions, setThirdEvolutions] = useState<Array<string>>([])
    const [thirdEvolutionPics, setThirdEvolutionPics] = useState<Array<string>>([])
    const [shinyPics, setShinyPics] = useState<string>('')

    const extendedStats = useRef<HTMLDivElement>(null)
    const refToGlidePokedex = useRef<HTMLDivElement>(null)
    const refToGlidePokedexHolder = useRef<HTMLDivElement>(null)

    {/* searches for pokemon via input */}
    const search = async() => {  
        {/* grabs data for pokedex and extended stats: stats & abilities, moves, and type effectiveness */}
        let search: string = ''   
        if(addRef.current){
            search = addRef.current.value;
        }        
        const pokeResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${search}/`);
        const pokeResponse2 = await fetch(`https://pokeapi.co/api/v2/pokemon-species/${search}/`);
        const pokeData = await pokeResponse.json();
        const pokeData2 = await pokeResponse2.json();
        for(let i = 0; i < pokeData2.flavor_text_entries.length; i++){
            if(pokeData2.flavor_text_entries[i].version.name == 'diamond' && pokeData2.flavor_text_entries[i].language.name == 'en'){
                pokeEntry = pokeData2.flavor_text_entries[i].flavor_text
                break;
            }
        }
        pokeName = pokeData.name
        pokePhoto = pokeData.sprites.front_default
        pokeWeight = Math.floor(pokeData.weight / 4.536) + ' lbs'
        pokeHeight = Math.floor((pokeData.height / .254) / 12) + "'" + Math.ceil(pokeData.height / .254) % 12 + '"'
        pokeType1 = pokeData.types[0].type.name
        if(pokeData.types[1]){
            pokeType2 = pokeData.types[1].type.name
        }
        setPokeInfo([pokeName, pokeWeight, pokeHeight, pokeType1, pokePhoto, pokeEntry, pokeType2])
        setPokeTypes([pokeType1, pokeType2])
        setPokeStats([])
        for(let i = 0; i < pokeData.stats.length; i++){
            if(i === 0){
                setPokeStats([pokeData.stats[i].base_stat])
            } else {
                setPokeStats(oldStats =>{
                    return [...oldStats, pokeData.stats[i].base_stat]
                })
            }
        }  
        for(let i = 0; i < pokeData.moves.length; i++){
            if(i=== 0){
                setPokeMoves([pokeData.moves[i].move.name])
            } else{
                setPokeMoves(oldMoves =>{
                    return [...oldMoves, pokeData.moves[i].move.name]
                })
            }
        }        
        setPokeAbilities(pokeData.abilities)  
        
        {/* sets data for extended stats: variation and evolutions tab */}
        let baseEvolutionVar: string = ''
        let baseEvolutionPicVar: string = ''
        let secondEvolutionVar: Array<string> = []
        let secondEvolutionPicVar: Array<string> = []
        let thirdEvolutionVar: Array<string> = []
        let thirdEvolutionPicVar: Array<string> = []            
        const evolutionResponse = await fetch(pokeData2.evolution_chain.url);
        const evolutionData = await evolutionResponse.json();
        baseEvolutionVar = evolutionData.chain.species.name
        for(let i = 0; i < evolutionData.chain.evolves_to.length; i++){
            secondEvolutionVar.push(evolutionData.chain.evolves_to[i].species.name)
        }
        for(let t = 0; t < evolutionData.chain.evolves_to.length; t++){
            for(let i = 0; i < evolutionData.chain.evolves_to[t].evolves_to.length; i++){
                thirdEvolutionVar.push(evolutionData.chain.evolves_to[t].evolves_to[i].species.name)
            }
        }
        const baseEvolutionPicResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${baseEvolutionVar}/`);
        const baseEvolutionPicData = await baseEvolutionPicResponse.json();
        baseEvolutionPicVar = baseEvolutionPicData.sprites.front_default
        for(let i = 0; i < secondEvolutionVar.length; i++){
            const secondEvolutionPicResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${secondEvolutionVar[i]}/`);
            const secondEvolutionPicData = await secondEvolutionPicResponse.json();
            secondEvolutionPicVar.push(secondEvolutionPicData.sprites.front_default)
        }
        for(let i = 0; i < thirdEvolutionVar.length; i++){
            const thirdEvolutionPicResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${thirdEvolutionVar[i]}/`);
            const thirdEvolutionPicData = await thirdEvolutionPicResponse.json();
            thirdEvolutionPicVar.push(thirdEvolutionPicData.sprites.front_default)
        }
        setBaseEvolution(baseEvolutionVar)
        setSecondEvolutions(secondEvolutionVar)
        setThirdEvolutions(thirdEvolutionVar)
        setBaseEvolutionPic(baseEvolutionPicVar)
        setSecondEvolutionPics(secondEvolutionPicVar)
        setThirdEvolutionPics(thirdEvolutionPicVar)
        setShinyPics(pokeData.sprites.front_shiny)

        {/* apply animation  on initial search */}
        const rearrange = () => {
          if(extendedStats.current && refToGlidePokedex.current){
              refToGlidePokedex.current.className = 'flex h-screen animate-slider'
              const timer = () => {
                  if(extendedStats.current && refToGlidePokedex.current){
                      refToGlidePokedex.current.className = 'flex h-screen'
                      extendedStats.current.className = 'invisible flex justify-start items-center w-[62.75%] h-full'
                  }
              }
              const timer2 = () => {
                  if(extendedStats.current && refToGlidePokedexHolder.current){
                      extendedStats.current.className = 'flex justify-start items-center w-[62.75%] h-full animate-fader'
                  }
              }
              setTimeout(timer, 1500)
              setTimeout(timer2, 1500)
          }
        }
        if(extendedStats.current){
            if(extendedStats.current.className === 'hidden'){
                setTimeout(rearrange, 1500)
            }
        }
        if(addRef.current){
          addRef.current.value = ''
          setSugNames([])
          setSugPics([]) 
        }
    }

    {/* function to search by selecting suggestion */} 
    const searchBySuggestion = async(name: string) => {     
      {/* grabs data for pokedex and extended stats: stats & abilities, moves, and type effectiveness */}
      const pokeResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}/`);
      const pokeResponse2 = await fetch(`https://pokeapi.co/api/v2/pokemon-species/${name}/`);
      const pokeData = await pokeResponse.json();
      const pokeData2 = await pokeResponse2.json();
      for(let i = 0; i < pokeData2.flavor_text_entries.length; i++){
          if(pokeData2.flavor_text_entries[i].version.name == 'diamond' && pokeData2.flavor_text_entries[i].language.name == 'en'){
              pokeEntry = pokeData2.flavor_text_entries[i].flavor_text
              break;
          }
      }
      pokeName = pokeData.name
      pokePhoto = pokeData.sprites.front_default
      pokeWeight = Math.floor(pokeData.weight / 4.536) + ' lbs'
      pokeHeight = Math.floor((pokeData.height / .254) / 12) + "'" + Math.ceil(pokeData.height / .254) % 12 + '"'
      pokeType1 = pokeData.types[0].type.name
      if(pokeData.types[1]){
          pokeType2 = pokeData.types[1].type.name
      }
      setPokeInfo([pokeName, pokeWeight, pokeHeight, pokeType1, pokePhoto, pokeEntry, pokeType2])
      setPokeTypes([pokeType1, pokeType2])
      setPokeStats([])
      for(let i = 0; i < pokeData.stats.length; i++){
          if(i === 0){
              setPokeStats([pokeData.stats[i].base_stat])
          } else {
              setPokeStats(oldStats =>{
                  return [...oldStats, pokeData.stats[i].base_stat]
              })
          }
      }  
      for(let i = 0; i < pokeData.moves.length; i++){
          if(i=== 0){
              setPokeMoves([pokeData.moves[i].move.name])
          } else{
              setPokeMoves(oldMoves =>{
                  return [...oldMoves, pokeData.moves[i].move.name]
              })
          }
      }        
      setPokeAbilities(pokeData.abilities)  
      
      {/* sets data for extended stats: variation and evolutions tab */}
      let baseEvolutionVar: string = ''
      let baseEvolutionPicVar: string = ''
      let secondEvolutionVar: Array<string> = []
      let secondEvolutionPicVar: Array<string> = []
      let thirdEvolutionVar: Array<string> = []
      let thirdEvolutionPicVar: Array<string> = []            
      const evolutionResponse = await fetch(pokeData2.evolution_chain.url);
      const evolutionData = await evolutionResponse.json();
      baseEvolutionVar = evolutionData.chain.species.name
      for(let i = 0; i < evolutionData.chain.evolves_to.length; i++){
          secondEvolutionVar.push(evolutionData.chain.evolves_to[i].species.name)
      }
      for(let t = 0; t < evolutionData.chain.evolves_to.length; t++){
          for(let i = 0; i < evolutionData.chain.evolves_to[t].evolves_to.length; i++){
              thirdEvolutionVar.push(evolutionData.chain.evolves_to[t].evolves_to[i].species.name)
          }
      }
      const baseEvolutionPicResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${baseEvolutionVar}/`);
      const baseEvolutionPicData = await baseEvolutionPicResponse.json();
      baseEvolutionPicVar = baseEvolutionPicData.sprites.front_default
      for(let i = 0; i < secondEvolutionVar.length; i++){
          const secondEvolutionPicResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${secondEvolutionVar[i]}/`);
          const secondEvolutionPicData = await secondEvolutionPicResponse.json();
          secondEvolutionPicVar.push(secondEvolutionPicData.sprites.front_default)
      }
      for(let i = 0; i < thirdEvolutionVar.length; i++){
          const thirdEvolutionPicResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${thirdEvolutionVar[i]}/`);
          const thirdEvolutionPicData = await thirdEvolutionPicResponse.json();
          thirdEvolutionPicVar.push(thirdEvolutionPicData.sprites.front_default)
      }
      setBaseEvolution(baseEvolutionVar)
      setSecondEvolutions(secondEvolutionVar)
      setThirdEvolutions(thirdEvolutionVar)
      setBaseEvolutionPic(baseEvolutionPicVar)
      setSecondEvolutionPics(secondEvolutionPicVar)
      setThirdEvolutionPics(thirdEvolutionPicVar)
      setShinyPics(pokeData.sprites.front_shiny)

      {/* apply animation  on initial search */}
      const rearrange = () => {
          if(extendedStats.current && refToGlidePokedex.current){
              refToGlidePokedex.current.className = 'flex h-screen animate-slider'
              const timer = () => {
                  if(extendedStats.current && refToGlidePokedex.current){
                      refToGlidePokedex.current.className = 'flex h-screen'
                      extendedStats.current.className = 'invisible flex justify-start items-center w-[62.75%] h-full'
                  }
              }
              const timer2 = () => {
                  if(extendedStats.current && refToGlidePokedexHolder.current){
                      extendedStats.current.className = 'flex justify-start items-center w-[62.75%] h-full animate-fader'
                  }
              }
              setTimeout(timer, 1500)
              setTimeout(timer2, 1500)
          }
      }
      if(extendedStats.current){
          if(extendedStats.current.className === 'hidden'){
              setTimeout(rearrange, 1500)
          }
      }
      if(addRef.current){
        addRef.current.value = ''
        setSugNames([])
        setSugPics([]) 
      }
    }

    {/* enables enter button to search */}
    if(addRef.current){
        addRef.current.addEventListener("keypress", function(event) {
            if (event.key === "Enter") {
                search();
            }
        })
    }

    return (
        <div>
            <div ref={refToGlidePokedexHolder} className="flex justify-around w-full h-screen">
                <div ref={refToGlidePokedex}  className="flex h-screen">
                  <Pokedex pokeInformation={pokeInfo} sugNames={sugNames} sugPics={sugPics} searchBar={searchBar} searchBySuggestion={searchBySuggestion} ref={addRef} />
                </div>
                <div ref={extendedStats} className="hidden">
                <ExtendedPokeStats baseStats={pokeStats} Abilities={pokeAbilities} moves={pokeMoves} types={pokeTypes} baseEvolution={baseEvolution} baseEvolutionPic={baseEvolutionPic} secondEvolutions={secondEvolutions} secondEvolutionPics={secondEvolutionPics} thirdEvolutions={thirdEvolutions} thirdEvolutionPics={thirdEvolutionPics} name={pokeInfo[0]} shinyPictures={shinyPics} />
                </div>
            </div>
        </div>
  )
}

export default Body