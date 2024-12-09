import * as React from 'react';
import { useForm, Controller } from 'react-hook-form';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import { Button, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
interface LocationData {
    location: string;
    listStation: string[];
}
interface FormData {
    selectedLocation: LocationData | null;
    selectedStation: string;
    trinhtu: number;
    time: string;
}
const ListLocation = ({ data, onLocationSelect, onClose }: { data: LocationData[], onLocationSelect: any, onClose: any }) => {
    const {
        control,
        handleSubmit,
        watch,
        setValue,
        reset,
        formState: { errors },
    } = useForm<FormData>({
        defaultValues: {
            selectedLocation: null,
            selectedStation: '',
            trinhtu: 1,
            time: '',
        },
    });
    const selectedLocation = watch('selectedLocation');
    const onSubmit = (formData: FormData) => {
        console.log(formData);
        onLocationSelect(formData.selectedLocation, formData.selectedStation, formData.trinhtu, formData.time);
        onClose();
    };
    return (
        <form
            onSubmit={handleSubmit(onSubmit)}
            style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                zIndex: 1001,
                backgroundColor: 'white',
                padding: '20px',
                borderRadius: '10px',
                boxShadow: '0 4px 10px rgba(0,0,0,0.1)',
                display: 'flex',
                flexDirection: 'column',
                gap: '20px',
            }}
        >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h2>Chọn Địa Điểm</h2>
                <IconButton onClick={onClose} color="error">
                    <CloseIcon />
                </IconButton>
            </div>
            <Controller
                name="selectedLocation"
                control={control}
                render={({ field }) => (
                    <Autocomplete
                        {...field}
                        options={data}
                        getOptionLabel={(option) => option.location}
                        onChange={(_, value) => setValue('selectedLocation', value)}
                        renderInput={(params) => (
                            <TextField
                                {...params}
                                label="Chọn Tỉnh/Thành phố"
                                error={!!errors.selectedLocation}
                                helperText={errors.selectedLocation && 'This field is required'}
                            />
                        )}
                    />
                )}
                rules={{ required: 'Please select a location' }}
            />
            {selectedLocation && selectedLocation.listStation && (
                <Controller
                    name="selectedStation"
                    control={control}
                    render={({ field }) => (
                        <FormControl fullWidth>
                            <InputLabel id="station-select-label">Chọn Bến xe</InputLabel>
                            <Select
                                {...field}
                                labelId="station-select-label"
                                label="Chọn Bến xe"
                                error={!!errors.selectedStation}
                            >
                                {selectedLocation.listStation.map((station, index) => (
                                    <MenuItem key={index} value={station}>
                                        {station}
                                    </MenuItem>
                                ))}
                            </Select>
                            {errors.selectedStation && (
                                <span style={{ color: 'red', fontSize: '12px' }}>
                                    This field is required
                                </span>
                            )}
                        </FormControl>
                    )}
                    rules={{ required: 'Please select a station' }}
                />
            )}
            <Controller
                name="trinhtu"
                control={control}
                render={({ field }) => (
                    <FormControl sx={{ minWidth: 300, marginTop: 2 }}>
                        <InputLabel id="route-select-label">Trình tự</InputLabel>
                        <Select
                            labelId="route-select-label"
                            {...field}
                            label="Trình tự"
                        >
                            {[...Array(20)].map((_, index) => (
                                <MenuItem key={index + 1} value={index + 1}>
                                    {index + 1}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                )}
            />
            <Controller
                name="time"
                control={control}
                render={({ field }) => (
                    <TextField
                        {...field}
                        type="time"
                        label="Giờ"
                        InputLabelProps={{ shrink: true }}
                        error={!!errors.time}
                        helperText={errors.time && 'This field is required'}
                    />
                )}
                rules={{ required: 'Please enter a valid time' }}
            />
            <Button variant="contained" type="submit">
                Submit
            </Button>
        </form>
    );
};

export default ListLocation;
