import { memo, useCallback, useMemo, useRef } from 'react'
import { useStoreApi, Handle as FlowHandle } from '@xyflow/react'
import { useGraphApi } from '../context/GraphContext.jsx'

const SIZE = 8

export const Handle = memo(({ style, ...props }) => {
  const graphApi = useGraphApi()
  const ref = useRef(null)

  const width = SIZE
  const height = props.isArray ? SIZE * 1.8 : SIZE

  const api = useStoreApi()

  const isValidConnection = useCallback((connection) => {
    const sourceNodeType = api
      .getState()
      .nodeLookup.get(connection.source)?.type
    const targetNodeType = api
      .getState()
      .nodeLookup.get(connection.target)?.type
    const config = graphApi.getState().config

    const sourceNodeConfig = config.getNodeConfig(sourceNodeType)
    const targetNodeConfig = config.getNodeConfig(targetNodeType)

    if (!sourceNodeConfig || !targetNodeConfig) {
      console.warn('Could not find node config for node type', {
        sourceNodeType,
        targetNodeType,
      })
      return true // allow connections where we can't verify the types
    }

    // safety: should always have an output if there's a source node
    const sourceOutputConfig = sourceNodeConfig.outputs.find(
      (v) => v.id === connection.sourceHandle,
    )
    // safety: should always have an input if there's this function is firing
    const targetInputConfig = targetNodeConfig.inputs.find(
      (v) => v.id === connection.targetHandle,
    )
    if (!sourceOutputConfig || !targetInputConfig) {
      return true // allow connections where we can't verify the types
    }

    if (
      targetInputConfig.valueType !== 'any' &&
      sourceOutputConfig.valueType !== 'any'
    ) {
      return sourceOutputConfig.valueType === targetInputConfig.valueType
    } else {
      return true
    }
  }, [])

  const shapeStyle =
    props.shape === 'diamond' || props.shape === 'diamondDot'
      ? { borderRadius: 0, transform: 'rotate(45deg)', top: 8 }
      : {}

  const dot = useMemo(
    () => (
      <div
        style={{
          width: 2,
          height: 2,
          position: 'absolute',
          borderRadius: 1,
          background: '#0f1010',
          ...style,
        }}
      />
    ),
    [style],
  )

  return (
    <div
      className={`react-flow__handle-${props.position}`}
      style={{
        width: width * 2,
        height: height * 2,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        zIndex: 1000000,
      }}
    >
      <div
        style={{
          borderRadius: '5px',
          ...style,
          ...shapeStyle,
          width,
          height,
          border: '1px solid #0f1010',
          background: props.color,
        }}
      />
      {props.shape === 'diamondDot' && dot}
      <FlowHandle
        ref={ref}
        id={props.id}
        isValidConnection={isValidConnection}
        style={{
          border: 'none',
          background: 'transparent',
          width: width * 2,
          height: height * 2,
          // right: 0,
          // left: 0,
        }}
        type={props.handleType}
        position={props.position}
      />
    </div>
  )
})
