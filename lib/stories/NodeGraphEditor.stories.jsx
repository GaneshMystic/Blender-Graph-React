import { ExampleNodeGraphEditor } from './ExampleNodeGraphEditor'
const simpleConfig = {
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
}

const meta = {
  title: 'Node Graph Editor',
  component: ExampleNodeGraphEditor,
  decorators: (Story) => (
    <div style={{ width: '100vw', height: '100vh' }}>
      <Story />
    </div>
  ),
  tags: ['autodocs'],
}

export const Simple = {
  parameters: {
    layout: 'fullscreen',
  },
  args: {
    nodes: [
      {
        id: '1',
        type: 'string',
        position: { x: 100, y: 100 },
        data: {},
      },
      {
        id: '2',
        type: 'string',
        position: { x: 400, y: 200 },
        data: {},
      },
    ],
    edges: [
      {
        id: 'e1',
        source: '1',
        sourceHandle: 'value',
        target: '2',
        targetHandle: 'value',
      },
    ],
    config: simpleConfig,
  },
}

export const InputFields = {
  parameters: {
    layout: 'fullscreen',
  },
  args: {
    nodes: [
      {
        id: '1',
        type: 'inputFields',
        position: { x: 100, y: 100 },
        data: {},
      },
    ],
    edges: [],
    config: {
      valueTypes: {
        string: {
          name: 'String',
          color: '#a1a1a1',
          inputEditor: 'text',
          defaultValue: '',
        },
        boolean: {
          name: 'Boolean',
          color: '#a1a1a1',
          inputEditor: 'checkbox',
          defaultValue: true,
        },
        httpMethod: {
          name: 'HTTP Method',
          color: '#06b6d4',
          inputEditor: 'options',
          options: [
            { name: 'GET', value: 'GET' },
            { name: 'POST', value: 'POST' },
            { name: 'PUT', value: 'PUT' },
            { name: 'DELETE', value: 'DELETE' },
          ],
          defaultValue: 'GET',
        },

        httpProtocol: {
          name: 'HTTP Method',
          color: '#0284c7',
          inputEditor: 'buttonGroup',
          options: [
            { name: 'HTTP', value: 'HTTP' },
            { name: 'HTTPS', value: 'HTTPS' },
          ],
          defaultValue: 'HTTP',
        },
      },
      nodeKinds: {
        default: {
          name: 'Default',
          color: '#0284c7',
        },
      },
      nodeTypes: {
        inputFields: {
          kind: 'default',
          name: 'Input Fields',
          inputs: [
            {
              name: 'Value',
              id: 'value',
              valueType: 'string',
            },
            {
              name: 'Constant',
              id: 'constant',
              valueType: 'string',
              isConstant: true,
            },
            {
              name: 'Array',
              id: 'array',
              valueType: 'string',
              isArray: true,
            },
            {
              name: 'Options',
              id: 'options',
              valueType: 'httpMethod',
            },
            {
              name: 'Button Group',
              id: 'buttonGroup',
              valueType: 'httpProtocol',
            },
            {
              name: 'Checkbox',
              id: 'checkbox',
              valueType: 'boolean',
            },
          ],
        },
      },
    },
  },
}

export const SelectedEdgeHighlighting = {
  parameters: {
    layout: 'fullscreen',
  },
  args: {
    nodes: [
      {
        id: '1',
        type: 'combineXYZ',
        position: { x: 100, y: 100 },
        data: { label: 'Combine XYZ' },
        selected: true,
      },
      {
        id: '2',
        type: 'points',
        position: { x: 400, y: 200 },
        data: { label: 'Points' },
      },
      {
        id: '3',
        type: 'viewer',
        position: { x: 700, y: 100 },
        data: { label: 'Viewer 1' },
      },
      {
        id: '4',
        type: 'viewer',
        position: { x: 700, y: 300 },
        data: { label: 'Viewer 2' },
      },
    ],
    edges: [
      {
        id: 'e1',
        source: '1',
        sourceHandle: 'vector',
        target: '2',
        targetHandle: 'position',
      },
      {
        id: 'e2',
        source: '2',
        sourceHandle: 'geometry',
        target: '3',
        targetHandle: 'geometry',
      },
      {
        id: 'e3',
        source: '2',
        sourceHandle: 'geometry',
        target: '4',
        targetHandle: 'geometry',
      },
    ],
    config: {
      valueTypes: {
        number: {
          name: 'Number',
          color: '#a1a1a1',
          inputEditor: 'number',
          defaultValue: 0,
        },
        vector: {
          name: 'Vector',
          color: '#8b5cf6',
          inputEditor: null,
        },
        geometry: {
          name: 'Geometry',
          color: '#059669',
          inputEditor: null,
        },
      },
      nodeKinds: {
        geometry: {
          name: 'Geometry',
          color: '#059669',
        },
      },
      nodeTypes: {
        combineXYZ: {
          kind: 'geometry',
          name: 'Combine XYZ',
          inputs: [
            {
              name: 'X',
              id: 'x',
              valueType: 'number',
            },
            {
              name: 'Y',
              id: 'y',
              valueType: 'number',
            },
            {
              name: 'Z',
              id: 'z',
              valueType: 'number',
            },
          ],
          outputs: [
            {
              name: 'Vector',
              id: 'vector',
              valueType: 'vector',
            },
          ],
        },
        points: {
          kind: 'geometry',
          name: 'Points',
          inputs: [
            {
              name: 'Count',
              id: 'count',
              valueType: 'number',
            },
            {
              name: 'Radius',
              id: 'radius',
              valueType: 'number',
            },
            {
              name: 'Position',
              id: 'position',
              valueType: 'vector',
            },
          ],
          outputs: [
            {
              name: 'Geometry',
              id: 'geometry',
              valueType: 'geometry',
            },
          ],
        },
        viewer: {
          kind: 'geometry',
          name: 'Viewer',
          inputs: [
            {
              name: 'Geometry',
              id: 'geometry',
              valueType: 'geometry',
            },
          ],
        },
      },
    },
  },
}

