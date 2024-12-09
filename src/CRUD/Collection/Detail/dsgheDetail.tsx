import { AgGridReact } from 'ag-grid-react';
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import { ColDef, ICellRendererParams, GridApi } from 'ag-grid-community';
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';
import { useState, useEffect, useRef, useMemo } from 'react';
import DeleteIcon from '@mui/icons-material/Delete';
import "ag-grid-community/styles/ag-grid.css"; // Mandatory CSS required by the Data Grid
import "ag-grid-community/styles/ag-theme-quartz.css";
import { Button, IconButton, Stack } from '@mui/material';
import { useLocation } from 'react-router-dom';
import CloseIcon from '@mui/icons-material/Close';
import { useNavigate } from 'react-router-dom';
interface Seat {
    No: number,
    idSeat: number,
    dsghe: string[];
}

const QuanlySeatDetail = () => {
    const [rowData, setRowData] = useState<Seat[]>([]);
    const navigate = useNavigate();
    const [editingRowIndex, setEditingRowIndex] = useState<number | null>(null);
    const gridApi = useRef<GridApi | null>(null);
    const location = useLocation();
    const data = location.state?.data;
    useEffect(() => {
        console.log(`Fetching from URL: http://localhost:8080/quanlyseat/${data?.idSeat}`);
        fetch(`http://localhost:8080/quanlyseat/${data.idSeat}`)
            .then(res => res.json())
            .then(data => setRowData(data))
    }, [])
    console.log("rowDatarowDatarowDatarowData", rowData);
    const coldata: ColDef[] = [

        {
            headerName: "Id xe",
            field: "idXe",
            flex: 1
        },
        {
            headerName: "Loại xe",
            field: "Loaixe",
            flex: 1
        }
    ]
    const columnDefs = useMemo<ColDef[]>(() => [
        {
            field: "No",
            valueGetter: (params) => (params.node?.rowIndex != null ? params.node.rowIndex + 1 : ""),
            flex: 0.5
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
                </>
            ),
            width: 200,
            headerClass: "header-center"
        },
        {
            headerName: "Mã ghế",
            field: "ghe",
            flex: 5,
            headerClass: "header-center",
            editable: true
        },
        {
            headerName: "Vị trí",
            field: "vitri",
            flex: 5,
            headerClass: "header-center",
            editable: true
        },
    ], [editingRowIndex])
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
                    const updateData = params.node.data as Seat;
                    const respone = await fetch(`http://localhost:8080/quanlySeat/${updateData.idSeat}`, {
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
                    colKey: "vitri",
                });
                setEditingRowIndex(rowIndex);
            }
        }
    };
    const handleClose = () => {
        navigate("/crud");
    };
    const handleDelete = async (data: Seat) => {
        try {
            const reponse = await fetch(`http://localhost:8080/quanlySeat/${data.idSeat}`, {
                method: "DELETE",
            })
            setRowData((prevData) => prevData.filter((row) => row.idSeat !== data.idSeat));
            setEditingRowIndex(null)
        }
        catch (error) {
            console.error("Faile deleted")
        }
    };
    return (
        <div style={{ display: "flex", flexDirection: "column", width: "100vw", height: "83vh", overflow: "hidden", padding: "0px 20px" }}>
            <Stack direction="row" justifyContent="space-between" alignItems="center">
                <span style={{ fontSize: "16px", fontWeight: "bold", textTransform: "uppercase" }}>Thông tin chi tiết của xe</span>
                <IconButton onClick={handleClose} color="error" >
                    <CloseIcon />
                </IconButton>
            </Stack>
            <div className="ag-theme-quartz" style={{ height: '20%', width: '100%' }}>
                <AgGridReact
                    rowData={[data]}
                    columnDefs={coldata}
                    domLayout="autoHeight"
                />
            </div>
            <div className="ag-theme-quartz" style={{ height: '100%', width: '100%' }}>
                <AgGridReact
                    rowData={rowData}
                    columnDefs={columnDefs}
                    editType="fullRow"
                    pagination={true}
                    paginationPageSize={13}
                    paginationPageSizeSelector={[13, 26, 39]}
                    onGridReady={(params) => {
                        gridApi.current = params.api;
                        // params.api.sizeColumnsToFit();
                    }}
                />
            </div>
        </div >
    );
};
export default QuanlySeatDetail;