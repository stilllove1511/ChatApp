import React from 'react'
import { Button, Checkbox, Form, Input } from 'antd'
import API from '@configs/api'
import { useHistory } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { setUserToken } from '@redux/slice/AuthSlice'

type FieldType = {
    username?: string
    password?: string
    remember?: string
}

const Login: React.FC = () => {
    const history = useHistory()
    const dispatch = useDispatch()

    return (
        <div
            style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: '100vh',
            }}
        >
            <Form
                name="basic"
                labelCol={{ span: 8 }}
                wrapperCol={{ span: 16 }}
                style={{ minWidth: 600 }}
                initialValues={{ remember: true }}
                onFinish={(values: any) => {
                    API.login({
                        id: values.username,
                        password: values.password,
                    }).then((res) => {
                        localStorage.setItem('token', res.data.id)
                        dispatch(setUserToken(res.data.id))

                        history.push('/chat')
                    })
                }}
                autoComplete="off"
            >
                <Form.Item<FieldType>
                    label="Username"
                    name="username"
                    rules={[
                        {
                            required: true,
                            message: 'Please input your username!',
                        },
                    ]}
                >
                    <Input />
                </Form.Item>

                <Form.Item<FieldType>
                    label="Password"
                    name="password"
                    rules={[
                        {
                            required: true,
                            message: 'Please input your password!',
                        },
                    ]}
                >
                    <Input.Password />
                </Form.Item>

                <Form.Item<FieldType>
                    name="remember"
                    valuePropName="checked"
                    wrapperCol={{ offset: 8, span: 16 }}
                >
                    <Checkbox>Remember me</Checkbox>
                </Form.Item>

                <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                    <Button type="primary" htmlType="submit">
                        Submit
                    </Button>
                </Form.Item>
            </Form>
        </div>
    )
}

export default Login
