import {
  ReactFlow,
  ReactFlowProvider,
  useNodesInitialized,
  useReactFlow,
  useStoreApi,
} from '@xyflow/react'
import '@xyflow/react/dist/style.css'
import { useNodeTypes } from './hooks/config'
import { forwardRef, useImperativeHandle, useMemo, useEffect } from 'react'
import { defaultEdgeTypes } from './edge-types'
import { useSocketConnect } from './hooks/connect'
import { useHotkeys } from 'react-hotkeys-hook'
import { ClipboardItem } from './clipboard'
import { useLayoutEngine } from './layout/layout'
import { GraphProvider, useGraphStore } from './context/GraphContext.jsx'
import './tailwind.css'

export const NodeGraphEditor = forwardRef(
  ({ defaultNodes, defaultEdges, slots, ...props }, ref) => {
    return (
      <GraphProvider
        config={props.config}
        initialNodes={defaultNodes}
        initialEdges={defaultEdges}
        slots={slots}
      >
        <ReactFlowProvider>
          <Flow {...props} ref={ref} />
        </ReactFlowProvider>
      </GraphProvider>
    )
  },
)

const Flow = forwardRef(({ backgroundStyles, layoutEngine, ...props }, ref) => {
  const nodeTypes = useNodeTypes()
  const edgeTypes = useMemo(() => defaultEdgeTypes, [])
  const onConnect = useSocketConnect()
  const config = useGraphStore((store) => store.config)
  const { getState } = useStoreApi()
  const { setNodes, setEdges } = useReactFlow()

  // Handle clipboard events
  useHotkeys(
    config.keybindings.copy,
    async () => await ClipboardItem.copyNodesAndEdges(getState()),
  )
  useHotkeys(
    config.keybindings.paste,
    async () => await ClipboardItem.tryReadClipboard(setNodes, setEdges),
  )

  // Provide methods to parent components
  const layout = useLayoutEngine()
  const serialize = useGraphStore((store) => store.serialize)
  const deserialize = useGraphStore((store) => store.deserialize)
  const addNode = useGraphStore((store) => store.addNode)
  const removeNode = useGraphStore((store) => store.removeNode)
  const addEdge = useGraphStore((store) => store.addEdge)
  const removeEdge = useGraphStore((store) => store.removeEdge)
  const updateNode = useGraphStore((store) => store.updateNode)
  const updateEdge = useGraphStore((store) => store.updateEdge)
  const updateNodeData = useGraphStore((store) => store.updateNodeData)
  const getNode = useGraphStore((store) => store.getNode)
  const getEdge = useGraphStore((store) => store.getEdge)

  useImperativeHandle(
    ref,
    () => ({
      layout,
      serialize,
      deserialize,
      addNode,
      removeNode,
      getNode,
      updateNode,
      updateNodeData,
      addEdge,
      removeEdge,
      updateEdge,
      getEdge,
    }),
    [serialize],
  )

  const { nodes, edges, onNodesChange, onEdgesChange } = useGraphStore(
    (store) => ({
      nodes: store.nodes,
      edges: store.edges,
      onNodesChange: store.onNodesChange,
      onEdgesChange: store.onEdgesChange,
    }),
  )

  const initialized = useNodesInitialized()
  useEffect(() => {
    const shouldLayout = !!getState().nodes.find(
      (node) => node.position == undefined,
    )
    if (initialized && shouldLayout && layoutEngine) {
      layout(layoutEngine)
    }
  }, [initialized, layoutEngine])

  return (
    <div
      className="bg-neutral-900"
      style={{
        width: '100%',
        height: '100%',
        ...backgroundStyles,
      }}
    >
      <ReactFlow
        {...props}
        colorMode={props.colorMode ?? 'dark'}
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        nodeTypes={nodeTypes}
        edgeTypes={edgeTypes}
        deleteKeyCode={config.keybindings.delete}
      >
        {props.children}
      </ReactFlow>
    </div>
  )
})
