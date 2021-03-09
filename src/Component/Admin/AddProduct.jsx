import React from 'react'
import axios from 'axios'
import url from '../../core/index'
import socket from '../../config/socket'
import { useState, useRef, useEffect } from 'react';
import { Button } from 'react-bootstrap';
import { logDOM } from '@testing-library/dom';
// import { useGlobalState } from "../../Context/globaleContext";
// import fallback from './../images/image_1024.png';



export default function AddProduct() {

    // getRequest()
    // let url = 'http://localhost:3001'
    // const [data, setData] = useState({ products: [], })
    // const globalState = useGlobalState();
    // const [imgurl, setURL] = useState([]);
    // const setGlobalState = useGlobalStateUpdate();
    const [produt, setProducts] = useState([]);
    const productname = useRef();
    const price = useRef();
    const stock = useRef();
    const description = useRef();
    const fileInput = useRef();
    const [realTime, setRealTime] = useState(false);



    function handler(event) {
        event.preventDefault();

        console.log('handler is=>', socket);
        axios({
            method: 'post',
            url: url + '/profilePOST',
            data: {
                productname: productname.current.value,
                price: price.current.value,
                stock: stock.current.value,
                description: description.current.value,
                img: fileInput.current.value,

            }, withCredentials: true
        }).then((response) => {
            if (response.data.status === 200) {
                // alert(response.data.message)
                console.log(response.data.message, "prodact Detail");
                // setData((previous) => {
                //     return previous.concat([response.data.data]);
                // });
                productname.current.value = ""
                price.current.value = ""
                stock.current.value = ""
                description.current.value = ""
            } else {
                // alert(response.data.message);
                // console.log(response.data, "error");
            }
        }).catch((error) => {
            console.log(error);
        });

    }
    useEffect(() => {
        // socket.on("chat-connect", (data) => {

        //     console.log(data, "data");
        // getRequest
        // })
        // componentDidMount()
        console.log(produt, "Effect");
        //     setProducts.on('child added', snapshot => {
        //     const produt = snapshot.val();
        //     produt.key = snapshot.key;

        //     setProducts(produt.concat(produt)); // See Note 1
        // },[])
    }, [getRequest === true], [getRequest])
    // getRequest()
    // onChange ={getRequest}
    function upload() {

        var fileInput = document.getElementById("fileInput");
        let formData = new FormData();

        console.log("fileInput: ", fileInput);
        console.log("fileInput: ", fileInput.files[0]);

        formData.append("myFile", fileInput.files[0]);
        formData.append("myName", "malik"); // this is how you add some text data along with file
        formData.append("myDetails",
            JSON.stringify({
                // "userEmail": sessionStorage.getItem("userEmail"),
                "subject": "Science",   // this is how you send a json object along with file, you need to stringify (ofcourse you need to parse it back to JSON on server) your json Object since append method only allows either USVString or Blob(File is subclass of blob so File is also allowed)
                "year": "2021"
            })
        );

        axios({
            method: 'post',
            url: url + "/upload",
            data: formData,
            headers: { 'Content-Type': 'multipart/form-data' }
        })
            .then(res => {

                console.log(`upload Success` + JSON.stringify(res.data));
                document.getElementById("myProfile").src = res.data.profileUrl;
                document.getElementById("profilePic").src = res.data.profileUrl;
            })
            .catch(err => {
                console.log(err);
            })
        // )
    }

    function getRequest() {


        // console.log('getRequest is=>', socket);
        axios({
            method: 'get',
            url: url + "/realtimechat",
            // data: formData,
            headers: { 'Content-Type': 'multipart/form-data' }
        })
            .then(res => {

                setProducts(res.data.tweet)

                console.log(res, "data");
                // console.log(`upload Success` + JSON.stringify(res.data));
                // document.getElementById("myProfile").src = res.data.profileUrl;
                // document.getElementById("profilePic").src = res.data.profileUrl;
            })
            .catch(err => {
                console.log(err);
            })

    }

    function removeAddProduct(e) {
        // console.log(produt.map((e)=>e._id),"ss");
        console.log(e._id);

        axios({
            method: 'post',
            url: url + '/deleteCart',

            data: {
                _id: e._id,

            },
            withCredentials: true,
            // headers: { 'Content-Type': 'multipart/form-data' }
        })
            .then((response) => {

                if (response) {
                    alert(response.data)
                    getRequest()
                } else {

                    alert(response.data)
                }

            }, (error) => {
                console.log(error.message);
            });

    }


    // console.log(produt,"produt");
    return (
        //  getRequest(),
        <div onLoad={getRequest}>
            <form onSubmit={handler} onChange={getRequest}>
                <h1>
                    AddProduct
            </h1>

                <input type="text" className="form-control" ref={productname} placeholder="productname" /> <br />
                <input type="text" ref={price} className="form-control" placeholder="price" /> <br />

                <input type="file" id="fileInput" onChange={upload} ref={fileInput} name="img" accept="image/*" />
                <label for="img">Select image:</label>
                {/* <input type="submit" /> */}


                <input type="text" ref={stock} className="form-control" placeholder="stock" /> <br />
                <input type="text" ref={description} className="form-control" placeholder="description" /> <br />

                <Button type="submit" onClick={getRequest}>Summit</Button>
            </form>

            <div>

            </div>
            <hr />
            <Button onClick={getRequest}>All Product</Button>

            {produt.map((e, index) => (

                <div className="col-md-3 mt-3" key={e.id, index}>
                    {/* <img className="w-100" height="200" src={e.profileUrl[0]} alt={e.productname} /> */}

                    <div style={{ textAlign: 'center' }}>

                        <img className="w-100" height="200" src={e.profileUrl} alt={e.productname} />
                        <h3 style={{ textAlign: 'center', marginTop: '10px' }}>{e.productname}</h3>
                        <div>PKR: {e.price}/-Per kg</div>
                        <p className="card-text">{e.description}</p>
                        <button className="btn btn-primary">Show user Dashboard</button>
                        <button className="btn btn-danger" onClick={() => removeAddProduct(e)}>Dellet</button>
                        {/* <button className="btn btn-primary" onClick={() => aDD(e, index)}>Add To Cart</button> */}


                    </div>
                </div>
            ))}
        </div>
    )
}





