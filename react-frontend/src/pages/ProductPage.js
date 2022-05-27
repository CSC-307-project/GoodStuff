import axios from "axios";
import React from "react";
import "./ProductPage.css"

const ProductPage = () => {

    return(
        <div class="productContainerDetail">
            <div>
                <img class="imgDetail" src='data:image/jpeg;base64,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'></img>
            </div>
            <div class="infoDetail">
                <div>
                    <h1><b>Title:</b></h1>
                    <h3>Logitech G Pro Wireless</h3>
                </div>
                <div>
                    <h1><b>Description: </b></h1>
                    <p>"What is the best way to get what you want?" she asked. He looked down at the ground knowing that she wouldn't like his answer. He hesitated, knowing that the
                         truth would only hurt. How was he going to tell her that the best way for him 
                         to get what he wanted was to leave her?</p>
                </div>
                <div>
                    <h1><b>Price:</b></h1>
                    <h3>1000 Dollars</h3>
                </div>
            </div>

        </div>
    );

};

export default ProductPage;