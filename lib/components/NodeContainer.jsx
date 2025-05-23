import { Position } from '@xyflow/react'
import { useMemo } from 'react'
import { NodeHeader } from './NodeHeader'
import { Handle } from './Handle'
import { useNodeCollapsed } from '../hooks/node'
import { useGraphStore } from '../context/GraphContext.jsx'

export function NodeContainer({ draggable, node, styles, children }) {
  const config = useGraphStore((store) => store.config)
  const slots = useGraphStore((store) => store.slots)
  const nodeConfig = config.getNodeConfig(node.type)
  const nodeKindConfig = config.getNodeKindConfig(nodeConfig.kind)
  const [collapsed, toggleCollapsed] = useNodeCollapsed()

  const headerProps = useMemo(
    () => ({
      defaultTitle: nodeConfig.name,
      color: nodeKindConfig.color,
      collapsed,
      toggleCollapsed,
    }),
    [nodeConfig, nodeKindConfig, collapsed, toggleCollapsed],
  )

  if (collapsed) {
    return (
      <CollapsedNodeContainer
        node={node}
        nodeConfig={nodeConfig}
        nodeKindConfig={nodeKindConfig}
        toggleCollapsed={toggleCollapsed}
      />
    )
  } else {
    return (
      <div
        style={{
          borderRadius: 6,
          fontFamily: 'sans-serif',
          boxShadow: '0 1px 4px rgba(0, 0, 0, 0.2)',
          background: '#303030',
          border: `1px solid ${node.selected ? '#fff' : '#0f1010'}`,
          ...styles,
        }}
        className={draggable ? undefined : 'nodrag'}
      >
        <slots.header {...headerProps} />
        {children}
      </div>
    )
  }
}

function CollapsedNodeContainer({
  node,
  nodeConfig,
  nodeKindConfig,
  toggleCollapsed,
}) {
  const config = useGraphStore((store) => store.config)
  const inputHandles = useMemo(
    () =>
      (nodeConfig.inputs ?? []).map((input) => getInputHandles(config, input)),
    [config],
  )
  const outputHandles = useMemo(
    () =>
      (nodeConfig.outputs ?? []).map((output) =>
        getOutputHandles(config, output),
      ),
    [config],
  )

  return (
    <div
      style={{
        borderRadius: 6,
        border: `1px solid ${node.selected ? '#fff' : '#0f1010'}`,
      }}
    >
      <NodeHeader
        defaultTitle={nodeConfig.name}
        color={nodeKindConfig.color}
        collapsed={true}
        toggleCollapsed={toggleCollapsed}
      />
      {inputHandles}
      {outputHandles}
    </div>
  )
}

/**
 * Returns an invisible input <Handle/> element for the given input config. This
 * is used when the node is collapsed
 * @param graphConfig
 * @param input
 */
function getInputHandles(graphConfig, input) {
  const inputConfig = graphConfig.getInputConfig(input)
  return (
    <Handle
      key={inputConfig.id}
      style={{ display: 'none' }}
      position={Position.Left}
      handleType="target"
      {...inputConfig}
    />
  )
}

/**
 * Returns an invisible output <Handle/> element for the given output config. This
 * is used when the node is collapsed
 * @param graphConfig
 * @param output
 */
function getOutputHandles(graphConfig, output) {
  const outputConfig = graphConfig.getOutputConfig(output)
  return (
    <Handle
      key={outputConfig.id}
      style={{ display: 'none' }}
      position={Position.Right}
      handleType="source"
      {...outputConfig}
    />
  )
}
