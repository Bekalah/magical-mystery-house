import { useEffect, useState } from 'react'

type Room = { id: string; name: string; desc?: string }

export default function App() {
  const [rooms, setRooms] = useState<Room[]>([])
  const [ok, setOk] = useState<boolean | null>(null)

  useEffect(() => {
    fetch('/api/health')
      .then((r) => (r.ok ? r.json() : Promise.reject()))
      .then(() => setOk(true))
      .catch(() => setOk(false))

    fetch('/registry/house.json')
      .then((r) => (r.ok ? r.json() : []))
      .then(setRooms)
      .catch(() => setRooms([]))
  }, [])

  return (
    <main style={{ padding: 24, maxWidth: 880, margin: '0 auto' }}>
      <h1>Magical Mystery House</h1>
      <p style={{ opacity: 0.75 }}>{ok === null ? 'Checking /api…' : ok ? 'API online' : 'API offline'}</p>
      <ul>
        {rooms.map((r) => (
          <li key={r.id}>
            <b>{r.name}</b>
            {r.desc ? ` — ${r.desc}` : ''}
          </li>
        ))}
      </ul>
    </main>
  )
}
