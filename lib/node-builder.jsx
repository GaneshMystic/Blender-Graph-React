import React, { memo, useCallback, useMemo } from 'react'
import { Position } from '@xyflow/react'
import { useNodesEdges } from './hooks/node'
import { NodeLinkedField } from './components/NodeLinkedField'
import { NodeOutputField } from './components/NodeOutputField'
import { NodeContainer } from './components/NodeContainer'
import { useFocusBlur } from './hooks/focus'
import { Handle } from './components/Handle.jsx'
import { InputGroup } from './components/InputGroup.jsx'
import { useGraphStore } from './index.js'

export function NodeBody({ node, slots, isFocused, onBlur, onFocus }) {
  return (
    <div
      style={{
        padding: '8px 0 12px',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {slots.bodyTop && (
        <slots.bodyTop
          isFocused={isFocused}
          onBlur={onBlur}
          onFocus={onFocus}
          node={node}
        />
      )}
      {slots.outputs}
      {slots.inputs}
      {slots.bodyBottom && (
        <slots.bodyBottom
          isFocused={isFocused}
          onBlur={onBlur}
          onFocus={onFocus}
          node={node}
        />
      )}
    </div>
  )
}

export function NodeWrapper({ children }) {
  return <>{children}</>
}

/**
 * Determines whether a node component should be re-rendered based
 * on whether the node's selection or data has changed.
 * @param a {Node}
 * @param b {Node}
 */
const isComponentChanged = (a, b) =>
  a.selected === b.selected && JSON.stringify(a.data) === JSON.stringify(b.data) // switched from lodash because bundle size was so large

export function buildNode(config, nodeConfig, type) {
  function component(node) {
    const [isFocused, onFocus, onBlur] = useFocusBlur()
    const slots = useGraphStore((store) => store.slots)

    function getInputElements(inputs, edges) {
      const targetEdges = edges.filter((edge) => edge.target === node.id)
      return inputs.map((input) =>
        getInputElement(config, targetEdges, input, onFocus, onBlur),
      )
    }

    const getHandlesForInputs = useCallback(
      (configs) => {
        return configs.map((inputConfig) => (
          <Handle
            key={inputConfig.id}
            handleType="target"
            position={Position.Left}
            {...config.getInputConfig(inputConfig)}
          />
        ))
      },
      [config],
    )

    // Construct memoized input components based on the node config
    const edges = useNodesEdges(node.id)
    const edgeIds = edges.map((e) => e.id).join()
    const inputConfigs = nodeConfig.inputs ?? []

    // Construct memoized input and output components based on the node config
    const inputs = useMemo(() => {
      return getInputElements(
        inputConfigs.filter((input) => !input.inputGroup),
        edges,
      )
    }, [inputConfigs, config, node, edgeIds])

    const outputs = useMemo(() => {
      return (nodeConfig.outputs ?? []).map((output) =>
        getOutputElements(config, output),
      )
    }, [config, node])

    // Input groups are those inputs that should be rendered under a collapsable accordion
    const inputGroups = useMemo(() => {
      const grouped = inputConfigs
        .filter((input) => input.inputGroup)
        .reduce((acc, input) => {
          const inputGroup = input.inputGroup
          if (!acc[inputGroup]) acc[inputGroup] = []
          acc[inputGroup].push(input)
          return acc
        }, {})

      return Object.entries(grouped).map(([inputGroup, inputs]) => (
        <InputGroup
          label={inputGroup}
          key={inputGroup}
          handles={getHandlesForInputs(inputs)}
        >
          {getInputElements(inputs, edges)}
        </InputGroup>
      ))
    }, [edgeIds])

    const bodySlots = useMemo(() => {
      return {
        bodyTop: slots.bodyTop,
        bodyBottom: slots.bodyBottom,
        inputs: inputs.concat(inputGroups),
        outputs,
      }
    }, [slots, inputs, outputs, inputGroups])

    if (nodeConfig.custom) {
      const CustomNode = config.customNode(type)
      return (
        <CustomNode
          isFocused={isFocused}
          onFocus={onFocus}
          onBlur={onBlur}
          node={node}
          slots={bodySlots}
        />
      )
    }

    return (
      <slots.wrapper
        isFocused={isFocused}
        onFocus={onFocus}
        onBlur={onBlur}
        node={node}
      >
        <NodeContainer draggable={!isFocused} node={node}>
          <slots.body
            slots={bodySlots}
            isFocused={isFocused}
            onFocus={onFocus}
            onBlur={onBlur}
            node={node}
          />
        </NodeContainer>
      </slots.wrapper>
    )
  }
  return memo(component, isComponentChanged)
}

function getInputElement(graphConfig, edges, input, onFocus, onBlur) {
  const inputConfig = graphConfig.getInputConfig(input)

  if (edges.find((edge) => edge.targetHandle === input.id)) {
    return <NodeLinkedField key={inputConfig.id} {...inputConfig} />
  }

  const Element = graphConfig.getInputComponent(input.valueType)
  if (Element) {
    return (
      <Element
        key={input.id}
        onFocus={onFocus}
        onBlur={onBlur}
        slots={{
          Handle: !inputConfig.isConstant
            ? () => (
                <Handle
                  handleType="target"
                  position={Position.Left}
                  {...inputConfig}
                />
              )
            : undefined,
        }}
        {...inputConfig}
      ></Element>
    )
  } else {
    return <NodeLinkedField key={input.id} {...inputConfig} />
  }
}

function getOutputElements(graphConfig, output) {
  const outputConfig = graphConfig.getOutputConfig(output)
  return <NodeOutputField key={output.id} {...outputConfig} />
}
