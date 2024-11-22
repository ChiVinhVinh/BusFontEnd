import React, { useEffect, useState, useRef } from 'react';
import { useFormContext, Controller, FieldValues, Path } from 'react-hook-form';
import { Autocomplete, TextField, Box, Stack } from '@mui/material';
import './ListFormTT.css'
type Props<T extends FieldValues> = {
    name: Path<T>;
    label: string;
    provinces: string[];
    location: string;
    setLocation: (location: string) => void;
};
export function ListFormTT<T extends FieldValues>({ name, label, provinces, location, setLocation }: Props<T>) {
    const { control } = useFormContext();
    const [openBox, setOpenBox] = useState(false);
    const [selectedTT, setSelectedTT] = useState<string | null>(null);
    const [listTT, setListTT] = useState<string[]>(provinces);
    const [recentSearches, setRecentSearches] = useState<string[]>([]);

    const ref = useRef<HTMLDivElement | null>(null);
    console.log("locationnnnnnn", location)
    useEffect(() => {
        setListTT(provinces);
    }, [provinces]);
    useEffect(() => {
        setSelectedTT(location);
    }, [location]);
    useEffect(() => {
        const savedSearches = localStorage.getItem('recentSearches');
        if (savedSearches) {
            setRecentSearches(JSON.parse(savedSearches));
        }
    }, []);

    useEffect(() => {

        if (recentSearches.length > 0) {
            localStorage.setItem('recentSearches', JSON.stringify(recentSearches));
        }
    }, [recentSearches]);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (ref.current && !ref.current.contains(event.target as Node)) {
                setOpenBox(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const handleOpenClick = () => {
        setOpenBox(true);
    };

    const handleInnerSelect = (item: string) => {
        setSelectedTT(item);
        setOpenBox(false);
        setLocation(item);
        if (!recentSearches.includes(item)) {
            const updatedSearches = [item, ...recentSearches.slice(0, 5)];
            setRecentSearches(updatedSearches);
        }
    };

    const inputChange = (event: React.ChangeEvent<{}>, value: string) => {
        const filteredProvinces = provinces.filter(province =>
            province.toLocaleLowerCase().includes(value.toLocaleLowerCase())
        );
        setListTT(filteredProvinces);
    };

    return (
        <div style={{ position: 'relative', width: '257px', }}>
            <Controller
                name={name}
                control={control}
                rules={{ required: "No" }}
                render={({ field }) => (
                    <div>
                        <span style={{ textAlign: "left", width: '100%', display: "block", paddingLeft: '20px' }}>{label}</span>
                        <Autocomplete

                            value={selectedTT || ''}
                            onChange={(event, newValue) => setSelectedTT(newValue)}
                            open={false}
                            options={provinces}
                            renderInput={(params) => <TextField {...params} onClick={handleOpenClick} InputProps={{
                                ...params.InputProps,
                                endAdornment: (
                                    <React.Fragment>
                                        {null}
                                    </React.Fragment>
                                )
                            }} />}
                        />
                    </div>
                )}
            />
            {openBox && (
                <Box
                    ref={ref}
                    sx={{
                        position: 'absolute',
                        top: 20,
                        left: 0,
                        width: '400px',
                        height: 'auto',
                        zIndex: 9999,
                        backgroundColor: 'white',
                        padding: 1,
                        borderRadius: '10px',
                        textAlign: 'left'
                    }}
                >
                    <Autocomplete
                        value={selectedTT || ''}
                        disablePortal
                        open={false}
                        options={listTT}
                        onInputChange={inputChange}
                        onChange={(event, newValue) => setSelectedTT(newValue)}
                        renderInput={(params) => <TextField {...params} sx={{ padding: "10px" }} />}
                    />
                    <Box sx={{ height: '190px', overflowY: 'auto', marginTop: '20px' }}>
                        <span style={{ textTransform: 'uppercase', fontWeight: 'bold' }}>Tỉnh/Thành phố</span>
                        {listTT.map((item) => (
                            <div
                                key={item}
                                style={{
                                    cursor: 'pointer',
                                    borderBottom: '1px solid #e5e7eb',
                                    padding: '5px',
                                    margin: '5px 0',
                                    borderRadius: '4px',
                                    transition: 'background-color 0.3s ease',
                                }}
                                onClick={() => handleInnerSelect(item)}
                            >
                                {item}
                            </div>
                        ))}
                        {listTT.length < 2 && <span className='dsdsds'>Không tìm địa điểm</span>}
                    </Box>

                    <Box sx={{ marginTop: '20px' }}>
                        <span style={{ textTransform: 'uppercase', fontWeight: 'bold' }}>Tìm kiếm gần đây</span>
                        <Stack direction='row' spacing={1} sx={{ flexWrap: 'wrap' }}>
                            {recentSearches.map((search) => (
                                <div
                                    key={search}
                                    style={{
                                        cursor: 'pointer',
                                        borderBottom: '1px solid #e5e7eb',
                                        padding: '5px',
                                        margin: '5px 10px',
                                        backgroundColor: '#D8BFD8',
                                        borderRadius: '4px',
                                        transition: 'background-color 0.3s ease',
                                        fontSize: "14px",
                                    }}
                                    onClick={() => handleInnerSelect(search)}
                                >
                                    {search}
                                </div>
                            ))}
                        </Stack>
                    </Box>
                </Box>
            )}
        </div>
    );
}
