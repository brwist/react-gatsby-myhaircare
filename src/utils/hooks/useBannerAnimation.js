import { useLayoutEffect, useState } from 'react'

const arrSum = arr => arr.reduce((a, b) => a + b, 0)

export const useBannerAnimation = ({ contentRef, containerRef }) => {
  const [contentWidth, setContentWidth] = useState(0)
  const [containerWidth, setContainerWidth] = useState(0)
  const [playAnimation, setPlayAnimation] = useState(false)

  useLayoutEffect(() => {
    if (!contentRef || !containerRef) return

    if (containerRef.current) {
      setContainerWidth(
        containerRef.current.parentElement.clientWidth
      )
      const childrenWidth = [];

      [...contentRef.current.children].forEach(c =>
        childrenWidth.push(c.clientWidth)
      )

      setContentWidth(arrSum(childrenWidth))
    } else {
      setPlayAnimation(false)
    }
  }, [])

  return {
    contentWidth,
    containerWidth,
    setPlayAnimation,
    playAnimation
  }
}