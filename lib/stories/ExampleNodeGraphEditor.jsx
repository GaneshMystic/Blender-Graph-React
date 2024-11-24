import { Background, BackgroundVariant } from '@xyflow/react'
import { forwardRef } from 'react'
import { NodeGraphEditor } from '../NodeGraphEditor'
import { useBuildGraphConfig } from '../hooks/config'

export const ExampleNodeGraphEditor = forwardRef(
  ({ nodes, edges, config: _config }, ref) => {
    const config = useBuildGraphConfig(_config)
    return (
      <NodeGraphEditor
        config={config}
        ref={ref}
        defaultNodes={nodes}
        defaultEdges={edges}
      >
        <Background color="#52525b" variant={BackgroundVariant.Dots} />
      </NodeGraphEditor>
    )
  },
)
