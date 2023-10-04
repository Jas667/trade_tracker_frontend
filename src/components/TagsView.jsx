import React from "react";
import { useGlobalState } from "../../context/GlobalStateContext";
import GrossNetButton from "./GrossNetButton";
import { useState } from "react";

const TagsView = ({ rawTradeData }) => {
      const { radioValue, setRadioValue } = useGlobalState();
      
      const [statsForTags, setStatsForTags] = useState([]);

  return (
    <>
      <GrossNetButton radioValue={radioValue} setRadioValue={setRadioValue} />
      <div>TagsView</div>
    </>
  );
};

export default TagsView;
