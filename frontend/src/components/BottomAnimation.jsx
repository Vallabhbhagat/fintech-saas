import React, { useEffect, useRef } from 'react'
import lottie from 'lottie-web'
import './bottomAnimation.css'

export default function BottomAnimation() {
  const container = useRef(null)

  useEffect(() => {
    if (!container.current) return
    // Using a hosted Lottie JSON for a fintech-style loop.
    // Replace `path` with local `/finance-lottie.json` if you add one to `public/`.
    const anim = lottie.loadAnimation({
      container: container.current,
      renderer: 'svg',
      loop: true,
      autoplay: true,
      path: 'https://assets7.lottiefiles.com/packages/lf20_jcikwtux.json'
    })

    return () => anim.destroy()
  }, [])

  return (
    <div className="bottom-animation" aria-hidden="true">
      <div ref={container} className="bottom-animation__lottie" />
    </div>
  )
}
