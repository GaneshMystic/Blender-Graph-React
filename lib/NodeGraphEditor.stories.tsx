import { ExampleNodeGraphEditor } from './NodeGraphEditor'
import { Meta, StoryObj } from '@storybook/react'
import { IGraphConfig } from './config'

const simpleConfig: IGraphConfig = {
  valueTypes: {
    string: {
      name: 'String',
      color: '#a1a1a1',
      inputType: 'value',
      defaultValue: '',
    },
  },
  nodeGroups: {
    default: {
      name: 'Default',
      color: '#a1a1a1',
    },
  },
  nodes: {
    string: {
      group: 'default',
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
} satisfies Meta<typeof ExampleNodeGraphEditor>

export default meta

type Story = StoryObj<typeof meta>

export const Simple: Story = {
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

export const InputFields: Story = {
  parameters: {
    layout: 'fullscreen',
  },
  args: {
    nodes: [
      {
        id: '1',
        type: 'inputFields',
        position: { x: 100, y: 100 },
        data: { label: 'Input Node' },
      },
    ],
    edges: [],
    config: {
      valueTypes: {
        string: {
          name: 'String',
          color: '#a1a1a1',
          inputType: 'value',
          defaultValue: '',
        },
        boolean: {
          name: 'Boolean',
          color: '#a1a1a1',
          inputType: 'checkbox',
          defaultValue: true,
        },
        httpMethod: {
          name: 'HTTP Method',
          color: '#06b6d4',
          inputType: 'options',
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
          inputType: 'buttonGroup',
          options: [
            { name: 'HTTP', value: 'HTTP' },
            { name: 'HTTPS', value: 'HTTPS' },
          ],
          defaultValue: 'HTTP',
        },
      },
      nodeGroups: {
        default: {
          name: 'Default',
          color: '#0284c7',
        },
      },
      nodes: {
        inputFields: {
          group: 'default',
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

export const InputGroups: Story = {
  parameters: {
    layout: 'fullscreen',
  },
  args: {
    nodes: [
      {
        id: '1',
        type: 'bsdf',
        position: { x: 350, y: 100 },
        data: {
          __inputGroupsExpanded: ['Specular'],
        },
      },
      {
        id: '2',
        type: 'number',
        position: { x: 100, y: 100 },
        data: {},
      },
      {
        id: '3',
        type: 'number',
        position: { x: 100, y: 200 },
        data: {},
      },
    ],
    edges: [
      {
        id: 'e1',
        source: '3',
        sourceHandle: 'value',
        target: '1',
        targetHandle: 'strength',
      },
      {
        id: 'e2',
        source: '2',
        sourceHandle: 'value',
        target: '1',
        targetHandle: 'anisotropicRotation',
      },
      {
        id: 'e3',
        source: '3',
        sourceHandle: 'value',
        target: '1',
        targetHandle: 'anisotropic',
      },
    ],
    config: {
      valueTypes: {
        string: {
          name: 'String',
          color: '#a1a1a1',
          inputType: 'value',
          defaultValue: '',
        },
        number: {
          name: 'Number',
          color: '#a1a1a1',
          inputType: 'value',
          defaultValue: '0.000',
        },
        boolean: {
          name: 'Boolean',
          color: '#a1a1a1',
          inputType: 'checkbox',
          defaultValue: true,
        },
        specularDistribution: {
          name: 'Specular Distribution',
          color: '#06b6d4',
          inputType: 'options',
          options: [
            { name: 'GGX', value: 'ggx' },
            { name: 'Beckmann', value: 'beckmann' },
            { name: 'Phong', value: 'phong' },
          ],
          defaultValue: 'GET',
        },
      },
      nodeGroups: {
        default: {
          name: 'Default',
          color: '#2A652B',
        },
      },
      nodes: {
        number: {
          group: 'default',
          name: 'Number',
          inputs: [
            {
              name: 'Value',
              id: 'value',
              valueType: 'number',
              isConstant: true,
            },
          ],
          outputs: [
            {
              name: 'Value',
              id: 'value',
              valueType: 'number',
            },
          ],
        },
        bsdf: {
          group: 'default',
          name: 'Principled BSDF',
          inputs: [
            {
              name: 'Metallic',
              id: 'metallic',
              valueType: 'number',
            },
            {
              name: 'Roughness',
              id: 'roughness',
              valueType: 'number',
              defaultValue: '0.550',
            },
            {
              name: 'IOR',
              id: 'ior',
              valueType: 'number',
              defaultValue: '1.450',
            },
            {
              name: 'Alpha',
              id: 'alpha',
              valueType: 'number',
              defaultValue: '1.000',
            },
            {
              name: 'Distribution',
              id: 'distribution',
              group: 'Specular',
              valueType: 'specularDistribution',
            },
            {
              name: 'IOR Level',
              id: 'iorLevel',
              group: 'Specular',
              valueType: 'number',
            },
            {
              name: 'Anisotropic',
              id: 'anisotropic',
              group: 'Specular',
              valueType: 'number',
            },
            {
              name: 'Anisotropic Rotation',
              id: 'anisotropicRotation',
              group: 'Specular',
              valueType: 'number',
            },
            {
              name: 'Strength',
              id: 'strength',
              group: 'Emission',
              valueType: 'number',
            },
          ],
        },
      },
    },
  },
}

export const SelectedEdgeHighlighting: Story = {
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
          inputType: 'value',
          defaultValue: '0',
        },
        vector: {
          name: 'Vector',
          color: '#8b5cf6',
          inputType: null,
        },
        geometry: {
          name: 'Geometry',
          color: '#059669',
          inputType: null,
        },
      },
      nodeGroups: {
        geometry: {
          name: 'Geometry',
          color: '#059669',
        },
      },
      nodes: {
        combineXYZ: {
          group: 'geometry',
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
          group: 'geometry',
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
          group: 'geometry',
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

export const ArrayInputs: Story = {
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
          inputType: 'value',
          defaultValue: '0',
        },
        vector: {
          name: 'Vector',
          color: '#8b5cf6',
          inputType: null,
        },
        geometry: {
          name: 'Geometry',
          color: '#059669',
          inputType: null,
        },
      },
      nodeGroups: {
        geometry: {
          name: 'Geometry',
          color: '#059669',
        },
      },
      nodes: {
        combineXYZ: {
          group: 'geometry',
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
          group: 'geometry',
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

export const HandleSymbols: Story = {
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
          inputType: 'value',
          defaultValue: '0',
          shape: 'circle',
        },
        diamondDot: {
          name: 'Diamond Dot',
          color: '#38bdf8',
          inputType: null,
          shape: 'diamondDot',
        },
        diamond: {
          name: 'Diamond',
          color: '#38bdf8',
          inputType: null,
          shape: 'diamond',
        },
      },
      nodeGroups: {
        geometry: {
          name: 'Geometry',
          color: '#0284c7',
        },
      },
      nodes: {
        shapes: {
          group: 'geometry',
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
