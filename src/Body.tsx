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

  interface Moves{
    name: string
    pp: number
    power: number
    type: string
    elementType: string
  }

interface Types {
    type1: string
    type2: string
}

interface ExtendedPokeInfo{
    stats: Stats 
    abilities: Array<Ability> 
    moves: Array<Moves> 
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
    const [searchLoading, setSearchLoading] = useState<boolean>(false)
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



    {/* search functions variables */}



    const extendedStats = useRef<HTMLDivElement>(null)
    const refToGlidePokedex = useRef<HTMLDivElement>(null)
    const refToGlidePokedexHolder = useRef<HTMLDivElement>(null)

    {/* searches for pokemon via input */}
    const search = async(input: string, suggestion: string = "NA", rPanel: SVGPathElement | null, lPanel: SVGPathElement | null, pHolder: SVGSVGElement | null) => {  
        {/* grabs data for pokedex and extended stats: stats & abilities, moves, and type effectiveness */}
        let search: string = ''

        setSearchLoading(true)

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


        const letterGrab1 = pokeData.name.charAt(0)
        const restOfName1 = pokeData.name.slice(1)
        const letterCap1 = letterGrab1.toUpperCase()
        const letterGrab2 = pokeData.types[0].type.name.charAt(0)
        const restOfName2 = pokeData.types[0].type.name.slice(1)
        const letterCap2 = letterGrab2.toUpperCase()
        const letterGrab3 = pokeType2.charAt(0)
        const restOfName3 = pokeType2.slice(1)
        const letterCap = letterGrab3.toUpperCase()
    
        const pokeName = letterCap1 + restOfName1
        const pokeType1 = letterCap2 + restOfName2
        pokeType2 = letterCap + restOfName3

        const pokeInfoSub: PokeInfo = {
            name: pokeName,
            weight: Math.floor(pokeData.weight / 4.536) + ' lbs',
            height: Math.floor((pokeData.height / .254) / 12) + "'" + Math.ceil(pokeData.height / .254) % 12 + '"',
            type1: pokeType1,
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


        const movesArray: Array<Moves> = []
        
        for(let i = 0; i < pokeData.moves.length; i++){
            const movesResponse = await fetch(pokeData.moves[i].move.url);
            const movesData = await movesResponse.json();
            movesArray.push({
                name: movesData.name,
                pp: movesData.pp,
                power: movesData.power,
                type: movesData.damage_class.name,
                elementType: movesData.type.name
            })
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





        setSearchLoading(false)

        animation(rPanel, lPanel, pHolder);

    }

    const animation = (rPanel: SVGPathElement | null, lPanel: SVGPathElement | null, pHolder: SVGSVGElement | null) => {

        const rearrange = () => {
            if(extendedStats.current && refToGlidePokedex.current){
                refToGlidePokedex.current.className = 'flex md:h-screen md:transition-transform md:duration-500 md:translate-x-[-95%]'
                const timer = () => {
                    if(extendedStats.current && refToGlidePokedex.current){
                        refToGlidePokedex.current.className = 'flex md:h-screen'
                        extendedStats.current.className = 'invisible flex justify-start items-center md:w-[62.75%] w-full h-screen'
                    }
                }
                const timer2 = () => {
                    if(extendedStats.current && refToGlidePokedexHolder.current){
                        extendedStats.current.className = 'flex justify-start items-center md:w-[62.75%] w-full h-screen animate-fader'
                    }
                }
                setTimeout(timer, 500)
                setTimeout(timer2, 600)
            }
          }




        if(rPanel && lPanel){
            window.scrollTo(0, window.scrollY + 100)
            rPanel.style.transition = 'transform 1s'
            lPanel.style.transition = 'transform 1s'
            rPanel.style.transform = 'translateX(95%) scale(0 , 1)'

            lPanel.style.transform = 'translateX(5%) scale(0 , 1)'
            const timerHideLeft = () => {
                if(pHolder){
                    pHolder.style.visibility = 'hidden'
                    rearrange();
                }
            }
            setTimeout(timerHideLeft, 990)

        }


        {/* apply animation  on initial search */}

  
    }


    useEffect(() => {

        const grabAllPokeNames = async() => {
            const namesArray: Array<string> = [];

            const response = await fetch(`https://pokeapi.co/api/v2/pokemon/?limit=750/`);
            const data = await response.json();
            console.log(response);
            

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
            <div ref={refToGlidePokedexHolder} className="flex justify-start md:justify-around mt-10 md:mt-0 flex-col md:flex-row gap-10 md:gap-0 w-full min-h-screen">
                <div ref={refToGlidePokedex}  className="flex w-[100vw] aspect-[10 / 14] md:w-fit ">
                  <Pokedex pokeInformation={pokeInfo} search={search} pokeNames={allPokeNamesState} loadingBool={searchLoading} />
                </div>
                <div ref={extendedStats} className="hidden">

                {extendedPokeInfo.name !== '' ? (
                        <ExtendedPokeStats extendedPokeInfo={extendedPokeInfo} loadingBool={searchLoading} />
                ) : <></>}
                   
        
                </div>

            </div>
        </div>
  )
}

export default Body