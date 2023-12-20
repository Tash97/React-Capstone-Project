interface props{
    key: string
    resistance: string
}

export default function ResistanceLoop({resistance}: props) {
  return (
        <div className='flex justify-center bg-blue-400 border-4 border-blue-600 mt-3 text-2xl rounded-xl p-1'>{resistance}</div>
    )
}
