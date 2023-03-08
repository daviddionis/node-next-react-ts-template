import { MenuOutlined } from "@ant-design/icons";
import { Button, Layout } from "antd";
import LogoTextedWhite from "../../assets/logo_texted_white.png";

const PageHeader = Layout.Header;

interface HeaderProps {
    isMobile: boolean;
    onOpenSidenav: () => void;
}

const Header: React.FC<HeaderProps> = ({
    isMobile, onOpenSidenav
}: HeaderProps) => {
    return (
        <PageHeader className="header" style={{ padding: 0 }}>
            {isMobile &&
                <div style={{ float: 'left', paddingLeft: 24 }}>
                    <Button icon={<MenuOutlined />} type="primary" onClick={onOpenSidenav} />
                </div>
            }
            <div style={{ float: 'left' }}>
                <img src={LogoTextedWhite} style={{ height: '40px', marginLeft: isMobile ? 16 : 24 }} alt="Company Logo" />
            </div>
        </PageHeader >
    );
}

export default Header;