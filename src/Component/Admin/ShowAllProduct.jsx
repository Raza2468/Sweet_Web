import React from 'react'
import axios from 'axios'
import url from '../../core/index'
import socket from '../../config/socket'
import { useState, useRef, useEffect } from 'react';
import { Button } from 'react-bootstrap';




export default function ShowAllProduct() {
    
    const [produt, setProducts] = useState([]);
    const [realTime, setRealTime] = useState(false);


    useEffect(() => {

        axios({
            method: 'get',
            url: url + "/userProductAll",
        }).then((response) => {

            console.log(response, "response");
            setProducts(response.data.tweet)

        }, (error) => {
            console.log("an error occured");
        })

        socket.on('chat-connect', (data) => {
            setRealTime(!realTime);
            console.log(data, "dataaa");
        })
    }, [realTime])

    function removeAddProduct(e) {

        axios({
            method: 'post',
            url: url + '/UserDeletAllCart',

            data: {
                _id: e._id,

            },
            withCredentials: true,

        })
            .then((response) => {

                if (response) {
                    alert(response.data)
                    userProductAll()
                } else {

                    alert(response.data)
                }

            }, (error) => {
                console.log(error.message);
            });
    }

    function userProductAll() {

        axios({
            method: 'get',
            url: url + "/userProductAll",
            headers: { 'Content-Type': 'multipart/form-data' }
        })
            .then(res => {

                setProducts(res.data.tweet)

            })
            .catch(err => {

                console.log(err);
            })
    }

    return (
        <div>
            <h1>Show All User Product</h1>
            <Button onClick={userProductAll}>All Product</Button>

            {produt.map((e, index) => (

                <div className="col-md-3 mt-3" key={e.id, index}>
                    {/* <img className="w-100" height="200" src={e.profileUrl[0]} alt={e.productname} /> */}

                    <div style={{ textAlign: 'center' }}>

                        <img className="w-100" height="200" src={e.profileUrl} alt={e.productname} />

                        <h3 style={{ textAlign: 'center', marginTop: '10px' }}>{e.productname}</h3>

                        <div>PKR: {e.price}/-Per kg</div>

                        <p className="card-text">{e.description}</p>

                        {/* <button className="btn btn-primary w-100" onClick={() => AddUserProduct(e)}>Show user Dashboard</button> */}
                        <br />
                        <button className="btn btn-danger w-100" onClick={() => removeAddProduct(e)}>Dellet</button>

                    </div>
                </div>
            ))}
        </div>
    )
}
