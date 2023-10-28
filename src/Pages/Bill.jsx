import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { API } from '../global'

function Bill() {
    const [billData, setBillData] = useState([])

    useEffect(() => {
        axios.get(`${API}/bills/get-bill`)
            .then((res) => console.log(res.data))
            .catch((err) => console.log(err))
    }, [])


    return (
        <div>Bill
            {billData.map((item) =>
                <h4>{item.customerName}</h4>)}

        </div>
    )
}

export default Bill