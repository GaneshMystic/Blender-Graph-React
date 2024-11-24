import {
  NodeInputColorField,
  NodeInputDateField,
  NodeInputDateTimeLocalField,
  NodeInputDecimalField,
  NodeInputEmailField,
  NodeInputMonthField,
  NodeInputNumberField,
  NodeInputPasswordField,
  NodeInputRangeField,
  NodeInputTelField,
  NodeInputTextField,
  NodeInputTimeField,
  NodeInputUrlField,
  NodeInputWeekField,
} from './NodeInputField.jsx'
import { NodeCheckboxField } from './NodeCheckboxField.jsx'
import { NodeSelectField } from './NodeSelectField.jsx'
import { NodeToggleField } from './NodeToggleField.jsx'

export function getBuiltinInputs() {
  return {
    text: NodeInputTextField,
    number: NodeInputNumberField,
    decimal: NodeInputDecimalField,
    password: NodeInputPasswordField,
    email: NodeInputEmailField,
    color: NodeInputColorField,
    date: NodeInputDateField,
    datetimeLocal: NodeInputDateTimeLocalField,
    month: NodeInputMonthField,
    range: NodeInputRangeField,
    tel: NodeInputTelField,
    time: NodeInputTimeField,
    url: NodeInputUrlField,
    week: NodeInputWeekField,
    checkbox: NodeCheckboxField,
    options: NodeSelectField,
    buttonGroup: NodeToggleField,
  }
}
