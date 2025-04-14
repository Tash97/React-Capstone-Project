import { useRef, useEffect, useState} from "react";

interface Props {
    search: (name: string, suggestion: string, rPanel: SVGPathElement | null, lPanel: SVGPathElement | null, pHolder: SVGSVGElement | null) => void
    pokeNames: Array<string>
    rPanel: SVGPathElement | null
    lPanel: SVGPathElement | null
    pHolder: SVGSVGElement | null
}


const Suggestions = (props: Props) => {
    const {search, pokeNames, rPanel, lPanel, pHolder} = props


    const pokedexInput3 = useRef<HTMLInputElement>(null)

    const suggestionsStateRef = useRef<Array<Array<string>>>([])
    const [suggestionStateLoading, setSuggestionsStateLoading] = useState<boolean>(false)
    const [suggestionsState, setSuggestionsState] = useState<Array<Array<string>>>([])


    

    const searchBar = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSuggestionsStateLoading(true);
        setTimeout(async() => {

                    let result: number = 0;
                    let filterNames = pokeNames;
                    const search = e.target.value;
                    const results: Array<string> = [];
                    const picResults: Array<string> = [];
                    if(e.target.value !== ''){
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
                    const suggestions: Array<Array<string>> = []
                    for(let i = 0; i < results.length; i++){
                        suggestions.push([results[i], picResults[i]])
                    }
                    suggestionsStateRef.current = suggestions

                    setSuggestionsState(() => {
                        return [...suggestions]
                    })
                    setSuggestionsStateLoading(false)
                    

        }, 300)
    }    



        
            {/* enables enter button to search */}
            useEffect(() => {

                const handleKeyPress = (event: KeyboardEvent) => {
                    if (event.key === "Enter" && pokedexInput3.current) {
                        setSuggestionsState([])
                        search(pokedexInput3.current.value, suggestionsStateRef.current[0][0], rPanel, lPanel, pHolder);
                        pokedexInput3.current.value = ''
        
                    }
                }



            if(pokedexInput3 && pokedexInput3.current){
                pokedexInput3.current.addEventListener("keypress", handleKeyPress)
            }
            const newRef: HTMLInputElement | null = pokedexInput3.current
            return () => {
                if(newRef){
                    newRef.removeEventListener("keypress", handleKeyPress)
                }
            }
            
            }, [search, lPanel, pHolder, rPanel])

    
    
    const close = () => {
        if(suggestionHolder.current){
        suggestionHolder.current.className = 'hidden'
        }
    }

    useEffect(() => {
        document.body.addEventListener('click', close)

        return () => {
            document.body.removeEventListener('click', close)
        }
    }, [])

    {/* variables for ssuggestion display */}

    const suggestionHolder = useRef<HTMLDivElement>(null)

    return (
        <>
            <input onChange={searchBar} ref={pokedexInput3} className="rounded outline outline-[3px] focus:outline-[3px] ps-4 w-full h-full text-large bg-slate-200"  type="text" />
            {suggestionsState.length && !suggestionStateLoading ? (
                <div ref={suggestionHolder} className="relative flex flex-col z-50 outline rounded-b w-[100%] bg-slate-200" onClick={(e) => {e.stopPropagation()}}>
                    {suggestionsState.map((suggestion, index) => {
                        if(index === 4){
                            return(
                                <div key={index} onClick={()=>{search(suggestion[0], 'NA', rPanel, lPanel, pHolder)}} className="flex items-center justify-start w-full h-20"> 
                                    <div className="h-full w-1/3 bg-cover" style={{backgroundImage: `url(${suggestion[1]})`}} ></div>
                                    <div className="ms-auto mr-auto">{suggestion[0]}</div>
                                </div>
                            )
                        } 
                        return(
                            <div key={index} onClick={()=>{search(suggestion[0], 'NA', rPanel, lPanel, pHolder)}} className="flex items-center justify-start w-full h-20 border-black border-b-2"> 
                                <div className="h-full w-1/3 bg-cover" style={{backgroundImage: `url(${suggestion[1]})`}} ></div>
                                <div className="ms-auto mr-auto">{suggestion[0]}</div>
                            </div>
                        )
                    })}
                </div>
            ) : suggestionStateLoading ? 
            (
            <>
                <div ref={suggestionHolder} className="relative flex flex-col z-50 outline rounded-b w-[100%] height-20 bg-slate-200 justify-center items-center py-2" onClick={(e) => {e.stopPropagation()}}>
                    <svg aria-hidden="true" className="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                        <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
                    </svg>
                </div>
            </>
            ) : <></>

        }
        </>

    )
 
    }


export default Suggestions