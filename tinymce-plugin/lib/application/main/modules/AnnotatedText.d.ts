import { ReactElement } from 'react';
export interface DBPediaResponse {
    annotation: DBPediaAnnotation;
}
export interface DBPediaAnnotation {
    "@text": string;
    "surfaceForm": AnnotationInstance[];
}
export interface AnnotationInstance {
    "@name": string;
    "@offset": number;
    "resource": AnnotationResource;
}
interface AnnotationResource {
    "@label": string;
    "@types": string;
    "@uri": string;
}
interface AnnotatedTextProps {
    annotationDetails: DBPediaAnnotation;
}
export default function AnnotatedText({ annotationDetails }: AnnotatedTextProps): ReactElement;
export {};
