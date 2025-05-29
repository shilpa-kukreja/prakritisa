
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import ShopContextProvider from './Context/ShopContext.jsx'
import { GoogleOAuthProvider } from '@react-oauth/google';


createRoot(document.getElementById('root')).render(
      <GoogleOAuthProvider clientId="1099436088338-5g46r38j675hmr8iln21bk4fj0lage6m.apps.googleusercontent.com">
      <BrowserRouter>
            <ShopContextProvider>
                  <App />
            </ShopContextProvider>
      </BrowserRouter>
      </GoogleOAuthProvider>,

)
