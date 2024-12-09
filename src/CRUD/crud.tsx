import { Button, Stack } from "@mui/material";
import QuanlyLichTrinh from "./Collection/lichtrinh";
import { useState } from "react";
import QuanlyVe from "./Collection/Ve";
import QuanlyXe from "./Collection/Xe";
import Quanlydiadiem from "./Collection/diadiem";
import QuanlyTuyen from "./Collection/Tuyen";
import { Link, Route, Routes } from "react-router-dom";
import QuanlySeatDetail from "./Collection/Detail/dsgheDetail";
import QuanlyStationDetail from "./Collection/Detail/StationDetail";
import QuanlyTuyenDetail from "./Collection/Detail/TuyenDetail";
import QuanlyVe_Tuyen from "./Collection/Ve_Tuyen";
import QuanlyPrice from "./Collection/Price";

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
              {selectQuanly.selecXe && <QuanlyXe />}
              {selectQuanly.selectDiaDiem && <Quanlydiadiem />}
              {selectQuanly.selectLichTrinh && <QuanlyLichTrinh />}
              {selectQuanly.selectTuyen && <QuanlyTuyen />}
              {selectQuanly.selectVe && <QuanlyVe />}
              {selectQuanly.selectVt && <QuanlyVe_Tuyen></QuanlyVe_Tuyen>}
              {selectQuanly.selectPrice && <QuanlyPrice></QuanlyPrice>}
            </>
          }
        />
        <Route path="dsghedetail" element={<QuanlySeatDetail />} />
        <Route path="dsStationDetail" element={<QuanlyStationDetail />} />
        <Route path="dsRouterDetail" element={<QuanlyTuyenDetail></QuanlyTuyenDetail>} />
      </Routes>
    </Stack>
  );
};

export default CRUD;
