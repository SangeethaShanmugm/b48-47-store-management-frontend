import { Button, Modal, Input, Form, Select, message } from 'antd'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { API } from '../global'

function Cart() {

    const { cartItems } = useSelector((state) => state.rootReducer)
    const [subTotal, setSubTotal] = useState(0)
    const [isModalOpen, setIsModalOpen] = useState(false);

    const showModal = () => {
        setIsModalOpen(true);
    };
    const handleOk = () => {
        setIsModalOpen(false);
    };
    const handleCancel = () => {
        setIsModalOpen(false);
    };

    const navigate = useNavigate()


    useEffect(() => {
        let temp = 0
        cartItems.forEach((item) => {
            temp = temp + item.price * item.quantity
            console.log(temp)
            setSubTotal(temp)
        })
        // console.log(cartItems.name)
    }, [cartItems])


    const onFinish = (values) => {
        const resultObj = {
            ...values,
            subTotal,
            cartItems,
            totalAmount: Number(
                subTotal + Number(((subTotal / 100) * 10).toFixed(2))
            ),
            tax: Number(((subTotal / 100) * 10).toFixed(2))
        }

        axios.post(`${API}/bills/charge-bill`, resultObj)
            .then(() => {
                message.success("Bill Charged Successfully")
                navigate("/bill")
            })
            .catch((err) => message.error("Error While Charging"))
    }

    // console.log("subTotal", subTotal)
    return (
        <div>Cart Items
            <h1>Name</h1>
            <table >
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>price</th>
                        <th>Quantity</th>
                    </tr>
                </thead>

                <tbody>
                    {cartItems.map((item) => {
                        return (
                            <tr>
                                <td>{item.name}</td>
                                <td>{item.price}</td>
                                <td>1</td>
                            </tr>
                        )
                    })}

                </tbody>

            </table>
            <h3>SubTotal:  {subTotal}</h3>

            <Button type="primary" onClick={showModal}>
                Charge Bill
            </Button>

            <Modal title="Basic Modal" open={isModalOpen} onCancel={() => setIsModalOpen(false)} footer={false}>

                <Form onFinish={onFinish}>

                    <h3>Bill</h3>

                    <Form.Item name="customerName" label="Customer Name">
                        <Input id="customerName" />
                    </Form.Item>


                    <Form.Item name="customerPhoneNumber" label="Phone">
                        <Input id="customerPhoneNumber" />
                    </Form.Item>

                    <Form.Item name="paymentMode" label="Payment Mode">
                        <Select>
                            <Select.Option value="cash">Cash</Select.Option>
                            <Select.Option value="card">Card</Select.Option>
                        </Select>
                    </Form.Item>


                    <div>
                        <h4>SubTotal: <b>{subTotal} ₹</b></h4>
                        <h4>Tax: <b>{((subTotal / 100) * 10).toFixed(2)} ₹</b></h4>
                        <hr />
                        <h2>Grand Total: <b>{subTotal + (subTotal / 100) * 10} ₹</b></h2>
                    </div>

                    <div className='d-flex justify-content-end'>
                        <Button htmlType="submit" type="primary">Generate Bill</Button>
                    </div>
                </Form>


            </Modal>


        </div>
    )
}

export default Cart