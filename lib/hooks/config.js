import { useMemo } from 'react'
import { GraphConfig } from '../config.js'
import { buildNode } from '../node-builder.jsx'
import { useGraphStore } from '../context/GraphContext.jsx'

export function useNodeTypes() {
  const config = useGraphStore((store) => store.config)
  return useMemo(() => {
    return config.getNodeComponents(buildNode)
  }, [config])
}

export function useBuildGraphConfig(config, extensions) {
  return useMemo(() => {
    const graphConfig = new GraphConfig(config)
    if (extensions) extensions(graphConfig)
    return graphConfig
  }, [])
}
