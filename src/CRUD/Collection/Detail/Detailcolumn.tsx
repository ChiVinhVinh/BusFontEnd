import { ColDef } from 'ag-grid-community';
import { ICellRendererParams } from 'ag-grid-community';
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';
import DeleteIcon from '@mui/icons-material/Delete';
import { IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

export const columndsghe = (editingRowIndex: number | null): ColDef[] => [
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
                    onClick={() => params.context.handleEdit(params)}
                    color="primary"
                >
                    {editingRowIndex === params.node.rowIndex ? <SaveIcon /> : <EditIcon />}
                </IconButton>
                <IconButton onClick={() => params.context.handleDelete(params.data)} color='error'>
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
]
export const columnStaion = (editingRowIndex: number | null): ColDef[] => [
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
                    onClick={() => params.context.handleEdit(params)}
                    color="primary"
                >
                    {editingRowIndex === params.node.rowIndex ? <SaveIcon /> : <EditIcon />}
                </IconButton>
                <IconButton onClick={() => params.context.handleDelete(params.data)} color='error'>
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
]
export const columnTuyendetail = (editingRowIndex: number | null): ColDef[] => [
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
                    onClick={() => params.context.handleEdit(params)}
                    color="primary"
                >
                    {editingRowIndex === params.node.rowIndex ? <SaveIcon /> : <EditIcon />}
                </IconButton>
                <IconButton onClick={() => params.context.handleDelete(params.data)} color='error'>
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
]