import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";
import { useEffect, useRef, useState } from "react";
import { classNames } from "../utils/classNames.utils";

interface InputProps {
    label?: string | React.ReactNode;
    name: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    placeholder?: string;
    type?: string;
}

const Input: React.FC<InputProps> = ({
    label, value, name, onChange, placeholder, type = "text"
}: InputProps) => {
    const [showPassword, setShowPassword] = useState(false);
    const input = useRef(null);

    useEffect(() => {
        // add a listener to the document to listen for clicks outside the input
        const handleClickOutside = (e: MouseEvent) => {
            if (input.current && !input.current.contains(e.target)) {
                setShowPassword(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);

        // remove the listener when the component unmounts
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, [input]);

    return (
        <>
            {label && <label className="nc-Label block text-sm font-medium text-gray-700">{label}</label>}
            <div className={classNames(
                "flex mt-1 block w-full py-2.5 px-3",
                "border border-gray-300 rounded-md shadow-sm",
                "focus:outline-none focus:ring-indigo-500 focus:border-indigo-500",
                "sm:text-sm",
            )}>
                <input className={classNames(
                    "w-full h-full py-0 px-0",
                    "bg-transparent border-none outline-none ring-0",
                    "focus:outline-none focus:ring-0 focus:border-0"
                )} value={value}
                    onChange={onChange}
                    placeholder={placeholder}
                    type={type == "password" ? (showPassword ? "text" : "password") : type}
                    name={name}
                    autoSave={type == "password" ? "off" : showPassword ? "off" : "on"}
                    autoComplete={type == "password" ? "off" : showPassword ? "off" : "on"}
                    ref={input}
                />
                {type == "password" &&
                    <div className={classNames(
                        "z-10 cursor-pointer flex items-center justify-center"
                    )} onClick={() => setShowPassword(!showPassword)}>
                        {showPassword
                            ? <EyeSlashIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                            : <EyeIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                        }
                    </div>
                }
            </div>
        </>
    );
}

export default Input;