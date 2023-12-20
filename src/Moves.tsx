import MovesLoop from "./MovesLoop"
import { v4 as uuidv4 } from 'uuid'

interface props{
    moves: Array<string>
}

export default function MovesMap({moves}: props) { 
  
  return (
    moves.map(move =>{
        return <MovesLoop key={uuidv4()} move={move} />
    })
    
  )
}
