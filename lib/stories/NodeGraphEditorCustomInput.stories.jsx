import { NodeGraphEditor } from '../NodeGraphEditor'
import { Background, BackgroundVariant } from '@xyflow/react'
import { useBuildGraphConfig } from '../hooks/config'
import { NodeInputDecimalField } from '../components/NodeInputField'

const meta = {
  title: 'Node Graph Editor',
  component: ({ nodes, edges }) => {
    function CustomInput({ slots, ...config }) {
      const Handle = slots?.Handle
      return (
        <div
          style={{
            position: 'relative',
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          {Handle && <Handle />}
          <NodeInputDecimalField {...config} name="X" id="x" />
          <NodeInputDecimalField {...config} name="Y" id="y" />
          <NodeInputDecimalField {...config} name="Z" id="z" />
        </div>
      )
    }

    const config = useBuildGraphConfig(
      {
        valueTypes: {},
        nodeKinds: {
          default: {
            name: 'Default',
            color: '#a1a1a1',
          },
        },
        nodeTypes: {
          vector: {
            kind: 'default',
            name: 'Vector',
            inputs: [
              {
                name: 'Value',
                id: 'value',
                valueType: 'vector',
              },
            ],
            outputs: [
              {
                name: 'Value',
                id: 'value',
                valueType: 'vector',
              },
            ],
          },
        },
      },
      (config) => {
        config.registerInput('vector', CustomInput, {
          name: 'Vector',
          color: '#f43f5e',
          shape: 'diamondDot',
        })
      },
    )
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
  decorators: (Story) => (
    <div style={{ width: '100vw', height: '100vh' }}>
      <Story />
    </div>
  ),
  tags: ['autodocs'],
}

export const CustomInput = {
  parameters: {
    layout: 'fullscreen',
  },
  args: {
    nodes: [
      {
        id: '1',
        type: 'vector',
        position: { x: 100, y: 100 },
        data: {},
      },
    ],
    edges: [],
  },
}

export default meta
