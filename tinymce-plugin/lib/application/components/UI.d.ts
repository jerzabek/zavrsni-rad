import { ReactElement } from 'react';
interface UIProps {
    resolve: (whatever: string) => void;
}
export default function UI({ resolve }: UIProps): ReactElement;
export {};
