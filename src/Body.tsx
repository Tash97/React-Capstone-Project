import {useState, useRef, useEffect} from "react";
import Pokedex from "./Pokedex"
import ExtendedPokeStats from "./ExtendedPokeStats";

interface PokeInfo{
    name: string
    weight: string
    height: string
    type1: string
    type2: string
    photo: string
    entry: string
}

interface Stats{
    hp: number
    attack: number
    defense: number
    specialAttack: number
    specialDefense: number
    speed: number
}


  interface Ability{
    ability: string
    abilityDetails: string
  }

interface Types {
    type1: string
    type2: string
}

interface ExtendedPokeInfo{
    stats: Stats 
    abilities: Array<Ability> 
    moves: Array<string> 
    types: Types
    baseEvolution: string
    baseEvolutionPic: string
    secondEvolutions: Array<string>
    secondEvolutionPics: Array<string> 
    thirdEvolutions: Array<string>
    thirdEvolutionPics: Array<string>
    name: string
    shinyPictures: string
}

function Body() {
    {/* searchbar variables */}
    const [allPokeNamesState, setAllPokeNamesState] = useState<Array<string>>([])
    const allPokeNames = useRef<Array<string>>([]);
    const [pokeInfo, setPokeInfo] = useState<PokeInfo>({name: "", weight: "", height: "", type1: "", type2: "", photo: "", entry: ""})
    const [extendedPokeInfo, setExtendedPokeInfo] = useState<ExtendedPokeInfo>({
        stats: {
            hp: 0,
            attack: 0,
            defense: 0,
            specialAttack: 0,
            specialDefense: 0,
            speed: 0
        }, 
        abilities: [{
            ability: '',
            abilityDetails: ''
        }], 
        moves: [], 
        types: {
            type1: "",
            type2: ""
        },
        baseEvolution: '',
        baseEvolutionPic: '',
        secondEvolutions: [],
        secondEvolutionPics: [], 
        thirdEvolutions: [],
        thirdEvolutionPics: [],
        name: '',
        shinyPictures: ''
    })

console.log("hi from body component");


    {/* search functions variables */}



    const extendedStats = useRef<HTMLDivElement>(null)
    const refToGlidePokedex = useRef<HTMLDivElement>(null)
    const refToGlidePokedexHolder = useRef<HTMLDivElement>(null)

    {/* searches for pokemon via input */}
    const search = async(input: string, suggestion: string = "NA") => {  
        {/* grabs data for pokedex and extended stats: stats & abilities, moves, and type effectiveness */}
        let search: string = ''



        if(allPokeNames.current.includes(input)){

            search = input;
            
        } else {
            search = suggestion
        }

        const pokeResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${search}/`);
        const pokeResponse2 = await fetch(`https://pokeapi.co/api/v2/pokemon-species/${search}/`);
        const pokeData = await pokeResponse.json();
        const pokeData2 = await pokeResponse2.json();
       
        let pokeEntry: string = ''

        for(let i = 0; i < pokeData2.flavor_text_entries.length; i++){
            if(pokeData2.flavor_text_entries[i].version.name == 'diamond' && pokeData2.flavor_text_entries[i].language.name == 'en'){
                pokeEntry = pokeData2.flavor_text_entries[i].flavor_text
                break;
            }
        }
        let pokeType2: string = ''

        
        if(pokeData.types[1]){
            pokeType2 = pokeData.types[1].type.name
        }

        const pokeInfoSub: PokeInfo = {
            name: pokeData.name,
            weight: Math.floor(pokeData.weight / 4.536) + ' lbs',
            height: Math.floor((pokeData.height / .254) / 12) + "'" + Math.ceil(pokeData.height / .254) % 12 + '"',
            type1: pokeData.types[0].type.name,
            type2: pokeType2,
            photo: pokeData.sprites.front_default,
            entry: pokeEntry
        }



        const statsSub: Stats = {
            hp: pokeData.stats[0].base_stat,
            attack: pokeData.stats[1].base_stat,
            defense: pokeData.stats[2].base_stat,
            specialAttack: pokeData.stats[3].base_stat,
            specialDefense: pokeData.stats[4].base_stat,
            speed: pokeData.stats[5].base_stat

        }

        const abilityNamesSub: Array<string> = []
        const abilityDetailsSub: Array<string> = []


        for(let i = 0; i < pokeData.abilities.length; i++){
            abilityNamesSub.push(pokeData.abilities[i].ability.name)

            const abilityDetailsGrab = await fetch(pokeData.abilities[i].ability.url)
            const abilityDetailsData = await abilityDetailsGrab.json()

            for(let t = 0; t < abilityDetailsData.effect_entries.length; t++){
                if(abilityDetailsData.effect_entries[t].language.name === 'en'){
                    abilityDetailsSub.push(abilityDetailsData.effect_entries[t].short_effect)
                    
                }
            }
        }

        
        const abilityList: Array<Ability> = []
        for(let i = 0; i < abilityNamesSub.length; i++){
            abilityList.push({
                ability: abilityNamesSub[i],
                abilityDetails: abilityDetailsSub[i]
            })
        }  


        const movesArray: Array<string> = []
        
        for(let i = 0; i < pokeData.moves.length; i++){
            movesArray.push(pokeData.moves[i].move.name)
        }

        const typesSub: Types = {
            type1: pokeData.types[0].type.name,
            type2: pokeType2
        }

        const secondEvolutionVar: Array<string> = []
        const secondEvolutionPicVar: Array<string> = []
        const thirdEvolutionVar: Array<string> = []
        const thirdEvolutionPicVar: Array<string> = []            
        const evolutionResponse = await fetch(pokeData2.evolution_chain.url);
        const evolutionData = await evolutionResponse.json();
        const baseEvolutionVar = evolutionData.chain.species.name
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
        const baseEvolutionPicVar = baseEvolutionPicData.sprites.front_default
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

        const extendedPokeInfoSub: ExtendedPokeInfo = {
            stats: statsSub, 
            abilities: abilityList, 
            moves: movesArray, 
            types: typesSub, 
            baseEvolution: baseEvolutionVar, 
            baseEvolutionPic: baseEvolutionPicVar, 
            secondEvolutions: secondEvolutionVar, 
            secondEvolutionPics: secondEvolutionPicVar, 
            thirdEvolutions: thirdEvolutionVar,
            thirdEvolutionPics: thirdEvolutionPicVar,
            name: pokeData.name, 
            shinyPictures: pokeData.sprites.front_shiny
        }


        setPokeInfo({...pokeInfoSub})
        setExtendedPokeInfo({...extendedPokeInfoSub})

        {/* sets data for extended stats: variation and evolutions tab */}



        {/* apply animation  on initial search */}
        const rearrange = () => {
          if(extendedStats.current && refToGlidePokedex.current){
              refToGlidePokedex.current.className = 'flex h-screen transition-transform duration-500 translate-x-[-100%]'
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
              setTimeout(timer, 500)
              setTimeout(timer2, 1000)
          }
        }
        if(extendedStats.current){
            if(extendedStats.current.className === 'hidden'){
                setTimeout(rearrange, 1000)
            }
        }

    }


    useEffect(() => {

        const grabAllPokeNames = async() => {
            const namesArray: Array<string> = [];

            const response = await fetch(`https://pokeapi.co/api/v2/pokemon/?limit=151/`);
            const data = await response.json();

            for(let i = 0; i < data.results.length; i++){
                namesArray.push(data.results[i].name)
            }
            setAllPokeNamesState([...namesArray])
            allPokeNames.current = namesArray

        }
        grabAllPokeNames();
        
    }, [])
    




    return (
        <div>
            <div ref={refToGlidePokedexHolder} className="flex justify-around w-full h-screen">
                <div ref={refToGlidePokedex}  className="flex h-screen">
                  <Pokedex pokeInformation={pokeInfo} search={search} pokeNames={allPokeNamesState} />
                </div>
                <div ref={extendedStats} className="hidden">

                {extendedPokeInfo.name !== "" ? (

                        <ExtendedPokeStats extendedPokeInfo={extendedPokeInfo} />
                ) : <></>}
                </div>

            </div>
        </div>
  )
}

export default Body