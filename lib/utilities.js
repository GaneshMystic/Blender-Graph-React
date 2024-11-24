import { produce } from 'immer'
import { nanoid } from 'nanoid'

export function getConnectionEdge(state, conn) {
  return state.edgeLookup.get(
    `xy-edge__${conn.source}${conn.sourceHandle}-${conn.target}${conn.targetHandle}`,
  )
}

export function createNode(config, node) {
  return addNodeInternals(config, {
    id: nanoid(6),
    data: {},
    ...node,
  })
}

export function addNodeInternals(config, node) {
  if (node.data.hasOwnProperty('internal')) {
    return node
  }

  return produce(node, (draft) => {
    const nodeConfig = config.getNodeConfig(node.type ?? '')
    const inputs = nodeConfig
      ? (nodeConfig.inputs ?? []).map((input) => ({
          id: input.id,
          name: input.name,
          valueType: input.valueType,
        }))
      : []

    const outputs = nodeConfig
      ? (nodeConfig.outputs ?? []).map((output) => ({
          id: output.id,
          name: output.name,
          valueType: output.valueType,
        }))
      : []

    draft.data.internal = {
      inputs,
      outputs,
    }
  })
}
