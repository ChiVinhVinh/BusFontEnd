import { Button, Checkbox, FormControlLabel, FormGroup } from "@mui/material";
import { useContext } from "react"
import DeleteIcon from '@mui/icons-material/Delete';
import FillterButton from "./FillerButton";
import './FillterCheckBox.css'
import { FillterFormContext } from "./FillterFormContext";

const FillterCheckBox = () => {
    const context = useContext(FillterFormContext);
    if (!context) {
        throw new Error('useFilterForm must be used within a FillterFormProvider');
    }
    const { selectedFilters, setSelectedFilter } = context;


    const handleTimeChange = (timeRange: string, checked: boolean) => {
        setSelectedFilter(prev => ({
            ...prev,
            time: checked
                ? [...prev.time, timeRange]
                : prev.time.filter(t => t !== timeRange)
        }));
    };


    const handleClearFilters = () => {
        setSelectedFilter({
            time: [],
            type: [],
            seat: [],
            flow: []
        });
    };




    return (
        <div>
            <div className="col32322321">

                <div className="row31211">
                    <span>Bộ lọc tìm kiếm</span>
                    <Button
                        variant="text"
                        endIcon={<DeleteIcon />}
                        sx={{ color: 'red' }}
                        onClick={handleClearFilters}
                    >
                        Bỏ lọc
                    </Button>
                </div>


                <div className="Checkboxx">
                    <span>Giờ đi</span>
                    <FormGroup>
                        <FormControlLabel
                            control={
                                <Checkbox
                                    checked={selectedFilters.time.includes('00:00-06:00')}
                                    onChange={(e) => handleTimeChange('00:00-06:00', e.target.checked)}
                                />
                            }
                            label="Sáng sớm 00:00-06:00"
                        />
                        <FormControlLabel
                            control={
                                <Checkbox
                                    checked={selectedFilters.time.includes('06:00-12:00')}
                                    onChange={(e) => handleTimeChange('06:00-12:00', e.target.checked)}
                                />
                            }
                            label="Buổi sáng 06:00-12:00"
                        />
                        <FormControlLabel
                            control={
                                <Checkbox
                                    checked={selectedFilters.time.includes('12:00-18:00')}
                                    onChange={(e) => handleTimeChange('12:00-18:00', e.target.checked)}
                                />
                            }
                            label="Buổi chiều 12:00-18:00"
                        />
                        <FormControlLabel
                            control={
                                <Checkbox
                                    checked={selectedFilters.time.includes('18:00-24:00')}
                                    onChange={(e) => handleTimeChange('18:00-24:00', e.target.checked)}
                                />
                            }
                            label="Buổi tối 18:00-24:00"
                        />
                    </FormGroup>
                </div>
                <div className="Checkboxx">
                    <FillterButton title="Loại xe" ds={["Ghế", "Giường", "Limousine"]} />
                </div>
                <div className="Checkboxx">
                    <FillterButton title="Hàng Ghế" ds={["Hàng đầu", "Hàng giữa", "Hàng cuối"]} />
                </div>
                <div className="Checkboxx">
                    <FillterButton title="Tầng" ds={["Tầng trên", "Tầng dưới"]} />
                </div>


            </div>
        </div>
    );
};

export default FillterCheckBox;