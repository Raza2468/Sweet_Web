
import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom';
import { useGlobalState, useGlobalStateUpdate } from '../../Context/globaleContext';
import { BrowserRouter, Route, Link } from 'react-router-dom';
import { Card } from 'react-bootstrap'
import "./Basket.css"
// import { DataContext } from '../contexts/AuthContexts'




function Basket() {

    const globalState = useGlobalState();
    const globalStateUpdate = useGlobalStateUpdate();
    const history = useHistory();
    const itemsPrice = globalState.cart.reduce((accumulator, current) => accumulator + current.qty * current.price, 0);
    const totalPrice = itemsPrice;

    console.log(globalState.cart, "global my cart");

    function increment(index) {
        console.log('increment ====>', index)
        globalStateUpdate((prev) => {

            let cart = prev.cart;

            prev.cart[index].qty = prev.cart[index].qty + 1;

            localStorage.setItem("cart", JSON.stringify(cart));

            return { ...prev, cart: cart }

        })
    }

    function decrement(index) {
        console.log('decrement index :', index)

        globalStateUpdate((prev) => {
            let cart = prev.cart;
            prev.cart[index].qty = prev.cart[index].qty === 1 ? 1 : prev.cart[index].qty - 1

            localStorage.setItem('cart', JSON.stringify(cart))

            return { ...prev, cart: cart }
        })

    }

    function deleteFromCart(index) {
        globalStateUpdate((prev) => {
            let cart = prev.cart;

            prev.cart = prev.cart.splice(index, 1);

            localStorage.setItem("cart", JSON.stringify(cart));

            return { ...prev, cart: cart }

        })
    }

    // console.log(globalState.cart.length, "Da");
    return (
        <div>
            <br />
            {/* <Card> */}
           
            {/* <h1>Banner</h1> */}

            {/* </Card> */}
            <div>
            {/* {globalState.cart.map((e) => (
                    <div className="detail" key={e._id}>
                        <img src={e.profileUrl} alt="" />
                        <div className="box">
                            <div className="row">
                                <h2>{e.title}</h2>
                                <span>${e.price}</span>
                            </div>
                            <p>{e.description}</p>

                            <Link to="/cart" className="cart">
                                Add to Cart
                                </Link>
                        </div>
                    </div>
                )
                )} */}
                {/* <span>${item.colors}</span> */}
                {/* <Colors colors={item.colors}/> */}
            {globalState.cart.map((e, index) => {
                return (
                    
                    <>
                        <div class="row mb-4" className="detail">
                            <div class="col-md-5 col-lg-3 col-xl-3">
                                <div class="view zoom overlay z-depth-1 rounded mb-3 mb-md-0">
                                    <img class="img-fluid w-100"
                                        // src={e.productimages[0]} alt="Sample" />
                                        src={e.profileUrl} alt="Sample" />
                                    <a href="">
                                        <div class="mask">
                                            <img class="img-fluid w-100"
                                                src="" alt="Sample" />
                                            <div class="mask rgba-black-slight"></div>
                                        </div>
                                    </a>

                                </div>
                            </div>
                            <div class="col-md-7 col-lg-9 col-xl-9">
                                <div>
                                    <div class="d-flex justify-content-between">
                                        <div>
                                            <h5>{e.productname}</h5>
                                            {/* <p class="mb-3 text-muted text-uppercase small">Stock : {e.stock}</p> */}
                                            <p class="mb-2 text-muted text-uppercase small"></p>
                                            <p class="mb-3 text-muted text-uppercase small"></p>
                                        </div>
                                        <div>
                                            <div class="def-number-input number-input safari_only mb-0 w-100">
                                                <button onClick={() => decrement(index)}
                                                    class="minus decrease">-</button>
                                                <input class="quantity" min="0" name="quantity" value={1} type="text" style={{ textAlign: 'center' }} id="increment" />
                                                <button class="plus increase" onClick={() => increment(index)}>+</button>
                                            </div>
                                            <small id="passwordHelpBlock" class="form-text text-muted text-center">
                                                (Note, 1 piece)
                                                            </small>
                                        </div>
                                    </div>
                                    <div class="d-flex justify-content-between align-items-center">
                                        <div>
                                            <a href type="button" class="card-link-secondary small text-uppercase mr-3"><i
                                                class="fas fa-trash-alt mr-1"></i><span onClick={(e) => deleteFromCart(index)}>Remove item</span> </a>
                                        </div>
                                        <p class="mb-0"><span><strong id="summary">{e.price * e.qty}</strong></span></p>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </>
                )
            })}
            </div>
            <div>

                <hr class="mb-4" />



                <div class="col-lg-4">

                    <div class="mb-3">
                        <div class="pt-4">

                            <h5 class="mb-3">The total amount of</h5>

                            <ul class="list-group list-group-flush">
                                <li class="list-group-item d-flex justify-content-between align-items-center border-0 px-0 pb-0">
                                    Temporary amount
        <span>$25.98</span>
                                </li>
                                <li class="list-group-item d-flex justify-content-between align-items-center px-0">
                                    Shipping
        <span>Gratis</span>
                                </li>
                                <li class="list-group-item d-flex justify-content-between align-items-center border-0 px-0 mb-3">
                                    <div>
                                        <strong>The total amount of</strong>
                                        <strong>
                                            <p class="mb-0">(including VAT)</p>
                                        </strong>
                                    </div>
                                    <span><strong>{globalState.cart.length}</strong></span>
                                </li>
                            </ul>

                            {/* <button type="button" class="btn btn-primary btn-block" onClick={checkout}>GO TO Checkout</button> */}

                        </div>
                    </div>


                </div>

            </div>

        </div>
    )
}
// }

export default Basket



                //     {product.map(item => (
                //         <div className="detail" key={item._id}>
                //             <img src={item.src} alt="" />
                //             <div className="box">
                //                 <div className="row">
                //                     <h2>{item.title}</h2>
                //                     <span>${item.price}</span>
                //                 </div>
                //                  <span>${item.colors}</span> 
                //                 <Colors colors={item.colors}/>
                //                 <p>{item.description}</p>
    
                //                 <Link to="/cart" className="cart">
                //                     Add to Cart
                //                     </Link>
                //             </div>
                //         </div>
                //     )
                //     )}
                // </> 