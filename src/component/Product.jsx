import React, { useEffect, useState } from 'react'
import {useParams} from 'react-router'
import axios from 'axios';
import { API_URL } from '../const';

const Product = () => {
    const {id} = useParams();
    const [product, setProduct] = useState([]);

    useEffect(() => {
        getProduct();
      }, [])
    
      const getProduct = () => {
        axios.get(API_URL + `product/${id}`).then((res) => {
          setProduct(res.data);
        })
      }


    const ShowProduct = () =>{
        return(
            <div className="productId product-img-info  row justify-content-center align-items-center">
            <div className="col-xl-6 productIdCardImg">
             <img src={product.thumbnail} alt={product.title}/>   
            </div>
            <div className="col-xl-6">
            <h4 className="product-info">ID: <span>{product.id}</span></h4>
                <h4 className="product-info">Title: <span>{product.title}</span></h4>
                <p className="product-info">
                Description: <span>{product.description}</span>
                </p>
                <h4 className="product-info">
                   Price: <span>${product.price}</span>
                </h4>
                <h4 className="product-info">
                   Rating: <span>{product.rating}</span>
                </h4>
                <h4 className="product-info">
                   Stock: <span>{product.stock}</span>
                </h4>
            </div>
            </div>
        )
    }

  return (
    <div>
        <div className="container ">
            <div className="row d-flex justify-content-center align-items-center">
                <ShowProduct/>
            </div>
        </div>
    </div>
  )
}

export default Product