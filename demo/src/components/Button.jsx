import {FC, PropsWithChildren} from 'react';

interface ButtonProps {
    onClick: () => void;
    title?: string;
    isActive: boolean;
}

export const Button: FC<PropsWithChildren<ButtonProps>> = ({ title onClick, children }) => {
    return (
        <button title={title} onClick={onClick}>
            {children}
        </button>
    );
};
