export function Label({ style, children }) {
  return (
    <div
      style={{
        padding: '2px 0',
        color: '#fff',
        fontSize: '12px',
        flex: 1,
        textShadow: '0 1px rgba(0,0,0,0.4)',
        ...style,
      }}
    >
      {children}
    </div>
  )
}
