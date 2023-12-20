import ResistanceLoop from "./ResistanceLoop"
import { v4 as uuidv4 } from 'uuid'


interface prop{
    resistances: Array<string>
}

export default function ResistanceMap({resistances}: prop) {
  return (
        resistances.map(resistance =>{
            return <ResistanceLoop key={uuidv4()} resistance={resistance} />
        })
  )
}
