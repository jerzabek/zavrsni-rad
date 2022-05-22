export interface RichNode {
    itemscope?: boolean;
    itemprop?: string;
    itemtype?: string;
    content?: Element | string;
}
export declare type ResolveFunctionType = (resultNode: RichNode) => void;
