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
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import { useNavigate } from "react-router-dom";
interface diadiem {
  No: number;
  idlocation: number;
  location: string;
  listStaion: string[];
}
const Quanlydiadiem = () => {
  const [rowData, setRowData] = useState<diadiem[]>([]);
  const [editingRowIndex, setEditingRowIndex] = useState<number | null>(null);
  const gridApi = useRef<GridApi | null>(null);
  const navigate = useNavigate();
  useEffect(() => {
    fetch('http://localhost:8080/quanlydd/')
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
      headerName: "Id location",
      field: "idlocation",
      flex: 1
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
          <IconButton onClick={() => handetail(params)}>
            <FormatListBulletedIcon style={{ color: 'green' }}></FormatListBulletedIcon>
          </IconButton>
        </>
      ),
      flex: 1
    },
    {
      headerName: "Location",
      field: "location",
      editable: true,
      flex: 1
    },
    {
      headerName: "Station",
      field: "listStation",
      cellRenderer: (params: ICellRendererParams) => {
        const length = params.value ? params.value.length : 0;
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
              {length}
            </span>
            <span style={{ color: '#666' }}>Station</span>
          </div>
        )
      }
    }
  ]
  const handetail = async (params: ICellRendererParams) => {
    const data = params.node.data as diadiem;

    console.log("dataa", data);
    navigate("/crud/dsStationDetail", { state: { data } });
  }
  console.log("sssssssssssss", rowData)
  const handleEdit = async (params: ICellRendererParams) => {
    const rowIndex = params.node.rowIndex;
    if (rowIndex != null) {
      if (editingRowIndex === rowIndex) {
        gridApi.current?.stopEditing();
        setEditingRowIndex(null);
        try {
          const updateData = params.node.data as diadiem;
          const respone = await fetch(`http://localhost:8080/quanlydd/${updateData.idlocation}`, {
            method: "PUT",
            headers: {
              "Content-Type": 'application/json'
            },
            body: JSON.stringify(updateData)
          });
          console.log("xxxxxxxxxxxxxxxxxxx", updateData)
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
          colKey: "idlocation",
        });
      }
    }
  };
  const handleDelete = async (data: diadiem) => {
    try {
      const reponse = await fetch(`http://localhost:8080/quanlydd/${data.idlocation}`, {
        method: "DELETE",
      })
      setRowData((prevData) => prevData.filter((row) => row.idlocation !== data.idlocation));
      setEditingRowIndex(null)
      if (reponse.ok) {
        console.log("Okkkkkkkkkkkk")
      }
    }
    catch (error) {
      console.error("Faile deleted")
    }
  };
  const handleAdd = () => {
    // setRowData((prevdata) => {
    //   const newdata: diadiem = {
    //     No: 1,
    //     idlocation: prevdata.length > 0 ? prevdata[prevdata.length - 1].idlocation + 1 : 1,
    //     location: "",
    //   }
    //   const updatedData = [newdata, ...prevdata.map((row, index) => ({
    //     ...row,
    //     No: index + 2,
    //   }))];
    //   return updatedData;
    // })
    // setEditingRowIndex(0);
    // setTimeout(() => {
    //   gridApi.current?.startEditingCell({
    //     rowIndex: 0,
    //     colKey: 'location',
    //   });
    // }, 0);
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
            paginationPageSize={16}
            paginationPageSizeSelector={[30, 50, 90]}
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
export default Quanlydiadiem;