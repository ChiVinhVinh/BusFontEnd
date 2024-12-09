import { AgGridReact } from 'ag-grid-react';
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import { ColDef, ICellRendererParams, GridApi } from 'ag-grid-community';
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';
import { useState, useEffect, useRef, useMemo } from 'react';
import DeleteIcon from '@mui/icons-material/Delete';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import "ag-grid-community/styles/ag-grid.css"; // Mandatory CSS required by the Data Grid
import "ag-grid-community/styles/ag-theme-quartz.css";
import { Button, IconButton } from '@mui/material';
import QuanlySeatDetail from './Detail/dsgheDetail';
import { useNavigate } from "react-router-dom";
interface Xe {
  No: number
  idXe: number;
  dsghe: string[];
  Loaixe: string;
}
const QuanlyXe = () => {
  const [rowData, setRowData] = useState<Xe[]>([]);
  const [editingRowIndex, setEditingRowIndex] = useState<number | null>(null);
  const gridApi = useRef<GridApi | null>(null);
  const navigate = useNavigate();
  useEffect(() => {
    fetch('http://localhost:8080/quanlyxe/')
      .then(res => res.json())
      .then(data => setRowData(data))
  }, [])

  const columnDefs = useMemo<ColDef[]>(() => [
    {
      field: "No",
      valueGetter: (params) => (params.node?.rowIndex != null ? params.node.rowIndex + 1 : ""),
      flex: 0.5
    },
    {
      headerName: "Id xe",
      field: "idXe",
      width: 150,
      headerClass: "header-center"
    },
    {
      field: "Actions",
      cellRenderer: (params: ICellRendererParams) => (
        <>
          <IconButton
            onClick={() => handleEdit(params)}
            color="primary"
          >
            {editingRowIndex === params.node.rowIndex ? <SaveIcon /> : <EditIcon />}
          </IconButton>
          <IconButton onClick={() => handleDelete(params.data)} color='error'>
            <DeleteIcon></DeleteIcon>
          </IconButton>
          <IconButton onClick={() => handetail(params)}>
            <FormatListBulletedIcon style={{ color: 'green' }}></FormatListBulletedIcon>
          </IconButton>
        </>
      ),
      width: 200,
      headerClass: "header-center"
    },
    {
      headerName: "Loại xe",
      field: "Loaixe",
      editable: true,
      flex: 1,
      headerClass: "header-center"
    },
    {
      headerName: "Tài xế",
      field: "TaiXe",
      editable: true,
      flex: 1,
      headerClass: "header-center"
    },
    {
      headerName: "Biển số xe",
      field: "BienXe",
      editable: true,
      flex: 1,
      headerClass: "header-center"
    }
  ], [editingRowIndex])
  useEffect(() => {
    if (editingRowIndex !== null) {
      console.log("editingRowIndex đã thay đổi:", editingRowIndex);
    }
  }, [editingRowIndex]);
  const handetail = async (params: ICellRendererParams) => {
    const data = params.node.data as Xe;
    console.log("dataa", data);
    navigate("/crud/dsghedetail", { state: { data } });
  }
  const handleEdit = async (params: ICellRendererParams) => {
    const rowIndex = params.node.rowIndex;
    console.log("kiemtraa edittt", editingRowIndex)
    if (rowIndex != null) {
      const currentEditingIndex = editingRowIndex;
      console.log("Current editing index:", currentEditingIndex);
      console.log("Row index:", rowIndex);
      if (editingRowIndex === rowIndex) {
        try {
          console.log("rowindexrowindexrowindexrowindex", rowIndex)
          console.log("Saving changes...");
          gridApi.current?.stopEditing();
          setEditingRowIndex(null);
          console.log("rowindexrowindexrowindexrowindex", rowIndex)
          const updateData = params.node.data as Xe;
          const respone = await fetch(`http://localhost:8080/quanlyxe/${updateData.idXe}`, {
            method: "PUT",
            headers: {
              "Content-Type": 'application/json'
            },
            body: JSON.stringify(updateData)
          });
          if (!respone.ok) {
            throw new Error("Fail update")
          }
        } catch (error) {
          console.error("Error updating", error)
        }
      } else {
        gridApi.current?.startEditingCell({
          rowIndex,
          colKey: "Loaixe",
        });
        setEditingRowIndex(rowIndex);
      }
    }
  };
  const handleDelete = async (data: Xe) => {
    try {
      console.log("deletedfddddddd", data)
      const reponse = await fetch(`http://localhost:8080/quanlyxe/${data.idXe}`, {
        method: "DELETE",
      })

      setRowData((prevData) => prevData.filter((row) => row.idXe !== data.idXe));
      setEditingRowIndex(null)
    }
    catch (error) {
      console.error("Faile deleted")
    }
  };
  const handleAdd = () => {

    setRowData((prevData) => {
      const newRowData: Xe = {
        No: 1,
        idXe: prevData.length > 0 ? prevData[prevData.length - 1].idXe + 1 : 1,
        dsghe: prevData[0].dsghe,
        Loaixe: "",
      };
      const updatedData = [newRowData, ...prevData.map((row, index) => ({
        ...row,
        No: index + 2,
      }))];
      return updatedData;
    });
    setEditingRowIndex(0);
    setTimeout(() => {
      gridApi.current?.startEditingCell({
        rowIndex: 0,
        colKey: 'Loaixe',
      });
    }, 0);
  };
  return (
    <div style={{ display: "flex", flexDirection: "column", width: "100vw", height: "83vh", overflow: "hidden", padding: "0px 20px" }}>
      <Button onClick={handleAdd} variant="contained" sx={{ width: "50px" }}>+ADD</Button>
      <div className="ag-theme-quartz" style={{ height: '100%', width: '100%' }}>
        <AgGridReact
          rowData={rowData}
          columnDefs={columnDefs}
          editType="fullRow"
          pagination={true}
          paginationPageSize={10}
          paginationPageSizeSelector={[10, 25, 50]}
          onGridReady={(params) => {
            gridApi.current = params.api;
            // params.api.sizeColumnsToFit();
          }}
        />
      </div>
    </div >
  );
};
export default QuanlyXe;