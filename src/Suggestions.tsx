import { useRef, useEffect} from "react";

interface Props {
    SugName: Array<string>
    SugPic: Array<string>
    searchByClick: (name: string) => void
}

function Suggestions({SugName, SugPic, searchByClick}: Props) {
    
    const close = () => {
        if(suggestionHolder.current){
        suggestionHolder.current.className = 'hidden'
        }
    }
    document.body.addEventListener('click', close)

    {/* variables for ssuggestion display */}
    const suggestionBox1 = useRef<HTMLDivElement>(null)
    const suggestionBox2 = useRef<HTMLDivElement>(null)
    const suggestionBox3 = useRef<HTMLDivElement>(null)
    const suggestionBox4 = useRef<HTMLDivElement>(null)
    const suggestionBox5 = useRef<HTMLDivElement>(null)
    const suggestion1 = useRef<HTMLDivElement>(null)
    const suggestion2 = useRef<HTMLDivElement>(null)
    const suggestion3 = useRef<HTMLDivElement>(null)
    const suggestion4 = useRef<HTMLDivElement>(null)
    const suggestion5 = useRef<HTMLDivElement>(null)
    const suggestionHolder = useRef<HTMLDivElement>(null)

    {/* function for setting suggestions display */}
    useEffect(() =>{
        if(suggestion1.current && suggestion2.current && suggestion3.current && suggestion4.current && suggestion5.current && suggestionBox1.current && suggestionBox2.current && suggestionBox3.current && suggestionBox4.current && suggestionBox5.current && suggestionHolder.current){
            if(SugName.length === 5){
                suggestionHolder.current.className = 'relative flex flex-col z-50 outline rounded-b w-[100%] bg-slate-200'
                suggestionBox5.current.className = 'flex items-center justify-start w-full h-20' 
                suggestionBox4.current.className = 'flex items-center justify-start w-full h-20 border-black border-b-2'
                suggestionBox3.current.className = 'flex items-center justify-start w-full h-20 border-black border-b-2'
                suggestionBox2.current.className = 'flex items-center justify-start w-full h-20 border-black border-b-2'
                suggestionBox1.current.className = 'flex items-center justify-start w-full h-20 border-black border-b-2'
            } else if(SugName.length === 4){
                suggestionHolder.current.className = 'relative flex flex-col z-50 outline rounded-b w-[100%] bg-slate-200'
                suggestionBox5.current.className = 'hidden' 
                suggestionBox4.current.className = 'flex items-center justify-start w-full h-20'
                suggestionBox3.current.className = 'flex items-center justify-start w-full h-20 border-black border-b-2'
                suggestionBox2.current.className = 'flex items-center justify-start w-full h-20 border-black border-b-2'
                suggestionBox1.current.className = 'flex items-center justify-start w-full h-20 border-black border-b-2'
            } else if(SugName.length === 3){
                suggestionHolder.current.className = 'relative flex flex-col z-50 outline rounded-b w-[100%] bg-slate-200'
                suggestionBox5.current.className = 'hidden' 
                suggestionBox4.current.className = 'hidden'
                suggestionBox3.current.className = 'flex items-center justify-start w-full h-20'
                suggestionBox2.current.className = 'flex items-center justify-start w-full h-20 border-black border-b-2'
                suggestionBox1.current.className = 'flex items-center justify-start w-full h-20 border-black border-b-2'
            } else if(SugName.length === 2){
                suggestionHolder.current.className = 'relative flex flex-col z-50 outline rounded-b w-[100%] bg-slate-200'
                suggestionBox5.current.className = 'hidden' 
                suggestionBox4.current.className = 'hidden'
                suggestionBox3.current.className = 'hidden'
                suggestionBox2.current.className = 'flex items-center justify-start w-full h-20'
                suggestionBox1.current.className = 'flex items-center justify-start w-full h-20 border-black border-b-2'
            } else if(SugName.length === 1){
                suggestionHolder.current.className = 'relative flex flex-col z-50 outline rounded-b w-[100%] bg-slate-200'
                suggestionBox5.current.className = 'hidden' 
                suggestionBox4.current.className = 'hidden'
                suggestionBox3.current.className = 'hidden'
                suggestionBox2.current.className = 'hidden'
                suggestionBox1.current.className = 'flex items-center justify-start w-full h-20'
            } else {
                suggestionHolder.current.className = 'hidden'
            }
        }
    },[SugName])
    
    return (
        <div ref={suggestionHolder} className="hidden" onClick={(e) => {e.stopPropagation()}}>
            <div ref={suggestionBox1} onClick={()=>{searchByClick(SugName[0])}} className=""> 
                <div className="h-full w-1/3 bg-cover" style={{backgroundImage: `url(${SugPic[0]})`}} ></div>
                <div ref={suggestion1} className="ms-auto mr-auto">{SugName[0]}</div>
            </div>
            <div ref={suggestionBox2} onClick={()=>{searchByClick(SugName[1])}} className=""> 
                <div className="h-full w-1/3 bg-cover" style={{backgroundImage: `url(${SugPic[1]})`}}></div>
                <div ref={suggestion2} className="ms-auto mr-auto" >{SugName[1]}</div>
            </div>
            <div ref={suggestionBox3} onClick={()=>{searchByClick(SugName[2])}} className=""> 
                <div className="h-full w-1/3 bg-cover" style={{backgroundImage: `url(${SugPic[2]})`}}></div>
                <div ref={suggestion3} className="ms-auto mr-auto" >{SugName[2]}</div>
            </div>
            <div ref={suggestionBox4} onClick={()=>{searchByClick(SugName[3])}} className=""> 
                <div className="h-full w-1/3 bg-cover" style={{backgroundImage: `url(${SugPic[3]})`}}></div>
                <div ref={suggestion4} className="ms-auto mr-auto" >{SugName[3]}</div>
            </div>
            <div ref={suggestionBox5} onClick={()=>{searchByClick(SugName[4])}} className=""> 
                <div className="h-full w-1/3 bg-cover" style={{backgroundImage: `url(${SugPic[4]})`}} ></div>
                <div ref={suggestion5} className="ms-auto mr-auto" >{SugName[4]}</div>
            </div>
        </div>
    )
}
export default Suggestions