import './App.css'
import Field from './conponents/Field'
import Field2 from './conponents/Field2'

function App() {
  return (
    <div className="App">
      {/* <Field size={5} /> */}
      <Field2 width={9} height={9} mineAmt={10} />
    </div>
  )
}

export default App
