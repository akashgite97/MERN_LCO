import React from "react";
import {API} from "../../backend";

const ImageHelper = ({product}) => {
  const imgurl = product
    ? `${API}/product/photo/${product._id}`
    : `https://cdn.pixabay.com/photo/2015/12/23/01/14/edit-1105049__340.png`;
  return (
    <div className="rounded border border-success p-2">
      <img
        src={imgurl}
        alt="photo"
        style={{maxHeight: "100%", maxWidth: "100%"}}
        className="mb-3 rounded"
      />
    </div>
  );
};

export default ImageHelper;
