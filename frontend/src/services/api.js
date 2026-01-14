const API_BASE = 'http://localhost:5050/api'

function getToken(){ return localStorage.getItem('fv_token') }

async function request(path, options = {}){
  const headers = options.headers ? {...options.headers} : {}
  if (!headers['Content-Type'] && !(options.body instanceof FormData)) headers['Content-Type'] = 'application/json'
  const token = getToken()
  if (token) headers['Authorization'] = `Bearer ${token}`

  const res = await fetch(`${API_BASE}${path}`, {...options, headers})
  const text = await res.text()
  try { return JSON.parse(text) } catch { return text }
}

export async function login(email,password){
  const res = await fetch(`${API_BASE}/auth/login`, {method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify({email,password})})
  if (!res.ok) throw new Error('Login failed')
  const json = await res.json()
  if (json.token) localStorage.setItem('fv_token', json.token)
  return json
}

export async function register(name,email,password){
  const res = await fetch(`${API_BASE}/auth/register`, {method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify({name,email,password})})
  if (!res.ok) throw new Error('Register failed')
  return res.json()
}

// Dashboard API - Get summary (Balance, Income, Expense)
export async function getDashboardSummary(){ 
  return request('/dashboard/summary') 
}

// Legacy support - keep old endpoint working
export async function getSummary(){ 
  return request('/finance/summary') 
}

// Transactions API
export async function getTransactions(){ 
  return request('/finance/transactions') 
}

// Income APIs
export async function addIncome(payload){ 
  return request('/income', {method:'POST', body: JSON.stringify(payload)}) 
}
export async function getIncome(id){ 
  return request(`/income/${id}`) 
}
export async function updateIncome(id,payload){ 
  return request(`/income/${id}`, {method:'PUT', body: JSON.stringify(payload)}) 
}
export async function deleteIncome(id){ 
  return request(`/income/${id}`, {method:'DELETE'}) 
}

// Expense APIs
export async function addExpense(payload){ 
  return request('/expence', {method:'POST', body: JSON.stringify(payload)}) 
}
export async function getExpense(id){ 
  return request(`/expence/${id}`) 
}
export async function updateExpense(id,payload){ 
  return request(`/expence/${id}`, {method:'PUT', body: JSON.stringify(payload)}) 
}
export async function deleteExpense(id){ 
  return request(`/expence/${id}`, {method:'DELETE'}) 
}

export default { login, register, getSummary, getTransactions, addExpense, addIncome, deleteExpense, deleteIncome, updateExpense, updateIncome }
