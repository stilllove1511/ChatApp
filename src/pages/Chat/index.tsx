import React, { useEffect, useState } from 'react'
import type { MenuProps } from 'antd'
import { Input, Layout, Menu } from 'antd'
import API from '@configs/api'
import { LogoutOutlined, UserOutlined } from '@ant-design/icons'
import { useSelector } from 'react-redux'
import { io } from 'socket.io-client'

const { Header, Content, Sider } = Layout

const Chat = () => {
    const token = useSelector((state) => (state as any).auth.token)
    const [conversation, setConversation] = useState<{
        id: string
        users: {
            id: string
        }[]
    }>({
        id: '',
        users: [],
    })

    const socket = conversation.id
        ? io('http://localhost:3002', {
              query: {
                  dialogId: conversation?.id,
              },
              extraHeaders: {
                  authorization: token,
              },
              path: '/',
          })
        : undefined

    const MessageHandleComponent: React.FC = () => {
        const [dialogs, setDialogs] = useState([])

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

        // fetch messages
        const [messages, setMessages] = useState([])
        useEffect(() => {
            if (!conversation.id) return
            API.fetchMessages({
                dialogId: conversation.id,
                limit: 100,
                page: 1,
            }).then((res) => {
                setMessages(res.data.messages)
            })
        }, [conversation])

        const [messageInputValue, setMessageInputValue] = useState('')

        socket?.on('receiveMessageEvent', (message) => {
            setMessages((messages) => [
                ...messages,
                {
                    id: message.id,
                    text: message.text,
                    userId: conversation?.users?.[0]?.id,
                },
            ])
        })

        // send message
        const sendMessage = (message) => {
            socket?.emit('incomeMessageEvent', message)
            setMessages((messages) => [
                ...messages,
                {
                    id: Math.random(),
                    text: message,
                    userId: token,
                },
            ])
        }

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
                    <Content style={{ backgroundColor: 'white' }}>
                        {messages.map((message) => (
                            <div
                                style={{
                                    display: 'flex',
                                    justifyContent:
                                        message.userId === token
                                            ? 'flex-end'
                                            : 'flex-start',
                                    padding: '2px',
                                }}
                                key={message.id}
                            >
                                <span
                                    style={{
                                        minWidth: '100px',
                                        textAlign: 'center',
                                        background: colorBgContainer,
                                        borderRadius: borderRadiusLG,
                                        backgroundColor: 'deepskyblue',
                                        color: 'white',
                                    }}
                                >
                                    {message.text}
                                </span>
                            </div>
                        ))}
                        <div
                            style={{
                                height: '50px',
                                width: '100%',
                            }}
                        ></div>
                    </Content>
                    <Input
                        style={{
                            position: 'fixed',
                            bottom: 0,
                            zIndex: 1,
                            width: '100%',
                            display: 'flex',
                            alignItems: 'center',
                        }}
                        placeholder="Type a message"
                        value={messageInputValue}
                        onChange={(e) => {
                            setMessageInputValue(e.target.value)
                        }}
                        onPressEnter={(e) => {
                            sendMessage(messageInputValue)
                            setMessageInputValue('')
                        }}
                    />
                </Layout>
            </Layout>
        )
    }

    return <MessageHandleComponent />
}

export default Chat
