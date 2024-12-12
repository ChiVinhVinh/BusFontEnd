import { Button, Stack } from "@mui/material";
import { useState } from "react";
import { Link, Route, Routes } from "react-router-dom";
// import QuanlySeatDetail from "./Collection/Detail/dsgheDetail";
// import QuanlyStationDetail from "./Collection/Detail/StationDetail";
// import QuanlyTuyenDetail from "./Collection/Detail/TuyenDetail";
import DynamicTable from "./Collection/DyTable";
import { columnDiaDiem, columnPrice, columnTuyen, columnlichtrinh, columnVeTuyen, columnsVe, columnsXe } from "./Collection/typeColumn";
import TableDetail from "./Collection/Detail/TypeDetail";
import { columndsghe, columnStaion, columnTuyendetail, } from "./Collection/Detail/Detailcolumn"
const CRUD = () => {
  const [selectQuanly, setSelectQuanly] = useState({
    selectVe: false,
    selecXe: false,
    selectTuyen: false,
    selectDiaDiem: false,
    selectLichTrinh: false,
    selectVt: false,
    selectPrice: false
  });
  const [typebuton, setTypebutton] = useState("");
  const handleClick = (key: string) => {
    setSelectQuanly({
      selectVe: false,
      selecXe: false,
      selectTuyen: false,
      selectDiaDiem: false,
      selectLichTrinh: false,
      selectVt: false,
      selectPrice: false,
      [key]: true,
    });
    setTypebutton(key);
  };
  return (
    <Stack direction="column" spacing={2} alignItems="center">
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        width="100%"
        sx={{
          backgroundImage: `url("https://futabus.vn/images/banners/home_banner.png")`,
        }}
      >
        <Stack direction="row" spacing={10} sx={{ padding: "50px" }}>
          {["selecXe", "selectDiaDiem", "selectTuyen", "selectLichTrinh", "selectVe", "selectVt", "selectPrice"].map((buttonType) => (
            <Button
              key={buttonType}
              size="large"
              sx={{
                color: "white",
                fontSize: "16px",
                fontWeight: typebuton === buttonType ? "bold" : "none",
                textDecoration: "none",
                position: "relative",
              }}
              onClick={() => handleClick(buttonType)}
            >
              {buttonType === "selecXe" && "Quản lý xe"}
              {buttonType === "selectDiaDiem" && "Quản lý địa điểm"}
              {buttonType === "selectTuyen" && "Quản lý tuyến"}
              {buttonType === "selectLichTrinh" && "Quản lý Lịch trình"}
              {buttonType === "selectVe" && "Quản lý vé"}
              {buttonType === "selectVt" && "Quản lý Xe_Tuyến"}
              {buttonType === "selectPrice" && "Quản lý Giá"}
              <span
                style={{
                  position: "absolute",
                  bottom: "-2px",
                  left: 0,
                  right: 0,
                  height: "5px",
                  backgroundColor: typebuton === buttonType ? "white" : "transparent",
                }}
              />
            </Button>
          ))}
        </Stack>

        <Link
          to="/"
          style={{
            width: "150px",
            textTransform: "uppercase",
            fontSize: "16px",
            fontWeight: "bold",
          }}
        >
          Trang chủ
        </Link>
      </Stack>
      <Routes>
        <Route
          path="/"
          element={
            <>
              {selectQuanly.selecXe && <DynamicTable dataType="xe" endpoint="http://localhost:8080/quanlyxe" />}
              {selectQuanly.selectDiaDiem && <DynamicTable dataType="diadiem" endpoint="http://localhost:8080/quanlydd" />}
              {selectQuanly.selectLichTrinh && <DynamicTable dataType="lichtrinh" endpoint="http://localhost:8080/quanlylt" />}
              {selectQuanly.selectTuyen && <DynamicTable dataType="tuyen" endpoint="http://localhost:8080/quanlyt" />}
              {selectQuanly.selectVe && <DynamicTable dataType="ve" endpoint="http://localhost:8080/quanlyve" />}
              {selectQuanly.selectVt && <DynamicTable dataType="vetuyen" endpoint="http://localhost:8080/quanlyve_tuyen" />}
              {selectQuanly.selectPrice && <DynamicTable dataType="price" endpoint="http://localhost:8080/quanlyprice" />}
            </>
          }
        />
        <Route path="dsghedetail" element={<TableDetail dataType="dsghe" column={columndsghe(null)} endpoint="http://localhost:8080/quanlyseat/" />} />
        <Route path="dsStationDetail" element={<TableDetail dataType="station" column={columnStaion(null)} endpoint="http://localhost:8080/quanlydd/" />} />
        <Route path="dsRouterDetail" element={<TableDetail dataType="tuyen" column={columnTuyendetail(null)} endpoint="http://localhost:8080/quanlyt/" />} />
      </Routes>
    </Stack>
  );
};
export default CRUD;