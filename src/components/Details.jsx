import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';


const Details = () => {
  const [spaceX, setSpaceX] = useState([]);
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState("status");
  const [popup, setPopup] = useState(false);
  const [modalData, setModalData] = useState([]);
  const [onPage, setOnPage] = useState(1)


  const MyModal = () => {
    useEffect(() => {
      document.body.style.overflowY = "hidden";

      return () => {
        document.body.style.overflowY = "scroll";
      };
    });

    return (
      <>
        <div
          // onClick={() => setPopup(false)}
          className="wrapper fixed top-0 left-0 right-0 bottom-0 bg-indigo-300 opacity-80"
        >
          <div className="popup-box text-lg  text-gray-700 font-Roboto font-bold fixed top-[50%] left-[50%] -translate-x-2/4 -translate-y-2/4 p-5  lg:p-5 bg-white rounded-xl w-1/2">
            <h3 className="text-gray-700 text-lg lg:text-2xl font-extrabold tracking-widest uppercase text-center">
              More Details
            </h3>

       

          <div className="flex flex-row justify-around items-center">
            <span className="uppercase">Capsule Serial : {modalData.capsule_serial} </span>
            <span className="uppercase">Capsule ID : {modalData.capsule_id} </span>
          </div>

          <div className="flex flex-row justify-around items-center">
          <span className="">
                      <span className="uppercase ">Status : </span>
                      {modalData.status === "destroyed" ? (
                        <span className="text-red-500 font-bold p-2 border border-red-500 rounded-xl">
                          {modalData.status}
                        </span>
                      ) : modalData.status === "unknown" ? (
                        <span className="text-yellow-500 font-bold p-2 border border-yellow-500 rounded-xl">
                          {modalData.status}
                        </span>
                      ) : modalData.status === "retired" ? (
                        <span className="text-indigo-700 font-bold p-2 border border-indigo-700 rounded-xl">
                          {modalData.status}
                        </span>
                      ) : (
                        <span className="text-green-500 font-bold p-2 border border-green-500 rounded-xl">
                          {modalData.status}
                        </span>
                      )}
                    </span>

                    <span>TYPE : {modalData.type}</span>
          </div>

          { modalData.details && <span> DETAILS : {modalData.details}</span>}



            <br/>
            <button
              className="w-20 h-10 p-1 rounded-xl bg-red-600 hover:bg-red-700 text-white tracking-widest"
              onClick={() => setPopup(false)}
            >
              CLOSE
            </button>
          </div>
        </div>
      </>
    );
  };

  const fetchData = () => {
    fetch(`https://api.spacexdata.com/v3/capsules/`)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setSpaceX(data);
        console.log(data.length);
      });
  };

  useEffect(() => {
    fetchData();
  }, [onPage]);


  const showDetails = (capsule_serial)=> {
    setPopup(true);
    fetch(`https://api.spacexdata.com/v3/capsules/${capsule_serial}`)
    .then(res => res.json())
    .then((data) => setModalData(data));
    console.log(modalData);
   }

  const handlePageChange = (selectedPage) => {
    if(selectedPage >= 1 && selectedPage !== onPage){
        setOnPage(selectedPage)
    }
  }

  return ReactDOM.createPortal(
    <>
      <div className="container mx-auto ">
        <div className=" flex flex-col lg:flex-row space-y-2 lg:space-y-0 space-x-2 lg:space-x-3 justify-center items-center p-10 lg:p-20 bg-purple-300 ">
          <input
            type="text"
            name="search"
            className="search  p-2 rounded-lg "
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search..."
          />

          <label className="font-sm font-bold uppercase tracking-widest text-gray-700">
            Filter By : &#8667;{" "}
          </label>

          <select
            className="rounded-lg p-2"
            value={selected}
            onChange={(e) => setSelected(e.target.value)}
            id="filterType"
          >
            <option value="status">Status</option>
            <option value="type">Type</option>
            <option value="original_launch">Original Launch</option>
          </select>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 lg:gap-4 p-5 lg:p-10 font-Roboto">
          {spaceX &&
            spaceX
              .slice(onPage*5-5, onPage*5)
              .filter(
                selected === "type"
                  ? (ty) => ty.type.includes(query)
                  : selected === "status"
                  ? (st) => st.status.includes(query)
                  : (ol) => ol.original_launch?.includes(query)
              )
              .map((one, i) => {
                return (
                  <div
                   
                     onClick={(e) => showDetails(one.capsule_serial)}
                    key={i}
                    id={one.capsule_serial}
                    className="  flex flex-col bg-gray-100 text-gray-700 text-lg shadow-lg border border-gray-300  hover:shadow-xl justify-start items-start  rounded-tl-3xl rounded-br-3xl p-5"
                  >
                    <h4>
                      <span className="uppercase ">Serial : </span>
                      {one.capsule_serial}
                    </h4>
                   
               
                    <h4>
                      <span className="uppercase ">Status : </span>
                      {one.status === "destroyed" ? (
                        <span className="text-red-500 font-bold">
                          {one.status}
                        </span>
                      ) : one.status === "unknown" ? (
                        <span className="text-yellow-500 font-bold">
                          {one.status}
                        </span>
                      ) : one.status === "retired" ? (
                        <span className="text-indigo-700 font-bold">
                          {one.status}
                        </span>
                      ) : (
                        <span className="text-green-500 font-bold">
                          {one.status}
                        </span>
                      )}
                    </h4>
                    <h4>Type : {one.type}</h4>
                    <h4>Original Launch : {one.original_launch}</h4>
                  </div>
                );
              })}


            

          {/* The Popup  */}

          {popup && <MyModal />}




        </div>



        {/* PAGINATION */}

        <div className="flex flex-row justify-center items-center space-x-3 text-lg lg:text-xl py-2">
          <span onClick={()=> handlePageChange(onPage - 1)} className={` ${onPage > 1 ? "" : "hidden"} bg-purple-700 text-white hover:bg-purple-800 rounded-lg p-1`}><span><FaArrowLeft/></span></span>
          {
          [...Array(4)].map((_, i) => {
            return <span onClick={()=> handlePageChange(i + 1)} className={` ${onPage === i+1 ? "bg-purple-700" : "bg-gray-500"}  hover:bg-gray-600 text-white  px-2 py-1 rounded-lg`} key={i+1}>{i+1}</span>
          })
          }
          <span onClick={()=> handlePageChange(onPage + 1)} className={` ${onPage === 4 ? "hidden" : ""} bg-purple-700 text-white hover:bg-purple-800 rounded-lg p-1`}><span><FaArrowRight/></span></span>
        </div>


      </div>
    </>,
    document.querySelector(".MyPortalModal")
  );
};

export default Details;
