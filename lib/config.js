import { getBuiltinInputs } from './components/inputs.jsx'

export const ANY = '__any'

function isValueTypeConfigOptions(config) {
  return (
    config.inputEditor === 'options' || config.inputEditor === 'buttonGroup'
  )
}

export class GraphConfig {
  valueTypes = {}
  nodeKinds = {}
  nodeTypes = {}
  customNodes = {}
  inputs = {}

  constructor(props) {
    this.keybindings = {
      save: ['meta+s'],
      copy: ['meta+c'],
      paste: ['meta+v'],
      delete: ['x', 'Backspace', 'Delete'],
      ...props?.keybindings,
    }
    this.valueTypes = props?.valueTypes ?? this.valueTypes
    this.valueTypes[ANY] = {
      name: 'Any',
      color: '#a1a1a1',
      inputEditor: null,
    }
    this.nodeKinds = props?.nodeKinds ?? this.nodeKinds
    this.nodeTypes = props?.nodeTypes ?? this.nodeTypes
    for (const [key, value] of Object.entries(getBuiltinInputs())) {
      this.inputs[key] = value
    }
  }

  validate() {
    const errors = []
    Object.values(this.nodeTypes).forEach((node) => {
      if (node.inputs) {
        node.inputs.forEach((input) => {
          if (!this.valueTypes[input.valueType]) {
            errors.push(
              `Node '${node.name}' has an input that references non-existent value type '${input.valueType}'`,
            )
          }
        })
      }
      if (node.outputs) {
        node.outputs.forEach((output) => {
          if (!this.valueTypes[output.valueType]) {
            errors.push(
              `Node '${node.name}' has an output that references non-existent value type '${output.valueType}'`,
            )
          }
        })
      }
    })
    if (errors.length > 0) {
      throw new Error(errors.join('\n'))
    }
    return this
  }

  registerCustomNode(name, type, kind, node, inputs, outputs) {
    this.customNodes[type] = node
    this.nodeTypes[type] = {
      kind,
      name,
      inputs: inputs,
      outputs: outputs,
      custom: true,
    }
    this.validate()
  }

  registerInput(type, input, valueType) {
    this.inputs[type] = input
    this.valueTypes[type] = {
      ...valueType,
      inputEditor: type,
    }
    this.validate()
  }

  customNode(type) {
    return this.customNodes[type]
  }

  /**
   * Accepts a value type and returns the input component that should be used to
   * render the input for that value type.
   * @param valueType
   */
  getInputComponent(valueType) {
    const inputEditor = this.valueTypes[valueType]?.inputEditor
    if (inputEditor == null) return null
    return this.inputs[inputEditor]
  }

  nodeConfigs() {
    return Object.entries(this.nodeTypes).map(([type, value]) => ({
      ...value,
      type,
    }))
  }

  getNodeConfig(type) {
    return this.nodeTypes[type]
  }

  nodeConfigsByKind(kind) {
    return Object.entries(this.nodeTypes)
      .map(([type, n]) => ({ type, ...n }))
      .filter((n) => n.kind === kind)
  }

  nodeKindConfigs() {
    return Object.entries(this.nodeKinds).map(([type, value]) => ({
      ...value,
      type,
    }))
  }

  getRegisteredNodeTypes() {
    return Object.entries(this.nodeKinds).map(([type, kind]) => ({
      type,
      name: kind.name,
      nodes: this.nodeConfigsByKind(type).map((node) => ({
        type: node.type,
        name: node.name,
      })),
    }))
  }

  getNodeKindConfig(nodeType) {
    return this.nodeKinds[nodeType]
  }

  valueType(type) {
    const config = this.valueTypes[type]
    if (config == null)
      console.error(
        `No value type config for '${String(type)}'. Registered value types:`,
        this.valueTypes,
      )
    if (isValueTypeConfigOptions(config)) {
      return config
    }
    return config
  }

  getInputConfig(input) {
    return {
      ...this.valueType(input.valueType),
      ...input,
    }
  }

  getOutputConfig(output) {
    return {
      ...this.valueType(output.valueType),
      ...output,
    }
  }

  getNodeComponents(buildNode) {
    return Object.entries(this.nodeTypes)
      .map(([type, node]) => [type, buildNode(this, node, type)])
      .reduce((acc, [type, node]) => {
        acc[type] = node
        return acc
      }, {})
  }
}
