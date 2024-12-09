import { useState, useEffect, useRef } from 'react';
import { AgGridReact } from 'ag-grid-react';
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';
import DeleteIcon from '@mui/icons-material/Delete';
import CloseIcon from '@mui/icons-material/Close';
import { ColDef, ICellRendererParams, GridApi } from 'ag-grid-community';
import "ag-grid-community/styles/ag-grid.css"; // Mandatory CSS required by the Data Grid
import "ag-grid-community/styles/ag-theme-quartz.css";
import { Button, IconButton } from '@mui/material';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import { useNavigate } from "react-router-dom";

interface TuyenDetail {
  No: number,
  idTuyen: number;
  tuyen: object[];
}

const QuanlyTuyen = () => {
  const [rowData, setRowData] = useState<TuyenDetail[]>([]);
  const [editingRowIndex, setEditingRowIndex] = useState<number | null>(null);

  const gridApi = useRef<GridApi | null>(null);
  const navigate = useNavigate();
  useEffect(() => {
    fetch("http://localhost:8080/quanlyt")
      .then(res => res.json())
      .then(data => setRowData(data))
  }, [])

  const columnDefs: ColDef[] = [
    {
      field: "No",
      valueGetter: (params) => (params.node?.rowIndex != null ? params.node.rowIndex + 1 : ""),
      flex: 0.5

    },
    {
      headerName: "ID Tuyen",
      field: "idTuyen",
      editable: true
    },
    {
      field: "Action",
      cellRenderer: (params: ICellRendererParams) => (
        <>
          <IconButton onClick={() => handleEdit(params)} color='primary'>
            {editingRowIndex === params.node.rowIndex ? <SaveIcon /> : <EditIcon />}
          </IconButton>
          <IconButton onClick={() => handleDelete(params.data)}>
            <DeleteIcon style={{ color: "red" }} />
          </IconButton>
          <IconButton onClick={() => handetail(params)}>
            <FormatListBulletedIcon style={{ color: 'green' }}></FormatListBulletedIcon>
          </IconButton>
        </>
      )
    },
    {
      headerName: "TuyenInFo",
      field: "dstuyen",
      cellRenderer: (params: ICellRendererParams) => {
        const tuyenLength = params.value ? params.value.length : 0;
        return (
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '4px'
            }}
          >
            <span style={{
              background: '#e3f2fd',
              padding: '2px 8px',
              borderRadius: '12px',
              color: '#1976d2'
            }}>
              {tuyenLength}
            </span>
            <span style={{ color: '#666' }}>tuyến</span>
          </div>
        )
      },
    },
  ]
  const handetail = async (params: ICellRendererParams) => {
    const data = params.node.data as TuyenDetail;

    console.log("dataa", data);
    navigate("/crud/dsRouterDetail", { state: { data } });
  }
  const handleEdit = async (params: ICellRendererParams) => {
    const rowIndex = params.node.rowIndex;
    if (rowIndex != null) {
      if (editingRowIndex === rowIndex) {
        gridApi.current?.stopEditing();
        setEditingRowIndex(null);

        try {
          const updateData = params.node.data as TuyenDetail;
          const respone = await fetch(`http://localhost:8080/quanlyt/${updateData.idTuyen}`, {
            method: "PUT",
            headers: {
              "Content-Type": 'application/json',
            },
            body: JSON.stringify(updateData)
          });
          if (!respone.ok) {
            throw new Error("Failt Update")
          }
        } catch (error) {
          console.error("Fail", error)
        }
      } else {
        setEditingRowIndex(rowIndex);
        gridApi.current?.startEditingCell({
          rowIndex,
          colKey: "idTuyen",
        });
      }
    }
  };
  const handleDelete = async (data: TuyenDetail) => {
    try {
      const reponse = await fetch(`http://localhost:8080/quanlyt/${data.idTuyen}`, {
        method: "DELETE",
      })
      if (reponse.ok) {
        setRowData((prevData) => prevData.filter((row) => row.idTuyen !== data.idTuyen))
      }
    } catch (error) { console.log("Fail deleted", error) }
  };
  const handleAdd = () => {
    setRowData((prevdata) => {
      const newdata: TuyenDetail = {
        No: 1,
        idTuyen: prevdata.length > 0 ? prevdata[prevdata.length - 1].idTuyen + 1 : 1,
        tuyen: []
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
        colKey: 'idTuyen',
      });
    }, 0);
  }
  return (
    <div style={{ display: "flex", flexDirection: "column", width: "100vw", height: "83vh", overflow: "hidden", padding: "0px 20px" }}>
      <Button onClick={handleAdd} variant="contained" sx={{ width: "50px" }}>+ADD</Button>
      <div style={{ height: '100vh', width: '100vw', margin: 0, padding: 0, position: 'relative' }}>
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
              params.api.sizeColumnsToFit();
            }}
          />
        </div>
      </div>
    </div>
  );
};
export default QuanlyTuyen;