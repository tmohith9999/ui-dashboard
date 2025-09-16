type Metric = {
  title: string
  value: number
  timestamp: number
}

const METRICS: Metric[] = [
  { title: 'Total Orders', value: 862, timestamp: 1754476592000 },
  { title: 'Ordered Items This Week', value: 156, timestamp: 1754641532000 },
  { title: 'Return Orders', value: 12, timestamp: 1754562992000 },
  { title: 'Fulfilled Orders This Week', value: 124, timestamp: 1754627132000 },
]

function formatDate(ts: number) {
  const d = new Date(ts)
  return d.toLocaleString(undefined, {
    year: 'numeric',
    month: 'short',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
  })
}

export default function CardsOnePage() {
  return (
    <div className="grid gap-4 md:gap-6 grid-cols-1 sm:grid-cols-2 xl:grid-cols-4">
      {METRICS.map((m) => (
        <div className="card p-4" key={m.title}>
          <div className="card-title">{m.title}</div>
          <div className="card-value mt-2">{m.value.toLocaleString()}</div>
          <div className="card-subtle mt-3">Updated {formatDate(m.timestamp)}</div>
        </div>
      ))}
    </div>
  )
}


