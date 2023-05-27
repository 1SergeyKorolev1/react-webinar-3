import { useCallback, useContext, useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import Main from "./main";
import Basket from "./basket";
// import NotFound from "../components/not-found";
import useStore from "../store/use-store";
import useSelector from "../store/use-selector";

/**
 * Приложение
 * @returns {React.ReactElement}
 */
function App() {
  const activeModal = useSelector((state) => state.modals.name);

  return (
    <>
      <Routes>
        <Route path="/*" element={<Main />} />
        {/* <Route path="*" element={<NotFound />} /> */}
      </Routes>
      element={activeModal === "basket" && <Basket />}
    </>
  );
}

export default App;
