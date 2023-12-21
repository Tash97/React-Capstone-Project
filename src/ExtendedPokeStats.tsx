import {useState, useEffect, useRef} from 'react'
import MovesMap from './Moves'
import WeaknessMap from './WeaknessMap'
import ResistanceMap from './ResistanceMap'



interface AbilityDetails{
    name: string
    url: string
}
interface Ability{
    ability: AbilityDetails
    is_hidden: boolean
    slot: number
}
interface Props{
    baseStats: Array<number>
    Abilities: Array<Ability>
    moves:Array<string>
    types: Array<string>
    baseEvolution: string
    baseEvolutionPic: string
    secondEvolutions: Array<string>
    secondEvolutionPics: Array<string>
    thirdEvolutions: Array<string>
    thirdEvolutionPics: Array<string>
    name: string
    shinyPictures: string
}





function ExtendedPokeStats({baseStats, Abilities, moves, types, baseEvolution, baseEvolutionPic, secondEvolutions, secondEvolutionPics, thirdEvolutions, thirdEvolutionPics, name, shinyPictures}: Props) {
    

    {/* variables for evelutions and variations display */}
    const regularEvolutionLine = useRef<HTMLDivElement>(null)
    const twoSecondEvolutions = useRef<HTMLDivElement>(null)
    const twoThirdEvolutions = useRef<HTMLDivElement>(null)
    const eeveeEvolution  = useRef<HTMLDivElement>(null)
    const twoEvolutions = useRef<HTMLDivElement>(null)
    const oneEvolution = useRef<HTMLDivElement>(null)

    {/* function to grab correct evolution and variations display*/}
    useEffect(()=>{
        if(regularEvolutionLine.current && twoSecondEvolutions.current && twoThirdEvolutions.current && eeveeEvolution.current && twoEvolutions.current && oneEvolution.current){
            if(secondEvolutions.length === 2){
                twoSecondEvolutions.current.className = 'grid grid-rows-22 grid-cols-40 w-full h-full'
                regularEvolutionLine.current.className = 'hidden'
                twoThirdEvolutions.current.className = 'hidden'
                eeveeEvolution.current.className = 'hidden'
                twoEvolutions.current.className = 'hidden'
                oneEvolution.current.className = 'hidden'

            } else if(thirdEvolutions.length === 2){
                twoThirdEvolutions.current.className = 'grid grid-rows-22 grid-cols-40 w-full h-full'
                regularEvolutionLine.current.className = 'hidden'
                twoSecondEvolutions.current.className = 'hidden'
                eeveeEvolution.current.className = 'hidden'
                twoEvolutions.current.className = 'hidden'
                oneEvolution.current.className = 'hidden'

            } else if(secondEvolutions.length === 8){
                eeveeEvolution.current.className = 'grid grid-rows-23 grid-cols-40 w-full h-full'
                regularEvolutionLine.current.className = 'hidden'
                twoSecondEvolutions.current.className = 'hidden'
                twoThirdEvolutions.current.className = 'hidden'
                twoEvolutions.current.className = 'hidden'
                oneEvolution.current.className = 'hidden'

            } else if(secondEvolutions.length === 1 && thirdEvolutions.length === 1){
                regularEvolutionLine.current.className = 'flex flex-col justify-around w-full h-full'
                twoSecondEvolutions.current.className = 'hidden'
                twoThirdEvolutions.current.className = 'hidden'
                eeveeEvolution.current.className = 'hidden'
                twoEvolutions.current.className = 'hidden'
                oneEvolution.current.className = 'hidden'

            } else if(thirdEvolutions.length === 0 && secondEvolutions.length === 1){
                regularEvolutionLine.current.className = 'hidden'
                twoSecondEvolutions.current.className = 'hidden'
                twoThirdEvolutions.current.className = 'hidden'
                eeveeEvolution.current.className = 'hidden'
                twoEvolutions.current.className = 'flex flex-col justify-around w-full h-full'
                oneEvolution.current.className = 'hidden'

            } else{
                regularEvolutionLine.current.className = 'hidden'
                twoSecondEvolutions.current.className = 'hidden'
                twoThirdEvolutions.current.className = 'hidden'
                eeveeEvolution.current.className = 'hidden'
                twoEvolutions.current.className = 'hidden'
                oneEvolution.current.className = 'flex flex-col justify-around w-full h-full'
            }
        }
    },[baseEvolution])
    
    {/* variables for extended stats tab displays */}
    const statsAndAbilitiesBox = useRef<HTMLDivElement>(null)
    const moveBox = useRef<HTMLDivElement>(null)
    const typeEffectivenessBox = useRef<HTMLDivElement>(null)
    const variationBox = useRef<HTMLDivElement>(null)

    {/* functions to change extended stats tab */}
    const statsBoxGrab = () => {
        if(statsAndAbilitiesBox.current && moveBox.current && typeEffectivenessBox.current && variationBox.current){
            statsAndAbilitiesBox.current.className = 'flex justify-around items-center bg-black bg-opacity-80 grid-flow-col col-span-16 row-span-18 border-t-2 border-b-4 border-s-4 border-e-4 rounded-b-2xl border-black'
            moveBox.current.className = 'hidden'
            typeEffectivenessBox.current.className = 'hidden'
            variationBox.current.className = 'hidden'
        }
    }
    const moveBoxGrab = () => {
        if(statsAndAbilitiesBox.current && moveBox.current && typeEffectivenessBox.current && variationBox.current){
            statsAndAbilitiesBox.current.className = 'hidden'
            moveBox.current.className = 'flex justify-around items-center bg-black bg-opacity-80 grid-flow-col col-span-16 row-span-18 border-t-2 border-b-4 border-s-4 border-e-4 rounded-b-2xl border-black'
            typeEffectivenessBox.current.className = 'hidden'
            variationBox.current.className = 'hidden'
        }
    }
    const typeEffectivenessBoxGrab = () => {
        if(statsAndAbilitiesBox.current && moveBox.current && typeEffectivenessBox.current && variationBox.current){
            statsAndAbilitiesBox.current.className = 'hidden'
            moveBox.current.className = 'hidden'
            typeEffectivenessBox.current.className = 'flex justify-around items-center bg-black bg-opacity-80 grid-flow-col col-span-16 row-span-18 border-t-2 border-b-4 border-s-4 border-e-4 rounded-b-2xl border-black'
            variationBox.current.className = 'hidden'
        }
    }
    const variationsBoxGrab = () => {
        if(statsAndAbilitiesBox.current && moveBox.current && typeEffectivenessBox.current && variationBox.current){
            statsAndAbilitiesBox.current.className = 'hidden'
            moveBox.current.className = 'hidden'
            typeEffectivenessBox.current.className = 'hidden'
            variationBox.current.className = 'flex flex-col justify-around bg-black bg-opacity-80 col-span-16 row-span-18 border-t-2 border-b-4 border-s-4 border-e-4 rounded-b-2xl border-black'
        }
    }

    {/* variables for type effectiveness display */}
    const normal: string = 'Normal: '
    const fire: string = 'Fire: '
    const water: string = 'Water: '
    const grass: string = 'Grass: '
    const electric: string = 'Electric: '
    const ice: string = 'Ice: '
    const fighting: string = 'Fighting: '
    const poison: string = 'Poison: '
    const ground: string = 'Ground: '
    const flying: string = 'Flying: '
    const psychic: string = 'Psychic: '
    const bug: string = 'Bug: '
    const rock: string = 'Rock: '
    const ghost: string = 'Ghost: '
    const dragon: string = 'Dragon: '
    const dark: string = 'Dark: '
    const steel: string = 'Steel: '
    const fairy: string = 'Fairy: '
    const immune: string = 'Immune'
    const effective: string = 'x2 Damage'
    const superEffective: string = 'x4 Damage'
    const weak: string = '1/2 Damage'
    const superWeak: string = '1/4 Damage'

    const [weaknesses, setWeaknesses] = useState<Array<string>>([])
    const [resistances, setresistances] = useState<Array<string>>([])

    {/* function for setting type effectiveness display */}
    useEffect(()=>{
    if(types[1] === ''){
        if(types[0] === 'normal'){
            setWeaknesses([fighting + effective])
            setresistances([ghost + immune])
        } else if(types[0] === 'fire'){
            setWeaknesses([water + effective, ground + effective, rock + effective])
            setresistances([fire + weak, grass + weak, ice + weak, steel + weak, fairy + weak])
        } else if(types[0] === 'water'){
            setWeaknesses([grass + effective, electric + effective])
            setresistances([fire + weak, water + weak, ice + weak, steel + weak])
        } else if(types[0] === 'grass'){
            setWeaknesses([fire + effective, ice + effective, poison + effective, flying + effective, bug + effective])
            setresistances([water + weak, grass + weak, electric + weak, ground + weak])
        } else if(types[0] === 'electric'){
            setWeaknesses([ground + effective])
            setresistances([electric + weak, flying + weak, steel + weak])
        } else if(types[0] === 'ice'){
            setWeaknesses([fire + effective, fighting + effective, rock + effective, steel + effective])
            setresistances([ice + weak])
        } else if(types[0] === 'fighting'){
            setWeaknesses([flying + effective, psychic + effective, fairy + effective])
            setresistances([bug + weak, rock + weak, dark + weak])
        } else if(types[0] === 'poison'){
            setWeaknesses([ground + effective, psychic + effective])
            setresistances([grass + weak, fighting + weak, poison + weak, bug + weak, fairy + weak])
        } else if(types[0] === 'ground'){
            setWeaknesses([water + effective, grass, ice + effective])
            setresistances([electric + immune, poison + weak, rock])
        } else if(types[0] === 'flying'){
            setWeaknesses([electric + effective, ice + effective, rock + effective])
            setresistances([grass + weak, fighting + weak, bug + weak])
        } else if(types[0] === 'psychic'){
            setWeaknesses([bug + effective, ghost + effective, dark + effective])
            setresistances([fighting + weak, psychic + weak])
        } else if(types[0] === 'bug'){
            setWeaknesses([fire + effective, flying + effective, rock + effective])
            setresistances([grass + weak, fighting + weak, ground + weak])
        } else if(types[0] === 'rock'){
            setWeaknesses([water + effective, grass + effective, fighting + effective, ground + effective, steel + effective])
            setresistances([normal + weak, fire + weak, poison + weak, flying + weak])
        } else if(types[0] === 'ghost'){
            setWeaknesses([ghost + effective, dark + effective])
            setresistances([normal + immune, fighting + immune, poison + weak, bug + weak])
        } else if(types[0] === 'dragon'){
            setWeaknesses([ice + effective, dragon + effective, fairy + effective])
            setresistances([fire + weak, water + weak, grass + weak, electric + weak])
        } else if(types[0] === 'dark'){
            setWeaknesses([fighting + effective, bug + effective, fairy + effective])
            setresistances([psychic + immune, ghost + weak, dark + weak])
        } else if(types[0] === 'steel'){
            setWeaknesses([fire + effective, fighting + effective, ground + effective])
            setresistances([normal + weak, grass + weak, ice + weak, poison + immune, flying + weak, psychic + weak, bug + weak, rock + weak, dragon + weak, steel + weak, fairy + weak])
        } else if(types[0] === 'fairy'){
            setWeaknesses([poison + effective, steel + effective])
            setresistances([fighting + weak, bug + weak, dragon + immune, steel + weak])
        }

    } else {
        if(types[0] === 'grass' || types[1] === 'grass'){
            if(types[1] === 'poison'){
                setWeaknesses([flying + effective,fire + effective,psychic + effective,ice + effective])
                setresistances([fighting + weak,water + weak,electric + weak,fairy + weak, grass + superWeak])
            }  else if(types[1] === 'pyschic'){
                setWeaknesses([bug + superEffective, flying + effective, poison + effective, ghost + effective, fire + effective, ice + effective, dark + effective])
                setresistances([fighting + weak, ground + weak, water + weak, grass + weak, electric + weak, psychic + weak])
            } else if(types[0] === 'bug'){
                setWeaknesses([flying + superEffective, fire + superEffective, poison + effective, rock + effective, bug + effective, ice + effective])
                setresistances([fighting + weak, water + weak, electric + weak, ground + superWeak, grass + superWeak])
            }
        } else if(types[0] === 'fire' && types[1] === 'flying'){
            setWeaknesses([rock + superEffective, water + effective, electric + effective])
            setresistances([fighting + weak, steel + weak, fire + weak, fairy + weak, bug + superWeak, grass + superWeak, ground + immune])
        } else if(types[0] === 'bug'){
            if(types[1] === 'flying'){
                setWeaknesses([rock + superEffective, flying + effective, fire + effective, electric + effective, ice + effective])
                setresistances([bug + weak, fighting + superWeak, grass + superWeak, ground + immune])
            } else if(types[1] === 'poison'){
                setWeaknesses([flying + effective, rock + effective, fire + effective, psychic + effective])
                setresistances([poison + weak, bug + weak, fairy + weak, fighting + superWeak, grass + superWeak])
            }
        }else if(types[0] === 'normal' || types[1] === 'normal'){
            if(types[0] === 'flying' || types[1] === 'flying'){
                setWeaknesses([rock + effective, electric + effective, ice + effective])
                setresistances([bug + weak, grass + weak, ground + immune, ghost + immune])
            } else if(types[0] === 'fairy' || types[1] === 'fairy'){
                setWeaknesses([poison + effective, steel + effective])
                setresistances([bug + weak, dark + weak, ghost + immune, dragon + immune])
            }
        } else if(types[0] === 'poison' || types[1] === 'poison'){
            if(types[0] === 'ground' || types[1] === 'ground'){
                setWeaknesses([ground + effective, water + effective, psychic + effective, ice + effective])
                setresistances([fighting + weak, rock + weak, bug + weak, fairy + weak, poison + superWeak, electric + immune])
            }else if(types[0] === 'flying' || types[1] === 'flying'){
                setWeaknesses([rock + effective, electric + effective, psychic + effective, ice + effective])
                setresistances([poison + weak, fairy + weak, fighting + superWeak, bug + superWeak, grass + superWeak, ground + immune])
            }else if(types[0] === 'water' || types[1] === 'water'){
                setWeaknesses([ground + effective, electric + effective, psychic + effective])
                setresistances([fighting + weak, poison + weak, bug + weak, steel + weak, fire + weak, water + weak, ice + weak, fairy + weak])
            } else if(types[0] === 'ghost' || types[1] === 'ghost'){
                setWeaknesses([ground + effective, ghost + effective, psychic + effective, dark + effective])
                setresistances([grass + weak, fairy + weak, poison + superWeak, bug + superWeak, normal + immune, fighting + immune])
            }
        } else if(types[0] === 'water' || types[1] === 'water'){
            if(types[0] === 'fighting' || types[1] === 'fighting'){
                setWeaknesses([flying + effective, grass + effective, electric + effective, psychic + effective, fairy + effective])
                setresistances([rock + weak, bug + weak, steel + weak, fire + weak, water + weak, ice + weak, dark + weak])
            }else if(types[0] === 'psychic' || types[1] === 'psychic'){
                setWeaknesses([bug + effective, ghost + effective, grass + effective, electric + effective, dark + effective])
                setresistances([fighting + weak, steel + weak, fire + weak, water + weak, psychic + weak, ice + weak])
            }else if(types[0] === 'ice' || types[1] === 'ice'){
                setWeaknesses([fighting + effective, rock + effective, grass + effective, electric + effective])
                setresistances([water + weak, ice + superWeak])
            }else if(types[0] === 'flying' || types[1] === 'flying'){
                setWeaknesses([electric + superEffective, rock + effective])
                setresistances([fighting + weak, bug + weak, steel + weak, fire + weak, water + weak, ground + immune])
            }else if(types[0] === 'rock' || types[1] === 'rock'){
                setWeaknesses([grass + superEffective, fighting + effective, ground + effective, electric + effective])
                setresistances([normal + weak, flying + weak, poison + weak, ice + weak, fire + superWeak])
            }
        } else if(types[0] === 'rock' || types[1] === 'rock'){
            if(types[0] === 'ground' || types[1] === 'ground'){
                setWeaknesses([water + superEffective, grass + superEffective, fighting + effective, ground + effective, steel + effective, ice + effective])
                setresistances([normal + weak, flying + weak, rock + weak, fire + weak, poison + superWeak, electric + immune])
            }else if(types[0] === 'flying' || types[1] === 'flying'){
                setWeaknesses([rock + effective, steel + effective, water + effective, electric + effective, ice + effective])
                setresistances([normal + weak, flying + weak, poison + weak, bug + weak, fire + weak, ground + immune])
            }
        } else if(types[0] === 'electric' || types[1] === 'electric'){
            if(types[0] === 'steel' || types[1] === 'steel'){
                setWeaknesses([ground + superEffective, fighting + effective, fire + effective])
                setresistances([normal + weak, rock + weak, bug + weak, grass + weak, electric + weak, psychic + weak, ice + weak, dragon + weak, fairy + weak, flying + superWeak, steel + superWeak, poison + immune])
            } else if(types[0] === 'flying' || types[1] === 'flying'){
                setWeaknesses([rock + effective, ice + effective])
                setresistances([fighting + weak, flying + weak, bug + weak, steel + weak, grass + weak, ground + immune])
            }
        } else if(types[0] === 'psychic' || types[1] === 'psychic'){
            if(types[0] === 'fairy' || types[1] === 'fairy'){
                setWeaknesses([poison + effective, ghost + effective, steel + effective])
                setresistances([psychic + weak, fighting + superWeak, dragon + immune])
            }
        } else if(types[0] === 'flying' || types[1] === 'flying'){
            if(types[0] === 'ice' || types[1] === 'ice'){
                setWeaknesses([rock + superEffective, steel + effective, fire + effective, electric + effective])
                setresistances([bug + weak, grass + weak, ground + immune])
            } else if(types[0] === 'dragon' || types[1] === 'dragon'){
                setWeaknesses([ice + superEffective, rock + effective, dragon + effective, fairy + effective])
                setresistances([fighting + weak, bug + weak, fire + weak, water + weak, grass + superWeak, ground + immune])
            }
        } else if(types[0] === 'ice' || types[1] === 'ice'){
            if(types[0] === 'psychic' || types[1] === 'psychic'){
                setWeaknesses([rock + effective, bug + effective, ghost + effective, steel + effective, fire + effective, dark + effective])
                setresistances([psychic + weak, ice + weak])
            }
        }
    }
    },[types])
    
    {/* function for resetting scroll on moves tab */}
    const moveScroll = useRef<HTMLDivElement>(null)
    useEffect(()=>{
    if(moveScroll.current){
        moveScroll.current.scrollTop = 0
    }
    },[moves])

    {/* variables for abilities box on stats and abilities tab */}
    const [abilityName, setAbilityName] = useState<Array<string>>([])
    const [abilityDetails, setAbilityDetails] = useState<Array<string>>([]) 

    const abilityBox1 = useRef<HTMLDivElement>(null)
    const abilityBox2 = useRef<HTMLDivElement>(null)
    const abilityBox3 = useRef<HTMLDivElement>(null)

    {/* function for grabbing abilities and setting abilities display */}
    useEffect(()=>{
        if(Abilities.length !== 0){
            setAbilityName([])
            setAbilityDetails([])
            const detailFinder = async (index: number) => {
                const abilityDetailsGrab = await fetch(Abilities[index].ability.url)
                const abilityDetailsData = await abilityDetailsGrab.json()
                for(let t = 0; t < abilityDetailsData.effect_entries.length; t++){
                    if(abilityDetailsData.effect_entries[t].language.name === 'en'){
                        setAbilityDetails(oldDetails =>{
                            return [...oldDetails, abilityDetailsData.effect_entries[t].short_effect]
                        })
                    
                    }
                }
            }
            for(let i = 0; i < Abilities.length; i++){
                setAbilityName(oldDetails =>{
                    return [...oldDetails, Abilities[i].ability.name]
                })
                
                detailFinder(i)
                
            }
        }
    },[Abilities])
    useEffect(() => {
        if(abilityName.length === 3 && abilityBox1.current && abilityBox2.current && abilityBox3.current){
            abilityBox1.current.className = 'grid grid-rows-10 grid-cols-1 col-span-1 row-span-4 border-blue-600 border-b-4'
            abilityBox2.current.className = 'grid grid-rows-10 grid-cols-1 col-span-1 row-span-4 border-blue-600 border-b-4'
            abilityBox3.current.className = 'grid grid-rows-10 grid-cols-1 col-span-1 row-span-4 border-blue-600 border-b-4'
        }
        if(abilityName.length === 2 && abilityBox1.current && abilityBox2.current && abilityBox3.current){
            abilityBox1.current.className = 'grid grid-rows-10 grid-cols-1 col-span-1 row-span-6 border-blue-600 border-b-4'
            abilityBox2.current.className = 'grid grid-rows-10 grid-cols-1 col-span-1 row-span-6 border-blue-600 border-b-4'
            abilityBox3.current.className = 'hidden'
        }
        if(abilityName.length === 1 && abilityBox1.current && abilityBox2.current && abilityBox3.current){
            abilityBox1.current.className = 'grid grid-rows-10 grid-cols-1 col-span-1 row-span-12 border-blue-600 border-b-4'
            abilityBox2.current.className = 'hidden'
            abilityBox3.current.className = 'hidden'
        }
    })

    {/* variables for stats in stats and abilities tab */}
    const minStatsLvl50: Array<number> = []
    const maxStatsLvl50: Array<number> = []
    const minStatsLvl100: Array<number> = []
    const maxStatsLvl100: Array<number> = []

    const pokeMaxHp: number = 255
    const pokeMaxAttack: number = 165
    const pokeMaxDefense: number = 184
    const pokeMaxSpAttack: number = 170
    const pokeMaxHpSpDefense: number = 154
    const pokeMaxSpeed: number = 200

    const pokeMinHp: number = 1
    const pokeMinAttack: number = 5
    const pokeMinDefense: number = 5
    const pokeMinSpAttack: number = 10
    const pokeMinSpDefense: number = 20
    const pokeMinSpeed: number = 5 

    const hpBar = useRef<HTMLDivElement>(null)
    const attackBar = useRef<HTMLDivElement>(null)
    const defenseBar = useRef<HTMLDivElement>(null)
    const specialAttackBar = useRef<HTMLDivElement>(null)
    const specialDefenseBar = useRef<HTMLDivElement>(null)
    const speedBar = useRef<HTMLDivElement>(null)

    let baseStatTotal:number = 0

    {/* functions to set display for stats in extended stats */}
    if(baseStats.length !== 0){
    baseStatTotal = baseStats[0] + baseStats[1] + baseStats[2] + baseStats[3] + baseStats[4] + baseStats[5]
    }
    const hpRatio = (Number((baseStats[0] / (pokeMaxHp - pokeMinHp)).toFixed(2)) * 100)
    const attackRatio = (Number((baseStats[1] / (pokeMaxAttack - pokeMinAttack)).toFixed(2)) * 100)
    const defenseRatio = (Number((baseStats[2] / (pokeMaxDefense - pokeMinDefense)).toFixed(2)) * 100)
    const spAttackRatio = (Number((baseStats[3] / (pokeMaxSpAttack - pokeMinSpAttack)).toFixed(2)) * 100)
    const spDefenseRatio = (Number((baseStats[0] / (pokeMaxHpSpDefense - pokeMinSpDefense)).toFixed(2)) * 100)
    const speedRatio = (Number((baseStats[0] / (pokeMaxSpeed - pokeMinSpeed)).toFixed(2)) * 100)
    if(hpBar.current && attackBar.current && defenseBar.current && specialAttackBar.current && specialDefenseBar.current && speedBar.current && baseStats[0] !== undefined){
        hpBar.current.style.width = `${hpRatio}%`
        attackBar.current.style.width = `${attackRatio}%`
        defenseBar.current.style.width = `${defenseRatio}%`
        specialAttackBar.current.style.width = `${spAttackRatio}%`
        specialDefenseBar.current.style.width = `${spDefenseRatio}%`
        speedBar.current.style.width = `${speedRatio}%`
    }
    for(let i = 0; i < baseStats.length; i++){
        if(i === 0){
        const hpStatCalculatorMinLvl50 = Math.floor((((baseStats[i] * 2) * 50) / 100) + 50 + 10)
        const hpStatCalculatorMaxLvl50 = Math.floor(((((baseStats[i] * 2) + 31 + (252/4)) * 50) / 100) + 50 + 10)
        const hpStatCalculatorMinLvl100 = Math.floor((((baseStats[i] * 2) * 100) / 100) + 100 + 10)
        const hpStatCalculatorMaxLvl00 = Math.floor(((((baseStats[i] * 2) + 31 + (252/4)) * 100) / 100) + 100 + 10)
        minStatsLvl50.push(hpStatCalculatorMinLvl50)
        maxStatsLvl50.push(hpStatCalculatorMaxLvl50)
        minStatsLvl100.push(hpStatCalculatorMinLvl100)
        maxStatsLvl100.push(hpStatCalculatorMaxLvl00)
        } else {
        const statCalculatorMinLvl50 = Math.floor(((((baseStats[i] * 2) * 50) / 100) + 5) - (((((baseStats[i] * 2) * 50) / 100) + 5) / 10))
        const statCalculatorMaxLvl50 = Math.floor((((((baseStats[i] * 2) + 31 + (252/4)) * 50) / 100) + 5) + ((((((baseStats[i] * 2) + 31 + (252/4)) * 50) / 100) + 5) / 10))
        const statCalculatorMinLvl100 = Math.floor(((((baseStats[i] * 2) * 100) / 100) + 5) - (((((baseStats[i] * 2) * 100) / 100) + 5) / 10))
        const statCalculatorMaxLvl00 = Math.floor((((((baseStats[i] * 2) + 31 + (252/4)) * 100) / 100) + 5) + ((((((baseStats[i] * 2) + 31 + (252/4)) * 100) / 100) + 5) / 10))
        minStatsLvl50.push(statCalculatorMinLvl50)
        maxStatsLvl50.push(statCalculatorMaxLvl50)
        minStatsLvl100.push(statCalculatorMinLvl100)
        maxStatsLvl100.push(statCalculatorMaxLvl00)
        }
    }
    
    return (
        <div className="grid grid-cols-16 grid-rows-20 h-[94.25%] w-full ">
            <div className='grid grid-flow-col col-span-16 row-span-2 bg-gradient-to-r from-cyan-500 to-blue-600'>
                    <div onClick={statsBoxGrab} className='grid justify-center items-end font-semibold text-2xl  border-b-2 border-e-2 border-black  '>Stats and Abilities</div>
                    <div onClick={moveBoxGrab} className='grid justify-center items-end font-semibold text-2xl  border-b-2 border-e-2 border-black ' >Moves</div>
                    <div onClick={typeEffectivenessBoxGrab} className='grid justify-center items-end font-semibold text-2xl  border-b-2 border-e-2 border-black '>Type Effectiveness</div>
                    <div onClick={variationsBoxGrab} className='grid justify-center items-end font-semibold text-2xl  border-b-2 border-black '>Variations & Evolutions</div>
            </div>
            <div ref={statsAndAbilitiesBox} className='flex justify-around items-center bg-black bg-opacity-80 grid-flow-col col-span-16 row-span-18 border-t-2 border-b-4 border-s-4 border-e-4 rounded-b-2xl border-black'>
                    <div className='grid grid-rows-11 grid-cols-16 border-2 border-blue-600 bg-blue-500 rounded-2xl w-8/12 h-3/4'>
                        <div className='grid justify-center items-center col-span-12 row-span-2 border-2 border-blue-600 rounded-tl-xl font-bold text-2xl'>Stats</div>
                            <div className='grid justify-center items-center col-span-4 row-span-1 border-2 border-blue-600 rounded-tr-xl font-bold text-xl'>Range</div>
                            <div className='grid justify-center items-center col-span-2 row-span-1 border-2 border-blue-600 font-bold'>At Lv. 50</div>
                            <div className='grid justify-center items-center col-span-2 row-span-1 border-2 border-blue-600 font-bold'>At lv. 100</div>
                            <div className='flex font-bold text-xl justify-between items-center col-span-4 row-span-1 border-2 border-blue-600'>
                                <div className='ms-2'>HP:</div>
                                <div className='me-2'>{baseStats[0]}</div>
                            </div>
                            <div className='flex justify-start items-center col-span-8 row-span-1 border-2 border-blue-600'>
                                <div ref={hpBar} className='w-full h-[90%] bg-red-600  rounded-sm ms-0.5 '></div>
                            </div>
                            <div className='flex justify-center items-center col-span-2 row-span-1 border-2 border-blue-600 font-semibold'>{minStatsLvl50[0]}-{maxStatsLvl50[0]}</div>
                            <div className='flex justify-center items-center col-span-2 row-span-1 border-2 border-blue-600 font-semibold'>{minStatsLvl100[0]}-{maxStatsLvl100[0]}</div>
                            <div className='flex font-bold text-xl justify-between items-center col-span-4 row-span-1 border-2 border-blue-600'>
                                <div className='ms-2'>Attack:</div>
                                <div className='me-2'>{baseStats[1]}</div>
                            </div>
                            <div className='flex  justify-start items-center w-full h-full col-span-8 row-span-1 border-2 border-blue-600'>
                                <div ref={attackBar} className='bg-orange-600 w-full h-[90%] rounded-sm ms-0.5 '></div>
                            </div>
                            <div className='flex justify-center items-center col-span-2 row-span-1 border-2 border-blue-600 font-semibold'>{minStatsLvl50[1]}-{maxStatsLvl50[1]}</div>
                            <div className='flex justify-center items-center col-span-2 row-span-1 border-2 border-blue-600 font-semibold'>{minStatsLvl100[1]}-{maxStatsLvl100[1]}</div>
                            <div className='flex font-bold text-xl justify-between items-center col-span-4 row-span-1 border-2 border-blue-600'>
                                <div className='ms-2'>Defense:</div>
                                <div className='me-2'>{baseStats[2]}</div>
                            </div>
                            <div className='flex justify-start items-center col-span-8 row-span-1 border-2 border-blue-600'>
                                <div ref={defenseBar} className='bg-yellow-600 w-full h-[90%]  rounded-sm ms-0.5 '></div>
                            </div>
                            <div className='flex justify-center items-center col-span-2 row-span-1 border-2 border-blue-600 font-semibold'>{minStatsLvl50[2]}-{maxStatsLvl50[2]}</div>
                            <div className='flex justify-center items-center col-span-2 row-span-1 border-2 border-blue-600 font-semibold'>{minStatsLvl100[2]}-{maxStatsLvl100[2]}</div>
                            <div className='flex font-bold text-xl justify-between items-center col-span-4 row-span-1 border-2 border-blue-600'>
                                <div className='ms-2'>Sp. Atk:</div>
                                <div className='me-2'>{baseStats[3]}</div>
                            </div>
                            <div className='flex justify-start items-center col-span-8 row-span-1 border-2 border-blue-600'>
                                <div ref={specialAttackBar} className='bg-blue-600 w-full h-[90%] rounded-sm ms-0.5 '></div>
                            </div>
                            <div className='flex justify-center items-center col-span-2 row-span-1 border-2 border-blue-600 font-semibold'>{minStatsLvl50[3]}-{maxStatsLvl50[3]}</div>
                            <div className='flex justify-center items-center col-span-2 row-span-1 border-2 border-blue-600 font-semibold'>{minStatsLvl100[3]}-{maxStatsLvl100[3]}</div>
                            <div className='flex font-bold text-xl justify-between items-center col-span-4 row-span-1 border-2 border-blue-600'>
                                <div className='ms-2'>Sp. Def:</div>
                                <div className='me-2'>{baseStats[4]}</div>
                            </div>
                            <div className='flex justify-start items-center col-span-8 row-span-1 border-2 border-blue-600'>
                                <div ref={specialDefenseBar} className='bg-lime-600 w-full h-[90%] rounded-sm ms-0.5 '></div>
                            </div>
                            <div className='flex justify-center items-center col-span-2 row-span-1 border-2 border-blue-600 font-semibold'>{minStatsLvl50[4]}-{maxStatsLvl50[4]}</div>
                            <div className='flex justify-center items-center col-span-2 row-span-1 border-2 border-blue-600 font-semibold'>{minStatsLvl100[4]}-{maxStatsLvl100[4]}</div>
                            <div className='flex font-bold text-xl justify-between items-center col-span-4 row-span-1 border-2 border-blue-600'>
                                <div className='ms-2'>Speed:</div>
                                <div className='me-2'>{baseStats[5]}</div>
                            </div>
                            <div className='flex justify-start items-center col-span-8 row-span-1 border-2 border-blue-600'>
                                <div ref={speedBar} className='bg-purple-600 w-full h-[90%] rounded-sm ms-0.5 '></div>
                            </div>
                            <div className='flex justify-center items-center col-span-2 row-span-1 border-2 border-blue-600 font-semibold'>{minStatsLvl50[5]}-{maxStatsLvl50[5]}</div>
                            <div className='flex justify-center items-center col-span-2 row-span-1 border-2 border-blue-600 font-semibold'>{minStatsLvl100[5]}-{maxStatsLvl100[5]}</div>
                            <div className='flex font-bold text-xl justify-between items-center col-span-4 row-span-1 border-2 border-blue-600'>
                                <div className='ms-2'>Total:</div>
                                <div className='me-2'>{baseStatTotal}</div>    
                            </div> 
                            <div className='col-span-12 row-span-1 border-2 border-blue-600'></div>
                            <div className='grid grid-rows-2 col-span-16 row-span-2 border-2 border-blue-600 rounded-b-xl'>
                                <div className="font-semibold leading-none">Minimum stats are calculated with 0 EVs, IVs of 0, and a hindering nature.</div>
                                <div className="font-semibold leading-none">Maximum stats are calculated with 252 EVs, IVs of 31, and a helpful nature.</div>
                            </div>
                    </div>
                    <div className='grid grid-cols-1 grid-rows-14 w-1/4 h-3/4 border-4 border-blue-600 bg-blue-500 rounded-2xl'>
                        <div className='grid col-span-1 row-span-2 border-blue-600 border-b-4 font-bold text-2xl justify-center items-center'>Abilities</div>
                        <div ref={abilityBox1} className='grid grid-rows-10 grid-cols-1 col-span-1 row-span-4 border-blue-600 border-b-4'>
                            <div className='grid items-center col-span-1 row-span-3 border-b-4 border-blue-600 font-bold text-xl'>
                                <div className='ms-2'>Ability 1: {abilityName[0]}</div>
                            </div>
                            <div className='grid items-center col-span-1 row-span-7 font-semibold overflow-auto'>
                                <div className='ms-2 me-2'>{abilityDetails[0]}</div>
                            </div>
                        </div> 
                        <div ref={abilityBox2} className='grid grid-rows-10 grid-cols-1 col-span-1 row-span-4 border-b-4 border-blue-600'>
                            <div className='grid items-center col-span-1 row-span-3 font-bold text-xl border-b-4 border-blue-600'>
                                <div className='ms-2'>Ability 2: {abilityName[1]}</div>
                            </div>
                            <div className='grid items-center col-span-1 row-span-7 font-semibold overflow-auto'>
                                <div className='ms-2 me-2'>{abilityDetails[1]}</div>
                            </div>
                        </div> 
                        <div ref={abilityBox3} className='grid grid-rows-10 grid-cols-1 col-span-1 row-span-4'>
                            <div className='grid items-center col-span-1 row-span-3 font-bold text-xl border-b-4 border-blue-600'>
                                <div className='ms-2'>Ability 3: {abilityName[2]}</div>
                            </div>
                            <div className='grid items-center col-span-1 row-span-7 font-semibold overflow-auto'>
                                <div className='ms-2 me-2'>{abilityDetails[2]}</div>
                            </div>
                        </div> 
                    </div>
            </div>
            <div ref={moveBox} className='hidden'>
                <div ref={moveScroll} className='grid grid-rows-14 grid-cols-1 border-4 border-blue-600 bg-blue-500 rounded-2xl w-4/12 h-3/4'>
                    <div className="grid justify-center items-center font-bold text-3xl border-b-4 border-blue-600 row-span-2 col-span-1">Moves</div>
                    <div className='ms-8 overflow-y-scroll row-span-12 col-span-1 max-h-[100%]  font-semibold text-3xl'>
                        <MovesMap moves={moves} />
                    </div>
                </div>
                
            </div>
            <div ref={typeEffectivenessBox} className='hidden'>
                <div className='grid grid-cols-1 grid-rows-14 border-4 border-blue-600 bg-blue-500 rounded-2xl w-4/12 h-3/4'>
                    <div className="grid justify-center items-center font-bold text-2xl col-span-1 row-span-2 border-b-4 border-blue-600">Weaknesses</div>
                    <div className='grid justify-center items-start col-span-1 row-span-12 font-semibold text-xl overflow-y-auto'>
                        
                        <WeaknessMap weaknesses={weaknesses} />
                    </div>
                </div>
                <div className=' grid grid-cols-1 grid-rows-14 border-4 border-blue-600 bg-blue-500 rounded-2xl w-4/12 h-3/4'>
                    <div className="grid justify-center items-center font-bold text-2xl col-span-1 row-span-2 border-b-4 border-blue-600">Resistances</div>
                    <div className='grid justify-center items-start col-span-1 row-span-12 font-semibold text-xl overflow-y-auto'>
                        <ResistanceMap resistances={resistances} />
                    </div>
                </div>
            </div>
            <div ref={variationBox} className='hidden'>
                <div ref={regularEvolutionLine} className='hidden'>
                    <div className='flex justify-center w-full h-[45%]'>
                        <div className='grid grid-cols-1 grid-rows-14 border-4 border-blue-600 bg-blue-500 rounded-2xl h-full w-1/4'>
                            <div className='grid justify-center items-center col-span-1 row-span-2 border-b-4 border-blue-600'>{baseEvolution}</div>
                            <div style={{backgroundImage: `url(${baseEvolutionPic})`}} className='col-span-1 row-span-12 bg-no-repeat bg-cover'></div>
                        </div>
                        <div className='self-center'><i className="fa-solid fa-right-long text-5xl"></i></div>
                        <div className="grid grid-cols-1 grid-rows-14 border-4 border-blue-600 bg-blue-500 rounded-2xl h-full w-1/4">
                            <div className='grid justify-center items-center col-span-1 row-span-2 border-b-4 border-blue-600'>{secondEvolutions}</div>
                            <div style={{backgroundImage: `url(${secondEvolutionPics})`}} className='col-span-1 row-span-12 bg-no-repeat bg-cover'></div>
                        </div>
                        <div className='self-center'><i className="fa-solid fa-right-long text-5xl"></i></div>
                        <div className="grid grid-cols-1 grid-rows-14 border-4 border-blue-600 bg-blue-500 rounded-2xl h-full w-1/4">
                            <div className='grid justify-center items-center col-span-1 row-span-2 border-b-4 border-blue-600'>{thirdEvolutions}</div>
                            <div style={{backgroundImage: `url(${thirdEvolutionPics})`}} className='col-span-1 row-span-12 bg-no-repeat bg-cover'></div>
                        </div>
                    </div>
                    <div className='flex justify-center w-full h-[45%]'>
                        <div className="grid grid-cols-1 grid-rows-14 border-4 border-blue-600 bg-blue-500 rounded-2xl h-full w-1/4">
                            <div className='grid justify-center items-center col-span-1 row-span-2 border-b-4 border-blue-600'>Shiny {name}</div>
                            <div style={{backgroundImage: `url(${shinyPictures})`}} className='col-span-1 row-span-12 bg-no-repeat bg-cover'></div>
                        </div>
                    </div>
                </div>
                <div ref={twoSecondEvolutions} className=' hidden'>
                        <div className='grid grid-cols-1 grid-rows-14 row-span-10 col-span-10 col-start-4 row-start-6 col-span border-4 border-blue-600 bg-blue-500 rounded-2xl'>
                            <div className='grid justify-center items-center col-span-1 row-span-2 border-b-4 border-blue-600'>{baseEvolution}</div>
                            <div style={{backgroundImage: `url(${baseEvolutionPic})`}} className='col-span-1 row-span-12 bg-no-repeat bg-cover'></div>
                        </div>
                        <div className='col-start-14 col-end-16 row-start-7'><i className="fa-solid fa-right-long text-5xl"></i></div>
                        <div className='col-start-14 col-end-16 row-start-13'><i className="fa-solid fa-right-long text-5xl"></i></div>
                            <div className="grid grid-cols-1 grid-rows-14 row-span-7 col-span-7 col-start-16 row-start-4 border-4 border-blue-600 bg-blue-500 rounded-2xl">
                                <div className='grid justify-center items-center col-span-1 row-span-2 border-b-4 border-blue-600'>{secondEvolutions[0]}</div>
                                <div style={{backgroundImage: `url(${secondEvolutionPics[0]})`}} className='col-span-1 row-span-12 bg-no-repeat bg-cover'></div>
                            </div>
                            <div className="grid grid-cols-1 grid-rows-14 row-span-7 col-span-7 col-start-16 row-start-11 border-4 border-blue-600 bg-blue-500 rounded-2xl">
                                <div className='grid justify-center items-center col-span-1 row-span-2 border-b-4 border-blue-600'>{secondEvolutions[1]}</div>
                                <div style={{backgroundImage: `url(${secondEvolutionPics[1]})`}} className='col-span-1 row-span-12 bg-no-repeat bg-cover'></div>
                            </div>
                    
                        <div className="grid grid-cols-1 grid-rows-14 row-span-10 col-span-10 col-start-29 row-start-6 border-4 border-blue-600 bg-blue-500 rounded-2xl">
                            <div className='grid justify-center items-center col-span-1 row-span-2 border-b-4 border-blue-600'>Shiny {name}</div>
                            <div style={{backgroundImage: `url(${shinyPictures})`}} className='col-span-1 row-span-12 bg-no-repeat bg-cover'></div>
                        </div>
                    
                </div>
                <div ref={twoThirdEvolutions} className='hidden'>
                        <div className='z-20 grid grid-cols-1 grid-rows-14 row-span-10 col-span-10 col-start-1 row-start-6 col-span border-4 border-blue-600 bg-blue-500 rounded-2xl'>
                            <div className='grid justify-center items-center col-span-1 row-span-2 border-b-4 border-blue-600'>{baseEvolution}</div>
                            <div style={{backgroundImage: `url(${baseEvolutionPic})`}} className='col-span-1 row-span-12 bg-no-repeat bg-cover'></div>
                        </div>
                        <div className='z-20 grid grid-cols-1 grid-rows-14 row-span-10 col-span-10 col-start-12 row-start-6 col-span border-4 border-blue-600 bg-blue-500 rounded-2xl'>
                            <div className='grid justify-center items-center col-span-1 row-span-2 border-b-4 border-blue-600'>{secondEvolutions}</div>
                            <div style={{backgroundImage: `url(${secondEvolutionPics})`}} className='col-span-1 row-span-12 bg-no-repeat bg-cover'></div>
                        </div>
                        <div className='col-start-10 col-end-12 row-start-10 z-10'><i className="fa-solid fa-right-long text-5xl"></i></div>
                        <div className='col-start-21 col-end-23 row-start-7 z-10'><i className="fa-solid fa-right-long text-5xl"></i></div>
                        <div className='col-start-21 col-end-23 row-start-13 z-10'><i className="fa-solid fa-right-long text-5xl"></i></div>
                            <div className="grid grid-cols-1 grid-rows-14 row-span-7 col-span-7 col-start-23 row-start-4 border-4 border-blue-600 bg-blue-500 rounded-2xl">
                                <div className='grid justify-center items-center col-span-1 row-span-2 border-b-4 border-blue-600'>{thirdEvolutions[0]}</div>
                                <div style={{backgroundImage: `url(${thirdEvolutionPics[0]})`}} className='col-span-1 row-span-12 bg-no-repeat bg-cover'></div>
                            </div>
                            <div className="grid grid-cols-1 grid-rows-14 row-span-7 col-span-7 col-start-23 row-start-11 border-4 border-blue-600 bg-blue-500 rounded-2xl">
                                <div className='grid justify-center items-center col-span-1 row-span-2 border-b-4 border-blue-600'>{thirdEvolutions[1]}</div>
                                <div style={{backgroundImage: `url(${thirdEvolutionPics[1]})`}} className='col-span-1 row-span-12 bg-no-repeat bg-cover'></div>
                            </div>
                        <div className="grid grid-cols-1 grid-rows-14 row-span-10 col-span-10 col-start-31 row-start-6 border-4 border-blue-600 bg-blue-500 rounded-2xl">
                            <div className='grid justify-center items-center col-span-1 row-span-2 border-b-4 border-blue-600'>Shiny {name}</div>
                            <div style={{backgroundImage: `url(${shinyPictures})`}} className='col-span-1 row-span-12 bg-no-repeat bg-cover'></div>
                        </div>
                </div>
                <div ref={eeveeEvolution} className='hidden'>
                            <div className="grid grid-cols-1 grid-rows-14 row-span-7 col-span-7 col-start-2 row-start-7 border-4 border-blue-600 bg-blue-500 rounded-2xl">
                                <div className='grid justify-center items-center col-span-1 row-span-2 border-b-4 border-blue-600'>{baseEvolution}</div>
                                <div style={{backgroundImage: `url(${baseEvolutionPic})`}} className='col-span-1 row-span-12 bg-no-repeat bg-cover'></div>
                            </div>

                            <div className='col-start-9 row-start-9'><i className="fa-solid fa-right-long text-7xl"></i></div>

                            <div className="grid grid-cols-1 grid-rows-14 row-span-6 col-span-6 col-start-18 row-start-4 border-4 border-blue-600 bg-blue-500 ">
                                <div className='flex justify-center items-center col-span-1 row-span-2 border-b-4 border-blue-600'>{secondEvolutions[1]}</div>
                                <div style={{backgroundImage: `url(${secondEvolutionPics[1]})`}} className='col-span-1 row-span-12 bg-no-repeat bg-cover'></div>
                            </div>
                            <div className="grid grid-cols-1 grid-rows-14 row-span-6 col-span-6 col-start-18 row-start-10 border-4 border-blue-600 bg-blue-500 ">
                                <div className='flex justify-center items-center col-span-1 row-span-2 border-b-4 border-blue-600'>{secondEvolutions[2]}</div>
                                <div style={{backgroundImage: `url(${secondEvolutionPics[2]})`}} className='col-span-1 row-span-12 bg-no-repeat bg-cover'></div>
                            </div>
                            <div className="grid grid-cols-1 grid-rows-14 row-span-6 col-span-6 col-start-24 row-start-4 border-4 border-blue-600 bg-blue-500 rounded-tr-2xl">
                                <div className='flex justify-center items-center col-span-1 row-span-2 border-b-4 border-blue-600'>{secondEvolutions[3]}</div>
                                <div style={{backgroundImage: `url(${secondEvolutionPics[3]})`}} className='col-span-1 row-span-12 bg-no-repeat bg-cover'></div>
                            </div>
                            <div className="grid grid-cols-1 grid-rows-14 row-span-6 col-span-6 col-start-24 row-start-10 border-4 border-blue-600 bg-blue-500 rounded-br-2xl">
                                <div className='flex justify-center items-center col-span-1 row-span-2 border-b-4 border-blue-600'>{secondEvolutions[4]}</div>
                                <div style={{backgroundImage: `url(${secondEvolutionPics[4]})`}} className='col-span-1 row-span-12 bg-no-repeat bg-cover'></div>
                            </div>
                            <div className="grid grid-cols-1 grid-rows-14 row-span-6 col-span-6 col-start-12 row-start-4 border-4 border-blue-600 bg-blue-500 rounded-tl-2xl">
                                <div className='flex justify-center items-center col-span-1 row-span-2 border-b-4 border-blue-600'>{secondEvolutions[5]}</div>
                                <div style={{backgroundImage: `url(${secondEvolutionPics[5]})`}} className='col-span-1 row-span-12 bg-no-repeat bg-cover'></div>
                            </div>
                            <div className="grid grid-cols-1 grid-rows-14 row-span-6 col-span-6 col-start-12 row-start-10 border-4 border-blue-600 bg-blue-500 rounded-bl-2xl">
                                <div className='flex justify-center items-center col-span-1 row-span-2 border-b-4 border-blue-600'>{secondEvolutions[6]}</div>
                                <div style={{backgroundImage: `url(${secondEvolutionPics[6]})`}} className='col-span-1 row-span-12 bg-no-repeat bg-cover'></div>
                            </div>
                            <div className="grid grid-cols-1 grid-rows-14 row-span-6 col-span-6 col-start-15 row-start-16 border-4 border-blue-600 bg-blue-500 rounded-bl-2xl ">
                                <div className='flex justify-center items-center col-span-1 row-span-2 border-b-4 border-blue-600'>{secondEvolutions[7]}</div>
                                <div style={{backgroundImage: `url(${secondEvolutionPics[7]})`}} className='col-span-1 row-span-12 bg-no-repeat bg-cover'></div>
                            </div>
                            <div className="grid grid-cols-1 grid-rows-14 row-span-6 col-span-6 col-start-21 row-start-16 border-4 border-blue-600 bg-blue-500 rounded-br-2xl">
                                <div className='flex justify-center items-center col-span-1 row-span-2 border-b-4 border-blue-600'>{secondEvolutions[0]}</div>
                                <div style={{backgroundImage: `url(${secondEvolutionPics[0]})`}} className='col-span-1 row-span-12 bg-no-repeat bg-cover'></div>
                            </div>
                        <div className="grid grid-cols-1 grid-rows-14 row-span-7 col-span-7 col-start-33 row-start-7 border-4 border-blue-600 bg-blue-500 rounded-2xl">
                            <div className='grid justify-center items-center col-span-1 row-span-2 border-b-4 border-blue-600'>Shiny {name}</div>
                            <div style={{backgroundImage: `url(${shinyPictures})`}} className='col-span-1 row-span-12 bg-no-repeat bg-cover'></div>
                        </div>
                </div>
                <div ref={twoEvolutions} className='hidden'>
                    <div className='flex justify-center w-full h-[45%]'>
                        <div className='grid grid-cols-1 grid-rows-14 border-4 border-blue-600 bg-blue-500 rounded-2xl h-full w-1/4'>
                            <div className='grid justify-center items-center col-span-1 row-span-2 border-b-4 border-blue-600'>{baseEvolution}</div>
                            <div style={{backgroundImage: `url(${baseEvolutionPic})`}} className='col-span-1 row-span-12 bg-no-repeat bg-cover'></div>
                        </div>
                        <div className='self-center'><i className="fa-solid fa-right-long text-5xl"></i></div>
                        <div className="grid grid-cols-1 grid-rows-14 border-4 border-blue-600 bg-blue-500 rounded-2xl h-full w-1/4">
                            <div className='grid justify-center items-center col-span-1 row-span-2 border-b-4 border-blue-600'>{secondEvolutions}</div>
                            <div style={{backgroundImage: `url(${secondEvolutionPics})`}} className='col-span-1 row-span-12 bg-no-repeat bg-cover'></div>
                        </div>
                        
                    </div>
                    <div className='flex justify-center w-full h-[45%]'>
                        <div className="grid grid-cols-1 grid-rows-14 border-4 border-blue-600 bg-blue-500 rounded-2xl h-full w-1/4">
                            <div className='grid justify-center items-center col-span-1 row-span-2 border-b-4 border-blue-600'>Shiny {name}</div>
                            <div style={{backgroundImage: `url(${shinyPictures})`}} className='col-span-1 row-span-12 bg-no-repeat bg-cover'></div>
                        </div>
                    </div>
                </div>

                <div ref={oneEvolution} className='flex flex-col justify-around w-full h-full'>
                    <div className='flex justify-center w-full h-[45%]'>
                        <div className='grid grid-cols-1 grid-rows-14 border-4 border-blue-600 bg-blue-500 rounded-2xl h-full w-1/4'>
                            <div className='grid justify-center items-center col-span-1 row-span-2 border-b-4 border-blue-600'>{baseEvolution}</div>
                            <div style={{backgroundImage: `url(${baseEvolutionPic})`}} className='col-span-1 row-span-12 bg-no-repeat bg-cover'></div>
                        </div>                        
                    </div>
                    <div className='flex justify-center w-full h-[45%]'>
                        <div className="grid grid-cols-1 grid-rows-14 border-4 border-blue-600 bg-blue-500 rounded-2xl h-full w-1/4">
                            <div className='grid justify-center items-center col-span-1 row-span-2 border-b-4 border-blue-600'>Shiny {name}</div>
                            <div style={{backgroundImage: `url(${shinyPictures})`}} className='col-span-1 row-span-12 bg-no-repeat bg-cover'></div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default ExtendedPokeStats