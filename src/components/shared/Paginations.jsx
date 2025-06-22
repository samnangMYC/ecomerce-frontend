import Pagination from "@mui/material/Pagination";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";

const Paginations = ({ numberOfPage, totalProducts }) => {
  const [searchParams] = useSearchParams();
  const location = useLocation();
  const params = new URLSearchParams(searchParams);
  const navigate = useNavigate();

  const paramValue = searchParams.get("page")
    ? Number(searchParams.get("page"))
    : 1;

  const onChangeHandler = (e, value) => {
    params.set("page", value.toString());
    navigate(`${location.pathname}?${params.toString()}`);
  };

  return (
    <div>
      <Pagination
        count={numberOfPage}
        page={paramValue}
        defaultPage={1}
        siblingCount={0}
        boundaryCount={2}
        shape="rounded"
        color="primary"
        onChange={onChangeHandler}
      />
    </div>
  );
};

export default Paginations;
