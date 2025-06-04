import Head from "next/head";
import { Bar } from "react-chartjs-2";
import { IoHome } from "react-icons/io5";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { useEffect, useState } from "react";
//import LoginLayout from "@/components/LoginLayout";
import Loading from "@/components/Loading";

export default function Home() {
  ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
  );

  // use this on top for render error
  const [productsData, setProductsData] = useState([]);
  const [plantsData, setPlantsData] = useState([]);
  const [machinesData, setMachinesData] = useState([]);
  const [aboutsData, setAboutsData] = useState([]);
  const [loading, setLoading] = useState(true);

  // define option ewithin the component scope
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Products Created Monthly by Year",
      },
    },
  };

  useEffect(() => {
    // fetch data from api
    const fetchData = async () => {
      try {
        const response = await fetch("/api/products");
        const responseplant = await fetch("/api/plants");
        const responsemachine = await fetch("/api/machines");
        //  const responseabout = await fetch('api/abouts')
        const data = await response.json();
        const dataPlant = await responseplant.json();
        const dataMachine = await responsemachine.json();
        //  const dataAbout = await responseabout.json();

        setProductsData(data); // assuming data is an array of product bjects
        setPlantsData(dataPlant);
        setMachinesData(dataMachine);
        //  setAboutsData(dataAbout);
        setLoading(false); // after fetching data make loading false
      } catch (error) {
        setLoading(false);
      }
    };

    fetchData(); // call fetchdata function
  }, []);

  // Aggregate data by year and month
  const monthlyData = productsData
    .filter((dat) => dat.status === "publish")
    .reduce((acc, product) => {
      const year = new Date(product.createdAt).getFullYear(); // Get the year
      const month = new Date(product.createdAt).getMonth(); // Get the month
      acc[year] = acc[year] || Array(12).fill(0); // Initialize array for the year if not exits
      acc[year][month]++; // Increment count for the month
      return acc;
    }, {});

  const currentYear = new Date().getFullYear(); // get the current year
  const years = Object.keys(monthlyData);
  const labels = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "June",
    "July",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  const datasets = years.map((year) => ({
    label: `${year}`,
    data: monthlyData[year] || Array(12).fill(0), // if no data for a month, default to 0
    backgroundColor: `rgba(${Math.floor(Math.random() * 256)}, ${Math.floor(
      Math.random() * 256
    )}, ${Math.floor(Math.random() * 256)}, 0.5)`,
  }));

  const data = {
    labels,
    datasets,
  };

  return (
    <>
      <Head>
        <title>Dashboard Website Unipro</title>
        <meta name="description" content="website backend" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

        <div className="dashboard">
          <div className="titledashboard flex flex-sb">
            <div>
              <h2>
                Admin <span>Dashboard</span>
              </h2>
              <h3>ADMIN PANEL</h3>
            </div>
            <div className="breadcrumb">
              <IoHome /> <span>/</span>
              <span>Dashboard</span>
            </div>
          </div>

          {/* dashboard foyr cards */}
          <div className="topfourcards flex flex-sb">
            <div className="four_card">
              <h2>Total Products</h2>
              <span>
                {productsData.filter((dat) => dat.status === "publish").length}
              </span>
            </div>
            <div className="four_card">
              <h2>Total Plants</h2>
              <span>
                {plantsData.filter((dat) => dat.status === "publish").length}
              </span>
            </div>
            <div className="four_card">
              <h2>Total Machine</h2>
              <span>
                {machinesData.filter((dat) => dat.status === "publish").length}
              </span>
            </div>
            <div className="four_card">
              <h2>Total ???</h2>
              <span>5</span>
            </div>
          </div>

          {/* year overview */}
          <div className="year_overview flex flex-sb">
            <div className="leftyearoverview">
              <div className="flex flex-sb">
                <h3>Year Overview</h3>
                <ul className="creative-dots">
                  <li className="big-dot"></li>
                  <li className="semi-big-dot"></li>
                  <li className="medium-dot"></li>
                  <li className="semi-medium-dot"></li>
                  <li className="semi-small-dot"></li>
                  <li className="small-dot"></li>
                </ul>
                <h3 className="text-right">
                  {
                    productsData.filter((dat) => dat.status === "publish")
                      .length
                  }{" "}
                  / 365 <br /> <span>Total Published</span>
                </h3>
              </div>
              <Bar data={data} options={options} />
            </div>

            <div className="right_salescont">
              <div>
                <h3>Products By Category</h3>
                <ul className="creative-dots">
                  <li className="big-dot"></li>
                  <li className="semi-big-dot"></li>
                  <li className="medium-dot"></li>
                  <li className="semi-medium-dot"></li>
                  <li className="semi-small-dot"></li>
                  <li className="small-dot"></li>
                </ul>
              </div>
              <div className="blogscategory flex flex-center">
                <table>
                  <thead>
                    <tr>
                      <td>Topics</td>
                      <td>Data</td>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>Felt</td>
                      <td>
                        {
                          productsData.filter(
                            (dat) => dat.productcategory[0] === "felt"
                          ).length
                        }
                      </td>
                    </tr>
                    <tr>
                      <td>Rubber</td>
                      <td>
                        {
                          productsData.filter(
                            (dat) => dat.productcategory[0] === "rubber"
                          ).length
                        }
                      </td>
                    </tr>
                    <tr>
                      <td>Butyl Rubber</td>
                      <td>
                        {
                          productsData.filter(
                            (dat) => dat.productcategory[0] === "butyl"
                          ).length
                        }
                      </td>
                    </tr>
                    <tr>
                      <td>Foam</td>
                      <td>
                        {
                          productsData.filter(
                            (dat) => dat.productcategory[0] === "foam"
                          ).length
                        }
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      
    </>
  );
}
