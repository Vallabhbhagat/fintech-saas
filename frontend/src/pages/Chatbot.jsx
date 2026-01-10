import React, { useState } from 'react'

const Chatbot = () => {
  const [messages, setMessages] = useState([{from:'bot',text:'Hi! Ask me about budgeting or SIPs.'}])
  const [text, setText] = useState('')

  const send = (e)=>{
    e.preventDefault()
    if(!text) return
    const user = {from:'user', text}
    setMessages(m=>[...m,user])
    // simple mock response
    setTimeout(()=>{
      setMessages(m=>[...m,{from:'bot',text:`I heard: ${text}. (This is a mock reply)` }])
    },400)
    setText('')
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
          <input value={text} onChange={e=>setText(e.target.value)} placeholder="Type your question" />
          <button>Send</button>
        </form>
      </div>
    </div>
  )
}

export default Chatbot
