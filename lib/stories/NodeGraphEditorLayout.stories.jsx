import { ExampleNodeGraphEditor } from './ExampleNodeGraphEditor'

import { useRef } from 'react'
import { DagreLayoutEngine } from '../layout/dagre'
import {
  PipelineCenteredLayoutEngine,
  PipelineLayoutEngine,
} from '../layout/pipeline'

const dagre = new DagreLayoutEngine()
const pipelineCentered = new PipelineCenteredLayoutEngine()
const pipeline = new PipelineLayoutEngine()

const meta = {
  title: 'Node Graph Editor',
  component: ({ config, nodes, edges }) => {
    const ref = useRef(null)
    return (
      <div style={{ width: '100%', height: '100%' }}>
        <div className="absolute top-3 left-3 z-10 space-x-3">
          <button
            className="bg-neutral-500 text-white px-4 rounded hover:bg-neutral-600"
            onClick={() => ref.current.layout(dagre)}
          >
            Dagre Layout
          </button>
          <button
            className="bg-neutral-500 text-white px-4 rounded hover:bg-neutral-600"
            onClick={() => ref.current.layout(pipeline)}
          >
            Pipeline Layout
          </button>
          <button
            className="bg-neutral-500 text-white px-4 rounded hover:bg-neutral-600"
            onClick={() => ref.current.layout(pipelineCentered)}
          >
            Pipeline Centered Layout
          </button>
        </div>
        <ExampleNodeGraphEditor
          ref={ref}
          config={config}
          nodes={nodes}
          edges={edges}
        />
      </div>
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

export const Layouts = {
  parameters: {
    layout: 'fullscreen',
  },
  args: {
    nodes: [
      {
        id: '1',
        type: 'string',
        position: randomPosition(100, 700),
        data: {},
      },
      {
        id: '2',
        type: 'string',
        position: randomPosition(100, 700),
        data: {},
      },
      {
        id: '3',
        type: 'string',
        position: randomPosition(100, 700),
        data: {},
      },
      {
        id: '4',
        type: 'string',
        position: randomPosition(100, 700),
        data: {},
      },
      {
        id: '5',
        type: 'string',
        position: randomPosition(100, 700),
        data: {},
      },
      {
        id: '6',
        type: 'string',
        position: randomPosition(100, 700),
        data: {},
      },
    ],
    edges: [
      {
        id: '1',
        source: '1',
        target: '2',
        sourceHandle: 'value',
        targetHandle: 'value',
      },
      {
        id: '2',
        source: '1',
        target: '3',
        sourceHandle: 'value',
        targetHandle: 'value',
      },
      {
        id: '3',
        source: '2',
        target: '4',
        sourceHandle: 'value',
        targetHandle: 'value',
      },
      {
        id: '4',
        source: '3',
        target: '4',
        sourceHandle: 'value',
        targetHandle: 'value',
      },
      {
        id: '5',
        source: '4',
        target: '5',
        sourceHandle: 'value',
        targetHandle: 'value',
      },
      {
        id: '6',
        source: '4',
        target: '6',
        sourceHandle: 'value',
        targetHandle: 'value',
      },
    ],
    config: {
      valueTypes: {
        string: {
          name: 'String',
          color: '#a1a1a1',
          inputEditor: 'text',
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
        string: {
          kind: 'default',
          name: 'String',
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
    },
  },
}

function randomPosition(min, max) {
  const x = Math.random() * (max - min) + min
  const y = Math.random() * (max - min) + min
  return { x, y }
}
