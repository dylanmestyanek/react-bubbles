import React, { useState, useEffect } from "react";

import { axiosWithAuth } from '../utils/axiosWithAuth'
import Bubbles from "./Bubbles";
import ColorList from "./ColorList";
import { checkPropTypes } from "prop-types";

const BubblePage = props => {
  const [colorList, setColorList] = useState([]);
  
  // Step 2A:
  // GET request when BubblePage loads
  // Set data response to `colorList` state
  useEffect(() => {
    axiosWithAuth().get("colors")
      .then(res => setColorList(res.data))
      .catch(err => console.log("You failed to grab the colors with your .GET call!", err))
  }, [])

  return (
    <>
      <ColorList colors={colorList} updateColors={setColorList} history={props.history} />
      <Bubbles colors={colorList} />
    </>
  );
};

export default BubblePage;