export const ArrayInputs = {
  parameters: {
    layout: 'fullscreen',
  },
  args: {
    nodes: [
      {
        id: '1',
        type: 'combineXYZ',
        position: { x: 100, y: 100 },
        data: { label: 'Combine XYZ' },
      },
      {
        id: '2',
        type: 'combineXYZ',
        position: { x: 100, y: 300 },
        data: { label: 'Combine XYZ' },
      },
      {
        id: '3',
        type: 'viewer',
        position: { x: 400, y: 100 },
        data: { label: 'Viewer' },
      },
    ],
    edges: [
      {
        id: 'e1',
        source: '1',
        sourceHandle: 'vector',
        target: '3',
        targetHandle: 'vectors',
      },
      {
        id: 'e2',
        source: '2',
        sourceHandle: 'vector',
        target: '3',
        targetHandle: 'vectors',
      },
    ],
    config: {
      valueTypes: {
        number: {
          name: 'Number',
          color: '#a1a1a1',
          inputEditor: 'number',
          defaultValue: 0,
        },
        vector: {
          name: 'Vector',
          color: '#8b5cf6',
          inputEditor: null,
        },
        geometry: {
          name: 'Geometry',
          color: '#059669',
          inputEditor: null,
        },
      },
      nodeKinds: {
        geometry: {
          name: 'Geometry',
          color: '#059669',
        },
      },
      nodeTypes: {
        combineXYZ: {
          kind: 'geometry',
          name: 'Combine XYZ',
          inputs: [
            {
              name: 'X',
              id: 'x',
              valueType: 'number',
            },
            {
              name: 'Y',
              id: 'y',
              valueType: 'number',
            },
            {
              name: 'Z',
              id: 'z',
              valueType: 'number',
            },
          ],
          outputs: [
            {
              name: 'Vector',
              id: 'vector',
              valueType: 'vector',
            },
          ],
        },
        viewer: {
          kind: 'geometry',
          name: 'Viewer',
          inputs: [
            {
              name: 'Vectors',
              id: 'vectors',
              valueType: 'vector',
              isArray: true,
            },
          ],
        },
      },
    },
  },
}

export const HandleSymbols = {
  parameters: {
    layout: 'fullscreen',
  },
  args: {
    nodes: [
      {
        id: '1',
        type: 'shapes',
        position: { x: 100, y: 100 },
        data: { label: 'Shapes' },
      },
    ],
    edges: [],
    config: {
      valueTypes: {
        circle: {
          name: 'Circle',
          color: '#38bdf8',
          inputEditor: 'decimal',
          defaultValue: 0.0,
          shape: 'circle',
        },
        diamondDot: {
          name: 'Diamond Dot',
          color: '#38bdf8',
          inputEditor: null,
          shape: 'diamondDot',
        },
        diamond: {
          name: 'Diamond',
          color: '#38bdf8',
          inputEditor: null,
          shape: 'diamond',
        },
      },
      nodeKinds: {
        geometry: {
          name: 'Geometry',
          color: '#0284c7',
        },
      },
      nodeTypes: {
        shapes: {
          kind: 'geometry',
          name: 'Shapes',
          outputs: [
            {
              name: 'Circle',
              id: 'circle',
              valueType: 'circle',
            },
            {
              name: 'Diamond',
              id: 'diamond',
              valueType: 'diamond',
            },
            {
              name: 'Diamond Dot',
              id: 'diamondDot',
              valueType: 'diamondDot',
            },
          ],
        },
      },
    },
  },
}

export default meta
