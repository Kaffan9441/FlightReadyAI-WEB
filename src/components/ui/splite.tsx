'use client'

import { Suspense, lazy, useRef, useState, useEffect } from 'react'
const Spline = lazy(() => import('@splinetool/react-spline'))

interface SplineSceneProps {
  scene: string
  className?: string
}

export function SplineScene({ scene, className }: SplineSceneProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [shouldLoad, setShouldLoad] = useState(false)

  useEffect(() => {
    const el = containerRef.current
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShouldLoad(true)
          observer.disconnect()
        }
      },
      { rootMargin: '200px' } // start loading 200px before it enters view
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    <div ref={containerRef} className={className}>
      {shouldLoad && (
        <Suspense
          fallback={
            <div className="w-full h-full flex items-center justify-center">
              <span className="loader" />
            </div>
          }
        >
          <Spline scene={scene} className={className} />
        </Suspense>
      )}
    </div>
  )
}
