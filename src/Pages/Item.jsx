import React from 'react'
import { Card, Button } from 'antd'
import { useDispatch } from 'react-redux'
const { Meta } = Card
function Item({ item }) {

    const dispatch = useDispatch()
    const addToCart = () => {
        console.log("Add to Cart")
        const payload = dispatch({
            type: "addToCart",
            payload: { ...item, quantity: 1 }
        })
        console.log(payload)
    }

    return (
        <div>
            <Card hoverable style={{ width: 250, marginTop: "50px" }} cover={<img src={item.image} alt={item.name} />} >
                <Meta title={item.name} />
                <h4>Price: {item.price}</h4>
                <Button type="primary" onClick={() => addToCart()}>Add Cart</Button>
            </Card>
        </div>
    )
}

export default Item