import { ResolveFunctionType, RichNode } from '../../model/RichNode';
export interface AnnotationContextTypes {
    node?: RichNode;
    resolve: ResolveFunctionType;
    reject: () => void;
}
export declare const AnnotationContext: import("react").Context<AnnotationContextTypes>;
export declare const AnnotationContextProvider: import("react").Provider<AnnotationContextTypes>;
