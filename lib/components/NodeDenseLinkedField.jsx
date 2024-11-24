import { memo } from 'react'
import { Handle } from './Handle.jsx'
import { Position } from '@xyflow/react'

export const NodeDenseLinkedField = memo((props) => {
  return (
    <div style={{ position: 'relative', margin: '0px 0', padding: '0 12px' }}>
      <Handle handleType="target" position={Position.Left} {...props} />
      {/*<div style={{ position: "relative", display: "flex" }}>fo</div>*/}
    </div>
  )
})
