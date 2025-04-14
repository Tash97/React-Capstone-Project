import Suggestions from "./Suggestions";
import { useRef, useEffect} from "react";

interface PokeInfo{
    name: string 
    weight: string
    height: string
    type1: string
    type2: string
    photo: string
    entry: string
}

interface Props{
    pokeInformation: PokeInfo
    search: (name: string, suggestion: string) => void
    pokeNames: Array<string>
}

const Pokedex = ({pokeInformation, search, pokeNames }: Props) => {

    const {name, weight, height, type1, type2, photo, entry} = pokeInformation


    

    
    console.log("Hi from pokedex component")


    {/* variables for pokedex open animation */}
    const panelHolder = useRef<SVGSVGElement>(null)
    const rightPanel = useRef<SVGPathElement>(null)
    const leftPanel = useRef<SVGPathElement>(null)
    {/* function to initiate pokedex open animation */}
    useEffect(()=>{
        if(rightPanel.current && leftPanel.current && pokeInformation.name !== ""){
            window.scrollTo(0, window.scrollY + 100)
            rightPanel.current.style.transition = 'transform 2s'
            leftPanel.current.style.transition = 'transform 2s'
            rightPanel.current.style.transform = 'translateX(95%) scale(0 , 1)'

            leftPanel.current.style.transform = 'translateX(5%) scale(0 , 1)'
            const timerHideLeft = () => {
                if(panelHolder.current){
                    panelHolder.current.style.visibility = 'hidden'
                }
            }
            setTimeout(timerHideLeft, 2000)
        }
    },[pokeInformation])

    {/* variables for setting pokedex display */}
    const addRef = useRef<HTMLDivElement>(null);
    const up = useRef<HTMLDivElement>(null);
    const down = useRef<HTMLDivElement>(null);
    const pokeInfo = useRef<HTMLDivElement>(null);
    const pokeScreenName = useRef<HTMLDivElement>(null);
    const display = useRef<HTMLDivElement>(null);
    const displayEntry = useRef<HTMLDivElement>(null);
    const pokeData = useRef<HTMLDivElement>(null);
    let scroll: number = 0;


    
    {/* function for setting pokedex display */}
    useEffect(()=> {

    if(name.length > 9 && pokeScreenName.current){
        pokeScreenName.current.className = 'text-[22px] mb-2'
    }
    if(addRef.current && pokeInfo.current){
        if(type2 !== ''){
            addRef.current.className = ''
        } else{
            addRef.current.className = 'hidden'
            pokeInfo.current.className = 'flex flex-col justify-between text-lg h-[30%] mb-5'
        }
    } 
    }, [pokeInformation, name.length, type2])

    {/* functions for disabling normal scroll and setting click scroll on pokedex entry */}
    const overflow = useRef<HTMLDivElement>(null)
    const scroller = (whichway: string) => {
        if(overflow.current && up.current && down.current){
            if(whichway == 'up'){
                scroll = 0
                overflow.current.scrollTop = scroll;
                up.current.className = 'hidden'
                down.current.className = 'mt-auto animate-bounce'
            }
            if(whichway == 'down'){
                scroll = overflow.current.scrollTop + overflow.current.offsetHeight                
                overflow.current.scrollTop = scroll
                if(Math.floor(overflow.current.scrollTop) === overflow.current.scrollHeight - overflow.current.offsetHeight || Math.ceil(overflow.current.scrollTop) === overflow.current.scrollHeight - overflow.current.offsetHeight){
                down.current.className = 'hidden'
                }
                up.current.className = 'mb-auto'
            }
        }
    }
    useEffect(()=>{
        if(overflow.current && up.current && down.current){
            overflow.current.scrollTop = 0
            up.current.className = 'hidden'
            down.current.className = 'mt-auto animate-bounce'
        }
    },[pokeInformation])
    
    if(overflow.current){
        overflow.current.onscroll = () => {
            if(overflow.current){
            overflow.current.scrollTo(0, scroll)
            }
        }
    }

    {/* function for capitalizing poke information */}
    const letterGrab1 = name.charAt(0)
    const restOfName1 = name.slice(1)
    const letterCap1 = letterGrab1.toUpperCase()
    const pokeName = letterCap1 + restOfName1
    const letterGrab2 = type1.charAt(0)
    const restOfName2 = type1.slice(1)
    const letterCap2 = letterGrab2.toUpperCase()
    const pokeType1 = letterCap2 + restOfName2
    const letterGrab3 = type2.charAt(0)
    const restOfName3 = type2.slice(1)
    const letterCap = letterGrab3.toUpperCase()
    const pokeType2 = letterCap + restOfName3






    

    return (
        <div className='relative  flex w-[32.27rem] h-3/3 mt-3 mb-3'>
            <div className="absolute left-[49.5%] top-[22%] z-50 h-[5%] w-[54.5%]">
                <div className="-mb-1 w-10/12 h-[90%]" >
                    <Suggestions search={search} pokeNames={pokeNames}  />
                </div>            
            </div>
            <div className="absolute z-20 w-[32.313rem] h-[100%]">
                <div className='flex flex-col w-[97%] h-[98%] ms-2 mt-2 justify-end items-center'>   
                    <div className="flex w-full h-[75%] justify-center items-center">
                        <div ref={display} className="flex flex-col border-2 border-black rounded w-[92.5%] h-[92.5%] bg-blue-500">
                            <div className="flex w-full h-[60%] ">
                                <div className="flex h-full w-1/2 justify-center items-center ">
                                    <div style={{backgroundImage: `url(${photo})`}} className="w-full h-[80%] bg-no-repeat bg-cover"></div>
                                </div>
                                <div className="flex justify-center items-center h-full w-1/2">
                                    <div ref={pokeData} className="flex flex-col justify-center text-start w-full h-full font-bold text-xl font-pokemon">
                                        <div ref={pokeScreenName} className="text-[24px] mb-2">{pokeName}</div>
                                        <div ref={pokeInfo} className="flex flex-col justify-between text-lg h-[45%] mb-3">
                                            <div>Type: {pokeType1}</div>
                                            <div ref={ addRef } className="hidden">Type 2: {pokeType2}</div>
                                            <div>Weight: {weight}</div>
                                            <div>Height: {height}</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div ref={displayEntry} className="flex w-full overflow-auto ps-5  pt-4 text-[24px] leading-[177%] h-[40%] bg-blue-600 rounded-t-xl">            
                                <div ref={overflow} className="no-scrollbar overflow-auto font-pokemon" >
                                    {entry}
                                </div>
                                <div className="flex flex-col ms-2 me-2">
                                    <div className="mb-auto hidden" ref={up} onClick={()=>{scroller('up')}} >
                                        <i className="fa-solid fa-caret-up"></i>
                                    </div>
                                    <div className="mt-auto" ref={down} onClick={()=>{scroller('down')}} >
                                        <i className="fa-solid fa-caret-down"></i>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <svg className='absolute' fill='rgb(237,30,36)' width='100%' height='100%' viewBox="0 0 100 100" preserveAspectRatio="none">
                <path className="" filter="url(#lights2)" strokeWidth='.5' stroke='black' d="M2,1 L98,1 Q99,1 99,2 L99,98 Q99,99 98,99 L2,99 Q1,99 1,98 L1,2 Q1,1 2,1" />     
                <filter id="lights" filterUnits="userSpaceOnUse">
                    <feDiffuseLighting in="SourceGraphic" result="light" lightingColor="white">
                        <fePointLight x="7" y="7" z="5" />
                    </feDiffuseLighting>
                    <feComposite
                        in="SourceGraphic"
                        in2="light"
                        operator="arithmetic"
                        k1="2"
                        k2="0"
                        k3="0"
                        k4="0" 
                    />
                </filter>
                <filter id="lights2" filterUnits="userSpaceOnUse">
                    <feDiffuseLighting in="SourceGraphic" result="light" lightingColor="white">
                        <fePointLight x="10" y="1" z="10" />
                    </feDiffuseLighting>
                    <feComposite
                        in="SourceGraphic"
                        in2="light"
                        operator="arithmetic"
                        k1="5"
                        k2="0"
                        k3="0"
                        k4="0" 
                    />
                </filter>
                <filter id="lights3" filterUnits="userSpaceOnUse">
                    <feDiffuseLighting in="SourceGraphic" result="light" lightingColor="white">
                        <fePointLight x="25" y="1" z="10" />
                    </feDiffuseLighting>
                    <feComposite
                        in="SourceGraphic"
                        in2="light"
                        operator="arithmetic"
                        k1="3"
                        k2="0"
                        k3="0"
                        k4="0" />
                </filter>      
                <line filter="url(#lights)"  x1="15" y1="13.5" x2="15" y2="13.5" strokeWidth="95" stroke="rgb(233,204,206)" strokeLinecap="round" vectorEffect="non-scaling-stroke" />
                <line className="" filter="url(#lights)" x1="15" y1="13.5" x2="15" y2="13.5" strokeWidth="85" stroke="rgb(29,78,216)" strokeLinecap="round" vectorEffect="non-scaling-stroke" />
                <line filter='url(#lights3)' x1="32" y1="8" x2="32" y2="8" strokeWidth="21" stroke="rgb(193,40,46)" strokeLinecap="round" vectorEffect="non-scaling-stroke" />
                <line filter='url(#lights3)' x1="38" y1="8" x2="38" y2="8" strokeWidth="21" stroke="rgb(251,223,19)" strokeLinecap="round" vectorEffect="non-scaling-stroke" />
                <line filter='url(#lights3)'  x1="44" y1="8" x2="44" y2="8" strokeWidth="21" stroke="rgb(63,116,72)" strokeLinecap="round" vectorEffect="non-scaling-stroke" />
                <path filter="url(#lights)" stroke='black' strokeWidth='.25' d='M1,25.125 L38.5,25.125 L46,19.75 L99,19.75 L46,19.75 L38.5,25.125 L1,25.125' />
            </svg>
            <svg ref={panelHolder} className='absolute z-30' fill='rgb(237,30,36)' width='100%' height='100%' viewBox="0 0 100 100" preserveAspectRatio="none">
                
                <path ref={leftPanel} filter="url(#lights2)" stroke="black" strokeWidth='.25'  d="M5,29.5 Q5,28.5 6,28.5 L52.5,28.5 L52.5,57.375 L42.5,67.375 L42.5,96.25 L6,96.25 Q5,96.25 5,95 L5,29.25" />    
                <path ref={rightPanel} filter="url(#lights2)" stroke="black" strokeWidth='.25'  d="M52.5,28.5 L94,28.5 Q95,28.5 95,29.25 L95,95.5 Q95,96.25 94,96.5 L42.5,96.25 L42.5,67.375 L52.5,57.375 L52.5,28.25" />      
                
            </svg>
            
        </div>
    )
}

export default Pokedex