import { useCallback } from 'react'
import { useReactFlow } from '@xyflow/react'

export class LayoutEngine {
  constructor() {
    registerLayoutEngine(this)
  }
}

export function useLayoutEngine() {
  const { getNodes, getEdges, setNodes } = useReactFlow()
  return useCallback((engine) => {
    if (!engine) return
    setNodes(computeLayout(engine, getNodes, getEdges))
  }, [])
}

function computeLayout(engine, getNodes, getEdges) {
  const layoutEngine = getLayoutEngine(engine.name())
  if (!layoutEngine) throw new Error(`Unknown layout engine ${engine}`)
  return layoutEngine.apply(getNodes(), getEdges())
}

const layoutEngineRegistry = {}

function registerLayoutEngine(engine) {
  layoutEngineRegistry[engine.name()] = engine
}

export function getLayoutEngine(name) {
  const engine = layoutEngineRegistry[name]
  if (!engine) {
    throw new Error(`Layout engine '${name}' not found`)
  }
  return engine
}
