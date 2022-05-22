import { ResolveFunctionType, RichNode } from 'src/model/RichNode';
export declare function mountReactTypeApp(resolveFunction: ResolveFunctionType, rejectFunction: () => void, node: RichNode): void;
export declare function mountReactPropertyApp(resolveFunction: ResolveFunctionType, rejectFunction: () => void, node: RichNode): void;
export declare function unmountReactTypeApp(): void;
export declare function unmountReactPropertyApp(): void;
