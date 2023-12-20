import WeaknessLoop from "./WeaknessLoop"
import { v4 as uuidv4 } from 'uuid'


interface prop{
    weaknesses: Array<string>
}

export default function WeaknessMap({weaknesses}: prop) {
  return (
        weaknesses.map(weakness=>{
            return <WeaknessLoop key={uuidv4()} weakness={weakness} />
        })
  )
}
