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
import { Button, IconButton } from '@mui/material';
import { useNavigate } from "react-router-dom";
import { fetchData, updateData, deletedData, patchData } from '../../response/reponse';
import { columnDiaDiem, columnlichtrinh, columnPrice, columnsVe, columnsXe, columnTuyen, columnVeTuyen } from './typeColumn';

interface DynamicTableProps {
    dataType: 'xe' | 've' | 'vetuyen' | 'tuyen' | 'price' | 'lichtrinh' | 'diadiem';
    column: ColDef[];
    endpoint: string;
}

const DynamicTable = ({ dataType, column, endpoint }: DynamicTableProps) => {
    const [rowData, setRowData] = useState<any[]>([]);
    const [editingRowIndex, setEditingRowIndex] = useState<number | null>(null);
    const gridApi = useRef<GridApi | null>(null);
    const navigate = useNavigate();

    useEffect(() => {
        fetchData(endpoint)
            .then(data => setRowData(data))
            .catch(error => console.error("Fetch error:", error));
    }, [endpoint]);
    console.log("uuuuuuuuuuuuuuuuuuuuuu", endpoint)
    const handleEdit = async (params: ICellRendererParams) => {
        const rowIndex = params.node.rowIndex;
        if (rowIndex != null) {
            if (editingRowIndex === rowIndex) {
                gridApi.current?.stopEditing();
                setEditingRowIndex(null);
                try {
                    const updatedData1 = params.node.data;
                    switch (dataType) {
                        case 've':
                            await updateData(`${endpoint}/${updatedData1.idVe}`, updatedData1)
                            break;
                        case 'diadiem':
                            await updateData(`${endpoint}/${updatedData1.idLocation}`, updatedData1)
                            break;
                        case 'lichtrinh':
                            await updateData(`${endpoint}/${updatedData1.idLichTrinh}`, updatedData1)
                            break;
                        case 'price':
                            await updateData(`${endpoint}/${updatedData1.idPrice}`, updatedData1)
                            break;
                        case 'tuyen':
                            await updateData(`${endpoint}/${updatedData1.idTuyen}`, updatedData1)
                            break;
                        case 'vetuyen':
                            await updateData(`${endpoint}/${updatedData1.idXT}`, updatedData1)
                            break;
                        case 'xe':
                            await updateData(`${endpoint}/${updatedData1.idXe}`, updatedData1)
                            break;
                    }
                } catch (error) {
                    console.error("Error updating", error);
                }
            } else {
                setEditingRowIndex(rowIndex);
                gridApi.current?.startEditingCell({
                    rowIndex,
                    colKey: getEditColKey(dataType),
                });
            }
        }
    };
    console.log(editingRowIndex)
    const getEditColKey = (dataType: string): string => {
        switch (dataType) {
            case 'xe': return 'Loaixe';
            case 've': return 'maghe';
            case 'tuyen': return 'idTuyen';
            case 'price': return 'idPrice';
            case 'lichtrinh': return 'idLichTrinh';
            case 'diadiem': return 'location';
            case 'vetuyen': return 'idTuyen'
            default: return '';
        }
    };
    const handleDelete = async (data: any) => {
        try {
            switch (dataType) {
                case 'xe':
                    await deletedData(`${endpoint}/${data.idXe}`)
                    setRowData((prevData) => prevData.filter((row) => row.idXe !== data.idXe));
                    setEditingRowIndex(null);
                    break;
                case 've':
                    await deletedData(`${endpoint}/${data.idVe}`)
                    setRowData((prevData) => prevData.filter((row) => row.idVe !== data.idVe));
                    setEditingRowIndex(null)
                    break;
                case 'vetuyen':
                    await deletedData(`${endpoint}/${data.idXT}`)
                    setRowData((prevData) => prevData.filter((row) => row.idXT !== data.idXT));
                    setEditingRowIndex(null)
                    break;
                case 'tuyen':
                    await deletedData(`${endpoint}/${data.idTuyen}`)
                    setRowData((prevData) => prevData.filter((row) => row.idTuyen !== data.idTuyen));
                    setEditingRowIndex(null)
                    break;
                case 'price':
                    await deletedData(`${endpoint}/${data.idPrice}`)
                    setRowData((prevData) => prevData.filter((row) => row.idPrice !== data.idPrice));
                    setEditingRowIndex(null)
                    break;
                case 'lichtrinh':
                    await deletedData(`${endpoint}/${data.idLichTrinh}`)
                    setRowData((prevData) => prevData.filter((row) => row.idLichTrinh !== data.idLichTrinh));
                    setEditingRowIndex(null)
                    break;
                case 'diadiem':
                    await deletedData(`${endpoint}/${data.idlocation}`)
                    setRowData((prevData) => prevData.filter((row) => row.idlocation !== data.idlocation));
                    setEditingRowIndex(null)
                    break;
            }
        } catch (error) {
            console.error("Failed to delete", error);
        }
    };
    const columns = useMemo(() => {
        switch (dataType) {
            case 'xe':
                return columnsXe(editingRowIndex);
            case 've':
                return columnsVe(editingRowIndex);
            case 'tuyen':
                return columnTuyen(editingRowIndex);
            case 'diadiem':
                return columnDiaDiem(editingRowIndex);
            case 'vetuyen':
                return columnVeTuyen(editingRowIndex);
            case 'price':
                return columnPrice(editingRowIndex);
            case 'lichtrinh':
                return columnlichtrinh(editingRowIndex);
            default:
                return [];
        }
    }, [dataType, editingRowIndex]);
    const handleAdd = () => {
        setRowData((prevData) => {
            let newData;
            switch (dataType) {
                case 'xe':
                    newData = {
                        No: 1,
                        idXe: prevData.length > 0 ? prevData[prevData.length - 1].idXe + 1 : 1,
                        dsghe: prevData.length > 0 ? prevData[0].dsghe : [],
                        Loaixe: "",
                    };
                    break;
                case 've':
                    newData = {
                        No: 1,
                        idVe: prevData.length > 0 ? prevData[prevData.length - 1].idVe + 1 : 1,
                        maghe: '',
                        ngaydi: '',
                        noidi: '',
                        noiden: '',
                        price: 0,
                    };
                    break;
                case 'tuyen':
                    newData = {
                        No: 1,
                        idTuyen: prevData.length > 0 ? prevData[prevData.length - 1].idTuyen + 1 : 1,
                        trinhtu: '',
                        Khoihanh: '',
                        time: '',
                    };
                    break;
                case 'price':
                    newData = {
                        No: 1,
                        idPrice: prevData.length > 0 ? prevData[prevData.length - 1].idPrice + 1 : 1,
                        value: 0,
                    };
                    break;
                case 'lichtrinh':
                    newData = {
                        No: 1,
                        idLichTrinh: prevData.length > 0 ? prevData[prevData.length - 1].idLichTrinh + 1 : 1,
                        time: '',
                        location: '',
                    };
                    break;
                case 'diadiem':
                    newData = {
                        No: 1,
                        idLocation: prevData.length > 0 ? prevData[prevData.length - 1].idLocation + 1 : 1,
                        location: '',
                    };
                    break;
                case 'vetuyen':
                    newData = {
                        No: 1,
                        idXT: prevData.length > 0 ? prevData[prevData.length - 1].idXT + 1 : 1,
                        idTuyen: '',
                        time: '',
                    };
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

    const handetail = async (params: ICellRendererParams) => {
        const data = params.node.data;
        switch (dataType) {
            case 'xe':
                navigate("/crud/dsghedetail", { state: { data } });
                break;
            case 'tuyen':
                navigate("/crud/dsRouterDetail", { state: { data } });
                break;
            case 'diadiem':
                navigate("/crud/dsStationDetail", { state: { data } });
                break;
        }
    };

    return (
        <div style={{ display: "flex", flexDirection: "column", width: "100vw", height: "83vh", overflow: "hidden", padding: "0px 20px" }}>
            <Button onClick={handleAdd} variant="contained" sx={{ width: "50px" }}>+ADD</Button>
            <div style={{ height: '100vh', width: '100vw', margin: 0, padding: 0, overflow: 'hidden' }}>
                <div className="ag-theme-quartz" style={{ height: '100%', width: '100%' }}>
                    <AgGridReact
                        rowData={rowData}
                        columnDefs={columns}
                        context={{
                            handleEdit: (params: ICellRendererParams) => handleEdit(params),
                            handleDelete: (data: any) => handleDelete(data),
                            handetail: (params: ICellRendererParams) => handetail(params),
                        }}
                        editType="fullRow"
                        pagination
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

export default DynamicTable;
