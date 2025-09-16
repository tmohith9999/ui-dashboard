import {
  Bar,
  BarChart,
  CartesianGrid,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
  Cell,
  Legend,
} from 'recharts'

const salesByDevice = [
  { device: 'Mobile', sales: 4800 },
  { device: 'Desktop', sales: 3200 },
  { device: 'Tablet', sales: 1600 },
]

const revenueContribution = [
  { name: 'Subscriptions', value: 5400 },
  { name: 'One-time', value: 2600 },
  { name: 'Add-ons', value: 1200 },
]

const PIE_COLORS = ['#1f87ff', '#10b981', '#f59e0b']

export default function ChartsPage() {
  return (
    <div className="grid gap-6 grid-cols-1 xl:grid-cols-2">
      <div className="card p-4">
        <div className="card-title">Sales by Device</div>
        <div className="h-72 mt-4">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={salesByDevice}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="device" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="sales" fill="#1f87ff" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="card p-4">
        <div className="card-title">Revenue Contribution</div>
        <div className="h-72 mt-4">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Tooltip />
              <Legend />
              <Pie data={revenueContribution} dataKey="value" nameKey="name" outerRadius={96} label>
                {revenueContribution.map((_entry, index) => (
                  <Cell key={`cell-${index}`} fill={PIE_COLORS[index % PIE_COLORS.length]} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  )
}


