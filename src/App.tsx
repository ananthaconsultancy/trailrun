import React, { useState } from 'react'

type Property = {
  id: string
  title: string
  location: string
  price: number
  status: 'selling' | 'sold' | 'rented'
}

const sampleData: Property[] = [
  { id: 'PROP0001', title: 'Ahdarathu', location: 'Mypadu Road', price: 450000, status: 'selling' },
  { id: 'PROP0002', title: 'DGP Kalanamadapa', location: 'Nellore', price: 13500000, status: 'selling' }
]

export default function App() {
  const [properties, setProperties] = useState<Property[]>(sampleData)
  const [showJson, setShowJson] = useState(false)
  const [message, setMessage] = useState<string | null>(null)

  function runValidation() {
    try {
      for (const p of properties) {
        if (typeof p.id !== 'string' || typeof p.title !== 'string') throw new Error('Invalid property shape')
        if (typeof p.price !== 'number' || p.price < 0) throw new Error('Price must be a non-negative number')
      }
      setMessage('Validation: ✅ All properties have valid shapes')
    } catch (err: any) {
      setMessage(`Validation: ❌ ${err.message}`)
    }
  }

  function addDummy() {
    const next: Property = {
      id: `PROP${Math.floor(Math.random()*9000)+1000}`,
      title: 'New Plot',
      location: 'Unknown',
      price: 100000,
      status: 'selling'
    }
    setProperties((s) => [next, ...s])
    setMessage('Added a dummy property')
  }

  const styles: Record<string, React.CSSProperties> = {
    root: { fontFamily: 'Inter, system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial', background: '#f7fafc', minHeight: '100vh', padding: 16 },
    container: { maxWidth: 1100, margin: '0 auto', background: '#fff', borderRadius: 10, boxShadow: '0 6px 18px rgba(0,0,0,0.06)', overflow: 'hidden' },
    header: { display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '16px 20px', borderBottom: '1px solid #eee' },
    logo: { display: 'flex', alignItems: 'center', gap: 12 },
    avatar: { width: 40, height: 40, borderRadius: 8, background: '#2563eb', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700 },
    body: { display: 'flex' },
    sidebar: { width: 220, borderRight: '1px solid #eee', padding: 16, background: '#fafafa' },
    main: { flex: 1, padding: 20 },
    cardGrid: { display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 12, marginBottom: 18 },
    card: { background: '#fff', padding: 12, borderRadius: 8, boxShadow: 'inset 0 -1px 0 rgba(0,0,0,0.02)' },
    propRow: { display: 'flex', justifyContent: 'space-between', padding: 12, border: '1px solid #eee', borderRadius: 8, marginBottom: 10, background: '#fff' },
    button: { padding: '8px 12px', borderRadius: 8, border: 'none', cursor: 'pointer' }
  }

  return (
    <div style={styles.root}>
      <div style={styles.container}>
        <header style={styles.header}>
          <div style={styles.logo}>
            <div style={styles.avatar}>SS</div>
            <div>
              <div style={{ fontSize: 16, fontWeight: 700 }}>Sweet Surf — Property Management</div>
              <div style={{ fontSize: 12, color: '#6b7280' }}>Preview mode — runs entirely in the browser</div>
            </div>
          </div>

          <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
            <button style={{ ...styles.button, background: '#10b981', color: '#fff' }} onClick={addDummy}>Add dummy</button>
            <button style={{ ...styles.button, background: '#2563eb', color: '#fff' }} onClick={runValidation}>Run validation</button>
            <button style={{ ...styles.button, background: '#111827', color: '#fff' }} onClick={() => setShowJson((s) => !s)}>{showJson ? 'Hide JSON' : 'Show JSON'}</button>
          </div>
        </header>

        <div style={styles.body}>
          <aside style={styles.sidebar}>
            <nav style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              <a style={{ padding: 8, borderRadius: 6, background: '#fff', textDecoration: 'none', color: '#111827' }}>Dashboard</a>
              <a style={{ padding: 8, borderRadius: 6 }}>Properties</a>
              <a style={{ padding: 8, borderRadius: 6 }}>Leads</a>
              <a style={{ padding: 8, borderRadius: 6 }}>Buyers</a>
              <a style={{ padding: 8, borderRadius: 6 }}>Public Listings</a>
            </nav>

            <div style={{ marginTop: 20 }}>
              <div style={{ fontSize: 13, color: '#6b7280', marginBottom: 8 }}>Quick actions</div>
              <button style={{ ...styles.button, background: '#efefef' }} onClick={() => { setProperties([]); setMessage('Cleared properties') }}>Clear properties</button>
            </div>
          </aside>

          <main style={styles.main}>
            <section style={styles.cardGrid as any}>
              <div style={styles.card}><div style={{ fontSize: 12, color: '#6b7280' }}>Properties</div><div style={{ fontWeight: 700, fontSize: 18 }}> {properties.length} </div></div>
              <div style={styles.card}><div style={{ fontSize: 12, color: '#6b7280' }}>Leads</div><div style={{ fontWeight: 700, fontSize: 18 }}> 8 </div></div>
              <div style={styles.card}><div style={{ fontSize: 12, color: '#6b7280' }}>Shared Leads</div><div style={{ fontWeight: 700, fontSize: 18 }}> 3 </div></div>
              <div style={styles.card}><div style={{ fontSize: 12, color: '#6b7280' }}>Network</div><div style={{ fontWeight: 700, fontSize: 18 }}> 5 </div></div>
            </section>

            <section>
              <h3 style={{ marginBottom: 12 }}>Properties</h3>
              {properties.length === 0 && <div style={{ padding: 12, borderRadius: 8, background: '#fff' }}>No properties — try Add dummy</div>}
              {properties.map((p) => (
                <div key={p.id} style={styles.propRow}>
                  <div>
                    <div style={{ fontWeight: 700 }}>{p.title} <span style={{ fontSize: 12, color: '#6b7280' }}>({p.id})</span></div>
                    <div style={{ fontSize: 13, color: '#6b7280' }}>{p.location}</div>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <div style={{ fontWeight: 700 }}>₹{p.price.toLocaleString()}</div>
                    <div style={{ fontSize: 13, color: '#6b7280' }}>{p.status}</div>
                  </div>
                </div>
              ))}
            </section>

            {showJson && (
              <section style={{ marginTop: 12 }}>
                <h4>Data (JSON)</h4>
                <pre style={{ background: '#0f172a', color: '#e6f3ff', padding: 12, borderRadius: 6, overflowX: 'auto' }}>{JSON.stringify(properties, null, 2)}</pre>
              </section>
            )}

            {message && (
              <div style={{ marginTop: 12, padding: 10, borderRadius: 6, background: '#eef2ff' }}>{message}</div>
            )}
          </main>
        </div>
      </div>
    </div>
  )
}

