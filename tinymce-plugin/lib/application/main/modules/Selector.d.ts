import { ReactElement } from 'react';
import { SchemaType } from '../../../model/Schema';
interface SelectorProps {
    selection: SchemaType;
    setSelection: (newValue: SchemaType) => void;
    options: SchemaType[];
    name: string;
    description: string;
}
export default function Selector({ selection, setSelection, options, name, description }: SelectorProps): ReactElement;
export {};
