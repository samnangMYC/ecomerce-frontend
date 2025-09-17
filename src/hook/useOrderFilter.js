import { useDispatch } from "react-redux";
import { useSearchParams } from "react-router-dom";
import { getOrdersForDashboard } from "../store/actions";
import { useEffect } from "react";



export const useOrderFilter = () => {
  const [searchParams] = useSearchParams();
  const dispatch = useDispatch();

  useEffect(() => {
    const params = new URLSearchParams();

    const currentPage = searchParams.get("page")
      ? Number(searchParams.get("page"))
      : 1;

    params.set("pageNumber", currentPage - 1);
    params.set("sortOrder","desc");

    const queryString = params.toString();
    console.log("Query String: " + queryString);

   dispatch(getOrdersForDashboard(queryString));

  }, [dispatch, searchParams]);
};
