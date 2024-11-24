import { memo } from 'react'
import { Handle } from './Handle'
import { Label } from './Label'
import { Position } from '@xyflow/react'
import { useGraphStore } from '../context/GraphContext.jsx'

export const NodeOutputField = memo((props) => {
  const config = useGraphStore((store) => store.config)
  const valueTypeConfig = config.valueType(props.valueType)
  return (
    <div style={{ position: 'relative', margin: '2px 0', padding: '0 12px' }}>
      <div style={{ position: 'relative', display: 'flex' }}>
        <Label style={{ textAlign: 'right' }}>{props.name}</Label>
      </div>
      <Handle
        handleType="source"
        position={Position.Right}
        {...valueTypeConfig}
        {...props}
      />
    </div>
  )
})
