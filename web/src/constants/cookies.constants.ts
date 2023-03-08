import { CookieInfo } from "../components/CookieConstent";

export const cookiesInfo: CookieInfo[] = [
    {
        force: true,
        name: 'Essential',
        description: 'These cookies are essential for the website to function and cannot be disabled. They are usually only set in response to actions made by you which amount to a request for services, such as setting your privacy preferences, logging in or filling in forms. You can set your browser to block or alert you about these cookies, but some parts of the site will not then work. These cookies do not store any personally identifiable information.',
        enabled: true,
    },
    {
        force: false,
        name: 'Analytics',
        description: 'These cookies allow us to count visits and traffic sources so we can measure and improve the performance of our site. They help us to know which pages are the most and least popular and see how visitors move around the site. All information these cookies collect is aggregated and therefore anonymous. If you do not allow these cookies we will not know when you have visited our site, and will not be able to monitor its performance.',
        enabled: false
    },
    {
        force: false,
        name: 'Marketing',
        description: 'These cookies are used to make advertising messages more relevant to you. They perform functions like preventing the same ad from continuously reappearing, ensuring that ads are properly displayed for advertisers, and in some cases selecting advertisements that are based on your interests. They also help us measure the effectiveness of our advertising campaigns. The information these cookies collect may be anonymised and they cannot track your browsing activity on other websites.',
        enabled: false
    }
];