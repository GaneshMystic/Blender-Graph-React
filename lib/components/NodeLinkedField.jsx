import { Handle } from './Handle'
import { Label } from './Label'
import { memo } from 'react'
import { Position } from '@xyflow/react'

export const NodeLinkedField = memo((props) => {
  return (
    <div style={{ position: 'relative', margin: '2px 0', padding: '0 12px' }}>
      <Handle handleType="target" position={Position.Left} {...props} />
      <div style={{ position: 'relative', display: 'flex' }}>
        <Label>{props.name}</Label>
      </div>
    </div>
  )
})
