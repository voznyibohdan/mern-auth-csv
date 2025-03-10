import css from './input.module.css';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

export const Input = (props:InputProps) => {
    return (
        <input {...props} className={css.input} />
    );
}