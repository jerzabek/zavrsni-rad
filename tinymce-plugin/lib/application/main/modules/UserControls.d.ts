import { ReactElement } from 'react';
interface UserControlsProps {
    cancelAction: () => void;
    applyAction: () => void;
    applyText?: string;
    applyDisabled?: boolean;
}
interface UserControlsWithDeleteProps extends UserControlsProps {
    removeAction: () => void;
}
export default function UserControls({ cancelAction, applyAction, applyText, applyDisabled }: UserControlsProps): ReactElement;
export declare function UserControlsWithDelete({ cancelAction, removeAction, applyAction, applyText, applyDisabled }: UserControlsWithDeleteProps): ReactElement;
export {};
