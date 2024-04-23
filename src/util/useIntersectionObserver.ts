import { useEffect } from 'react'

type ObserveProps = {
  target: React.RefObject<HTMLDivElement>
  onIntersect: IntersectionObserverCallback
  root?: null
  rootMargin?: string
  threshold?: number
  enabled: boolean
}

export const useIntersectionObserver = ({
  target,
  onIntersect,
  root = null,
  rootMargin = '0px',
  threshold = 0.3,
  enabled = true,
}: ObserveProps) => {
  useEffect(() => {
    if (!enabled) {
      return
    }

    if (!target) {
      return
    }

    //onIntersect 을 넘겨받아서 실행
    const observer = new IntersectionObserver(onIntersect, {
      root,
      rootMargin,
      threshold,
    })
    observer.observe(target.current!) //주시 대상 목록에 추가

    return () => observer && observer.disconnect()
  }, [target, rootMargin, threshold, enabled])
}
