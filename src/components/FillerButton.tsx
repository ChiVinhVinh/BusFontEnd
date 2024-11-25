import { Button } from "@mui/material";
import './FillterButton.css'
import { FillterFormContext } from "./FillterFormContext";
import { useContext } from "react";
const FillterButton = ({ title, ds }: any) => {
    const context = useContext(FillterFormContext);
    if (!context) {
        throw new Error('useFilterForm must be used within a FillterFormProvider');
    }
    interface FilterState {
        type: string[];
        seat: string[];
        flow: string[];
    }
    let name: keyof FilterState;
    if (title == "Loại xe")
        name = "type"
    if (title == "Hàng Ghế")
        name = "seat"
    if (title == "Tầng")
        name = "flow"
    const { selectedFilters, setSelectedFilter } = context;
    const handleClick = (value: string) => {

        setSelectedFilter((prev) => ({
            ...prev,
            [name]: prev[name].includes(value)
                ? prev[name].filter((item) => item !== value)
                : [...prev[name], value],
        }));
    }
    const countButton = () => {
        console.log("//////////////////////////////////////", selectedFilters[name])
        return ds.map((item: string, index: number) => (
            <Button
                onClick={() => handleClick(item)}
                sx={{
                    ...(selectedFilters[name].includes(item) && {
                        background: 'orange',
                        borderColor: '#000',
                    }),
                    border: '1px solid #e5e7eb !important',
                    color: 'black',
                    marginRight: "10px",
                    fontSize: '10px',
                }}
                key={index}
                variant="outlined"
            >
                {item}
            </Button>
        ));
    }
    return (
        <div className="coldsasa" >
            <span>{title}</span>
            <div>
                {countButton()}
            </div>
        </div>
    )
}
export default FillterButton;