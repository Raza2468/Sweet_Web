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
    const [cart, setCart] = useState([]);
    // const [sweetadd, setSweet] = useState();
    // const [loading, setLoading] = useState(false)
    // const sweetRef = useRef();


    useEffect(() => {

        axios({
            method: 'get',
            url: url + "/userProductAll",
        }).then((response) => {

            setProducts(response.data.tweet)

        }, (error) => {
            console.log("an error occured");
        })

        socket.on('All_product', (data) => {

            setRealTime(!realTime);

        })
    }, [realTime])

    // function userProductAll() {

    //     axios({
    //         method: 'get',
    //         url: url + "/userProductAll",
    //         // headers: { 'Content-Type': 'multipart/form-data' }
    //     })
    //         .then((response) => {

    //             setProducts(response.data.tweet)

    //             // setRealTime(!realTime);
    //         })
    //         .catch(err => {

    //             console.log(err);
    //         })
    // }

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
    // addCart = (id) => {


    // }
    function AddtoCart(e) {

        // console.log(e, "e");

        const cheak = cart.every((item) => {
            return (
                item.productKey !== e.productKey
            )
        })
        if (cheak) {

            const data = produt.filter(product => {
                return (
                    product.productKey === e.productKey
                )
            })
            
            setCart([...cart, e])
            console.log(data)

        } else {
            alert("The product has been added cart.")
        }


    }
    return (

        <div>
            <h1>Show All User Product</h1>
            {/* <Button onClick={userProductAll}>All Product</Button> */}

            <div id="produt" >
                <div>
                    <br />
                    {/* <Card> */}
                    <div className="nav-cart">

                        <Link to="/cart">
                            <span>{cart.length}</span>
                            <i class="fa fa-shopping-cart" ></i>
                        </Link>
                        {/* <Section /> */}
                    </div>
                    {/* <h1>Banner</h1> */}

                    {/* </Card> */}
                </div>
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
                                <p>{e.productKey}</p>
                                <Button onClick={() => AddtoCart(e)}>Add to Cart</Button>
                            </div>

                        </div>
                    ))}
            </div>
        </div>
    )
}

