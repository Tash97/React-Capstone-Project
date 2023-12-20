import Navbar from "./Navbar"
import Body from "./Body"
import './fonts/PokemonClassic.ttf'



function App() {

  return (
    <div className=" bg-[url('assets\pokee.webp')] bg-no-repeat bg-fixed bg-cover">
      <Navbar />
      <Body />
    </div>
  )
}

export default App