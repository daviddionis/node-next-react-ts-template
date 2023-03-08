import { Drawer, Menu } from "antd";
import Sider from "antd/es/layout/Sider";
import { MenuProps } from 'antd';
import { useLocation, useNavigate } from "react-router-dom";
import { menuItems } from "../../constants/menus.constants";

type AntMenuItem = Required<MenuProps>['items'][number];

export interface MenuItem {
    redirect: string;
    title: string;
    icon?: any;
    onlyRoles?: number[];
    items?: MenuItem[];
}

const getMenuItems = (menuItems: MenuItem[]): AntMenuItem[] => {
    let items: AntMenuItem[] = [];

    for (const menuItem of menuItems)
        items.push({
            key: menuItem.redirect,
            icon: <menuItem.icon />,
            children: menuItem.items ? getMenuItems(menuItem.items) : undefined,
            label: menuItem.title,
        });

    return items;
}

export interface SidenavProps {
    collapsed: boolean;
    setCollapsed: (collapsed: boolean) => void;
    isMobile: boolean;
    setOpen: (open: boolean) => void;
    open: boolean;
}


const Sidenav: React.FC<SidenavProps> = ({ collapsed, setCollapsed, isMobile, setOpen, open }: SidenavProps) => {
    const location = useLocation();
    const navigate = useNavigate();

    const handleRedirect = ({ key }: { key: string }) => {
        navigate(key);
        setOpen(false);
    }

    const renderMenu = () => (
        <Menu
            theme={isMobile ? 'light' : 'dark'}
            selectedKeys={[location.pathname]}
            mode="inline"
            items={getMenuItems(menuItems)}
            style={{ textAlign: 'left', border: 'none' }}
            onClick={handleRedirect}
        />
    );

    return (
        isMobile
            ? <Drawer
                title="Menu"
                placement="left"
                bodyStyle={{ padding: '12px 0px' }}
                onClose={() => setOpen(false)}
                open={open}
            >{renderMenu()}</Drawer>
            : <Sider
                collapsible
                collapsed={collapsed}
                onCollapse={() => setCollapsed(!collapsed)}
            >{renderMenu()}</Sider>
    );
}

export default Sidenav;