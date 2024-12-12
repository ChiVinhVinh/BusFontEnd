import { Button, Checkbox, FormControlLabel, FormGroup, Box, Typography } from "@mui/material";
import { useContext } from "react";
import DeleteIcon from '@mui/icons-material/Delete';
import FillterButton from "./FillerButton";
import { FillterFormContext } from "./FillterFormContext";

const FillterCheckBox = ({ count }: any) => {
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
        <Box sx={{
            position: 'sticky',
            top: 0,
            height: 'fit-content',
            zIndex: 50,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start',
            backgroundColor: '#fff',
            boxShadow: '0px 4px 8px rgba(0, 0, 1, 1)',
            borderRadius: '1rem',
            width: '550px',
            padding: '20px'
        }}>
            <Box sx={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between',
                width: '100%'
            }}>
                <Typography variant="subtitle1" sx={{ textTransform: 'uppercase' }}>
                    Bộ lọc tìm kiếm
                </Typography>
                <Button
                    variant="text"
                    endIcon={<DeleteIcon />}
                    sx={{ color: 'red' }}
                    onClick={handleClearFilters}
                >
                    Bỏ lọc
                </Button>
            </Box>
            <Box sx={{
                display: 'flex',
                flexDirection: 'column',
                borderBottom: '2px solid #e5e7eb',
                width: '100%',
                mb: 2
            }}>
                <Typography variant="subtitle2" sx={{ textAlign: 'left' }}>
                    Giờ đi
                </Typography>
                <FormGroup>
                    <FormControlLabel
                        control={
                            <Checkbox
                                checked={selectedFilters.time.includes('00:00-06:00')}
                                onChange={(e) => handleTimeChange('00:00-06:00', e.target.checked)}
                            />
                        }
                        label={`Sáng sớm 00:00-06:00 (${count.EarlyMorning})`}
                    />
                    <FormControlLabel
                        control={
                            <Checkbox
                                checked={selectedFilters.time.includes('06:00-12:00')}
                                onChange={(e) => handleTimeChange('06:00-12:00', e.target.checked)}
                            />
                        }
                        label={`Buổi sáng 06:00-12:00 (${count.Morning})`}
                    />
                    <FormControlLabel
                        control={
                            <Checkbox
                                checked={selectedFilters.time.includes('12:00-18:00')}
                                onChange={(e) => handleTimeChange('12:00-18:00', e.target.checked)}
                            />
                        }
                        label={`Buổi chiều 12:00-18:00 (${count.Afternoon})`}
                    />
                    <FormControlLabel
                        control={
                            <Checkbox
                                checked={selectedFilters.time.includes('18:00-24:00')}
                                onChange={(e) => handleTimeChange('18:00-24:00', e.target.checked)}
                            />
                        }
                        label={`Buổi tối 18:00-24:00 (${count.Evening})`}
                    />
                </FormGroup>
            </Box>
            <Box sx={{
                display: 'flex',
                flexDirection: 'column',
                borderBottom: '2px solid #e5e7eb',
                width: '100%',
                mb: 2
            }}>
                <FillterButton title="Loại xe" ds={["Ghế", "Giường", "Limousine"]} />
            </Box>
            <Box sx={{
                display: 'flex',
                flexDirection: 'column',
                borderBottom: '2px solid #e5e7eb',
                width: '100%',
                mb: 2
            }}>
                <FillterButton title="Hàng Ghế" ds={["Hàng đầu", "Hàng giữa", "Hàng cuối"]} />
            </Box>
            <Box sx={{
                display: 'flex',
                flexDirection: 'column',
                borderBottom: '2px solid #e5e7eb',
                width: '100%'
            }}>
                <FillterButton title="Tầng" ds={["Tầng trên", "Tầng dưới"]} />
            </Box>
        </Box>
    );
};

export default FillterCheckBox;