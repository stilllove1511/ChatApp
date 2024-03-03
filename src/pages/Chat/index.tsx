import React, { useEffect, useState } from 'react'
import type { MenuProps } from 'antd'
import { Input, Layout, Menu } from 'antd'
import API from '@configs/api'
import { LogoutOutlined, UserOutlined } from '@ant-design/icons'
import { useSelector } from 'react-redux'
import { io } from 'socket.io-client'
import SearchUser from '@components/SearchUser'
import { SOCKET_EVENT } from '@utilities/enums'

const { Header, Content, Sider } = Layout

const Chat = () => {
    const MessageHandleComponent: React.FC = () => {
        const [messageInputValue, setMessageInputValue] = useState('')
        const [messages, setMessages] = useState<
            {
                isMe?: boolean
                text: string
            }[]
        >([])

        const colorBgContainer = '#fff'
        const borderRadiusLG = '24px'

        const sendMessage = (message: string) => {
            if (message.trim() === '') return
            setMessages([
                ...messages,
                { isMe: true, text: message },
                { text: 'loading...' },
            ])
            API.ask(message).then((res) => {
                setMessages((p) => {
                    p.pop()
                    return [...p, { text: res?.data?.answer }]
                })
            })
        }

        return (
            <Layout>
                <Content style={{ backgroundColor: 'white' }}>
                    {messages.map((message, index) => (
                        <div
                            style={{
                                display: 'flex',
                                justifyContent: message.isMe
                                    ? 'flex-end'
                                    : 'flex-start',
                                padding: '2px',
                            }}
                            key={index}
                        >
                            <span
                                style={{
                                    minWidth: '100px',
                                    textAlign: 'center',
                                    background: colorBgContainer,
                                    borderRadius: borderRadiusLG,
                                    backgroundColor: 'deepskyblue',
                                    color: 'white',
                                    padding: '0 10px',
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
        )
    }

    return <MessageHandleComponent />
}

export default Chat
