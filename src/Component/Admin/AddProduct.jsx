import React from 'react'
import axios from 'axios'
import { Socket } from 'react-socket-io';
import { useState, useRef } from 'react';
import { useGlobalState } from "../../Context/globaleContext";
import { Button } from 'react-bootstrap';
// import fallback from './../images/image_1024.png';
import url from '../../core/index'



export default function AddProduct() {
    // let url = 'http://localhost:3001'
    const [produt, setProducts] = useState([]);
    // const [data, setData] = useState({ products: [], })
    // const globalState = useGlobalState();
    // const [imgurl, setURL] = useState([]);
    // const setGlobalState = useGlobalStateUpdate();
    const productname = useRef();
    const price = useRef();
    const stock = useRef();
    const description = useRef();
    const fileInput = useRef();



    function handler(event) {
        event.preventDefault();

        axios({
            method: 'post',
            url: url + '/profilePOST',
            data: {
                productname: productname.current.value,
                price: price.current.value,
                stock: stock.current.value,
                description: description.current.value,
                img: fileInput.current.value,

                // ["http://sdfsdfsdfsf", "wwefwfwef"]
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
                console.log(response.data, "gu");
            }
        }).catch((error) => {
            console.log(error);
        });

    }
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
        axios({
            method: 'get',
            url: url + "/realtimechat",
            // data: formData,
            headers: { 'Content-Type': 'multipart/form-data' }
        })
            .then(res => {
                console.log(res);
                // console.log(`upload Success` + JSON.stringify(res.data));
                setProducts(res.data.tweet)
                // document.getElementById("myProfile").src = res.data.profileUrl;
                // document.getElementById("profilePic").src = res.data.profileUrl;
            })
            .catch(err => {
                console.log(err);
            })

    }

    // var socket = io(url);

    // socket.on('connect', function () {
    //     console.log("I am connected");




    // });




    // console.log(produt,"produt");
    return (
        <div onLoad={getRequest}>
            <form onSubmit={handler} >
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

                <Button type="submit">Summit</Button>
            </form>

            <div>
                {/* {productarr.map((i,v)=>{
console.log(v,"ddd");
    })} */}
            </div>
            <hr />
            <Button onClick={getRequest}>All Product</Button>

            {produt.map((e, index) => (
                <div className="col-md-3 mt-3" key={e.id}>
                    {/* <img className="w-100" height="200" src={e.profileUrl[0]} alt={e.productname} /> */}

                    <div style={{ textAlign: 'center' }}>

                        <img className="w-100" height="200" src={e.profileUrl} alt={e.productname} />
                        <h3 style={{ textAlign: 'center', marginTop: '10px' }}>{e.productname}</h3>
                        <div>PKR: {e.price}/-Per kg</div>
                        <p class="card-text">{e.description}</p>
                        <button className="btn btn-primary">Show user Dashboard</button>
                        <button className="btn btn-danger">Dellet</button>
                        {/* <button className="btn btn-primary" onClick={() => aDD(e, index)}>Add To Cart</button> */}


                    </div>
                </div>
            ))}
        </div>
    )
}





// socket.on("chat-connect", (data) => {

//     // var soketloop =data.profile    // var loop = response.data.tweet
//     // for (var i = 0; i <data.profile.length; i++) {
//     // alert(response.data[i]);
//     // console.log(data[i]);
//     // console.log(loop[i].msg);
//     // console.log(loop[i].createdOn);
//     // console.log(`" email " ${soketloop[i].email}" message "${soketloop[i].msg}" time "${soketloop[i].createdOn}`);
//     var post = document.getElementById('welcomeUser')
//     var litext = document.createElement('li')
//     // var litex = document.createTextNode(`${data.name}${data.msg}${moment(data.createdOn).fromNow()}`);
//     var litex = document.createTextNode(`${data.name}"====>"${data.msg}"====>"${moment(data.createdOn).fromNow()}`);
//     litext.appendChild(litex)
//     litext.setAttribute("class", "realclass");

//     post.appendChild(litext)
//     // console.log(`${data.name}${"====Raza"}`);

//     console.log(data.email, "email");
//     console.log(data.createdOn, "time");
//     console.log(data.msg, "message");
//     console.log(data.name, "name");
//     console.log(data.profileUrl, "data");
//     console.log(data, "data");
//      // }
//     // console.log(response.data.tweet, "realtimechat");

//     // var post = document.getElementById('posts')
//     // var litext = document.createElement('li')
//     // var litex = document.createTextNode(data);
//     // litext.appendChild(litex)
//     // post.appendChild(litext)

//     // console.log(newPOST.tweet);
//     // console.log(newPOST.email);
//     // console.log(newPOST.name);
// })
