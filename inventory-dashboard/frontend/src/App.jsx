import { useState, useEffect } from 'react'
import axios from 'axios'
import { Package, DollarSign, Activity, AlertTriangle, Search } from 'lucide-react'
import ProductCard from './components/ProductCard'
import { Card, CardContent, CardHeader, CardTitle, Input, Button } from './components/ui'

function App() {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [updatingId, setUpdatingId] = useState(null)
  const [searchQuery, setSearchQuery] = useState('')

  // In production (Render), use the provided URL. In dev, keep using local proxy or localhost.
  const API_URL = import.meta.env.PROD
    ? 'https://interview-project-t06c.onrender.com'
    : '/api';

  useEffect(() => {
    fetchProducts()
  }, [])

  const fetchProducts = async () => {
    console.log("Fetching products from:", `${API_URL}/products`);
    try {
      setLoading(true)
      const response = await axios.get(`${API_URL}/products`)
      setProducts(response.data)
      setError(null)
    } catch (err) {
      setError('Failed to fetch products. Is the backend running?')
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  const handleUpdateStock = async (id, newQuantity) => {
    if (newQuantity < 0) return

    setUpdatingId(id)
    try {
      const response = await axios.post(`${API_URL}/update-stock`, {
        id,
        newQuantity
      })

      setProducts(prev => prev.map(p =>
        p.id === id ? response.data.product : p
      ))
    } catch (err) {
      console.error('Update failed', err)
      alert("Failed to update stock: " + (err.response?.data?.error || err.message))
    } finally {
      setUpdatingId(null)
    }
  }

  // Derived Metrics
  const totalStock = products.reduce((acc, p) => acc + p.stock, 0)
  const totalValue = products.reduce((acc, p) => acc + (p.price * p.stock), 0)
  const lowStockCount = products.filter(p => p.stock < p.lowStockThreshold).length
  const filteredProducts = products.filter(p =>
    p.name.toLowerCase().includes(searchQuery.toLowerCase())
  )

  if (loading) return <div className="flex items-center justify-center h-screen">Loading dashboard...</div>
  if (error) return <div className="flex items-center justify-center h-screen text-destructive">{error}</div>

  return (
    <div className="min-h-screen bg-slate-50/50 p-8">
      <div className="mx-auto max-w-6xl space-y-8">

        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Stock Management</h1>
            <p className="text-muted-foreground">Manage your detailed inventory and stock levels.</p>
          </div>
          <Button>Add Stock</Button>
        </div>

        {/* KPI Cards */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Stock</CardTitle>
              <Package className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalStock}</div>
              <p className="text-xs text-muted-foreground">Items across {products.length} products</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Stock Value</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">${totalValue.toFixed(2)}</div>
              <p className="text-xs text-muted-foreground">Total inventory valuation</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Items</CardTitle>
              <Activity className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">+{products.length}</div>
              <p className="text-xs text-muted-foreground">In the last 24 hours</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Low Stock Alerts</CardTitle>
              <AlertTriangle className="h-4 w-4 text-amber-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{lowStockCount}</div>
              <p className="text-xs text-muted-foreground">Items require attention</p>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <div className="relative flex-1 max-w-sm">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search stocks..."
                className="pl-8 bg-white"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {filteredProducts.map(product => (
              <ProductCard
                key={product.id}
                product={product}
                onUpdateStock={handleUpdateStock}
                updating={updatingId === product.id}
              />
            ))}
          </div>

          {filteredProducts.length === 0 && (
            <div className="text-center py-10 text-muted-foreground">
              No products found matching "{searchQuery}"
            </div>
          )}
        </div>

      </div>
    </div>
  )
}

export default App
