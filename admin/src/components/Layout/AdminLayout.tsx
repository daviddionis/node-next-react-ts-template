import { Layout } from "antd"
import { Content, Footer } from "antd/es/layout/layout";
import { useEffect, useState } from "react";
import { useWindowSize } from "../../hooks/useWindowSize";
import Header from "./Header";
import Sidenav from "./Sidenav"


interface AdminLayoutProps {
    children: React.ReactNode;
}

const AdminLayout: React.FC<AdminLayoutProps> = ({ children }) => {

    const [collapsed, setCollapsed] = useState(false);
    const [openSidenav, setOpenSidenav] = useState(false);
    const [isMobile, setIsMobile] = useState(true);

    const { width } = useWindowSize();

    useEffect(() => setIsMobile(width < 768), [width]);

    return (
        <>
            <Layout style={{ minHeight: '100vh' }}>
                <Header isMobile={isMobile} onOpenSidenav={() => setOpenSidenav(true)} />
                <Layout className='site-layout'>
                    <Sidenav
                        collapsed={collapsed}
                        setCollapsed={setCollapsed}
                        isMobile={isMobile}
                        open={openSidenav}
                        setOpen={setOpenSidenav}
                    />
                    <Layout style={isMobile ? { padding: '0 12px' } : { padding: '0 24px' }}>
                        <Content style={{
                            margin: 0, minHeight: 280,
                            ...isMobile ? { padding: '12px 0px' } : { padding: '24px 0px' }
                        }}>{children}</Content>
                        <Footer style={{ textAlign: 'center' }}>
                            Placeholder© {new Date().getFullYear()}
                        </Footer>
                    </Layout>
                </Layout>
            </Layout>
        </>
    );
}

export default AdminLayout;