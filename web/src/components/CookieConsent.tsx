import Link from "next/link";
import { CheckIcon, ChevronDownIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { Disclosure, Switch } from "@headlessui/react";
import { classNames } from "../utils/classNames.utils";
import { useState } from "react";

export interface CookieInfo {
    name: string;
    description: string;
    force: boolean;
    enabled: boolean;
}

interface CookieConstentProps {
    cookies: CookieInfo[];
    cookieUsage?: {
        title: string;
        description: string;
        link: {
            text: string;
            href: string;
        }
    };
}

const CookieConsent: React.FC<CookieConstentProps> = ({
    cookies: c, cookieUsage
}: CookieConstentProps) => {

    const [cookies, setCookies] = useState<CookieInfo[]>([...c]);

    const handleChangeState = (i: number, enabled: boolean) => {
        let newCookies = [...cookies];
        newCookies[i].enabled = enabled;
        setCookies(newCookies);
    }

    const handleDeclineAll = () => {
        let newCookies = [...cookies];
        for (let i = 0; i < newCookies.length; i++)
            if (!newCookies[i].force)
                newCookies[i].enabled = false;

        setCookies(newCookies);
    }

    const handleAcceptAll = () => {
        let newCookies = [...cookies];
        for (let i = 0; i < newCookies.length; i++)
            if (!newCookies[i].force)
                newCookies[i].enabled = true;

        setCookies(newCookies);
    }

    return (
        <>
            <div className="fixed z-20 bg-black opacity-40 overflow-hidden inset-0 w-full h-full min-h-screen min-w-screen" />
            <div className="h-full flex items-center justify-center">
                <div className="z-30 bg-white max-w-4xl w-full mx-auto rounded-lg shadow-lg px-6 py-6">
                    <span className="text-gray-800 font-semibold text-lg">{cookieUsage != null ? cookieUsage.title : "Cookie Usage"}</span>
                    <p className="text-gray-600 text-sm">
                        {cookieUsage != null ? cookieUsage.description : "I use cookies to ensure that I give you the best experience on my website. If you continue to use this site I will assume that you are happy with it"}{'. '}
                        <Link href={cookieUsage != null ? cookieUsage.link.href : '/privacy'}>
                            <span className="text-gray-800 underline cursor-pointer">
                                {cookieUsage != null ? cookieUsage.link.text : "Learn more"}
                            </span>
                        </Link>
                    </p>
                    <div className="pt-1 pb-4">
                        {cookies.map((cookie, i) => (
                            <div key={'cc-' + i} className="mt-3">
                                <Disclosure>
                                    {({ open }) => (
                                        <div className="bg-gray-100 rounded-lg px-4 py-4">
                                            <Disclosure.Button className="w-full flex items-center justify-start space-x-2 cursor-pointer">
                                                <ChevronDownIcon className={classNames(
                                                    "h-5 w-5 text-gray-600 transform transition duration-200",
                                                    open ? "rotate-180" : ""
                                                )} />
                                                <span className="text-gray-800 font-semibold text-md">{cookie.name}</span>
                                                <div className="flex-grow" />
                                                <SwitchIconed
                                                    forced={cookie.force}
                                                    checked={cookie.enabled}
                                                    onChange={(v) => cookie.force
                                                        ? undefined
                                                        : handleChangeState(i, v)
                                                    }
                                                />
                                            </Disclosure.Button>
                                            <Disclosure.Panel className="mt-2 text-gray-600">
                                                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam quis exercitation.
                                            </Disclosure.Panel>
                                        </div>
                                    )}
                                </Disclosure>
                            </div>
                        ))}
                    </div>
                    <div className="py-2">
                        <div className="border-t border-gray-200 -mx-6 px-6 " />
                    </div>
                    <div className="flex justify-start mt-4 space-x-4 text-sm">
                        <button className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold py-2 px-4 rounded">
                            Aceptar selección
                        </button>
                        <div className="flex-grow" />
                        <button className={classNames(
                            "bg-gray-200 hover:bg-gray-300 rounded",
                            "text-gray-800 font-semibold py-2 px-4"
                        )} onClick={handleDeclineAll}>
                            Rechazar Todo
                        </button>
                        <button className={classNames(
                            "bg-blue-200 hover:bg-blue-300 rounded",
                            "text-blue-800 font-semibold py-2 px-4"
                        )} onClick={handleAcceptAll}>
                            Aceptar Todo
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
}

interface SwitchIconedProps {
    checked: boolean;
    onChange: (checked: boolean) => void;
    forced?: boolean;
}

const SwitchIconed: React.FC<SwitchIconedProps> = ({ checked, onChange, forced = false }) => {
    return (
        <Switch
            checked={checked}
            onChange={onChange}
            className={classNames(
                "relative inline-flex h-7 w-14 items-center rounded-full px-1",
                (checked) ? 'bg-blue-500' : 'bg-blue-100',
                forced ? "opacity-50 cursor-not-allowed" : "",
            )}>
            {checked && <CheckIcon className="ml-1 h-4 w-4 text-blue-100" />}
            <span className="sr-only">Enable Cookie</span>
            <span className={classNames(
                "inline-block h-5 w-5 transform rounded-full bg-white transition",
                checked ? 'translate-x-2' : '',
                forced ? "cursor-not-allowed" : "",
            )} />
            {!checked && <XMarkIcon className="ml-2 h-4 w-4 text-blue-500" />}

        </Switch>
    );
}


export default CookieConsent;