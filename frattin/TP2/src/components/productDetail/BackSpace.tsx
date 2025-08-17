import { ArrowUturnLeftIcon } from "@heroicons/react/24/outline";
import { useNavigate } from "react-router-dom";

import "./productDetail.css";

export default function BackSpace() {
  const navigate = useNavigate();

  function pageReturn() {
    navigate("/");
  }

  return (
    <button className="back-space" onClick={pageReturn}>
      <ArrowUturnLeftIcon className="w-full h-full text-gray-700" />
    </button>
  );
}
