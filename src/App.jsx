import './App.css'
import { Header } from './Components/Header'
function App() {


  return (
    <div>
      <Header />
      <div id="chat-container">
          <h2>Chat Name</h2>
          <div id="messages-container">

          </div>
          <form id="message-form">
              <input id="message-box" placeholder="write message here"></input>
              <button id="submit-message">Submit</button>
          </form>
      </div> 
    </div>
  )
}

export default App
