import { useCallback, useEffect, useState } from 'react'
import { NodeBaseInputField } from './NodeBaseInputField'
import { useNodeFieldValue } from '../hooks/node'
import './NodeInputField.css'

export const NodeInputField = ({
  onFocus,
  onBlur,
  type,
  isConstant,
  slots,
  id,
  defaultValue,
  ...props
}) => {
  const Handle = slots?.Handle
  const [value, setValue] = useNodeFieldValue(id, defaultValue)

  return (
    <NodeBaseInputField
      value={value}
      setValue={setValue}
      type={type}
      onChange={setValue}
      onPointerDown={onFocus}
      onPointerLeave={onBlur}
      {...props}
    >
      {isConstant || !Handle ? null : <Handle />}
    </NodeBaseInputField>
  )
}

export const NodeInputDecimalField = ({
  precision = 3,
  onFocus,
  onBlur,
  type,
  isConstant,
  slots,
  ...props
}) => {
  const Handle = slots?.Handle
  const [value, setValue] = useNodeFieldValue(props.id, props.defaultValue)
  const [displayValue, setDisplayValue] = useState('')

  useEffect(() => {
    setDisplayValue(convertToDecimal(value))
  }, [value, precision])

  function convertToDecimal(val) {
    if (typeof val === 'string') {
      val = parseFloat(val)
    }
    if (isNaN(val)) return Number(0).toFixed(precision)
    return val.toFixed(precision)
  }

  const handleChange = useCallback(
    (val) => {
      // Allow only numeric input
      setValue(Number(convertToDecimal(val))) // Update global state
      setDisplayValue(convertToDecimal(val)) // Update local state
    },
    [value],
  )

  return (
    <NodeBaseInputField
      type="text"
      value={displayValue}
      setValue={setDisplayValue}
      inputMode="decimal"
      onChange={handleChange}
      pattern="\d+\\.\d\d\d"
      step={0.001}
      {...props}
    >
      {isConstant || !Handle ? null : <Handle />}
    </NodeBaseInputField>
  )
}

export const NodeInputTextField = (props) => {
  return <NodeInputField type="text" {...props} />
}

export const NodeInputNumberField = (props) => {
  return <NodeInputField type="number" {...props} />
}

export const NodeInputPasswordField = (props) => {
  return <NodeInputField type="password" {...props} />
}

export const NodeInputEmailField = (props) => {
  return <NodeInputField type="email" {...props} />
}

export const NodeInputColorField = (props) => {
  return <NodeInputField type="color" {...props} />
}

export const NodeInputDateField = (props) => {
  return <NodeInputField type="date" {...props} />
}

export const NodeInputDateTimeLocalField = (props) => {
  return <NodeInputField type="datetime-local" {...props} />
}

export const NodeInputMonthField = (props) => {
  return <NodeInputField type="month" {...props} />
}

export const NodeInputRangeField = (props) => {
  return <NodeInputField type="range" {...props} />
}

export const NodeInputTelField = (props) => {
  return <NodeInputField type="tel" {...props} />
}

export const NodeInputTimeField = (props) => {
  return <NodeInputField type="time" {...props} />
}

export const NodeInputUrlField = (props) => {
  return <NodeInputField type="url" {...props} />
}

export const NodeInputWeekField = (props) => {
  return <NodeInputField type="week" {...props} />
}
