// DynamicTable.tsx
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
import { Button, IconButton, Stack } from '@mui/material';
import { useLocation, useNavigate } from "react-router-dom";
import { fetchData, updateData, deletedData, patchData } from '../../../response/reponse';
import CloseIcon from '@mui/icons-material/Close';
import Overlay from '../../OverLay';
import ListLocation from '../ListLocation';
import { columndsghe, columnStaion, columnTuyendetail, } from "./Detailcolumn"
interface DynamicTableProps {
    dataType: 'station' | 'tuyen' | 'dsghe';
    endpoint: string;
}
const TableDetail = ({ dataType, endpoint }: DynamicTableProps) => {

    const [editingRowIndex, setEditingRowIndex] = useState<number | null>(null);
    const gridApi = useRef<GridApi | null>(null);
    const navigate = useNavigate();
    const location = useLocation();
    const data = location.state?.data;
    const [rowData, setRowData] = useState<any[]>([]);
    const [dsT, setDST] = useState();
    const [showListLocation, setShowListLocation] = useState(false);

    useEffect(() => {
        switch (dataType) {
            case 'station':
                console.log("listsation", data)
                if (data && data.listStation) {
                    setRowData(
                        data.listStation.map((station: string, index: number) => ({
                            No: index + 1,
                            Station: station,
                        }))
                    );
                }
                break;
            case 'tuyen':
                fetch('http://localhost:8080/quanlydd/')
                    .then(res => res.json())
                    .then(data => setDST(data))
                setRowData(data.dstuyen);
                break;

            case 'dsghe':
                console.log("dataseattt", data)
                fetchData(`${endpoint}${data.idSeat}`)
                    .then(data => setRowData(data))
                    .catch(error => console.error("Fetch error:", error));
                break;
            default:
                break;
        }
    }, [endpoint]);
    const columns = useMemo(() => {
        switch (dataType) {
            case 'station':
                return columnStaion(editingRowIndex)
            case 'dsghe':
                return columndsghe(editingRowIndex)
            case 'tuyen':
                return columnTuyendetail(editingRowIndex);

            default:
                return [];
        }
    }, [dataType, editingRowIndex]);
    const handleEdit = async (params: ICellRendererParams) => {
        const rowIndex = params.node.rowIndex;
        if (rowIndex != null) {
            if (editingRowIndex === rowIndex) {
                gridApi.current?.stopEditing();
                setEditingRowIndex(null);
                try {
                    const updatedData1 = params.node.data;
                    switch (dataType) {
                        case 'station':
                            await patchData(`${endpoint}/${data.idlocation}`, updatedData1)
                            break;
                        case 'tuyen':
                            await patchData(`${endpoint}/${data.idTuyen}`, updatedData1)
                            break;
                        case 'dsghe':
                            await updateData(`${endpoint}/${updatedData1.idSeat}`, updatedData1)
                            break;
                    }
                } catch (error) {
                    console.error("Error updating", error);
                }
            } else {
                setEditingRowIndex(rowIndex);
                if (dataType === 'station' || dataType === 'dsghe')
                    gridApi.current?.startEditingCell({
                        rowIndex,
                        colKey: getEditColKey(dataType),
                    });
                else {
                    setShowListLocation(true)
                }
            }
        }
    };
    console.log(editingRowIndex)
    const getEditColKey = (dataType: string): string => {
        switch (dataType) {
            case 'station': return 'Station';
            case 'dsghe': return 'vitri'
            default: return '';
        }
    };
    const handleDelete = async (data2: any) => {
        try {
            switch (dataType) {
                case 'station':
                    const updatedData1 = rowData.filter((row) => row.Station !== data2);
                    await patchData(`${endpoint}/${data.idlocation}`, updatedData1)
                    setRowData(updatedData1);
                    setEditingRowIndex(null)
                    break;
                case 'tuyen':
                    const updatedData = rowData.filter((row) => row.trinhtu !== data2.trinhtu);
                    await patchData(`${endpoint}/${data.idTuyen}`, updatedData)
                    setRowData(updatedData);
                    setEditingRowIndex(null)
                    break;
                case 'dsghe':
                    await deletedData(`${endpoint}/${data2.idSeat}`)
                    setRowData((prevData) => prevData.filter((row) => row.idSeat !== data2.idSeat));
                    setEditingRowIndex(null);
                    break;
            }
        } catch (error) {
            console.error("Failed to delete", error);
        }
    };
    const handleAdd = (selectedLocation: any, selectedStation: string, selectedRoute: number, time: string) => {
        setRowData((prevData) => {
            let newData;
            switch (dataType) {
                case 'station':
                    newData = {
                        No: 1,
                        Station: ""
                    }
                    break;
                case 'tuyen':
                    newData = {
                        No: 1,
                        idLocation: selectedLocation.idlocation,
                        Khoihanh: selectedStation,
                        trinhtu: selectedRoute,
                        time: time,
                    }
                    break;
                case 'dsghe':
                    newData = {
                        No: 1,
                        ghe: "",
                        vitri: 0
                    }
                    break;
                default:
                    newData = {};
            }
            const updatedData = [newData, ...prevData.map((row, index) => ({
                ...row,
                No: index + 2,
            }))];
            return updatedData;
        });
        setEditingRowIndex(0);
        setTimeout(() => {
            gridApi.current?.startEditingCell({
                rowIndex: 0,
                colKey: getEditColKey(dataType),
            });
        }, 0);
    };
    const handleClose = () => {
        navigate("/crud");
    };
    const handleClosei = () => {
        setShowListLocation(false);
    };
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
    const typeshow = () => {
        switch (dataType) {
            case 'station':
                return (
                    <Stack direction="row" justifyContent="space-between" alignItems="center">
                        <span style={{ fontSize: "16px", fontWeight: "bold", textTransform: "uppercase" }}>Thông tin chi tiết của tỉnh {data.location}</span>
                        <IconButton onClick={handleClose} color="error" >
                            <CloseIcon />
                        </IconButton>
                    </Stack>
                )
            case 'tuyen':
                return (
                    <>
                        {showListLocation && <Overlay onClick={handleClosei} />}
                        {
                            showListLocation && (
                                <ListLocation data={dsT} onClose={handleClosei} onAdd={handleAdd} onLocationSelect={handleLocationSelect} />
                            )
                        }
                        <Stack direction="row" justifyContent="space-between" alignItems="center">
                            <span style={{ fontSize: "16px", fontWeight: "bold", textTransform: "uppercase" }}>Thông tin chi tiết của Tuyến {data.idTuyen}</span>
                            <IconButton onClick={handleClose} color="error" >
                                <CloseIcon />
                            </IconButton>
                        </Stack>
                    </>
                )
            case 'dsghe':
                return (
                    <Stack direction="row" justifyContent="space-between" alignItems="center">
                        <span style={{ fontSize: "16px", fontWeight: "bold", textTransform: "uppercase" }}>Thông tin chi tiết của xe</span>
                        <IconButton onClick={handleClose} color="error" >
                            <CloseIcon />
                        </IconButton>
                    </Stack>
                )
            default: return null;
        }
    }
    return (
        <div style={{ display: "flex", flexDirection: "column", width: "100vw", height: "83vh", overflow: "hidden", padding: "0px 20px" }}>
            {typeshow()}
            <Button onClick={() => setShowListLocation(true)} variant="contained" sx={{ width: "50px" }}>+ADD</Button>
            <div className="ag-theme-quartz" style={{ height: '100%', width: '100%' }}>
                <AgGridReact
                    rowData={rowData}
                    columnDefs={columns}
                    context={{
                        handleEdit: (params: ICellRendererParams) => handleEdit(params),
                        handleDelete: (data: any) => handleDelete(data),
                    }}
                    editType="fullRow"
                    pagination={true}
                    paginationPageSize={10}
                    paginationPageSizeSelector={[10, 25, 50]}
                    onGridReady={(params) => {
                        gridApi.current = params.api;
                    }}
                />
            </div>

        </div >
    );
};

export default TableDetail;
