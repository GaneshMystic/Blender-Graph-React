import { NodeHeader } from '../components/NodeHeader.jsx'
import { NodeBody, NodeWrapper } from '../node-builder.jsx'

const defaultGraphSlots = {
  header: NodeHeader,
  body: NodeBody,
  wrapper: NodeWrapper,
}

export function getDefaultSlots(slots) {
  return {
    ...defaultGraphSlots,
    ...slots,
  }
}
