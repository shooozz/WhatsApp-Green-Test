import { App } from '@/app'
import React from 'react'
import ReactDOM from 'react-dom/client'
import '@/app/styles/index.css'

const root = document.getElementById('root')

if (root) {
    ReactDOM.createRoot(root).render(
        <React.StrictMode>
            <App />
        </React.StrictMode>
    )
}
