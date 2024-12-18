import { useRef, useState } from 'react'

export const NodeBaseInputField = ({
  name,
  value,
  setValue,
  style,
  inputStyle,
  onChange,
  onPointerDown,
  onPointerLeave,
  children,
  inputMode,
  pattern,
  maxLength,
  minLength,
  max,
  min,
  step,
  placeholder,
}) => {
  const [labelVisible, setLabelVisible] = useState(true)
  const ref = useRef(null)

  function handleChange(e) {
    setValue(e.target.value)
  }

  function handleBlur() {
    setLabelVisible(true)
    if (onChange) onChange(value)
  }

  return (
    <div
      style={{
        margin: '2px 0',
        padding: '0 12px',
        position: 'relative',
        display: 'flex',
        ...style,
      }}
    >
      {children}
      <input
        ref={ref}
        style={{
          background: '#545555',
          border: 'none',
          borderRadius: 3,
          padding: '3px 8px',
          color: '#fff',
          textShadow: '0 1px rgba(0,0,0,0.4)',
          fontSize: '12px',
          textAlign: labelVisible ? 'right' : 'left',
          flex: 1,
          width: '100%',
          ...inputStyle,
        }}
        value={value}
        onChange={handleChange}
        onFocus={() => setLabelVisible(false)}
        onBlur={handleBlur}
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            ref.current.blur()
          }
        }}
        onPointerDown={onPointerDown}
        onPointerLeave={onPointerLeave}
        inputMode={inputMode}
        pattern={pattern}
        maxLength={maxLength}
        minLength={minLength}
        max={max}
        min={min}
        step={step}
        placeholder={placeholder}
      />
      {labelVisible ? (
        <div
          style={{
            position: 'absolute',
            color: '#fff',
            fontSize: '12px',
            zIndex: 1,
            top: 3,
            left: 20,
            textShadow: '0 1px rgba(0,0,0,0.4)',
            backgroundColor: '#545555',
            paddingRight: 8,
          }}
          onClick={() => {
            ref.current.focus()
          }}
        >
          {name}
        </div>
      ) : null}
    </div>
  )
}
