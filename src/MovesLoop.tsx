import React from 'react'
import { v4 as uuidv4 } from 'uuid'


interface props{
    key: string
    move: string
}

function MovesLoop({move}: props) {
    
  return (
    <div className='flex justify-start pt-3 ps-1 border-b-4 border-s-4 border-blue-600'>{move}</div>
  )
}

export default MovesLoop