import React from 'react'
import { Row, Col, Form, Input, Button, message } from "antd"
import axios from 'axios'
import { API } from '../global'
import { useDispatch } from 'react-redux'
import { useNavigate } from "react-router-dom"
function Login() {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const onFinish = (values) => {
        dispatch({ type: "showLoading" })
        axios.post(`${API}/users/login`, values)
            .then((res) => {
                dispatch({ type: "hideLoading" })
                message.success("Login Successful")
                localStorage.setItem("user_data", JSON.stringify(res.data))
                navigate("/home")
            })
            .catch((err) => {
                dispatch({ type: "hideLoading" })
                message.error("Invalid Credentials")
            })
    }


    return (
        <div>
            <Row>
                <Col lg={8} xs={22}>
                    <Form onFinish={onFinish}>
                        <h1 className='text-center'>Shop</h1>
                        <h3>Login</h3>

                        <Form.Item name="userId" label="User ID">
                            <Input id="username" placeholder="admin@gmail.com" />
                        </Form.Item>


                        <Form.Item name="password" label="Password">
                            <Input id="password" type="password" placeholder="jack@123" />
                        </Form.Item>
                        <Button htmlType="submit" type="primary">Login</Button>
                    </Form>
                </Col>
            </Row>
        </div>
    )
}

export default Login