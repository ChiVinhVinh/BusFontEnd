import { ColDef } from 'ag-grid-community';
import { ICellRendererParams } from 'ag-grid-community';
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';
import DeleteIcon from '@mui/icons-material/Delete';
import { IconButton } from '@mui/material';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
export const columnsVe = (editingRowIndex: number | null): ColDef[] => [
    {
        field: "No",
        valueGetter: (params) => (params.node?.rowIndex != null ? params.node.rowIndex + 1 : ""),
        width: 150
    },
    {
        field: "Actions",
        cellRenderer: (params: ICellRendererParams) => (
            <>
                <IconButton onClick={() => params.context.handleEdit(params)} color='primary'>
                    {editingRowIndex === params.node.rowIndex ? <SaveIcon /> : <EditIcon />}
                </IconButton>
                <IconButton onClick={() => params.context.handleDelete(params.data)} color='error'>
                    <DeleteIcon></DeleteIcon>
                </IconButton>
            </>
        ),
        width: 150
    },
    { headerName: "Id Ve", field: "idVe", width: 150 },
    { headerName: "Chỗ ngồi", field: "maghe", editable: true, width: 150 },
    {
        headerName: "Info vé", field: "infoVe", cellRenderer: (params: ICellRendererParams) => {
            const infoVe = params.value;
            return (
                <span>Vé của lịch trình {infoVe}</span>
            )
        }, flex: 1
    }
];
export const columnsXe = (
    editingRowIndex: number | null
): ColDef[] => [
        {
            field: "No",
            valueGetter: (params) => (params.node?.rowIndex != null ? params.node.rowIndex + 1 : ""),
            width: 150
        },
        {
            field: "Actions",
            cellRenderer: (params: ICellRendererParams) => (
                <>
                    <IconButton onClick={() => {
                        params.context.handleEdit(params); editingRowIndex = params.node.rowIndex
                        console.log("editingRowIndexeditingRowIndex", editingRowIndex)
                        console.log("params.node.rowIndexparams.node.rowIndex", params.node.rowIndex)
                    }} color='primary'>

                        {editingRowIndex === params.node.rowIndex ? <SaveIcon /> : <EditIcon />}
                    </IconButton>
                    <IconButton onClick={() => params.context.handleDelete(params.data)} color='error'>
                        <DeleteIcon />
                    </IconButton>
                    <IconButton onClick={() => params.context.handetail(params)}>
                        <FormatListBulletedIcon style={{ color: 'green' }} />
                    </IconButton>
                </>
            ),
            width: 250
        },
        { headerName: "Id xe", field: "idXe", width: 150 },
        { headerName: "Loại xe", field: "Loaixe", editable: true, flex: 1 },
        { headerName: "Tài xế", field: "TaiXe", editable: true, flex: 1 },
        { headerName: "Biển số xe", field: "BienXe", editable: true, flex: 1 }
    ];
export const columnDiaDiem = (editingRowIndex: number | null,): ColDef[] => [
    {
        field: "No",
        valueGetter: (params) => (params.node?.rowIndex != null ? params.node.rowIndex + 1 : ""),
        width: 150
    },

    {
        field: "Actions",
        cellRenderer: (params: ICellRendererParams) => (
            <>
                <IconButton onClick={() => params.context.handleEdit(params)} color='primary'>
                    {editingRowIndex === params.node.rowIndex ? <SaveIcon /> : <EditIcon />}
                </IconButton>
                <IconButton onClick={() => params.context.handleDelete(params.data)} color='error'>
                    <DeleteIcon></DeleteIcon>
                </IconButton>
                <IconButton onClick={() => params.context.handetail(params)}>
                    <FormatListBulletedIcon style={{ color: 'green' }}></FormatListBulletedIcon>
                </IconButton>
            </>
        ),
        width: 250
    },
    {
        field: "idlocation",
        width: 150
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
export const columnVeTuyen = (editingRowIndex: number | null): ColDef[] => [
    {
        field: "No",
        valueGetter: (params) => (params.node?.rowIndex != null ? params.node.rowIndex + 1 : ""),
        flex: 1
    },

    {
        field: "Actions",
        cellRenderer: (params: ICellRendererParams) => (
            <>
                <IconButton onClick={() => params.context.handleEdit(params)} color='primary'>
                    {editingRowIndex === params.node.rowIndex ? <SaveIcon /> : <EditIcon />}
                </IconButton>
                <IconButton onClick={() => params.context.handleDelete(params.data)} color='error'>
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
export const columnTuyen = (editingRowIndex: number | null): ColDef[] => [
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
                <IconButton onClick={() => params.context.handleEdit(params)} color='primary'>
                    {editingRowIndex === params.node.rowIndex ? <SaveIcon /> : <EditIcon />}
                </IconButton>
                <IconButton onClick={() => params.context.handleDelete(params.data)}>
                    <DeleteIcon style={{ color: "red" }} />
                </IconButton>
                <IconButton onClick={() => params.context.handetail(params)}>
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
export const columnPrice = (editingRowIndex: number | null): ColDef[] => [
    {
        field: "No",
        valueGetter: (params) => (params.node?.rowIndex != null ? params.node.rowIndex + 1 : ""),
        width: 200
    },
    {
        field: "Actions",
        cellRenderer: (params: ICellRendererParams) => (
            <>
                <IconButton onClick={() => params.context.handleEdit(params)} color='primary'>
                    {editingRowIndex === params.node.rowIndex ? <SaveIcon /> : <EditIcon />}
                </IconButton>
                <IconButton onClick={() => params.context.handleDelete(params.data)} color='error'>
                    <DeleteIcon></DeleteIcon>
                </IconButton>
            </>
        ),
        width: 150
    },
    {
        headerName: "Id Price",
        field: "idPrice",
        editable: true,
        flex: 1
    },
    {
        headerName: "Giá tiền",
        field: "price",
        editable: true,
        flex: 1
    },
]
export const columnlichtrinh = (editingRowIndex: number | null): ColDef[] => [
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
                <IconButton onClick={() => params.context.handleEdit(params)} color="primary">
                    {editingRowIndex === params.node.rowIndex ? <SaveIcon /> : <EditIcon />}
                </IconButton>
                <IconButton onClick={() => params.context.handleDelete(params.data)} color="error">
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
]
