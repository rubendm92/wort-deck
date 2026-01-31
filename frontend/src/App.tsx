function getGreeting(): string {
  const hour = new Date().getHours()

  if (hour >= 5 && hour < 12) return 'Guten Morgen'
  if (hour >= 12 && hour < 18) return 'Guten Tag'
  if (hour >= 18 && hour < 22) return 'Guten Abend'
  return 'Gute Nacht'
}

function App() {
  return (
    <div className="flex items-center justify-center h-screen">
      <h1 className="text-4xl font-bold">{getGreeting()}</h1>
    </div>
  )
}

export default App
