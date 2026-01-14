import React, { useState } from 'react'

const SummaryCard = ({title, value, change, color, onClick, style, tooltip}) => {
  const [showTooltip, setShowTooltip] = useState(false)

  return (
    <div 
      className="page" 
      style={{
        padding:12, 
        cursor: onClick ? 'pointer' : 'default',
        transition: 'transform 0.2s ease, box-shadow 0.2s ease',
        position: 'relative',
        ...style
      }}
      onClick={onClick}
      onMouseEnter={(e) => {
        if (onClick) {
          e.currentTarget.style.transform = 'translateY(-4px)'
          e.currentTarget.style.boxShadow = '0 12px 30px rgba(111,45,189,0.15)'
          if (tooltip) setShowTooltip(true)
        }
      }}
      onMouseLeave={(e) => {
        if (onClick) {
          e.currentTarget.style.transform = 'translateY(0)'
          e.currentTarget.style.boxShadow = ''
          setShowTooltip(false)
        }
      }}
    >
      {showTooltip && tooltip && (
        <div style={{
          position: 'absolute',
          bottom: '100%',
          left: '50%',
          transform: 'translateX(-50%)',
          marginBottom: '8px',
          background: '#222',
          color: '#fff',
          padding: '6px 12px',
          borderRadius: '6px',
          fontSize: '12px',
          whiteSpace: 'nowrap',
          zIndex: 1000,
          pointerEvents: 'none'
        }}>
          {tooltip}
          <div style={{
            position: 'absolute',
            top: '100%',
            left: '50%',
            transform: 'translateX(-50%)',
            border: '6px solid transparent',
            borderTopColor: '#222'
          }}></div>
        </div>
      )}
      <div style={{display:'flex',justifyContent:'space-between',alignItems:'center'}}>
        <div>
          <div style={{fontSize:12,color:'#666', marginBottom: 4}}>{title}</div>
          <div style={{fontSize:20,fontWeight:700,color: color || '#222'}}>{value}</div>
        </div>
        {change && (
          <div style={{color: color || '#6F2DBD', fontWeight:700}}>{change}</div>
        )}
      </div>
    </div>
  )
}

export default SummaryCard
