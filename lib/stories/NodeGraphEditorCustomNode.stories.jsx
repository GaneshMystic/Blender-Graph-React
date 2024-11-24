// Import required modules
const NodeGraphEditor = require('../NodeGraphEditor')
const { Meta, StoryObj } = require('@storybook/react')
const { CustomNodeProps, GraphConfig } = require('../config')
const { useMemo } = require('react')
const {
  Background,
  BackgroundVariant,
  Edge,
  Node,
  Position,
} = require('@xyflow/react')
const { NodeContainer } = require('../components/NodeContainer')
const { Handle } = require('../components/Handle')

// Define the meta object
const meta = {
  title: 'Node Graph Editor',
  component: ({ nodes, edges }) => {
    // Define the CustomNode component
    function CustomNode({ node, slots, isFocused, onFocus, onBlur }) {
      return (
        <NodeContainer node={node} draggable={!isFocused}>
          <div>
            {slots.outputs}
            <textarea
              defaultValue="This is a text area"
              style={{ backgroundColor: 'gray' }}
              onFocus={onFocus}
              onBlur={onBlur}
            />
            <Handle
              id="value"
              position={Position.Left}
              handleType="source"
              shape="circle"
              color="#a1a1a1"
            />
          </div>
        </NodeContainer>
      )
    }

    // Define the config object
    const config = useMemo(() => {
      const config = new GraphConfig({
        valueTypes: {
          string: {
            name: 'String',
            color: '#f43f5e',
            shape: 'circle',
            inputEditor: 'text',
            defaultValue: '',
          },
        },
        nodeKinds: {
          custom: {
            name: 'Custom',
            color: '#f43f5e',
          },
        },
      })
      config.registerCustomNode(
        'My Custom Node',
        'my-custom-node',
        'custom',
        CustomNode,
        [],
        [{ name: 'Value', id: 'value', valueType: 'string' }],
      )
      return config.validate()
    }, [])

    // Return the NodeGraphEditor component
    return (
      <NodeGraphEditor
        config={config}
        defaultNodes={nodes}
        defaultEdges={edges}
      >
        <Background color="#52525b" variant={BackgroundVariant.Dots} />
      </NodeGraphEditor>
    )
  },
  // Define the decorators
  decorators: (Story) => (
    <div style={{ width: '100vw', height: '100vh' }}>
      <Story />
    </div>
  ),
  // Define the tags
  tags: ['autodocs'],
}

// Export the meta object
export default meta

// Export the CustomNode story
export const CustomNode = {
  parameters: {
    layout: 'fullscreen',
  },
  args: {
    nodes: [
      {
        id: '1',
        type: 'my-custom-node',
        position: { x: 100, y: 100 },
        data: {},
      },
    ],
    edges: [],
  },
}
