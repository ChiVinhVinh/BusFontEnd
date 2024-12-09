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
interface Station {
    No: number,
    Station: string
}

const QuanlyStationDetail = () => {

    const navigate = useNavigate();
    const [editingRowIndex, setEditingRowIndex] = useState<number | null>(null);
    const gridApi = useRef<GridApi | null>(null);
    const location = useLocation();
    const data = location.state?.data;
    const [rowData, setRowData] = useState<Station[]>([]);
    useEffect(() => {
        if (data && data.listStation) {
            setRowData(
                data.listStation.map((station: string, index: number) => ({
                    No: index + 1,
                    Station: station,
                }))
            );
        }
    }, [data]);
    const coldata: ColDef[] = [

        {
            headerName: "Id location",
            field: "idlocation",
            flex: 1
        },
        {
            headerName: "Location",
            field: "location",
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
            field: "Station",
            headerName: "Station",
            flex: 5,
            editable: true,
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
                    const updateData = rowData.map((row) => row.Station);
                    console.log(",,,,,,,,,,,,,,,", updateData)
                    const respone = await fetch(`http://localhost:8080/quanlydd/${data.idlocation}`, {
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
                gridApi.current?.startEditingCell({
                    rowIndex,
                    colKey: "Station",
                });
                setEditingRowIndex(rowIndex);
            }
        }
    };
    const handleClose = () => {
        navigate("/crud");
    };
    const handleDelete = async (data2: string) => {
        try {
            const updatedData = rowData.filter((row) => row.Station !== data2);

            const reponse = await fetch(`http://localhost:8080/quanlydd/${data.idlocation}`, {
                method: "PATCH",

                headers: {
                    "Content-Type": 'application/json'
                },
                body: JSON.stringify(updatedData,)
            })
            setRowData(updatedData);
            setEditingRowIndex(null)
        }
        catch (error) {
            console.error("Faile deleted")
        }
    };
    const handleAdd = () => {
        setRowData((prevdata) => {
            const newdata: Station = {
                No: 1,
                Station: ""
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
                colKey: 'Station',
            });
        }, 0);
    }
    return (
        <div style={{ display: "flex", flexDirection: "column", width: "100vw", height: "83vh", overflow: "hidden", padding: "0px 20px" }}>
            <Stack direction="row" justifyContent="space-between" alignItems="center">
                <span style={{ fontSize: "16px", fontWeight: "bold", textTransform: "uppercase" }}>Thông tin chi tiết của Location</span>
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
            {/* <Button onClick={handleAdd} variant="contained" sx={{ width: "50px" }}>+ADD</Button> */}
            <Button onClick={handleAdd} variant="contained" sx={{ width: "50px" }}>+ADD</Button>
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
export default QuanlyStationDetail;