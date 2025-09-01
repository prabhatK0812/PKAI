
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
// # support for routing :
import {BrowserRouter} from 'react-router-dom'
// # for clerk :
import { ClerkProvider } from '@clerk/clerk-react'

// # for clerk :
// Import your Publishable Key
const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY

if (!PUBLISHABLE_KEY) {
  throw new Error('Missing Publishable Key')
}


createRoot(document.getElementById('root')).render(
  // # for clerk :
  <ClerkProvider publishableKey={PUBLISHABLE_KEY} afterSignOutUrl = '/'>
      <BrowserRouter>
           <App />
      </BrowserRouter>,
  </ClerkProvider>
)
