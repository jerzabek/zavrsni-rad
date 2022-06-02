import { DBPediaAnnotation } from './AnnotatedText';
interface useDBPedia {
    annotate: (text: string) => void;
    annotationData: DBPediaAnnotation;
    error: string;
    loading: boolean;
}
export default function useDBPedia(): useDBPedia;
export {};
