import { useGreeting } from './hooks/useGreeting'

function App() {
  const greeting = useGreeting()

  return (
    <div className="flex items-center justify-center h-screen">
      <h1 className="text-4xl font-bold">{greeting}</h1>
    </div>
  )
}

export default App
