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
interface Tuyen {
    kh: string;
    kt: string;
    timebd: string;
    timekt: string;
}
interface Ghe {
    Ghe: string;
    TrangThai: string;
}
interface LichTrinh {
    idLichTrinh: string;
    noidi: string;
    noiden: string;
    Loaixe: string;
    tuyen: Tuyen[];
    dsghe: Ghe[];
    ngaydi: string;
    price: number;
}
const QuanlyLichTrinh = () => {
    const [rowData, setRowData] = useState<LichTrinh[]>([]);
    const [detailRowDataTuyen, setDetailRowDataTuyen] = useState<Tuyen[] | null>(null);
    const [detailRowDataDSGHE, setDetailRowDataDSGHE] = useState<Ghe[] | null>(null);
    const [editingRowIndex, setEditingRowIndex] = useState<number | null>(null);
    const [showTuyen, setShowTuyen] = useState(false);
    const [showDSGhe, setShowDSGhe] = useState(false);
    const gridApi = useRef<GridApi>();

    useEffect(() => {
        fetch("http://localhost:8080/quanlylt")
            .then(res => res.json())
            .then(data => setRowData(data));
    }, []);
    console.log("rowwwdaata", rowData)
    const columnDefs: ColDef[] = [
        {
            field: "No",
            valueGetter: (params) => (params.node?.rowIndex != null ? params.node.rowIndex + 1 : ""),
            width: 150,

        },
        {
            headerName: "ID Lịch Trình",
            field: "idLichTrinh",
        },
        {
            field: "Actions",
            cellRenderer: (params: ICellRendererParams) => (
                <>
                    <IconButton onClick={() => handleEdit(params)} color="primary">
                        {editingRowIndex === params.node.rowIndex ? <SaveIcon /> : <EditIcon />}
                    </IconButton>
                    <IconButton onClick={() => handleDelete(params.data)} color="error">
                        <DeleteIcon />
                    </IconButton>
                </>
            ),

        },
        {
            headerName: "Id Xe",
            field: "idXe",
        },
        {
            headerName: "Id Tuyen",
            field: "idTuyen",
        },

        {
            headerName: "Ngày Đi",
            field: "ngaydi",
            editable: true
        },
    ];
    const handleEdit = async (params: ICellRendererParams) => {
        const rowIndex = params.node.rowIndex;
        if (rowIndex != null) {
            if (editingRowIndex === rowIndex) {
                gridApi.current?.stopEditing();
                setEditingRowIndex(null);
                try {
                    const updatedData = params.node.data as LichTrinh;
                    const response = await fetch(`http://localhost:8080/quanlylt/${updatedData.idLichTrinh}`, {
                        method: 'PUT',
                        headers: {
                            "Content-Type": 'application/json',
                        },
                        body: JSON.stringify(updatedData),
                    });
                    if (!response.ok) {
                        throw new Error('Failed to update');
                    }
                } catch (error) {
                    console.error('Error updating:', error);
                }
            } else {
                setEditingRowIndex(rowIndex);
                gridApi.current?.startEditingCell({
                    rowIndex,
                    colKey: "idLichTrinh",
                });
            }
        }
    };
    const handleDelete = async (data: LichTrinh) => {
        try {
            const response = await fetch(`http://localhost:8080/lt/${data.idLichTrinh}`, {
                method: 'DELETE',
            });
            if (response.ok) {
                setRowData((prevData) =>
                    prevData.filter((row) => row.idLichTrinh !== data.idLichTrinh)
                );
            }
        } catch (error) {
            console.error('Error deleting:', error);
        }
    };
    const handleTuyenClick = (params: ICellRendererParams) => {
        setDetailRowDataTuyen(params.value);
        setShowTuyen(true);
        setShowDSGhe(false);
    };
    const handleXeClick = (params: ICellRendererParams) => {
        setDetailRowDataDSGHE(params.value);
        setShowDSGhe(true);
        setShowTuyen(false);
    };
    return (
        <div style={{ display: "flex", flexDirection: "column", width: "100vw", height: "83vh", overflow: "hidden", padding: "0px 20px" }}>
            <Button variant="contained" sx={{ width: "50px" }}>+ADD</Button>
            <div className="ag-theme-alpine" style={{ height: "100%", width: '100%' }}>
                <AgGridReact
                    columnDefs={columnDefs}
                    rowData={rowData}
                    editType='fullRow'
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
    );
};

export default QuanlyLichTrinh;