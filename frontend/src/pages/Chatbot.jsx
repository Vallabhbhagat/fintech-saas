import React, { useState } from 'react'
import { sendChatMessage } from '../services/api'

const Chatbot = () => {
  const [messages, setMessages] = useState([{from:'bot',text:'Hi! Ask me about budgeting, saving, investing, or any financial topics.'}])
  const [text, setText] = useState('')
  const [loading, setLoading] = useState(false)

  const send = async (e)=>{
    e.preventDefault()
    if(!text.trim()) return
    
    const user = {from:'user', text}
    setMessages(m=>[...m,user])
    setText('')
    setLoading(true)

    try {
      const response = await sendChatMessage(text)
      setMessages(m=>[...m,{from:'bot',text: response.reply}])
    } catch(error) {
      console.error('Error:', error)
      setMessages(m=>[...m,{from:'bot',text:'Sorry, I encountered an error. Please try again.'}])
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="container">
      <h2>Chatbot</h2>
      <div className="page" style={{maxWidth:800}}>
        <div style={{minHeight:200,border:'1px solid #eee',padding:12,overflowY:'auto'}}>
          {messages.map((m,i)=> (
            <div key={i} style={{margin:6, textAlign: m.from==='user'?'right':'left'}}>
              <div style={{display:'inline-block',background:m.from==='user'? 'var(--accent)':'#f1f5f9',color: m.from==='user'? 'white':'#111',padding:'8px 12px',borderRadius:8}}>{m.text}</div>
            </div>
          ))}
        </div>
        <form onSubmit={send} style={{marginTop:8,display:'flex',gap:8}}>
          <input value={text} onChange={e=>setText(e.target.value)} placeholder="Type your question" disabled={loading} />
          <button disabled={loading}>{loading ? 'Loading...' : 'Send'}</button>
        </form>
      </div>
    </div>
  )
}

export default Chatbot
