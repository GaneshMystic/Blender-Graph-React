import { createContext, useContext, useRef } from 'react'
import { createGraphStore } from '../store/store.js'
import { useStoreWithEqualityFn } from 'zustand/traditional'
import { addNodeInternals } from '../utilities.js'

export const GraphContext = createContext(null)

export function useGraphStore(selector, equalityFn) {
  const store = useContext(GraphContext)
  if (!store) {
    throw new Error('useGraphStore must be used within a GraphContext')
  }
  return useStoreWithEqualityFn(store, selector, equalityFn)
}

export function useGraphApi() {
  const store = useContext(GraphContext)
  if (!store) {
    throw new Error('useGraphApi must be used within a GraphContext')
  }
  return store
}

export function GraphProvider({
  children,
  config,
  initialNodes,
  initialEdges,
  slots,
}) {
  const storeRef = useRef(null)
  if (!storeRef.current) {
    const nodes = initialNodes
      ? initialNodes.map((n) => addNodeInternals(config, n))
      : []

    storeRef.current = createGraphStore({
      config,
      slots,
      nodes,
      edges: initialEdges ?? [],
    })
  }
  return (
    <GraphContext.Provider value={storeRef.current}>
      {children}
    </GraphContext.Provider>
  )
}
