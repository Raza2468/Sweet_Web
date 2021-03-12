import React from 'react'
import axios from 'axios'
import url from '../../core/index'
import socket from '../../config/socket'
import { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Card, Button, Alert } from 'react-bootstrap';
import "./Dashbard.css"




export default function Dashbard() {

    const [produt, setProducts] = useState([]);
    const [realTime, setRealTime] = useState(false);
    const [sweetadd, setSweet] = useState();
    const [loading, setLoading] = useState(false)
    const sweetRef = useRef();


    useEffect(() => {

        axios({
            method: 'get',
            url: url + "/userProductAll",
        }).then((response) => {

            // console.log(response, "response");
            setProducts(response.data.tweet)

        }, (error) => {
            console.log("an error occured");
        })

        socket.on('chat-connect', (data) => {
            // setRealTime(!realTime);
            console.log(data, "dataaa");
        })
    }, [])

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
                    // userProductAll()
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
            // headers: { 'Content-Type': 'multipart/form-data' }
        })
            .then(res => {

                setProducts(res.data.tweet)

            })
            .catch(err => {

                console.log(err);
            })
    }

    // async function handlerSubmit(e) {
    //     e.preventDefault()
    //     if (sweetRef.current.value) {

    //     }
    //     try {
    //         setSweet("")
    //         setLoading(true)
    //         await sweetRef.current.value
    //         // history.push("/")
    //     } catch {
    //         setSweet("Failed To login")
    //     }
    //     setLoading(false)
    // }


    return (
        <div>
            <h1>Show All User Product</h1>
            <Button onClick={userProductAll}>All Product</Button>

            <div id="produt" >
                {
                    produt.map((e, index) => (
                        <div className="card" key={e.id, index}>
                            
                            <div className="bg-image hover-zoom">
                                {/* <img src="https://mdbootstrap.com/img/new/standard/city/053.jpg" class="w-100" /> */}
                                <img src={e.profileUrl} alt={e.productname} />
                            </div>
                            
                            <div className="content">
                                <h3>
                                    {e.productname}
                                </h3>
                                <span>PKR: {e.price}/-Per kg</span>
                                <p>{e.description}</p>
                                <p>{e.stock}</p>
                                <button>Add to Cart</button>
                            </div>
                        
                        </div>
                    ))}
            </div>
        </div>
    )
}

