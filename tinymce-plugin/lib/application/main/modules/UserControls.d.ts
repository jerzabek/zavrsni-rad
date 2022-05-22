import { ReactElement } from 'react';
interface UserControlsProps {
    cancelAction: () => void;
    applyAction: () => void;
    applyText?: string;
    applyDisabled?: boolean;
}
export default function UserControls({ cancelAction, applyAction, applyText, applyDisabled }: UserControlsProps): ReactElement;
export {};
