import { createWithEqualityFn } from 'zustand/traditional'
import { shallow } from 'zustand/shallow'
import { applyEdgeChanges, applyNodeChanges } from '@xyflow/react'
import { devtools } from 'zustand/middleware'
import { addNodeInternals } from '../utilities.js'
import { getDefaultSlots } from '../types/slots.js'

export function createGraphStore({ config, nodes, edges, slots }) {
  return createWithEqualityFn(
    devtools((set, get) => ({
      config,
      nodes,
      edges,
      slots: getDefaultSlots(slots),

      serialize: () =>
        JSON.stringify({
          nodes: get().nodes,
          edges: get().edges,
        }),
      deserialize: (serialized) => set(JSON.parse(serialized)),

      onNodesChange: (changes) =>
        set({ nodes: applyNodeChanges(changes, get().nodes) }),
      onEdgesChange: (changes) =>
        set({ edges: applyEdgeChanges(changes, get().edges) }),

      addNode: (node) =>
        set({ nodes: [...get().nodes, addNodeInternals(config, node)] }),
      removeNode: (node) => {
        const id = typeof node === 'string' ? node : node.id
        set({ nodes: get().nodes.filter((item) => item.id !== id) })
      },
      updateNode: (node) => {
        set({
          nodes: get().nodes.map((item) =>
            item.id === node.id
              ? { ...item, ...node, data: { ...item.data, ...node.data } }
              : item,
          ),
        })
      },
      updateNodeData: (nodeId, data) => {
        set({
          nodes: get().nodes.map((item) =>
            item.id === nodeId
              ? { ...item, data: { ...item.data, ...data } }
              : item,
          ),
        })
      },
      getNode: (nodeId) => get().nodes.find((item) => item.id === nodeId),

      addEdge: (edge) => set({ edges: [...get().edges, edge] }),
      removeEdge: (edge) => {
        const id = typeof edge === 'string' ? edge : edge.id
        set({ edges: get().edges.filter((item) => item.id !== id) })
      },
      updateEdge: (edge) => {
        set({
          edges: get().edges.map((item) =>
            item.id === edge.id ? { ...item, ...edge } : item,
          ),
        })
      },
      getEdge: (edgeId) => get().edges.find((item) => item.id === edgeId),
    })),
    shallow,
  )
}
