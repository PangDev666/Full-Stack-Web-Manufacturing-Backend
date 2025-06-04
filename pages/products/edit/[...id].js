import Product from "@/components/Product";
import Head from "next/head";
import axios from "axios";
import { useState, useEffect } from "react";
import { BsPostcard } from "react-icons/bs";
import { useRouter } from "next/router";
import LoginLayout from "@/components/LoginLayout";
import { FaShoppingBag } from "react-icons/fa";

export default function EditProduct() {
  const router = useRouter();

  const { id } = router.query;

  const [productInfo, setProductInfo] = useState(null);

  useEffect(() => {
    if (!id) {
      return;
    } else {
      axios.get("/api/products?id=" + id).then((response) => {
        setProductInfo(response.data);
      });
    }
  }, [id]);

  return (
    <>
      <Head>
        <title>Update Product</title>
      </Head>

      <div className="blogpage">
        <div className="titledashboard flex flex-sb">
          <div>
            <h2>
              Edit <span>{productInfo?.title}</span>
            </h2>
            <h3>ADMIN PANEL</h3>
          </div>
          <div className="breadcrumb">
            <FaShoppingBag />
            <span>/</span> <span>Edit Product</span>
          </div>
        </div>
        <div className="mt-3">
          {productInfo && <Product {...productInfo} />}
        </div>
      </div>
    </>
  );
}
