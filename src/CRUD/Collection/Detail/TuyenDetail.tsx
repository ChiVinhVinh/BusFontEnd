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
import LocationStationEdit from '../ListLocation';
import ListLocation from '../ListLocation';
import AddListLocation from '../AddListLocation';
import Overlay from '../../OverLay';
interface Router {
    No: number,
    idLocation: number,
    trinhtu: number,
    Khoihanh: string,
    time: string
}
const QuanlyTuyenDetail = () => {

    const navigate = useNavigate();
    const [showListLocation, setShowListLocation] = useState(false);
    const [showAddListLocation, setShowAddListLocation] = useState(false);
    const [editingRowIndex, setEditingRowIndex] = useState<number | null>(null);
    const gridApi = useRef<GridApi | null>(null);
    const location = useLocation();
    const data = location.state?.data;
    const [rowData, setRowData] = useState<Router[]>(data.dstuyen);
    const [dsT, setDST] = useState();

    useEffect(() => {
        fetch('http://localhost:8080/quanlydd/')
            .then(res => res.json())
            .then(data => setDST(data))
    }, [])
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
            headerName: "Id location",
            field: "idLocation",
            flex: 1,
            editable: true
        },
        {
            headerName: "Trình tự",
            field: "trinhtu",
            flex: 1,
            editable: true
        },
        {
            headerName: "Name Station",
            field: "Khoihanh",
            flex: 1,
            editable: true
        }
        , {
            headerName: "Giờ",
            field: "time",
            flex: 1,
            editable: true
        }
    ], [editingRowIndex])
    const handleClosei = () => {
        setShowListLocation(false);
        setShowAddListLocation(false);
    };
    const handleEdit = async (params: ICellRendererParams) => {
        const rowIndex = params.node.rowIndex;
        console.log("kiemtraa edittt", editingRowIndex)
        if (rowIndex != null) {
            const currentEditingIndex = editingRowIndex;
            console.log("Current editing index:", currentEditingIndex);
            console.log("Row index:", rowIndex);
            if (editingRowIndex === rowIndex) {
                try {
                    gridApi.current?.stopEditing();
                    setEditingRowIndex(null);
                    console.log("rowindexrowindexrowindexrowindex", rowIndex)
                    const updateData = params.node.data as Router
                    console.log(",,,,,,,,,,,,,,,", updateData)
                    const respone = await fetch(`http://localhost:8080/quanlyt/${data.idTuyen}`, {
                        method: "PATCH",
                        headers: {
                            "Content-Type": 'application/json'
                        },
                        body: JSON.stringify(updateData)
                    });
                    if (!respone.ok) {
                        alert("Cập nhập không thành công")
                        setRowData(data.dstuyen)
                    }
                    else {
                        alert("Cập nhập thành công")
                    }
                } catch (error) {
                    console.error("Error updating", error)
                }
            } else {
                setShowListLocation(true)
                setEditingRowIndex(rowIndex);
            }
        }
    };
    const handleClose = () => {
        navigate("/crud");
    };
    const handleDelete = async (data2: Router) => {
        try {
            console.log("dsadsadsan", data2);
            const updatedData = rowData.filter((row) => row.trinhtu !== data2.trinhtu);
            console.log("aaaaaaaaaaaaaaaaaaaaaaaaaabbbb", updatedData)
            const reponse = await fetch(`http://localhost:8080/quanlyt/deleted/${data.idTuyen}`, {
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
    const handleAdd = (selectedLocation: any, selectedStation: string, selectedRoute: number, time: string) => {
        setRowData((prevdata) => {
            const newdata: Router = {
                No: 1,
                idLocation: selectedLocation.idlocation,
                Khoihanh: selectedStation,
                trinhtu: selectedRoute,
                time: time,
            }
            if (prevdata.length === 0) {
                return [newdata];
            }
            const updatedData = [newdata, ...prevdata.map((row, index) => ({
                ...row,
                No: index + 2,
            }))];
            return updatedData;
        })
        setEditingRowIndex(0);

        // setTimeout(() => {
        //     gridApi.current?.startEditingCell({
        //         rowIndex: 0,
        //         colKey: 'idLocation',
        //     });
        // }, 0);
    }
    const handleLocationSelect = (selectedLocation: any, selectedStation: string, selectedRoute: number, time: string) => {
        if (editingRowIndex !== null) {
            const updatedRowData = [...rowData];
            updatedRowData[editingRowIndex] = {
                ...updatedRowData[editingRowIndex],
                idLocation: selectedLocation.idlocation,
                Khoihanh: selectedStation,
                trinhtu: selectedRoute,
                time: time
            };
            setRowData(updatedRowData);
        }
    };
    return (
        <div style={{ display: "flex", flexDirection: "column", width: "100vw", height: "83vh", overflow: "hidden", padding: "0px 20px" }}>
            {showListLocation && <Overlay onClick={handleClosei} />}
            {showAddListLocation && <Overlay onClick={handleClosei} />}

            {showListLocation && (
                <ListLocation data={dsT} onClose={handleClosei} onLocationSelect={handleLocationSelect} />
            )}

            {showAddListLocation && (
                <AddListLocation data={dsT} onClose={handleClosei} onAdd={handleAdd} />
            )}
            <Stack direction="row" justifyContent="space-between" alignItems="center">
                <span style={{ fontSize: "16px", fontWeight: "bold", textTransform: "uppercase" }}>Thông tin chi tiết của Tuyến {data.idTuyen}</span>
                <IconButton onClick={handleClose} color="error" >
                    <CloseIcon />
                </IconButton>
            </Stack>
            <Button onClick={() => setShowAddListLocation(true)} variant="contained" sx={{ width: "50px" }}>+ADD</Button>
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
export default QuanlyTuyenDetail;