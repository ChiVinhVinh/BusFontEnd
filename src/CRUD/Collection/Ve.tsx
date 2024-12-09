import { AgGridReact } from 'ag-grid-react';
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import { ColDef, ICellRendererParams, GridApi } from 'ag-grid-community';
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';
import { useState, useEffect, useRef } from 'react';
import DeleteIcon from '@mui/icons-material/Delete';
import "ag-grid-community/styles/ag-grid.css"; // Mandatory CSS required by the Data Grid
import "ag-grid-community/styles/ag-theme-quartz.css";
import { Button, IconButton } from '@mui/material';

interface Ve {
  No: number;
  idVe: number;
  maghe: string;
  noidi: string;
  noiden: string;
  ngaydi: string;
  price: number;
}
const QuanlyVe = () => {
  const [rowData, setRowData] = useState<Ve[]>([]);
  const [editingRowIndex, setEditingRowIndex] = useState<number | null>(null);
  const gridApi = useRef<GridApi | null>(null);
  useEffect(() => {
    fetch("http://localhost:8080/quanlyve/")
      .then(res => res.json())
      .then(data => setRowData(data))
  }, [])
  const columnDefs: ColDef[] = [
    {
      field: "No",
      valueGetter: (params) => (params.node?.rowIndex != null ? params.node.rowIndex + 1 : ""),
      width: 150
    },
    {
      field: "Actions",
      cellRenderer: (params: ICellRendererParams) => (
        <>
          <IconButton onClick={() => handleEdit(params)} color='primary'>
            {editingRowIndex === params.node.rowIndex ? <SaveIcon /> : <EditIcon />}
          </IconButton>
          <IconButton onClick={() => handleDelete(params.data)} color='error'>
            <DeleteIcon></DeleteIcon>
          </IconButton>
        </>
      ),
      width: 150
    },
    {
      headerName: "Id Ve",
      field: "idVe",
      width: 150
    },

    {
      headerName: "Chỗ ngồi",
      field: "maghe",
      editable: true,
      width: 150
    },
    {
      headerName: "Info vé",
      field: "infoVe",
      cellRenderer: (params: ICellRendererParams) => {
        const infoVe = params.value;
        return (
          <span>Vé của lịch trình {infoVe}</span>
        )
      },
      flex: 1
    },
  ]
  const handleEdit = async (params: ICellRendererParams) => {
    const rowIndex = params.node.rowIndex;
    if (rowIndex != null) {
      if (editingRowIndex === rowIndex) {
        gridApi.current?.stopEditing();
        setEditingRowIndex(null);
        try {
          const updateData = params.node.data as Ve;
          const respone = await fetch(`http://localhost:8080/quanlyve/${updateData.idVe}`, {
            method: "PATCH",
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
        setEditingRowIndex(rowIndex);
        gridApi.current?.startEditingCell({
          rowIndex,
          colKey: "idVe",
        });
      }
    }
  };
  const handleDelete = async (data: Ve) => {
    try {
      const reponse = await fetch(`http://localhost:8080/quanlyve/${data.idVe}`, {
        method: "DELETE",
      })
      setRowData((prevData) => prevData.filter((row) => row.idVe !== data.idVe));
      setEditingRowIndex(null)
      if (reponse.ok) {
        console.log("Okkkkkkkkkkkkkkk")
      }
    }
    catch (error) {
      console.error("Faile deleted")
    }
  };
  const handleAdd = () => {
    setRowData((prevdata) => {
      const newdata: Ve = {
        No: 1,
        idVe: prevdata.length > 0 ? prevdata[prevdata.length - 1].idVe + 1 : 1,
        maghe: '',
        ngaydi: '',
        noidi: '',
        noiden: '',
        price: 0,
      }
      const updatedData = [newdata, ...prevdata.map((row, index) => ({
        ...row,
        No: index + 2,
      }))];
      return updatedData;
    })
    setEditingRowIndex(0);
    setTimeout(() => {
      gridApi.current?.startEditingCell({
        rowIndex: 0,
        colKey: 'noidi',
      });
    }, 0);
  }
  return (
    <div style={{ display: "flex", flexDirection: "column", width: "100vw", height: "83vh", overflow: "hidden", padding: "0px 20px" }}>
      <Button onClick={handleAdd} variant="contained" sx={{ width: "50px" }}>+ADD</Button>
      <div style={{ height: '100vh', width: '100vw', margin: 0, padding: 0, overflow: 'hidden' }}>
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
            }}
          />
        </div>
      </div>
    </div>
  );
};
export default QuanlyVe;