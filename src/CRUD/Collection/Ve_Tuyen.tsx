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

interface ve_tuyen {
    No: number,
    idXe: number,
    idTuyen: number,
    idPrice: number,
    idXT: number
}
const QuanlyVe_Tuyen = () => {
    const [rowData, setRowData] = useState<ve_tuyen[]>([]);
    const [editingRowIndex, setEditingRowIndex] = useState<number | null>(null);
    const gridApi = useRef<GridApi | null>(null);
    useEffect(() => {
        fetch("http://localhost:8080/quanlyve_tuyen/")
            .then(res => res.json())
            .then(data => setRowData(data))
    }, [])
    const columnDefs: ColDef[] = [
        {
            field: "No",
            valueGetter: (params) => (params.node?.rowIndex != null ? params.node.rowIndex + 1 : ""),
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
                </>
            ),
            width: 150
        },
        {
            headerName: "Id Xe_Tuyến",
            field: "idXT",
            editable: true,
            flex: 1
        },
        {
            headerName: "Id Xe",
            field: "idXe",
            editable: true,
            flex: 1
        },
        {
            headerName: "Id Tuyến",
            field: "idTuyen",
            editable: true,
            flex: 1
        },
        {
            headerName: "Id Giá",
            field: "idPrice",
            editable: true,
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
                    const updateData = params.node.data as ve_tuyen;
                    const respone = await fetch(`http://localhost:8080/quanlyve_tuyen/${updateData.idXT}`, {
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
                setEditingRowIndex(rowIndex);
                gridApi.current?.startEditingCell({
                    rowIndex,
                    colKey: "idVe",
                });
            }
        }
    };
    const handleDelete = async (data: ve_tuyen) => {
        try {
            const reponse = await fetch(`http://localhost:8080/quanlyve_tuyen/${data.idXT}`, {
                method: "DELETE",
            })
            setRowData((prevData) => prevData.filter((row) => row.idXT !== data.idXT));
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
            const newdata: ve_tuyen = {
                No: 1,
                idXT: prevdata.length > 0 ? prevdata[prevdata.length - 1].idXT + 1 : 1,
                idPrice: 1,
                idTuyen: 1,
                idXe: 1
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
                colKey: 'idXT',
            });
        }, 0);
    }
    return (
        <div style={{ display: "flex", flexDirection: "column", width: "100vw", height: "83vh", overflow: "hidden", padding: "0px 30px" }}>
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
                            params.api.sizeColumnsToFit();
                        }}
                    />
                </div>
            </div>
        </div>
    );
};
export default QuanlyVe_Tuyen;