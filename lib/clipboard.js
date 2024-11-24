import { nanoid } from 'nanoid'

export let ClipboardItem
;(function (ClipboardItem) {
  ClipboardItem[(ClipboardItem['NodesAndEdges'] = 1)] = 'NodesAndEdges'
})(ClipboardItem || (ClipboardItem = {}))
;(function (_ClipboardItem) {
  async function copyNodesAndEdges(state) {
    const nodes = state.nodes.filter((n) => n.selected)
    const nodeIds = nodes.map((n) => n.id)

    const edges = state.edges.filter(
      (e) => nodeIds.includes(e.target) && nodeIds.includes(e.source),
    )
    const text = JSON.stringify({
      type: ClipboardItem.NodesAndEdges,
      nodes,
      edges,
    })
    await window.navigator.clipboard.writeText(text)
  }

  _ClipboardItem.copyNodesAndEdges = copyNodesAndEdges

  async function tryReadClipboard(setNodes, setEdges) {
    try {
      const text = await window.navigator.clipboard.readText()
      const payload = JSON.parse(text)
      if ('type' in payload) {
        switch (payload.type) {
          case ClipboardItem.NodesAndEdges:
            const { nodes, edges } = payload

            const nodeIdMap = new Map(nodes.map((n) => [n.id, nanoid(6)]))
            const edgeIdMap = new Map(edges.map((e) => [e.id, nanoid(6)]))

            const newNodes = nodes.map((node) => ({
              ...node,
              id: nodeIdMap.get(node.id),
              selected: true,

              position: {
                x: node.position.x + 100,
                y: node.position.y + 100,
              },
            }))

            const newEdges = edges.map((edge) => ({
              ...edge,
              id: edgeIdMap.get(edge.id),
              source: nodeIdMap.get(edge.source),
              target: nodeIdMap.get(edge.target),
            }))

            setNodes((nodes) =>
              nodes
                .map((n) => ({
                  ...n,
                  selected: false,
                }))
                .concat(newNodes),
            )
            setEdges((edges) =>
              edges
                .map((e) => ({
                  ...e,
                  selected: false,
                }))
                .concat(newEdges),
            )
            break
          default:
            console.log(`Unknown clipboard item type ${payload.type}`)
        }
      }
    } catch (e) {
      console.error('Reading clipboard', e)
    }
  }

  _ClipboardItem.tryReadClipboard = tryReadClipboard
})(ClipboardItem || (ClipboardItem = {}))
