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
    search: (name: string, suggestion: string, rPanel: SVGPathElement | null, lPanel: SVGPathElement | null, pHolder: SVGSVGElement | null, pokedexInput3: HTMLInputElement | null, setSuggestionsState: React.Dispatch<React.SetStateAction<string[][]>>) => void
    pokeNames: Array<string>
    loadingBool: boolean
}

const Pokedex = (props: Props) => {

    const {pokeInformation, search, pokeNames, loadingBool } = props

    const {name, weight, height, type1, type2, photo, entry} = pokeInformation


    

    


    {/* variables for pokedex open animation */}
    const panelHolder = useRef<SVGSVGElement>(null)
    const rightPanel = useRef<SVGPathElement>(null)
    const leftPanel = useRef<SVGPathElement>(null)
    {/* function to initiate pokedex open animation */}


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
        pokeScreenName.current.className = 'text-[.84rem] md:text-[1.7rem] mb-3'
    }
    if(addRef.current && pokeInfo.current){
        if(type2 !== ''){
            addRef.current.className = ''
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







    

    return (
        <div className=' grid grid-cols-1  w-[100%] '>
            <div className="relative left-[49.5%] m-0 p-0 row-start-1 col-start-1 top-[24%] z-50 h-[5%] w-[44.5%]">
                <div className="-mb-1   h-[90%] w-full" >
                    <Suggestions search={search} pokeNames={pokeNames} rPanel={rightPanel.current} lPanel={leftPanel.current} pHolder={panelHolder.current} />
                </div>            
            </div>
                <div className='flex z-20 row-start-1 col-start-1  w-[100%] h-[100%] justify-center items-end'>   

                        <div ref={display} className="flex flex-col border-2 border-black mb-5 rounded w-[90%] h-[64.10%] md:h-[66%]  bg-blue-500">

                        {!loadingBool ? (
                            <>
                            <div className="flex w-full h-[60%] ">
                                <div className="flex w-1/2 justify-center items-center ">
                                    <div style={{backgroundImage: `url(${photo})`}} className="w-full aspect-square  bg-no-repeat bg-cover"></div>
                                </div>
                                <div className="flex justify-center items-center h-full w-1/2">
                                    <div ref={pokeData} className="flex flex-col justify-start mt-[30%] md:mt-0 md:justify-center gap-2 md:gap-0 text-start w-full h-full font-bold font-pokemon">
                                        <div ref={pokeScreenName} className=" text-[1.25rem] md:text-[2rem] mb-2">{name}</div>
                                        <div ref={pokeInfo} className="flex flex-col  justify-between  text-[0.75rem] md:text-[1.5rem] h-[45%] mb-3">
                                            <div className="" >Type: {type1}</div>
                                            <div className="hidden" ref={ addRef } >Type 2: {type2}</div>
                                            <div className="" >Weight: {weight}</div>
                                            <div className="" >Height: {height}</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div ref={displayEntry} className="flex w-full overflow-auto ps-5  text-[1rem] md:text-[1.5rem] leading-[177%] h-[40%] bg-blue-600 rounded-t-xl">            
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
                            </>
                        ): <>Loading . . .</>}

                        </div>


                </div>
            <svg className='row-start-1 col-start-1' fill='rgb(237,30,36)' width='100%' viewBox="0 0 100 140" >
                <path className="" filter="url(#lights2)" strokeWidth='.5' stroke='black' d="M2,1 L98,1 Q99,1 99,2 L99,138 Q99,139 98,139 L2,139 Q1,139 1,138 L1,2 Q1,1 2,1" />     
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
                <circle filter="url(#lights2)"  cx="15" cy="16" r="10" fill="rgb(233,204,206)" />
                <circle className="" filter="url(#lights3)" cx="15" cy="16" r="9" fill="rgb(29,78,216)"  />
                <circle filter='url(#lights2)' cx="32" cy="10.5"  r="2"  fill="rgb(193,40,46)" />
                <circle filter='url(#lights2)' cx="38" cy="10.5" r="2" fill="rgb(251,223,19)" />
                <circle filter='url(#lights2)'  cx="44" cy="10.5" r="2"  fill="rgb(63,116,72)"  />
                <path filter="url(#lights)" stroke='black' strokeWidth='.25' d='M1,33.125 L38.5,33.125 L46,27.75 L99,27.75 L46,27.75 L38.5,33.125 L1,33.125' />
            </svg>
            <svg ref={panelHolder} className='row-start-1 col-start-1  z-30' fill='rgb(237,30,36)'  width='100%' viewBox="0 0 100 140">
                
                <path ref={leftPanel} filter="url(#lights2)" stroke="black" strokeWidth='.25'  d="M5,45.5 Q5,44.5 6,44.5 L52.5,44.5 L52.5,83.375 L42.5,92.375 L42.5,136.75 L6,136.75 Q5,136.75 5,135.75 L5,45.5" />    
                <path ref={rightPanel} filter="url(#lights2)" stroke="black" strokeWidth='.25'  d="M52.5,44.5 L94,44.5 Q95,44.5 95,45.5 L95,135.75 Q95,136.75 94,136.75 L42.5,136.75 L42.5,92.375 L52.5,83.375 L52.5,44.5" />      
                
            </svg>
            
        </div>
    )
}

export default Pokedex