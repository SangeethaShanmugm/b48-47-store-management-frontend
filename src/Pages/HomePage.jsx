import React, { useEffect, useState } from 'react'
import axios from "axios"
import { API } from '../global'
import Item from './Item'
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from 'react-router-dom'
function HomePage() {

    const [itemData, setItemData] = useState([])
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { cartItems, loading } = useSelector((state) => state.rootReducer)


    axios.get(`${API}/items/get-items`)
        .then((res) => {
            dispatch({ type: "hideLoading" })
            setItemData(res.data)
        })
        .catch((err) => {
            dispatch({ type: "hideLoading" })
            console.log(err)
        })

    useEffect(() => {
        localStorage.setItem("cartItems", JSON.stringify(cartItems))
    }, [cartItems])

    return (
        <div style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "30px",
            justifyContent: "center",
            alignItems: "start",
            marginTop: "30px"
        }}>
            {/* <h1>HomePage</h1> */}

            <button type="button" className="btn btn-primary position-relative" onClick={() => navigate("/cart")}>
                Cart
                <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                    {cartItems.length}

                </span>
            </button>


            {itemData.map((item, index) => (
                <Item key={index} item={item} />
            ))}
        </div>
    )
}

export default HomePage