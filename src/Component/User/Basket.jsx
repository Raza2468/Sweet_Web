import { BrowserRouter, Route, Link } from 'react-router-dom';
import { Card } from 'react-bootstrap'
import "./Basket.css"
import { DataContext } from '../contexts/AuthContexts'




Basket = () => {

    return (
        <div>
            <br />
            {/* <Card> */}
            <div className="nav-cart">

                {/* <Link to="/cart">
                    <span>{cart.length}</span>
                    <i class="fa fa-shopping-cart" ></i>
                </Link> */}
                {/* <Section /> */}
            </div>
            {/* <h1>Banner</h1> */}

            {/* </Card> */}
        </div>
    )
}
// }

export default Basket
