import './App.css'
import Field from './conponents/Field'
import Field2 from './conponents/Field2'

function App() {
  return (
    <div className="App">
      {/* <Field size={5} /> */}
      <Field2 width={3} height={3} mineAmt={4} />
    </div>
  )
}

export default App
