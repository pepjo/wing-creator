
export const main = () => {
  let mainHeight
  let mainWidth

  if (typeof window !== 'undefined') {
    mainHeight = window.innerHeight - 130
    mainWidth = window.innerWidth - 450
  }

  return {
    display: 'inline-block',
    width: mainWidth || '70%',
    height: mainHeight || '100%',
  }
}
