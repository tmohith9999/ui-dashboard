import express from 'express'
import cors from 'cors'
import morgan from 'morgan'

const app = express()
app.use(cors())
app.use(express.json())
app.use(morgan('dev'))

// Health
app.get('/health', (_req, res) => {
  res.json({ ok: true })
})


const PRODUCTS = [
  { id: 1, name: 'Wireless Headphones', category: 'Audio', price: 99.99, rating: 4.2, image: '' },
  { id: 2, name: 'Smart Watch', category: 'Wearables', price: 169.99, rating: 4.0, image: '' },
  { id: 3, name: 'Mechanical Keyboard', category: 'Accessories', price: 69.99, rating: 4.5, image: '' },
  { id: 4, name: '4K Monitor', category: 'Displays', price: 229.0, rating: 4.2, image: '' },
  { id: 5, name: 'USB-C Hub', category: 'Accessories', price: 39.99, rating: 4.0, image: '' },
  { id: 6, name: 'Noise Cancelling Earbuds', category: 'Audio', price: 109.99, rating: 4.2, image: '' },
  { id: 7, name: 'Portable SSD 1TB', category: 'Storage', price: 99.99, rating: 4.5, image: '' },
  { id: 8, name: 'Gaming Mouse', category: 'Accessories', price: 39.99, rating: 4.2, image: '' },
]

const PEOPLE = Array.from({ length: 47 }).map((_, i) => ({
  id: i + 1,
  name: `Person ${i + 1}`,
  email: `person${i + 1}@example.com`,
  role: i % 3 === 0 ? 'Admin' : i % 3 === 1 ? 'Manager' : 'Contributor',
  location: i % 2 === 0 ? 'Jaipur\\, India' : 'San Francisco\\, USA',
}))


app.get('/get-products', (_req, res) => {
  res.json({ data: PRODUCTS })
})

app.get('/get-people-list', (req, res) => {
  
  const pageParam = req.query.page
  if (!pageParam) {
    return res.json(PEOPLE)
  }

  const page = Number(pageParam)
  if (!Number.isFinite(page) || page < 1) {
    return res.status(400).json({ message: 'Invalid page parameter' })
  }

  const pageSize = 10
  const totalPages = Math.max(1, Math.ceil(PEOPLE.length / pageSize))
  const current = Math.min(page, totalPages)
  const start = (current - 1) * pageSize
  const data = PEOPLE.slice(start, start + pageSize)
  res.json({ page: current, totalPages, data })
})

const PORT = process.env.PORT || 4000
app.listen(PORT, () => {
  console.log(`API server running on http://localhost:${PORT}`)
})
