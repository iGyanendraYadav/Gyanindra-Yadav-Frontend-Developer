import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";

const Details = () => {
  const [spaceX, setSpaceX] = useState([]);
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState("status");
  const [popup, setPopup] = useState(false);

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
          onClick={() => setPopup(false)}
          className="wrapper fixed top-0 left-0 right-0 bottom-0 bg-indigo-300 opacity-80"
        >
          <div className="popup-box fixed top-[50%] left-[50%] -translate-x-2/4 -translate-y-2/4 p-5 bg-white rounded-xl">
            <h3 className="text-gray-700 text-lg lg:text-xl font-bold tracking-widest uppercase text-center">
              Key Notes
            </h3>
            <p>
              Lorem, ipsum dolor sit amet consectetur adipisicing elit. Incidunt
              minus excepturi, eaque consectetur autem aspernatur molestiae
              sequi at ut, qui eos tempora quos hic quas odio odit maiores
              deserunt mollitia, aliquid dolorum doloribus cupiditate. Aut?
            </p>
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
        console.log(data);
      });
  };

  useEffect(() => {
    fetchData();
  }, []);

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
                    onClick={() => setPopup(true)}
                    key={i}
                    id={one.capsule_serial}
                    className="  flex flex-col bg-gray-100 text-gray-700 text-lg shadow-lg border border-gray-300  hover:shadow-xl justify-start items-start  rounded-tl-3xl rounded-br-3xl p-5"
                  >
                    <h4>
                      <span className="uppercase ">Serial : </span>
                      {one.capsule_serial}
                    </h4>
                    <h4>
                      <span className="uppercase ">ID : </span>
                      {one.capsule_id}
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
      </div>
    </>,
    document.querySelector(".MyPortalModal")
  );
};

export default Details;
