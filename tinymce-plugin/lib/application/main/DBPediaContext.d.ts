import { DBPediaAnnotation } from './modules/AnnotatedText';
export interface DBPediaContextTypes {
    content: string;
    resolve: (annotated: DBPediaAnnotation) => void;
    reject: () => void;
}
export declare const DBPediaContext: import("react").Context<DBPediaContextTypes>;
export declare const DBPediaContextProvider: import("react").Provider<DBPediaContextTypes>;
