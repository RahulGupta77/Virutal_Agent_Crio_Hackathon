import './App.css'
import ChatBox from './components/ChatBox'

function App() {

  return (
    <>
    <main className={`flex h-5/6 flex-col items-center m-8 `}>
      <h1>Chat bot</h1>
      <ChatBox/>
      {/* <Modal/> */}
    </main>
    </>
  )
}

export default App
