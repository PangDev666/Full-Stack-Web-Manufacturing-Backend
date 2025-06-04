import Dataloading from "@/components/Dataloading";
import useFetchData from "@/hooks/useFetchData";
import { useState } from "react";
import { FaEdit } from "react-icons/fa";
import { RiDeleteBin6Fill } from "react-icons/ri";
import Link from "next/link";
import { MdOutlinePrecisionManufacturing } from "react-icons/md";

export default function Draftmachine() {
  //pagination
  const [currentPage, setCurrentPage] = useState(1); //for page 1
  const [perPage] = useState(7);

  const [searchQuery, setSearchQuery] = useState("");

  // fetch product data
  const { alldata, loading } = useFetchData("/api/machines");

  // function to handle page change
  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // total number of product
  const allmachine = alldata.length;

  // filter all data based on search query
  const filteredMachines =
    searchQuery.trim() === ""
      ? alldata
      : alldata.filter((machine) =>
        machine.title.toLowerCase().includes(searchQuery.toLowerCase())
        );

  // calcuate index of the first product dsiplayed on the current page
  const indexOfFirstMachine = (currentPage - 1) * perPage;
  const indexOfLastMachine = currentPage * perPage;

  // Get the current page's product
  const currentMachines = filteredMachines.slice(
    indexOfFirstMachine,
    indexOfLastMachine
  );

  const publishedmachines = currentMachines.filter(
    (ab) => ab.status === "draft" // for draft
  );

  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(allmachine / perPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <>
      <div className="blogpage">
        <div className="titledashboard flex flex-sb">
          <div>
            <h2>
              All Draft <span>Machines</span>
            </h2>
            <h3>ADMIN PANEL</h3>
          </div>
          <div className="breadcrumb">
            <MdOutlinePrecisionManufacturing />
            <span>/</span> <span>Machines</span>
          </div>
        </div>
        <div className="blogstable">
          <div className="flex gap-2 mb-1">
            <h2>Search Machines:</h2>
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
                  {publishedmachines.length === 0 ? (
                    <tr>
                      <td colSpan={4} className="text-center">
                        No Publish Machine
                      </td>
                    </tr>
                  ) : (
                    publishedmachines.map((machine, index) => (
                      <tr key={machine._id}>
                        <td>{indexOfFirstMachine + index + 1}</td>
                        <td>
                          <img src={machine.images[0]} width={180} alt="img" />
                        </td>
                        <td>
                          <h3>{machine.title}</h3>
                        </td>
                        <td>
                          <div className="flex gap-2 flex-center">
                            <Link href={"/machines/edit/" + machine._id}>
                              <button>
                                <FaEdit />
                              </button>
                            </Link>
                            <Link href={"/machines/delete/" + machine._id}>
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