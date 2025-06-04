import Dataloading from "@/components/Dataloading";
import useFetchData from "@/hooks/useFetchData";
import { useState } from "react";
import { FaEye } from "react-icons/fa";
import { MdOutlineContactMail } from "react-icons/md";
import Link from "next/link";

export default function Contacts() {
  //pagination
  const [currentPage, setCurrentPage] = useState(1); //for page 1
  const [perPage] = useState(7);

  const [searchQuery, setSearchQuery] = useState("");

  // fetch product data
  const { alldata, loading } = useFetchData("/api/contacts");

  // function to handle page change
  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // total number of product
  const allcontact = alldata.length;

  // filter all data based on search query
  const filteredContacts =
    searchQuery.trim() === ""
      ? alldata
      : alldata.filter((contact) =>
        contact.title.toLowerCase().includes(searchQuery.toLowerCase())
        );

  // calcuate index of the first product dsiplayed on the current page
  const indexOfFirstContact = (currentPage - 1) * perPage;
  const indexOfLastContact = currentPage * perPage;

  // Get the current page's product
  const currentContacts = filteredContacts.slice(
    indexOfFirstContact,
    indexOfLastContact
  );

  const publishedcontacts = currentContacts;

  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(allcontact / perPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <>
      <div className="blogpage">
        <div className="titledashboard flex flex-sb">
          <div>
            <h2>
              All <span>Contacts</span>
            </h2>
            <h3>ADMIN PANEL</h3>
          </div>
          <div className="breadcrumb">
            <MdOutlineContactMail />
            <span>/</span> <span>Contacts</span>
          </div>
        </div>
        <div className="blogstable">
          <div className="flex gap-2 mb-1">
            <h2>Search Contacts by name:</h2>
            <input value={searchQuery} onChange={ev => setSearchQuery(ev.target.value)} type="text" placeholder="Search by title..." />
          </div>

          <table className="table table-styling">
            <thead>
              <tr>
                <th>#</th>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Email</th>
                <th>Company</th>
                <th>Phone No.</th>
                <th>Country</th>
                <th>Description</th>
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
                  {publishedcontacts.length === 0 ? (
                    <tr>
                      <td colSpan={5} className="text-center">
                        No Contact Fount
                      </td>
                    </tr>
                  ) : (
                    publishedcontacts.map((contact, index) => (
                      <tr key={contact._id}>
                        <td>{indexOfFirstContact + index + 1}</td>
                        <td><h3>{contact.name}</h3></td>
                        <td><h3>{contact.lname}</h3></td>
                        <td><h3>{contact.email}</h3></td>
                        <td><h3>{contact.company}</h3></td>
                        <td><h3>{contact.phone}</h3></td>
                        <td><h3>{contact.country}</h3></td>
                        <td><h3>{contact.description}</h3></td>
                        <td>
                          <div className="flex gap-2 flex-center">
                            <Link href={"/contacts/view/" + contact._id}>
                              <button>
                              <FaEye />
                              </button>
                            </Link>
                           {/*  <Link href={"/products/delete/" + product._id}>
                              <button>
                                <RiDeleteBin6Fill />
                              </button>
                            </Link>
                            */}
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
          {publishedcontacts.length === 0 ? ("") : (
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
              <button onClick={() => paginate(currentPage + 1)} disabled={currentContacts.length < perPage}>Next</button>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
