import React from 'react'
import axios from 'axios'
import url from '../../core/index'
import socket from '../../config/socket'
import { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Card, Button, Alert } from 'react-bootstrap';
import { useGlobalState, useGlobalStateUpdate } from "../../Context/globaleContext";
import Basket from './Basket'
import "./Dashbard.css"




export default function Dashbard() {

    const [produt, setProducts] = useState([]);
    const [realTime, setRealTime] = useState(false);
    const [cart, setCart] = useState([]);
    const globalState = useGlobalState();
    const setGlobalState = useGlobalStateUpdate();
    const [show, ShowHide] = useState(true);
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
        console.log(":eee", e)
        // e.qty = 1
        setGlobalState((prev) => {
            let cartItems = prev.cart
            cartItems = [...cartItems, e]

            var found = prev.cart.filter((eachCartItem, i) => eachCartItem._id === e._id);
            var newState;

            if (found.length) {
                newState = { ...prev }
                // alert("card allredy access")
            }
            else {
                newState = { ...prev, cart: cartItems }
            }

            localStorage.setItem("cart", JSON.stringify(newState.cart));
            return newState


        })

    }
    function changeState() {
        ShowHide(Prev => !Prev)
    }

    return (

        <div>
            <h1>Show All User Product</h1>
            {/* <Button onClick={userProductAll}>All Product</Button> */}
            
            <div className="nav-cart">
                <Link to="/Basket">
                <span>{globalState.cart.length}</span>
                <i class="fa fa-shopping-cart" ></i>
                </Link>   
            </div>
            
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
                                <p>{e.productKey}</p>
                                <Button onClick={() => AddtoCart(e)}>Add to Cart</Button>
                            </div>

                        </div>
                    ))}

            </div>
            {'===>' + JSON.stringify(globalState.cart)}
        </div>
    )
}

