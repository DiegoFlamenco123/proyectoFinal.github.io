import React from "react";
import {TiRefresh} from 'react-icons/all';

const Loading = () => (
<div className="absolute top-0 left-0 z-20 bg-gray-100 h-screen w-screen bg-opacity-50 flex justify-center items-center ">
    <TiRefresh className="stroke w-8 h-8 stroke animate-spin " />
</div>
);

export default Loading;