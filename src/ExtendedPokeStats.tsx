import {useState, useEffect, useRef} from 'react'
import { v4 as uuidv4 } from 'uuid'





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


interface Props{
    extendedPokeInfo: ExtendedPokeInfo
    loadingBool: boolean
}

interface MinMaxes {
    minLvl50: number
    maxLvl50: number
    minLvl100: number
    maxLvl100: number

}

interface StatRange {
    hp: MinMaxes,
    attack: MinMaxes,
    defense: MinMaxes,
    specialAttack: MinMaxes,
    specialDefense: MinMaxes,
    speed: MinMaxes
    baseStatTotal: number
}

interface StatBarRatio {
    hp: number
    attack: number
    defense: number
    specialAttack: number
    specialDefense: number
    speed: number

}



function ExtendedPokeStats({extendedPokeInfo, loadingBool}: Props) {
    
    const {stats, abilities, moves, types, baseEvolution, baseEvolutionPic, secondEvolutions, secondEvolutionPics, thirdEvolutions, thirdEvolutionPics, name, shinyPictures} = extendedPokeInfo
    const [display, setDisplay] = useState<string>('stats')

    const changeExtendedDisplay = (choice: string) => {
        setDisplay(choice)
    }

   
    {/* functions to change extended stats tab */}
 
    const [weaknesses, setWeaknesses] = useState<Array<string>>([])
    const [resistances, setresistances] = useState<Array<string>>([])

    useEffect(()=>{
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




    {/* function for setting type effectiveness display */}
    if(types.type2 === ''){
        if(types.type1 === 'normal'){
            setWeaknesses([fighting + effective])
            setresistances([ghost + immune])
        } else if(types.type1 === 'fire'){
            setWeaknesses([water + effective, ground + effective, rock + effective])
            setresistances([fire + weak, grass + weak, ice + weak, steel + weak, fairy + weak])
        } else if(types.type1 === 'water'){
            setWeaknesses([grass + effective, electric + effective])
            setresistances([fire + weak, water + weak, ice + weak, steel + weak])
        } else if(types.type1 === 'grass'){
            setWeaknesses([fire + effective, ice + effective, poison + effective, flying + effective, bug + effective])
            setresistances([water + weak, grass + weak, electric + weak, ground + weak])
        } else if(types.type1 === 'electric'){
            setWeaknesses([ground + effective])
            setresistances([electric + weak, flying + weak, steel + weak])
        } else if(types.type1 === 'ice'){
            setWeaknesses([fire + effective, fighting + effective, rock + effective, steel + effective])
            setresistances([ice + weak])
        } else if(types.type1 === 'fighting'){
            setWeaknesses([flying + effective, psychic + effective, fairy + effective])
            setresistances([bug + weak, rock + weak, dark + weak])
        } else if(types.type1 === 'poison'){
            setWeaknesses([ground + effective, psychic + effective])
            setresistances([grass + weak, fighting + weak, poison + weak, bug + weak, fairy + weak])
        } else if(types.type1 === 'ground'){
            setWeaknesses([water + effective, grass, ice + effective])
            setresistances([electric + immune, poison + weak, rock])
        } else if(types.type1 === 'flying'){
            setWeaknesses([electric + effective, ice + effective, rock + effective])
            setresistances([grass + weak, fighting + weak, bug + weak])
        } else if(types.type1 === 'psychic'){
            setWeaknesses([bug + effective, ghost + effective, dark + effective])
            setresistances([fighting + weak, psychic + weak])
        } else if(types.type1 === 'bug'){
            setWeaknesses([fire + effective, flying + effective, rock + effective])
            setresistances([grass + weak, fighting + weak, ground + weak])
        } else if(types.type1 === 'rock'){
            setWeaknesses([water + effective, grass + effective, fighting + effective, ground + effective, steel + effective])
            setresistances([normal + weak, fire + weak, poison + weak, flying + weak])
        } else if(types.type1 === 'ghost'){
            setWeaknesses([ghost + effective, dark + effective])
            setresistances([normal + immune, fighting + immune, poison + weak, bug + weak])
        } else if(types.type1 === 'dragon'){
            setWeaknesses([ice + effective, dragon + effective, fairy + effective])
            setresistances([fire + weak, water + weak, grass + weak, electric + weak])
        } else if(types.type1 === 'dark'){
            setWeaknesses([fighting + effective, bug + effective, fairy + effective])
            setresistances([psychic + immune, ghost + weak, dark + weak])
        } else if(types.type1 === 'steel'){
            setWeaknesses([fire + effective, fighting + effective, ground + effective])
            setresistances([normal + weak, grass + weak, ice + weak, poison + immune, flying + weak, psychic + weak, bug + weak, rock + weak, dragon + weak, steel + weak, fairy + weak])
        } else if(types.type1 === 'fairy'){
            setWeaknesses([poison + effective, steel + effective])
            setresistances([fighting + weak, bug + weak, dragon + immune, steel + weak])
        }

    } else {
        if(types.type1 === 'grass' || types.type2 === 'grass'){
            if(types.type2 === 'poison'){
                setWeaknesses([flying + effective,fire + effective,psychic + effective,ice + effective])
                setresistances([fighting + weak,water + weak,electric + weak,fairy + weak, grass + superWeak])
            }  else if(types.type2 === 'pyschic'){
                setWeaknesses([bug + superEffective, flying + effective, poison + effective, ghost + effective, fire + effective, ice + effective, dark + effective])
                setresistances([fighting + weak, ground + weak, water + weak, grass + weak, electric + weak, psychic + weak])
            } else if(types.type1 === 'bug'){
                setWeaknesses([flying + superEffective, fire + superEffective, poison + effective, rock + effective, bug + effective, ice + effective])
                setresistances([fighting + weak, water + weak, electric + weak, ground + superWeak, grass + superWeak])
            }
        } else if(types.type1 === 'fire' && types.type2 === 'flying'){
            setWeaknesses([rock + superEffective, water + effective, electric + effective])
            setresistances([fighting + weak, steel + weak, fire + weak, fairy + weak, bug + superWeak, grass + superWeak, ground + immune])
        } else if(types.type1 === 'bug'){
            if(types.type2 === 'flying'){
                setWeaknesses([rock + superEffective, flying + effective, fire + effective, electric + effective, ice + effective])
                setresistances([bug + weak, fighting + superWeak, grass + superWeak, ground + immune])
            } else if(types.type2 === 'poison'){
                setWeaknesses([flying + effective, rock + effective, fire + effective, psychic + effective])
                setresistances([poison + weak, bug + weak, fairy + weak, fighting + superWeak, grass + superWeak])
            }
        }else if(types.type1 === 'normal' || types.type2 === 'normal'){
            if(types.type1 === 'flying' || types.type2 === 'flying'){
                setWeaknesses([rock + effective, electric + effective, ice + effective])
                setresistances([bug + weak, grass + weak, ground + immune, ghost + immune])
            } else if(types.type1 === 'fairy' || types.type2 === 'fairy'){
                setWeaknesses([poison + effective, steel + effective])
                setresistances([bug + weak, dark + weak, ghost + immune, dragon + immune])
            }
        } else if(types.type1 === 'poison' || types.type2 === 'poison'){
            if(types.type1 === 'ground' || types.type2 === 'ground'){
                setWeaknesses([ground + effective, water + effective, psychic + effective, ice + effective])
                setresistances([fighting + weak, rock + weak, bug + weak, fairy + weak, poison + superWeak, electric + immune])
            }else if(types.type1 === 'flying' || types.type2 === 'flying'){
                setWeaknesses([rock + effective, electric + effective, psychic + effective, ice + effective])
                setresistances([poison + weak, fairy + weak, fighting + superWeak, bug + superWeak, grass + superWeak, ground + immune])
            }else if(types.type1 === 'water' || types.type2 === 'water'){
                setWeaknesses([ground + effective, electric + effective, psychic + effective])
                setresistances([fighting + weak, poison + weak, bug + weak, steel + weak, fire + weak, water + weak, ice + weak, fairy + weak])
            } else if(types.type1 === 'ghost' || types.type2 === 'ghost'){
                setWeaknesses([ground + effective, ghost + effective, psychic + effective, dark + effective])
                setresistances([grass + weak, fairy + weak, poison + superWeak, bug + superWeak, normal + immune, fighting + immune])
            }
        } else if(types.type1 === 'water' || types.type2 === 'water'){
            if(types.type1 === 'fighting' || types.type2 === 'fighting'){
                setWeaknesses([flying + effective, grass + effective, electric + effective, psychic + effective, fairy + effective])
                setresistances([rock + weak, bug + weak, steel + weak, fire + weak, water + weak, ice + weak, dark + weak])
            }else if(types.type1 === 'psychic' || types.type2 === 'psychic'){
                setWeaknesses([bug + effective, ghost + effective, grass + effective, electric + effective, dark + effective])
                setresistances([fighting + weak, steel + weak, fire + weak, water + weak, psychic + weak, ice + weak])
            }else if(types.type1 === 'ice' || types.type2 === 'ice'){
                setWeaknesses([fighting + effective, rock + effective, grass + effective, electric + effective])
                setresistances([water + weak, ice + superWeak])
            }else if(types.type1 === 'flying' || types.type2 === 'flying'){
                setWeaknesses([electric + superEffective, rock + effective])
                setresistances([fighting + weak, bug + weak, steel + weak, fire + weak, water + weak, ground + immune])
            }else if(types.type1 === 'rock' || types.type2 === 'rock'){
                setWeaknesses([grass + superEffective, fighting + effective, ground + effective, electric + effective])
                setresistances([normal + weak, flying + weak, poison + weak, ice + weak, fire + superWeak])
            }
        } else if(types.type1 === 'rock' || types.type2 === 'rock'){
            if(types.type1 === 'ground' || types.type2 === 'ground'){
                setWeaknesses([water + superEffective, grass + superEffective, fighting + effective, ground + effective, steel + effective, ice + effective])
                setresistances([normal + weak, flying + weak, rock + weak, fire + weak, poison + superWeak, electric + immune])
            }else if(types.type1 === 'flying' || types.type2 === 'flying'){
                setWeaknesses([rock + effective, steel + effective, water + effective, electric + effective, ice + effective])
                setresistances([normal + weak, flying + weak, poison + weak, bug + weak, fire + weak, ground + immune])
            }
        } else if(types.type1 === 'electric' || types.type2 === 'electric'){
            if(types.type1 === 'steel' || types.type2 === 'steel'){
                setWeaknesses([ground + superEffective, fighting + effective, fire + effective])
                setresistances([normal + weak, rock + weak, bug + weak, grass + weak, electric + weak, psychic + weak, ice + weak, dragon + weak, fairy + weak, flying + superWeak, steel + superWeak, poison + immune])
            } else if(types.type1 === 'flying' || types.type2 === 'flying'){
                setWeaknesses([rock + effective, ice + effective])
                setresistances([fighting + weak, flying + weak, bug + weak, steel + weak, grass + weak, ground + immune])
            }
        } else if(types.type1 === 'psychic' || types.type2 === 'psychic'){
            if(types.type1 === 'fairy' || types.type2 === 'fairy'){
                setWeaknesses([poison + effective, ghost + effective, steel + effective])
                setresistances([psychic + weak, fighting + superWeak, dragon + immune])
            }
        } else if(types.type1 === 'flying' || types.type2 === 'flying'){
            if(types.type1 === 'ice' || types.type2 === 'ice'){
                setWeaknesses([rock + superEffective, steel + effective, fire + effective, electric + effective])
                setresistances([bug + weak, grass + weak, ground + immune])
            } else if(types.type1 === 'dragon' || types.type2 === 'dragon'){
                setWeaknesses([ice + superEffective, rock + effective, dragon + effective, fairy + effective])
                setresistances([fighting + weak, bug + weak, fire + weak, water + weak, grass + superWeak, ground + immune])
            }
        } else if(types.type1 === 'ice' || types.type2 === 'ice'){
            if(types.type1 === 'psychic' || types.type2 === 'psychic'){
                setWeaknesses([rock + effective, bug + effective, ghost + effective, steel + effective, fire + effective, dark + effective])
                setresistances([psychic + weak, ice + weak])
            }
        }
    }
    },[extendedPokeInfo, types.type1, types.type2])
    
    {/* function for resetting scroll on moves tab */}
    const moveScroll = useRef<HTMLDivElement>(null)
    useEffect(()=>{
    if(moveScroll.current){
        moveScroll.current.scrollTop = 0
    }
    },[extendedPokeInfo])

    {/* variables for abilities box on stats and abilities tab */}




    {/* function for grabbing abilities and setting abilities display */}

    const hpBar = useRef<HTMLDivElement>(null)
    const attackBar = useRef<HTMLDivElement>(null)
    const defenseBar = useRef<HTMLDivElement>(null)
    const specialAttackBar = useRef<HTMLDivElement>(null)
    const specialDefenseBar = useRef<HTMLDivElement>(null)
    const speedBar = useRef<HTMLDivElement>(null)

    const [statMinMaxes, setStatMinMaxes] = useState<StatRange>({
        hp: {
            minLvl50: 0,
            maxLvl50: 0,
            minLvl100: 0,
            maxLvl100: 0
        },
        attack: {
            minLvl50: 0,
            maxLvl50: 0,
            minLvl100: 0,
            maxLvl100: 0
        },
        defense: {
            minLvl50: 0,
            maxLvl50: 0,
            minLvl100: 0,
            maxLvl100: 0
        },
        specialAttack: {
            minLvl50: 0,
            maxLvl50: 0,
            minLvl100: 0,
            maxLvl100: 0
        },
        specialDefense: {
            minLvl50: 0,
            maxLvl50: 0,
            minLvl100: 0,
            maxLvl100: 0
        },
        speed: {
            minLvl50: 0,
            maxLvl50: 0,
            minLvl100: 0,
            maxLvl100: 0
        },
        baseStatTotal: 0
    })

    const statBarRatio = useRef<StatBarRatio>({
        hp: 0,
        attack: 0,
        defense: 0,
        specialAttack: 0,
        specialDefense: 0,
        speed: 0
    })




    useEffect(() => {


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



    let baseStatTotal:number = 0

    {/* functions to set display for stats in extended stats */}
    if(stats.hp !== 0){
    baseStatTotal = stats.hp + stats.attack + stats.defense + stats.specialAttack + stats.specialDefense + stats.speed
    }
    const hpRatio = (Number((stats.hp / (pokeMaxHp - pokeMinHp)).toFixed(2)) * 100)
    const attackRatio = (Number((stats.attack / (pokeMaxAttack - pokeMinAttack)).toFixed(2)) * 100)
    const defenseRatio = (Number((stats.defense / (pokeMaxDefense - pokeMinDefense)).toFixed(2)) * 100)
    const spAttackRatio = (Number((stats.specialAttack / (pokeMaxSpAttack - pokeMinSpAttack)).toFixed(2)) * 100)
    const spDefenseRatio = (Number((stats.hp / (pokeMaxHpSpDefense - pokeMinSpDefense)).toFixed(2)) * 100)
    const speedRatio = (Number((stats.hp / (pokeMaxSpeed - pokeMinSpeed)).toFixed(2)) * 100)

    statBarRatio.current = {
        hp: hpRatio,
        attack: attackRatio,
        defense: defenseRatio,
        specialAttack: spAttackRatio,
        specialDefense: spDefenseRatio,
        speed: speedRatio
    }




    for(const stat in stats){
        if(stat === "hp"){
            const hpStatCalculatorMinLvl50 = Math.floor((((stats[stat] * 2) * 50) / 100) + 50 + 10)
            const hpStatCalculatorMaxLvl50 = Math.floor(((((stats[stat] * 2) + 31 + (252/4)) * 50) / 100) + 50 + 10)
            const hpStatCalculatorMinLvl100 = Math.floor((((stats[stat] * 2) * 100) / 100) + 100 + 10)
            const hpStatCalculatorMaxLvl00 = Math.floor(((((stats[stat] * 2) + 31 + (252/4)) * 100) / 100) + 100 + 10)
            minStatsLvl50.push(hpStatCalculatorMinLvl50)
            maxStatsLvl50.push(hpStatCalculatorMaxLvl50)
            minStatsLvl100.push(hpStatCalculatorMinLvl100)
            maxStatsLvl100.push(hpStatCalculatorMaxLvl00)
        } else if(stat === "attack" || stat === "defense" || stat === "specialAttack" || stat === "specialDefense" || stat === "speed") {
            const statCalculatorMinLvl50 = Math.floor(((((stats[stat] * 2) * 50) / 100) + 5) - (((((stats[stat] * 2) * 50) / 100) + 5) / 10))
            const statCalculatorMaxLvl50 = Math.floor((((((stats[stat] * 2) + 31 + (252/4)) * 50) / 100) + 5) + ((((((stats[stat] * 2) + 31 + (252/4)) * 50) / 100) + 5) / 10))
            const statCalculatorMinLvl100 = Math.floor(((((stats[stat] * 2) * 100) / 100) + 5) - (((((stats[stat] * 2) * 100) / 100) + 5) / 10))
            const statCalculatorMaxLvl00 = Math.floor((((((stats[stat] * 2) + 31 + (252/4)) * 100) / 100) + 5) + ((((((stats[stat] * 2) + 31 + (252/4)) * 100) / 100) + 5) / 10))
            minStatsLvl50.push(statCalculatorMinLvl50)
            maxStatsLvl50.push(statCalculatorMaxLvl50)
            minStatsLvl100.push(statCalculatorMinLvl100)
            maxStatsLvl100.push(statCalculatorMaxLvl00)
        }
    }
    setStatMinMaxes({
        hp: {
            minLvl50: minStatsLvl50[0],
            maxLvl50: maxStatsLvl50[0],
            minLvl100: minStatsLvl100[0],
            maxLvl100: maxStatsLvl100[0]
        },
        attack: {
            minLvl50: minStatsLvl50[1],
            maxLvl50: maxStatsLvl50[1],
            minLvl100: minStatsLvl100[1],
            maxLvl100: maxStatsLvl100[1]
        },
        defense: {
            minLvl50: minStatsLvl50[2],
            maxLvl50: maxStatsLvl50[2],
            minLvl100: minStatsLvl100[2],
            maxLvl100: maxStatsLvl100[2]
        },
        specialAttack: {
            minLvl50: minStatsLvl50[3],
            maxLvl50: maxStatsLvl50[3],
            minLvl100: minStatsLvl100[3],
            maxLvl100: maxStatsLvl100[3]
        },
        specialDefense: {
            minLvl50: minStatsLvl50[4],
            maxLvl50: maxStatsLvl50[4],
            minLvl100: minStatsLvl100[4],
            maxLvl100: maxStatsLvl100[4]
        },
        speed: {
            minLvl50: minStatsLvl50[5],
            maxLvl50: maxStatsLvl50[5],
            minLvl100: minStatsLvl100[5],
            maxLvl100: maxStatsLvl100[5]
        },
        baseStatTotal: baseStatTotal
    })
    }, [extendedPokeInfo, stats])

    useEffect(() => {
        if(hpBar.current && attackBar.current && defenseBar.current && specialAttackBar.current && specialDefenseBar.current && speedBar.current && stats.hp !== 0){
            hpBar.current.style.width = `${statBarRatio.current.hp}%`
            attackBar.current.style.width = `${statBarRatio.current.attack}%`
            defenseBar.current.style.width = `${statBarRatio.current.defense}%`
            specialAttackBar.current.style.width = `${statBarRatio.current.specialAttack}%`
            specialDefenseBar.current.style.width = `${statBarRatio.current.specialDefense}%`
            speedBar.current.style.width = `${statBarRatio.current.speed}%`
        }
    }, [display, extendedPokeInfo, stats.hp])








    
    return (
        <div className="flex flex-col  h-[94.25%] md:max-h-[94.25%] w-full ">
            <div className='flex w-full h-[10%] bg-gradient-to-r from-cyan-500 to-blue-600'>
                    <div onClick={() => {changeExtendedDisplay('stats')}} className='  flex w-[25%] h-[100%] justify-center items-end font-semibold md:text-2xl  border-b-2 border-e-2 border-black  '>
                        <div className=' w-1/2 flex justify-center items-end'>
                            Stats and Abilities
                        </div>
                    </div>
                    <div onClick={() => {changeExtendedDisplay('moves')}} className=' flex w-[25%] h-[100%] justify-center items-end font-semibold md:text-2xl  border-b-2 border-e-2 border-black ' >
                        <div className=' w-1/2 h-[100%] flex justify-center items-end'>Moves</div>
                    </div>
                    <div onClick={() => {changeExtendedDisplay('typeMatch')}} className='flex w-[25%] h-[100%] justify-center items-end font-semibold md:text-2xl  border-b-2 border-e-2 border-black '>
                        <div className=' w-1/2 flex justify-center items-end'>Type Effectiveness</div>
                    </div>
                    <div onClick={() => {changeExtendedDisplay('variations')}} className='flex w-[25%] h-[100%] justify-center items-end font-semibold md:text-2xl  border-b-2 border-black '>
                        <div className=' w-3/4 flex justify-center text-[1em] items-end' >Variations & Evolutions</div>
                    </div>
            </div>


            {display === 'stats' ? (
            <div  className='flex md:flex-row md:min-h-[90%] sm:min-h-fit flex-col justify-around items-center gap-y-10 py-10 md:gap-y-0 md:py-0 bg-black bg-opacity-80 border-t-2 border-b-4 border-s-4 border-e-4 rounded-b-2xl border-black'>

                {loadingBool ? (<>Loading . . .</>) : (<>

                    <div className='grid grid-rows-11 grid-cols-16 border-2 border-blue-600 bg-blue-500 rounded-2xl md:w-8/12 w-[95%] h-1/2 md:h-3/4'>
                        <div className='grid justify-center items-center col-span-12 row-span-2 border-2 border-blue-600 rounded-tl-xl font-bold text-2xl'>Stats</div>
                            <div className='grid justify-center items-center col-span-4 row-span-1 border-2 border-blue-600 rounded-tr-xl font-bold text-xl'>Range</div>
                            <div className='grid justify-center items-center col-span-2 row-span-1 border-2 border-blue-600 font-bold text-xs md:text-base'>At Lv. 50</div>
                            <div className='grid justify-center items-center col-span-2 row-span-1 border-2 border-blue-600 font-bold text-xs md:text-base'>At lv. 100</div>
                            <div className='flex font-bold text-xl justify-between items-center col-span-4 row-span-1 border-2 border-blue-600'>
                                <div className='ms-2 text-base md:text-xl'>HP:</div>
                                <div className='me-2'>{stats.hp}</div>
                            </div>
                            <div className='flex justify-start items-center col-span-8 row-span-1 border-2 border-blue-600'>
                                <div ref={hpBar} className='w-full h-[90%] bg-red-600  rounded-sm ms-0.5 '></div>
                            </div>
                            <div className='flex justify-center items-center col-span-2 row-span-1 border-2 border-blue-600 font-semibold text-sm md:text-base'>{statMinMaxes.hp.minLvl50}-{statMinMaxes.hp.maxLvl50}</div>
                            <div className='flex justify-center items-center col-span-2 row-span-1 border-2 border-blue-600 font-semibold text-sm md:text-base'>{statMinMaxes.hp.minLvl100}-{statMinMaxes.hp.maxLvl100}</div>
                            <div className='flex font-bold text-xl justify-between items-center col-span-4 row-span-1 border-2 border-blue-600'>
                                <div className='ms-2 text-base md:text-xl'>Attack:</div>
                                <div className='me-2'>{stats.attack}</div>
                            </div>
                            <div className='flex  justify-start items-center w-full h-full col-span-8 row-span-1 border-2 border-blue-600'>
                                <div ref={attackBar} className='bg-orange-600 w-full h-[90%] rounded-sm ms-0.5 '></div>
                            </div>
                            <div className='flex justify-center items-center col-span-2 row-span-1 border-2 border-blue-600 font-semibold text-sm md:text-base'>{statMinMaxes.attack.minLvl50}-{statMinMaxes.attack.maxLvl50}</div>
                            <div className='flex justify-center items-center col-span-2 row-span-1 border-2 border-blue-600 font-semibold text-sm md:text-base'>{statMinMaxes.attack.minLvl100}-{statMinMaxes.attack.maxLvl100}</div>
                            <div className='flex font-bold text-xl justify-between items-center col-span-4 row-span-1 border-2 border-blue-600'>
                                <div className='ms-2 text-base md:text-xl'>Defense:</div>
                                <div className='me-2'>{stats.defense}</div>
                            </div>
                            <div className='flex justify-start items-center col-span-8 row-span-1 border-2 border-blue-600'>
                                <div ref={defenseBar} className='bg-yellow-600 w-full h-[90%]  rounded-sm ms-0.5 '></div>
                            </div>
                            <div className='flex justify-center items-center col-span-2 row-span-1 border-2 border-blue-600 font-semibold text-sm md:text-base'>{statMinMaxes.defense.minLvl50}-{statMinMaxes.defense.maxLvl50}</div>
                            <div className='flex justify-center items-center col-span-2 row-span-1 border-2 border-blue-600 font-semibold text-sm md:text-base'>{statMinMaxes.defense.minLvl100}-{statMinMaxes.defense.maxLvl100}</div>
                            <div className='flex font-bold text-xl justify-between items-center col-span-4 row-span-1 border-2 border-blue-600'>
                                <div className='ms-2 text-base md:text-xl'>Sp. Atk:</div>
                                <div className='me-2'>{stats.specialAttack}</div>
                            </div>
                            <div className='flex justify-start items-center col-span-8 row-span-1 border-2 border-blue-600'>
                                <div ref={specialAttackBar} className='bg-blue-600 w-full h-[90%] rounded-sm ms-0.5 '></div>
                            </div>
                            <div className='flex justify-center items-center col-span-2 row-span-1 border-2 border-blue-600 font-semibold text-sm md:text-base'>{statMinMaxes.specialAttack.minLvl50}-{statMinMaxes.specialAttack.maxLvl50}</div>
                            <div className='flex justify-center items-center col-span-2 row-span-1 border-2 border-blue-600 font-semibold text-sm md:text-base'>{statMinMaxes.specialAttack.minLvl100}-{statMinMaxes.specialAttack.maxLvl100}</div>
                            <div className='flex font-bold text-xl justify-between items-center col-span-4 row-span-1 border-2 border-blue-600'>
                                <div className='ms-2 text-base md:text-xl'>Sp. Def:</div>
                                <div className='me-2'>{stats.specialDefense}</div>
                            </div>
                            <div className='flex justify-start items-center col-span-8 row-span-1 border-2 border-blue-600'>
                                <div ref={specialDefenseBar} className='bg-lime-600 w-full h-[90%] rounded-sm ms-0.5 '></div>
                            </div>
                            <div className='flex justify-center items-center col-span-2 row-span-1 border-2 border-blue-600 font-semibold text-sm md:text-base'>{statMinMaxes.specialDefense.minLvl50}-{statMinMaxes.specialDefense.maxLvl50}</div>
                            <div className='flex justify-center items-center col-span-2 row-span-1 border-2 border-blue-600 font-semibold text-sm md:text-base'>{statMinMaxes.specialDefense.minLvl100}-{statMinMaxes.specialDefense.maxLvl100}</div>
                            <div className='flex font-bold text-xl justify-between items-center col-span-4 row-span-1 border-2 border-blue-600'>
                                <div className='ms-2 text-base md:text-xl'>Speed:</div>
                                <div className='me-2'>{stats.speed}</div>
                            </div>
                            <div className='flex justify-start items-center col-span-8 row-span-1 border-2 border-blue-600'>
                                <div ref={speedBar} className='bg-purple-600 w-full h-[90%] rounded-sm ms-0.5 '></div>
                            </div>
                            <div className='flex justify-center items-center col-span-2 row-span-1 border-2 border-blue-600 font-semibold text-sm md:text-base'>{statMinMaxes.speed.minLvl50}-{statMinMaxes.speed.maxLvl50}</div>
                            <div className='flex justify-center items-center col-span-2 row-span-1 border-2 border-blue-600 font-semibold text-sm md:text-base'>{statMinMaxes.speed.minLvl100}-{statMinMaxes.speed.maxLvl100}</div>
                            <div className='flex font-bold text-xl justify-between items-center col-span-4 row-span-1 border-2 border-blue-600'>
                                <div className='ms-2'>Total:</div>
                                <div className='me-2'>{statMinMaxes.baseStatTotal}</div>    
                            </div> 
                            <div className='col-span-12 row-span-1 border-2 border-blue-600'></div>
                            <div className='grid grid-rows-2 col-span-16 row-span-2 border-2 border-blue-600 rounded-b-xl'>
                                <div className="font-semibold leading-none text-xs md:text-base">Minimum stats are calculated with 0 EVs, IVs of 0, and a hindering nature.</div>
                                <div className="font-semibold leading-none text-xs md:text-base">Maximum stats are calculated with 252 EVs, IVs of 31, and a helpful nature.</div>
                            </div>
                    </div>

                    <div className='grid grid-cols-1 grid-rows-14 md:w-1/4 w-[95%] h-3/4 border-4 border-blue-600 bg-blue-500 rounded-2xl'>
                        <div className='grid col-span-1 row-span-2 border-blue-600 border-b-4 font-bold text-2xl justify-center items-center'>Abilities</div>
                        
                        {abilities.length === 3 ? (
                            <>
                                <div  className='grid grid-rows-10 grid-cols-1 col-span-1 row-span-4 border-blue-600 border-b-4'>
                                    <div className='grid items-center col-span-1 row-span-3 border-b-4 border-blue-600 font-bold text-xl'>
                                        <div className='ms-2'>Ability 1: {abilities[0].ability}</div>
                                    </div>
                                    <div className='grid items-center col-span-1 row-span-7 font-semibold overflow-auto'>
                                        <div className='ms-2 me-2'>{abilities[0].abilityDetails}</div>
                                    </div>
                                </div> 
                                <div className='grid grid-rows-10 grid-cols-1 col-span-1 row-span-4 border-b-4 border-blue-600'>
                                    <div className='grid items-center col-span-1 row-span-3 font-bold text-xl border-b-4 border-blue-600'>
                                        <div className='ms-2'>Ability 2: {abilities[1].ability}</div>
                                    </div>
                                    <div className='grid items-center col-span-1 row-span-7 font-semibold overflow-auto'>
                                        <div className='ms-2 me-2'>{abilities[1].abilityDetails}</div>
                                    </div>
                                </div> 
                                <div  className='grid grid-rows-10 grid-cols-1 col-span-1 row-span-4'>
                                    <div className='grid items-center col-span-1 row-span-3 font-bold text-xl border-b-4 border-blue-600'>
                                        <div className='ms-2'>Ability 3: {abilities[2].ability}</div>
                                    </div>
                                    <div className='grid items-center col-span-1 row-span-7 font-semibold overflow-auto'>
                                        <div className='ms-2 me-2'>{abilities[2].abilityDetails}</div>
                                    </div>
                                </div> 
                            </>
                        ) : abilities.length === 2 ? (
                            <>
                                <div  className='grid grid-rows-10 grid-cols-1 col-span-1 row-span-6 border-blue-600 border-b-4'>
                                    <div className='grid items-center col-span-1 row-span-3 border-b-4 border-blue-600 font-bold text-xl'>
                                        <div className='ms-2'>Ability 1: {abilities[0].ability}</div>
                                    </div>
                                    <div className='grid items-center col-span-1 row-span-7 font-semibold overflow-auto'>
                                        <div className='ms-2 me-2'>{abilities[0].abilityDetails}</div>
                                    </div>
                                </div> 
                                <div  className='grid grid-rows-10 grid-cols-1 col-span-1 row-span-6 border-b-4 border-blue-600'>
                                    <div className='grid items-center col-span-1 row-span-3 font-bold text-xl border-b-4 border-blue-600'>
                                        <div className='ms-2'>Ability 2: {abilities[1].ability}</div>
                                    </div>
                                    <div className='grid items-center col-span-1 row-span-7 font-semibold overflow-auto'>
                                        <div className='ms-2 me-2'>{abilities[1].abilityDetails}</div>
                                    </div>
                                </div> 
                            </>
                        ) : (
                            <>
                                <div  className='grid grid-rows-10 grid-cols-1 col-span-1 row-span-12 border-blue-600 border-b-4'>
                                    <div className='grid items-center col-span-1 row-span-3 border-b-4 border-blue-600 font-bold text-xl'>
                                        <div className='ms-2'>Ability 1: {abilities[0].ability}</div>
                                    </div>
                                    <div className='grid items-center col-span-1 row-span-7 font-semibold overflow-auto'>
                                        <div className='ms-2 me-2'>{abilities[0].abilityDetails}</div>
                                    </div>
                                </div>
                            </>
                        )}
                    </div>
                </>)}
            </div>
            ) : display === "moves" ? (
            <div className='flex md:min-h-[90%] sm:min-h-fit justify-around items-start overflow-y-scroll bg-black bg-opacity-80 border-t-2 border-b-4 border-s-4 border-e-4 rounded-b-2xl border-black'>

                {loadingBool ? (<>Loading . . .</>) : (

                <div ref={moveScroll} className='border-4 mt-10 border-blue-600 bg-blue-500 rounded-2xl w-10/12'>
                    <div className="flex justify-between items-center font-semibold md:font-bold text-2xl md:text-3xl border-b-4 border-blue-600 row-span-2 col-span-1">
                        <span className='w-1/4 h-full border-blue-600 border-e-4 flex justify-start ps-4' >Type</span>
                        <span className='w-[40%] h-full border-blue-600 border-e-4 flex justify-start ps-8 '>Name</span>
                        <span className='w-[10%] h-full border-blue-600 border-e-4 flex justify-center'>PP</span>
                        <span className='w-1/4 h-full flex justify-center'>Power</span>


                    </div>
                    <div className=' font-semibold text-lg md:text-3xl'>
                        {moves.map(move =>{
                                return(
                                    <div key={uuidv4()} className='flex justify-between border-b-4 border-s-4= border-blue-600'>
                                        <span className='w-[25%] h-full border-blue-600 border-e-4 flex justify-center'>
                                            <div className='w-4/5 ' >
                                                {move.elementType}
                                            </div>
                                        </span>
                                        <span className='w-[40%] h-full border-blue-600 border-e-4 flex justify-center'>
                                            <div className='w-4/5' >
                                                {move.name}
                                            </div>
                                        </span>
                                        <span className='w-[10%] h-full border-blue-600 border-e-4 flex justify-center'>
                                            <div className='' >
                                                {move.pp || <>--</>}
                                            </div>
                                        </span>
                                        <span className='w-[25%] h-full flex justify-center'>
                                            <div className='' >
                                                {move.power || <>--</>}
                                            </div>
                                        </span>
                                    </div>
                                )        
                        })}
                    </div>
                </div>
                )}
            </div>
            ) : display === "typeMatch" ? (
            <div className='flex md:min-h-[90%] sm:min-h-fit justify-around items-center bg-black bg-opacity-80 border-t-2 border-b-4 border-s-4 border-e-4 rounded-b-2xl border-black'>
                
                {loadingBool ? (<>Loading . . .</>) : (<>
                
                <div className='grid grid-cols-1 grid-rows-14 border-4 border-blue-600 bg-blue-500 rounded-2xl w-4/12 h-3/4'>
                    <div className="grid justify-center items-center font-bold text-2xl col-span-1 row-span-2 border-b-4 py-6 border-blue-600">Weaknesses</div>
                    <div className='grid justify-center items-start col-span-1 row-span-12 font-semibold text-xl overflow-y-auto'>
                        
                        {weaknesses.map(weakness=>{
                            return(
                                <div key={uuidv4()} className='flex justify-center bg-blue-400 border-4 border-blue-600 mt-3 text-2xl rounded-xl p-1'>
                                    {weakness}
                                </div>
                            )
                        })}
                    </div>
                </div>
                <div className=' grid grid-cols-1 grid-rows-14 border-4 border-blue-600 bg-blue-500 rounded-2xl w-4/12 h-3/4'>
                    <div className="grid justify-center items-center font-bold text-2xl col-span-1 row-span-2 border-b-4 py-6 border-blue-600">Resistances</div>
                    <div className='grid justify-center items-start col-span-1 row-span-12 font-semibold text-xl overflow-y-auto'>
                        {resistances.map(resistance =>{
                            return(
                                <div key={uuidv4()} className='flex justify-center bg-blue-400 border-4 border-blue-600 mt-3 text-2xl rounded-xl p-1'>
                                    {resistance}
                                </div>
                            )
                        })}
                    </div>
                </div>
                </>)}
            </div>
            ) : display === "variations" ? (  
            <div className='flex flex-col md:min-h-[90%] min-h-fit justify-around bg-black bg-opacity-80 border-t-2 border-b-4 border-s-4 border-e-4 rounded-b-2xl border-black'>

                

                {secondEvolutions.length === 1 && thirdEvolutions.length === 1 && !loadingBool ? (
                <div className='flex flex-col mt-7 md:mt-0 justify-around w-full h-full'>
                    <div className=' flex flex-col md:flex-row items-center justify-start md:justify-center w-full h-fit md:h-[45%] '>
                        <div className='aspect-square border-4 border-blue-600 bg-blue-500 rounded-2xl  w-[40%] md:w-1/4'>
                            <div className='flex justify-center items-center border-b-4 border-blue-600'>{baseEvolution}</div>
                            <div style={{backgroundImage: `url(${baseEvolutionPic})`}} className='aspect-square bg-no-repeat bg-cover'></div>
                        </div>
                        <div className='self-center'><i className="fa-solid fa-right-long text-5xl"></i></div>
                        <div className="aspect-square border-4 border-blue-600 bg-blue-500 rounded-2xl  w-[40%] md:w-1/4">
                            <div className='flex justify-center items-center border-b-4 border-blue-600'>{secondEvolutions}</div>
                            <div style={{backgroundImage: `url(${secondEvolutionPics})`}} className='aspect-square bg-no-repeat bg-cover'></div>
                        </div>
                        <div className='self-center'><i className="fa-solid fa-right-long text-5xl"></i></div>
                        <div className="aspect-square border-4 border-blue-600 bg-blue-500 rounded-2xl  w-[40%] md:w-1/4">
                            <div className='flex justify-center items-center border-b-4 border-blue-600'>{thirdEvolutions}</div>
                            <div style={{backgroundImage: `url(${thirdEvolutionPics})`}} className='aspect-square bg-no-repeat bg-cover'></div>
                        </div>
                    </div>
                    <div className='flex justify-center w-full mt-7 md:mt-0 h-fit md:h-[45%]'>
                        <div className="aspect-square border-4 border-blue-600 bg-blue-500 rounded-2xl  w-[40%] md:w-1/4">
                            <div className='flex justify-center items-center  border-b-4 border-blue-600'>Shiny {name}</div>
                            <div style={{backgroundImage: `url(${shinyPictures})`}} className='aspect-square bg-no-repeat bg-cover'></div>
                        </div>
                    </div>
                </div>
                ) : secondEvolutions.length === 2 && !loadingBool ? (

                <div  className='flex flex-col md:flex-row items-center  w-full h-full'>

                        <div className='flex h-full mt-7 md:mt-0 w-[50%]  md:w-[30%] justify-center items-center' >
                            <div className='aspect-square w-[80%] border-4 border-blue-600 bg-blue-500 rounded-2xl'>
                                <div className='flex justify-center items-center border-b-4 border-blue-600'>{baseEvolution}</div>
                                <div style={{backgroundImage: `url(${baseEvolutionPic})`}} className='aspect-square bg-no-repeat bg-cover'></div>
                            </div>


                        </div>
                        <div className='flex flex-row md:flex-col  h-full w-[10%] justify-center items-center gap-[20%]'>
                                <div className=''><i className="fa-solid fa-right-long text-5xl"></i></div>
                                <div className=''><i className="fa-solid fa-right-long text-5xl"></i></div>
                        </div>
                        
                            <div className='flex flex-row gap-7  md:flex-col h-full w-[100%] md:w-[30%] justify-center items-center' >
                                <div className="aspect-square w-[40%] md:w-[80%] border-4 border-blue-600 bg-blue-500 rounded-2xl">
                                    <div className='flex justify-center items-center border-b-4 border-blue-600'>{secondEvolutions[0]}</div>
                                    <div style={{backgroundImage: `url(${secondEvolutionPics[0]})`}} className='aspect-square bg-no-repeat bg-cover'></div>
                                </div>
                                <div className="aspect-square w-[40%] md:w-[80%] border-4 border-blue-600 bg-blue-500 rounded-2xl">
                                    <div className='flex justify-center items-center border-b-4 border-blue-600'>{secondEvolutions[1]}</div>
                                    <div style={{backgroundImage: `url(${secondEvolutionPics[1]})`}} className='aspect-square bg-no-repeat bg-cover'></div>
                                </div>
                            </div>
                    
                        <div className='flex mt-7 md:mt-0 h-full w-[50%] md:w-[30%]  justify-center items-center' >
                            <div className=" aspect-square w-[80%] border-4 border-blue-600 bg-blue-500 rounded-2xl">
                                <div className='flex justify-center items-center border-b-4 border-blue-600'>Shiny {name}</div>
                                <div style={{backgroundImage: `url(${shinyPictures})`}} className='aspect-square bg-no-repeat bg-cover'></div>
                            </div>
                        </div>
                    
                </div>
                ) : thirdEvolutions.length === 2 && !loadingBool ? (
                <div  className='flex  flex-col justify-start w-full h-fit'>
                        <div className='flex flex-col md:flex-row w-full min-h-fit md:min-h-1/2 h-fit md:h-1/2 justify-start md:justify-center items-center '>
                            <div className='flex  items-center justify-center min-h-fit md:h-full w-[60%] md:w-[30%] '>
                                <div className='aspect-square w-[80%] md:w-[80%] border-4 border-blue-600 bg-blue-500 rounded-2xl'>
                                    <div className='flex justify-center items-center border-b-4 border-blue-600'>{baseEvolution}</div>
                                    <div style={{backgroundImage: `url(${baseEvolutionPic})`}} className='aspect-square  bg-no-repeat bg-cover'></div>
                                </div>
                            </div>

                            <div className='flex items-center w-[5%] h-full '><i className="fa-solid fa-right-long text-xl md:text-5xl"></i></div>


                            <div className='flex  w-[60%] md:w-[30%] items-center justify-center h-fit md:h-full  '>
                                <div className='aspect-square w-[80%] md:w-[80%] border-4 border-blue-600 bg-blue-500 rounded-2xl'>
                                    <div className='flex justify-center items-center border-b-4 border-blue-600'>{secondEvolutions}</div>
                                    <div style={{backgroundImage: `url(${secondEvolutionPics})`}} className='aspect-square bg-no-repeat bg-cover'></div>
                                </div>
                            </div>
                            <div className='flex  justify-center gap-[25%] flex-col w-[5%] h-full  '>
                                <div className=' z-10'><i className="fa-solid fa-right-long text-xl md:text-5xl"></i></div>
                                <div className=' z-10'><i className="fa-solid fa-right-long text-xl md:text-5xl"></i></div>
                            </div>
                                <div className='flex gap-7 flex-row  md:flex-col justify-start items-center w-[80%] md:w-[30%] h-fit md:h-full  ' >
                                    <div className="aspect-square w-[80%] md:w-[40%] border-4 border-blue-600 bg-blue-500 rounded-2xl">
                                        <div className='flex justify-center items-center border-b-4 border-blue-600'>{thirdEvolutions[0]}</div>
                                        <div style={{backgroundImage: `url(${thirdEvolutionPics[0]})`}} className='aspect-square bg-no-repeat bg-cover'></div>
                                    </div>
                                    <div className="aspect-square w-[80%] md:w-[40%] border-4 border-blue-600 bg-blue-500 rounded-2xl">
                                        <div className='flex justify-center items-center border-b-4 border-blue-600'>{thirdEvolutions[1]}</div>
                                        <div style={{backgroundImage: `url(${thirdEvolutionPics[1]})`}} className='aspect-square bg-no-repeat bg-cover'></div>
                                    </div>
                                </div>
                        </div>
                        <div className='flex justify-center items-start w-full h-fit md:h-1/2 '>
                            <div className="aspect-square mt-7 md:mt-0 w-[50%] md:w-[25%] border-4 border-blue-600 bg-blue-500 rounded-2xl">
                                <div className='flex justify-center items-center border-b-4 border-blue-600'>Shiny {name}</div>
                                <div style={{backgroundImage: `url(${shinyPictures})`}} className='aspect-square bg-no-repeat bg-cover'></div>
                            </div>
                        </div>
                </div>
                ) : secondEvolutions.length === 8 && !loadingBool ? (
                <div className='flex flex-col md:flex-row items-center w-full h-full'>
                            <div className='flex flex-row md:flex-col mt-7 md:mt-0 gap-7 md:gap-[25%]  justify-center items-center w-[60%] md:w-[20%] h-full  '>
                                <div className="aspect-square w-[50%] md:w-[80%] border-4 border-blue-600 bg-blue-500 rounded-2xl">
                                    <div className='flex justify-center items-center border-b-4 border-blue-600'>{baseEvolution}</div>
                                    <div style={{backgroundImage: `url(${baseEvolutionPic})`}} className='aspect-square bg-no-repeat bg-cover'></div>
                                </div>
                                <div className="aspect-square w-[50%] md:w-[80%] border-4 border-blue-600 bg-blue-500 rounded-2xl">
                                    <div className='flex justify-center items-center border-b-4 border-blue-600'>Shiny {name}</div>
                                    <div style={{backgroundImage: `url(${shinyPictures})`}} className='aspect-square bg-no-repeat bg-cover'></div>
                                </div>
                            </div>




                            <div className='w-[5%] h-full flex justify-center items-center '><i className="fa-solid fa-right-long text-xl md:text-7xl"></i></div>

                            <div className='w-[75%] h-full flex flex-row md:flex-col justify-start md:justify-center  ' >
                                <div className='flex flex-col md:flex-row w-full justify-center items-end h-fit md:h-1/2 '>
                                    <div className="aspect-square w-[50%] md:w-[20%] border-4 border-blue-600 bg-blue-500 ">
                                        <div className='flex justify-center items-center border-b-4 border-blue-600'>{secondEvolutions[1]}</div>
                                        <div style={{backgroundImage: `url(${secondEvolutionPics[1]})`}} className='aspect-square bg-no-repeat bg-cover'></div>
                                    </div>
                                    <div className="aspect-square w-[50%] md:w-[20%] border-4 border-blue-600 bg-blue-500 ">
                                        <div className='flex justify-center items-center border-b-4 border-blue-600'>{secondEvolutions[2]}</div>
                                        <div style={{backgroundImage: `url(${secondEvolutionPics[2]})`}} className='aspect-square bg-no-repeat bg-cover'></div>
                                    </div>
                                    <div className="aspect-square w-[50%] md:w-[20%] border-4 border-blue-600 bg-blue-500 ">
                                        <div className='flex justify-center items-center border-b-4 border-blue-600'>{secondEvolutions[3]}</div>
                                        <div style={{backgroundImage: `url(${secondEvolutionPics[3]})`}} className='aspect-square bg-no-repeat bg-cover'></div>
                                    </div>
                                    <div className="aspect-square w-[50%] md:w-[20%] border-4 border-blue-600 bg-blue-500  ">
                                        <div className='flex justify-center items-center border-b-4 border-blue-600'>{secondEvolutions[7]}</div>
                                        <div style={{backgroundImage: `url(${secondEvolutionPics[7]})`}} className='aspect-square bg-no-repeat bg-cover'></div>
                                    </div>
                                </div>



                                <div className='flex w-full flex-col  md:flex-row justify-start md:justify-center items-start md:items-start h-fit md:h-1/2 '>
                                    <div className="aspect-square w-[50%] md:w-[20%] border-4 border-blue-600 bg-blue-500 ">
                                        <div className='flex justify-center items-center border-b-4 border-blue-600'>{secondEvolutions[4]}</div>
                                        <div style={{backgroundImage: `url(${secondEvolutionPics[4]})`}} className='aspect-square bg-no-repeat bg-cover'></div>
                                    </div>
                                    <div className="aspect-square w-[50%] md:w-[20%] border-4 border-blue-600 bg-blue-500 ">
                                        <div className='flex justify-center items-center border-b-4 border-blue-600'>{secondEvolutions[5]}</div>
                                        <div style={{backgroundImage: `url(${secondEvolutionPics[5]})`}} className='aspect-square bg-no-repeat bg-cover'></div>
                                    </div>
                                    <div className="aspect-square w-[50%] md:w-[20%] border-4 border-blue-600 bg-blue-500 ">
                                        <div className='flex justify-center items-center border-b-4 border-blue-600'>{secondEvolutions[6]}</div>
                                        <div style={{backgroundImage: `url(${secondEvolutionPics[6]})`}} className='aspect-square bg-no-repeat bg-cover'></div>
                                    </div>
                                    <div className="aspect-square w-[50%] md:w-[20%] border-4 border-blue-600 bg-blue-500 ">
                                        <div className='flex justify-center items-center border-b-4 border-blue-600'>{secondEvolutions[0]}</div>
                                        <div style={{backgroundImage: `url(${secondEvolutionPics[0]})`}} className='aspect-square bg-no-repeat bg-cover'></div>
                                    </div>
                                </div>





                            </div>
                        
                </div>
                ) : thirdEvolutions.length === 0 && secondEvolutions.length === 1 && !loadingBool ? (
                <div className='flex flex-col justify-around w-full h-fit md:h-full'>
                    <div className='flex flex-col md:flex-row  md:gap-7 mt-7 md:mt-0 justify-start md:justify-center items-center md:items-start w-full h-fit md:h-[45%]'>
                        <div className='aspect-square border-4 border-blue-600 bg-blue-500 rounded-2xl w-[40%] md:w-1/4'>
                            <div className='flex justify-center items-center border-b-4 border-blue-600'>{baseEvolution}</div>
                            <div style={{backgroundImage: `url(${baseEvolutionPic})`}} className='aspect-square bg-no-repeat bg-cover'></div>
                        </div>
                        <div className='self-center'><i className="fa-solid fa-right-long text-5xl"></i></div>
                        <div className="aspect-square border-4 border-blue-600 bg-blue-500 rounded-2xl w-[40%] md:w-1/4">
                            <div className='flex justify-center items-center border-b-4 border-blue-600'>{secondEvolutions}</div>
                            <div style={{backgroundImage: `url(${secondEvolutionPics})`}} className='aspect-square bg-no-repeat bg-cover'></div>
                        </div>
                        
                    </div>
                    <div className='flex  justify-center mt-7 md:mt-0 w-full h-fit md:h-[45%]'>
                        <div className="aspect-square border-4 border-blue-600 bg-blue-500 rounded-2xl  w-[40%] md:w-1/4">
                            <div className='flex justify-center items-center border-b-4 border-blue-600'>Shiny {name}</div>
                            <div style={{backgroundImage: `url(${shinyPictures})`}} className='aspect-square bg-no-repeat bg-cover'></div>
                        </div>
                    </div>
                </div>
                ) : !loadingBool ? (
                <div className='flex flex-col justify-around w-full h-full'>
                    <div className='flex justify-center w-full h-[45%]'>
                        <div className='aspect-square border-4 border-blue-600 bg-blue-500 rounded-2xl w-[40%] md:w-1/4'>
                            <div className='flex justify-center items-center border-b-4 border-blue-600'>{baseEvolution}</div>
                            <div style={{backgroundImage: `url(${baseEvolutionPic})`}} className='aspect-square bg-no-repeat bg-cover'></div>
                        </div>                        
                    </div>
                    <div className='flex justify-center w-full h-[45%]'>
                        <div className="aspect-square border-4 border-blue-600 bg-blue-500 rounded-2xl w-[40%] md:w-1/4">
                            <div className='flex justify-center items-center border-b-4 border-blue-600'>Shiny {name}</div>
                            <div style={{backgroundImage: `url(${shinyPictures})`}} className='aspect-square bg-no-repeat bg-cover'></div>
                        </div>
                    </div>
                </div>
                ): <>Loading . . .</>}

            </div>
            ) : <></>}
        </div>
    )
}

export default ExtendedPokeStats