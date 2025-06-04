import Dataloading from "@/components/Dataloading";
import useFetchData from "@/hooks/useFetchData";
import { useState } from "react";
import { MdOutlinePrecisionManufacturing } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
import { RiDeleteBin6Fill } from "react-icons/ri";
import Link from "next/link";

export default function Abouts() {
 //pagination
 const [currentPage, setCurrentPage] = useState(1); //for page 1
 const [perPage] = useState(7);

 const [searchQuery, setSearchQuery] = useState("");

 // fetch machine data
 const { alldata, loading } = useFetchData("/api/abouts"); // fetch abouts data

 // function to handle page change
 const paginate = (pageNumber) => {
   setCurrentPage(pageNumber);
 };

 // total number of plant
 const allabout = alldata.length;

 // filter all data based on search query
 const filteredAbouts =
   searchQuery.trim() === ""
     ? alldata
     : alldata.filter((about) =>
        about.title.toLowerCase().includes(searchQuery.toLowerCase())
       );

 // calcuate index of the first plant dsiplayed on the current page
 const indexOfFirstAbout = (currentPage - 1) * perPage;
 const indexOfLastAbout = currentPage * perPage;

 // Get the current page's plant
 const currentAbouts = filteredAbouts.slice(
    indexOfFirstAbout,
    indexOfLastAbout
 );

 const publishedabouts = currentAbouts.filter(
   (ab) => ab.status === "publish"
 );

 const pageNumbers = [];

 for (let i = 1; i <= Math.ceil(allabout / perPage); i++) {
   pageNumbers.push(i);
 }


    return <>
<div className="blogpage">
        <div className="titledashboard flex flex-sb">
          <div>
            <h2>
              All Published <span>About</span>
            </h2>
            <h3>ADMIN PANEL</h3>
          </div>
          <div className="breadcrumb">
          <MdOutlinePrecisionManufacturing />
            <span>/</span> <span>About</span>
          </div>
        </div>
        <div className="blogstable">
          <div className="flex gap-2 mb-1">
            <h2>Search About:</h2>
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
                  {publishedabouts.length === 0 ? (
                    <tr>
                      <td colSpan={4} className="text-center">
                        No Publish About
                      </td>
                    </tr>
                  ) : (
                    publishedabouts.map((about, index) => (
                      <tr key={about._id}>
                        <td>{indexOfFirstAbout + index + 1}</td>
                        <td>
                          <img src={about.images[0]} width={180} alt="img" />
                        </td>
                        <td>
                          <h3>{about.title}</h3>
                        </td>
                        <td>
                          <div className="flex gap-2 flex-center">
                            <Link href={"/abouts/edit/" + about._id}>
                              <button>
                                <FaEdit />
                              </button>
                            </Link>
                            <Link href={"/abouts/delete/" + about._id}>
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
          {/* for pagination */}
          {publishedabouts.length === 0 ? ("") : (
            <div className="blogpagination">
              <button onClick={() => paginate(currentPage - 1)} disabled={currentPage === 1}>Previous</button>
              {pageNumbers.slice(Math.max(currentPage - 3, 0), Math.min(currentPage + 2, pageNumbers.length)).map(number => (
                <button key={number}
                onClick={() => paginate(number)}
                className={`${currentPage === number ? 'active' : ''}`}
                >
                  {number}
                </button>
              ))}
              <button onClick={() => paginate(currentPage + 1)} disabled={currentAbouts.length < perPage}>Next</button>
            </div>
          )}
        </div>
      </div>
    </>
}