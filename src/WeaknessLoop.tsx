interface props{
    key: string
    weakness: string
}

function WeaknessLoop({weakness}: props) {
  return (
    <div className='flex justify-center bg-blue-400 border-4 border-blue-600 mt-3 text-2xl rounded-xl p-1'>{weakness}</div>
    )
}

export default WeaknessLoop
