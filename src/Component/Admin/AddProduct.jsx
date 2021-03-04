import React from 'react'
import axios from 'axios'
import { useState, useRef } from 'react';
import { useGlobalState } from "../../Context/globaleContext";
import { Button } from 'react-bootstrap';
// import fallback from './../images/image_1024.png';




export default function AddProduct() {
    let url = 'http://localhost:3001'

    const [data, setData] = useState({ products: [], })


    // const [images, setImages] = useState([fallback, fallback, fallback]);
    const globalState = useGlobalState();
    const [imgurl, setURL] = useState([]);


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
                    console.log(response.data.message,"prodact Detail");
                    // setData((previous) => {
                    //     return previous.concat([response.data.data]);
                    // });
                    // productname.current.value = ""
                    // price.current.value = ""
                    // stock.current.value = ""
                    // description.current.value = ""
                } else {
                    // alert(response.data.message);
                console.log(response.data,"gu");
                }
            }).catch((error) => {
                console.log(error);
            });
    
        // console.log(productname.current.value);
        // console.log(price.current.value);
        // console.log(stock.current.value);
        // console.log(description.current.value);
        // console.log(img.current.value);


        // let prodactData = {
        //     productname: productname.current.value,
        //     price: price.current.value,
        //     stock: stock.current.value,
        //     description: description.current.value,
        //     img: img.current.value,
        // }
        // setData((products) => {
        //     data.products.push(prodactData)
            
        // });
        // console.log(prodactData);

        // var arr = [
        //     {
        //         name: "raza",
        //         email: "raza@gmail.com",
        //         password: "1234",
        //     }
        // ]
        // axios({
        //     method: 'post',
        //     url: url + '/admindashboard',
        //     data: {
        //         // productname: productname.current.value,
        //         // price: price.current.value,
        //         // productimages: imgurl,
        //         // stock: stock.current.value,
        //         // description: description.current.value,

        //         // ["http://sdfsdfsdfsf", "wwefwfwef"]
        //     }, withCredentials: true
        // }).then((response) => {
        //     if (response.data.status === 200) {
        //         alert(response.data.message)
        //         setData((previous) => {
        //             return previous.concat([response.data.data]);
        //         });
        //         productname.current.value = ""
        //         price.current.value = ""
        //         stock.current.value = ""
        //         description.current.value = ""
        //     } else {
        //         alert(response.data.message);
        //     }
        // }).catch((error) => {
        //     console.log(error);
        // });

    }
    function upload() {
        var fileInput = document.getElementById("fileInput");
        console.log("fileInput: ", fileInput);
        console.log("fileInput: ", fileInput.files[0]);
    
        let formData = new FormData();
        // https://developer.mozilla.org/en-US/docs/Web/API/FormData/append#syntax
    
        formData.append("myFile", fileInput.files[0]);
    
        // file input is for browser only, use fs to read file in nodejs client
        // formData.append("myFile", blob, "myFileNameAbc"); // you can also send file in Blob form (but you really dont need to covert a File into blob since it is Actually same, Blob is just a new implementation and nothing else, and most of the time (as of january 2021) when someone function says I accept Blob it means File or Blob) see: https://stackoverflow.com/questions/33855167/convert-data-file-to-blob
        formData.append("myName", "malik"); // this is how you add some text data along with file
        formData.append("myDetails",
            JSON.stringify({
                // "userEmail": sessionStorage.getItem("userEmail"),
                "subject": "Science",   // this is how you send a json object along with file, you need to stringify (ofcourse you need to parse it back to JSON on server) your json Object since append method only allows either USVString or Blob(File is subclass of blob so File is also allowed)
                "year": "2021"
            })
        );
    
        // you may use any other library to send from-data request to server, I used axios for no specific reason, I used it just because I'm using it these days, earlier I was using npm request module but last week it get fully depricated, such a bad news.
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
    return (
        <div>
            <form onSubmit={handler}>
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

        </div>
    )
}


// function upload(e, index) {

//     var fileInput = document.getElementById("fileInput");
//     const file = e.target.files[0];
//     const reader = new FileReader();

//     // // To convert a File into Blob (not recommended)
//     // var blob = null;
//     // var file = fileInput.files[0];
//     // let reader = new FileReader();
//     // reader.readAsArrayBuffer(file)
//     // reader.onload = function (e) {
//     //     blob = new Blob([new Uint8Array(e.target.result)], { type: file.type });
//     //     console.log(blob);
//     // }

//     console.log("fileInput: ", fileInput);
//     console.log("fileInput: ", fileInput.files[0]);

//     let formData = new FormData();
//     // https://developer.mozilla.org/en-US/docs/Web/API/FormData/append#syntax

//     formData.append("myFile", fileInput.files[0]); // file input is for browser only, use fs to read file in nodejs client
//     // formData.append("myFile", blob, "myFileNameAbc"); // you can also send file in Blob form (but you really dont need to covert a File into blob since it is Actually same, Blob is just a new implementation and nothing else, and most of the time (as of january 2021) when someone function says I accept Blob it means File or Blob) see: https://stackoverflow.com/questions/33855167/convert-data-file-to-blob
//     formData.append("myName", "sameer"); // this is how you add some text data along with file
//     formData.append("myDetails",
//         JSON.stringify({
//             "subject": "Science",   // this is how you send a json object along with file, you need to stringify (ofcourse you need to parse it back to JSON on server) your json Object since append method only allows either USVString or Blob(File is subclass of blob so File is also allowed)
//             "year": "2021"
//         })
//     );

//     // you may use any other library to send from-data request to server, I used axios for no specific reason, I used it just because I'm using it these days, earlier I was using npm request module but last week it get fully depricated, such a bad news.
//     axios({
//         method: 'post',
//         url: url + "/upload",
//         data: formData,
//         headers: { 'Content-Type': 'multipart/form-data' },
//         withCredentials: true
//     }).then(res => {
//         console.log(`  upload Success`);
//         alert(res.data.message)
//         setURL(prev => {
//             return prev.concat(res.data.url)
//         })
//         // document.getElementById("show_pic").innerHTML = instanceOfFileReader.readAsDataURL(res.data);

//         reader.addEventListener("load", function () {
//             // convert image file to base64 string
//             setImages(prev => {
//                 prev[index] = reader.result;
//                 return [].concat(prev)
//             });
//         }, false);

//         if (file) {
//             reader.readAsDataURL(file);
//         }

//     }).catch(err => {
//         console.log(err);
//     })
// }