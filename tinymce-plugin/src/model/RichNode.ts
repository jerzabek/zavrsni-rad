export interface RichNode {
  itemscope?: boolean,
  itemprop?: string,
  itemtype?:  string,
  content?: Element | string
}

export type ResolveFunctionType = (resultNode: RichNode) => void