import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import ContextProvider from './components/ContextProvider.tsx'

ReactDOM.createRoot(document.getElementById('root')!).render(
    <ContextProvider>
      <App />
    </ContextProvider>

)
