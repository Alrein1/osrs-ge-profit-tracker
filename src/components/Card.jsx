export const Card = ({ children, className }) => {
  return (
    <div className={className}>
      <div>image</div>
      <div>info</div>
      <div>buttons</div>
      {children}
    </div>
  )
}
