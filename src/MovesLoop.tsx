interface props{
    key: string
    move: string
}

function MovesLoop({move, key}: props) {
    key
  return (
    <div className='flex justify-start pt-3 ps-1 border-b-4 border-s-4 border-blue-600'>{move}</div>
  )
}

export default MovesLoop