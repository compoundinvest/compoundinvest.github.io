import { Layout, Menu, MenuProps } from "antd";
import { BankOutlined } from "@ant-design/icons";
import "./Header.css";

const { Header } = Layout;

export function HeaderComponent() {
    const items1: MenuProps["items"] = ["1", "2", "3"].map((key) => ({
        key,
        label: `nav ${key}`,
    }));

    return (
        <Header style={{ position: "fixed", top: 0, zIndex: 1, width: "100%" }}>
            <div className="logo" />
            {/* <BankOutlined /> */}
            <Menu theme="dark" mode="horizontal" defaultSelectedKeys={["2"]} items={items1} />
        </Header>
    );
}
