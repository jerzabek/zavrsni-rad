import { ResolveFunctionType, RichNode } from 'src/model/RichNode';
import { DBPediaAnnotation } from './main/modules/AnnotatedText';
export declare function mountReactTypeApp(resolveFunction: ResolveFunctionType, rejectFunction: () => void, node: RichNode): void;
export declare function mountReactPropertyApp(resolveFunction: ResolveFunctionType, rejectFunction: () => void, node: RichNode): void;
export declare function mountDBPediaApp(resolveFunction: (res: DBPediaAnnotation) => void, rejectFunction: () => void, content: string): void;
export declare function unmountReactTypeApp(): void;
export declare function unmountReactPropertyApp(): void;
export declare function unmountDBPediaApp(): void;
