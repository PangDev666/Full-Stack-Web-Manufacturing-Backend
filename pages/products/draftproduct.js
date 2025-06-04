import Dataloading from "@/components/Dataloading";
import useFetchData from "@/hooks/useFetchData";
import { useState } from "react";
import { FaShoppingBag } from "react-icons/fa";
import { FaEdit } from "react-icons/fa";
import { RiDeleteBin6Fill } from "react-icons/ri";
import Link from "next/link";

export default function Draft() {
  //pagination
  const [currentPage, setCurrentPage] = useState(1); //for page 1
  const [perPage] = useState(7);

  const [searchQuery, setSearchQuery] = useState("");

  // fetch product data
  const { alldata, loading } = useFetchData("/api/products");

  // function to handle page change
  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // total number of product
  const allproduct = alldata.length;

  // filter all data based on search query
  const filteredProducts =
    searchQuery.trim() === ""
      ? alldata
      : alldata.filter((product) =>
          product.title.toLowerCase().includes(searchQuery.toLowerCase())
        );

  // calcuate index of the first product dsiplayed on the current page
  const indexOfFirstProduct = (currentPage - 1) * perPage;
  const indexOfLastProduct = currentPage * perPage;

  // Get the current page's product
  const currentProducts = filteredProducts.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  const publishedproducts = currentProducts.filter(
    (ab) => ab.status === "draft" // for draft
  );

  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(allproduct / perPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <>
      <div className="blogpage">
        <div className="titledashboard flex flex-sb">
          <div>
            <h2>
              All Draft <span>Products</span>
            </h2>
            <h3>ADMIN PANEL</h3>
          </div>
          <div className="breadcrumb">
            <FaShoppingBag />
            <span>/</span> <span>Products</span>
          </div>
        </div>
        <div className="blogstable">
          <div className="flex gap-2 mb-1">
            <h2>Search Products:</h2>
            <input
              value={searchQuery}
              onChange={(ev) => setSearchQuery(ev.target.value)}
              type="text"
              placeholder="Search by title..."
            />
          </div>

          <table className="table table-styling">
            <thead>
              <tr>
                <th>#</th>
                <th>Image</th>
                <th>Title</th>
                <th>Edit / Delete</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <>
                  <tr>
                    <td>
                      <Dataloading />
                    </td>
                  </tr>
                </>
              ) : (
                <>
                  {publishedproducts.length === 0 ? (
                    <tr>
                      <td colSpan={4} className="text-center">
                        No Publish Product
                      </td>
                    </tr>
                  ) : (
                    publishedproducts.map((product, index) => (
                      <tr key={product._id}>
                        <td>{indexOfFirstProduct + index + 1}</td>
                        <td>
                          <img src={product.images[0]} width={180} alt="img" />
                        </td>
                        <td>
                          <h3>{product.title}</h3>
                        </td>
                        <td>
                          <div className="flex gap-2 flex-center">
                            <Link href={"/products/edit/" + product._id}>
                              <button>
                                <FaEdit />
                              </button>
                            </Link>
                            <Link href={"/products/delete/" + product._id}>
                              <button>
                                <RiDeleteBin6Fill />
                              </button>
                            </Link>
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
