import { classNames } from "../utils/classNames.utils";
import LoadingSpinner from "./LoadingSpinner";

interface ButtonProps {
    type: HTMLButtonElement["type"];
    onClick?: () => void;
    children: React.ReactNode;
    loading?: boolean;
}

const Button: React.FC<ButtonProps> = ({ type, onClick, children, loading }: ButtonProps) => {
    return (
        <button
            type="submit"
            className={classNames(
                "w-full py-2 px-4 rounded-lg",
                "bg-indigo-500 hover:bg-indigo-600",
                "text-white font-bold",
                "flex justify-center items-center",
                "transform transition duration-500 ease-in-out",
                loading && "cursor-not-allowed opacity-50",
            )} disabled={loading} onClick={onClick}
        > {loading && <LoadingSpinner className="w-4 h-4 mr-3" />}{children}</button>
    );
}

export default Button;