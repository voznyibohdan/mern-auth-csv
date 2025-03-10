import css from './button.module.css';

interface ButtonProps extends React.HTMLAttributes<HTMLButtonElement> {
}

export const Button = ({ children, ...props }: ButtonProps) => {
    return (
        <button {...props} className={css.button}>{children}</button>
    );
}
