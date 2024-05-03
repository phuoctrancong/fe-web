import React, { useState } from "react";
import SweetAlert2 from "react-sweetalert2";
const Swall = ({ title, text, isShow }) => {
  const [swalProps, setSwalProps] = useState({});
  return (
    <div>
      <button
        onClick={() => {
          setSwalProps({
            show: isShow,
            title: title,
            text: text,
          });
        }}
      >
        Open
      </button>
      <SweetAlert2 {...swalProps} />
    </div>
  );
};

export default Swall;
