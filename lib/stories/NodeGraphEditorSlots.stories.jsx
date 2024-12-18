import { NodeGraphEditor } from '../NodeGraphEditor'

import { Background, BackgroundVariant } from '@xyflow/react'
import { useBuildGraphConfig } from '../hooks/config.js'

const meta = {
  title: 'Node Graph Editor',
  component: ({ nodes, edges }) => {
    function CustomNodeHeader({ defaultTitle }) {
      return (
        <div className="bg-white text-black text-sm rounded-t text-center">
          {defaultTitle}
        </div>
      )
    }

    const config = useBuildGraphConfig({
      valueTypes: {
        string: {
          name: 'String',
          color: '#a1a1a1',
          inputEditor: 'value',
          defaultValue: '',
        },
      },
      nodeKinds: {
        default: {
          name: 'Default',
          color: '#a1a1a1',
        },
      },
      nodeTypes: {
        customHeaderNode: {
          kind: 'default',
          name: 'Custom Header Node',
          inputs: [
            {
              name: 'Value',
              id: 'value',
              valueType: 'string',
            },
          ],
          outputs: [
            {
              name: 'Value',
              id: 'value',
              valueType: 'string',
            },
          ],
        },
      },
    })
    return (
      <NodeGraphEditor
        config={config}
        slots={{
          header: CustomNodeHeader,
        }}
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

export default meta

export const Slots = {
  parameters: {
    layout: 'fullscreen',
  },
  args: {
    nodes: [
      {
        id: '1',
        type: 'customHeaderNode',
        position: { x: 100, y: 100 },
        data: {},
      },
    ],
    edges: [],
  },
}
