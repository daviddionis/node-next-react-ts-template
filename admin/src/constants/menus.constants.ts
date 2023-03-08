import { DashboardOutlined, FieldStringOutlined, FilePdfOutlined, LogoutOutlined, PercentageOutlined, UserOutlined } from '@ant-design/icons';
import { MenuItem } from "../components/Layout/Sidenav";

export const menuItems: MenuItem[] = [
    {
        redirect: '/stats',
        title: 'Estadísticas',
        icon: DashboardOutlined,
    },
    {
        redirect: '/users',
        title: 'Users',
        icon: UserOutlined
    },
    {
        redirect: '/values',
        title: 'Values',
        icon: FieldStringOutlined,
        items: [
            {
                redirect: '/taxes',
                title: 'Taxes',
                icon: PercentageOutlined
            },
            {
                redirect: '/invoice/lines',
                title: 'Invoice Lines',
                icon: FilePdfOutlined
            }
        ]
    },
    {
        redirect: '/close-actual-session',
        title: 'Cerrar Sesión',
        icon: LogoutOutlined,
    },
];