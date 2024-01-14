import React, { useEffect, useState } from 'react'
import type { MenuProps } from 'antd'
import { Layout, Menu } from 'antd'
import API from '@configs/api'
import { LogoutOutlined, UserOutlined } from '@ant-design/icons'

const { Header, Content, Footer, Sider } = Layout

const App: React.FC = () => {
    const [dialogs, setDialogs] = useState([])
    const [conversation, setConversation] = useState<{
        id: string
        users: {
            id: string
        }[]
    }>({
        id: '',
        users: [],
    })

    // chat dialogs menu items
    const items: MenuProps['items'] = dialogs.map((dialog) => ({
        key: dialog.id,
        icon: React.createElement(UserOutlined),
        label: dialog.users[0].id,
        onClick: () => {
            setConversation(dialog)
        },
    }))

    // add logout button
    items.unshift({
        key: '1',
        icon: React.createElement(LogoutOutlined),
        label: 'Logout',
        onClick: () => {
            localStorage.removeItem('token')
            window.location.reload()
        },
    })

    // fetch dialogs
    useEffect(() => {
        API.fetchDialogs().then((res) => {
            setDialogs(res.data)
        })
    }, [])

    const colorBgContainer = '#fff'
    const borderRadiusLG = '24px'

    return (
        <Layout hasSider>
            <Sider
                style={{
                    overflow: 'auto',
                    height: '100vh',
                    position: 'fixed',
                    left: 0,
                    top: 0,
                    bottom: 0,
                }}
            >
                <div className="demo-logo-vertical" />
                <Menu
                    theme="dark"
                    mode="inline"
                    defaultSelectedKeys={['4']}
                    items={items}
                />
            </Sider>
            <Layout style={{ marginLeft: 200 }}>
                <Header
                    style={{
                        position: 'sticky',
                        top: 0,
                        zIndex: 1,
                        width: '100%',
                        display: 'flex',
                        alignItems: 'center',
                    }}
                >
                    <h1
                        style={{
                            color: '#fff',
                        }}
                    >
                        {conversation.users?.[0]?.id}
                    </h1>
                </Header>
                <Content style={{ margin: '24px 16px 0' }}>
                    <div
                        style={{
                            padding: 24,
                            textAlign: 'center',
                            background: colorBgContainer,
                            borderRadius: borderRadiusLG,
                        }}
                    >
                        <p>long content</p>
                        {
                            // indicates very long content
                            Array.from({ length: 100 }, (_, index) => (
                                <React.Fragment key={index}>
                                    {index % 20 === 0 && index ? 'more' : '...'}
                                    <br />
                                </React.Fragment>
                            ))
                        }
                    </div>
                </Content>
            </Layout>
        </Layout>
    )
}

export default App
