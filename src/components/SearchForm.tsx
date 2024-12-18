import React, { useEffect, useState } from 'react'
import { useForm, FormProvider } from 'react-hook-form'
import { Button, Grid, Select, Stack, Box, Typography } from '@mui/material';
import TitleRadioForm from '../Forms/TitleRadioForm';
import { ListFormTT } from '../Forms/ListFormTT';
import DatePickerComponent from '../Forms/DatePickerComponent';
import TicketSelect from '../Forms/TicketSelect';
import dayjs from 'dayjs';
import { fetchTrips } from '../response/reponse';

function SearchForm({ onChangeProject, result1 }: any) {
    const methods = useForm();
    const [provinces, setProvinces] = useState<string[]>([]);
    const [selectKh, setKh] = useState<string>("");
    const tickedOption = [1, 2, 3, 4, 5];
    const [diemdi, setDiemdi] = useState<string>("");
    const [diemden, setDiemden] = useState<string>("");
    const [selectDate, setSelectDate] = useState<string>(dayjs().format('DD/MM/YYYY'));
    const [selectBackdate, setBackDate] = useState<string>(dayjs().format('DD/MM/YYYY'));
    const [recentSearchs, setRecentSearchs] = useState<any[]>([]);
    useEffect(() => {
        const dataTT = async () => {
            try {
                const respone = await fetch('https://provinces.open-api.vn/api/p/');
                const data = await respone.json();
                setProvinces(data.map((province: any) => province.name));
            } catch (error) {
                console.log("Failed to fetch provinces:", error);
            }
        };
        dataTT();

        const saveSearchs = localStorage.getItem('recentSearchs');
        if (saveSearchs) {
            setRecentSearchs(JSON.parse(saveSearchs));
        }
    }, []);
    const handleClickValue = (data: any) => {
        setDiemden(data.diemden);
        setDiemdi(data.diemdi);
        setSelectDate(data.selectDate);
    }
    const onSubmit = async () => {
        try {
            const newSearch = {
                diemdi,
                diemden,
                selectDate,
            };

            const saveSearch = localStorage.getItem('recentSearchs');
            let updateSearch = saveSearch ? JSON.parse(saveSearch) : [];
            const isUpdate = updateSearch.some((u: any) => u.diemdi === newSearch.diemdi && u.diemden === newSearch.diemden && u.selectDate === newSearch.selectDate)
            if (!isUpdate) {
                updateSearch.unshift(newSearch);
                if (updateSearch.length > 4) {
                    updateSearch = updateSearch.slice(0, 4);
                }
                localStorage.setItem('recentSearchs', JSON.stringify(updateSearch));
                setRecentSearchs(updateSearch);
            }
            let TripBack = []
            let TimeCountBack = {}
            if (selectKh) {
                const { Trip, TimeCounts } = await fetchTrips(diemden, diemdi, selectBackdate);
                TripBack = Trip,
                    TimeCountBack = TimeCounts
            }
            const { Trip, TimeCounts } = await fetchTrips(diemdi, diemden, selectDate);
            result1({
                dataTrip: Trip,
                timecount: TimeCounts,
                dataTripBack: TripBack,
                timecountBack: TimeCountBack
            });
        } catch (error) {
            console.error("Error submitting search form:", error);
        }
    };

    const swapLocations = () => {
        setDiemden(diemdi);
        setDiemdi(diemden);
    }

    const handleRadioChange = (value: string) => {
        setKh(value);
    };

    return (
        <Box sx={{
            display: 'flex',
            flexDirection: 'column',
            width: 1128,
            margin: 'auto',
            padding: '1.5rem',
            border: '1px solid rgba(239, 82, 34, .6)',
            borderRadius: '1rem',
            backgroundColor: '#fff',
            outline: '8px solid rgba(170, 46, 8, .1)',
            position: 'relative',
            alignItems: 'flex-start',
            height: 330
        }}>
            <FormProvider {...methods}>
                <form style={{ height: '160px', width: "100%" }} onSubmit={(e) => { e.preventDefault(); onSubmit(); }}>
                    <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                        <TitleRadioForm name="title" onRadioChange={handleRadioChange} />
                        <Typography color="orange">Hướng dẫn mua vé</Typography>
                    </Box>

                    <Box sx={{ display: 'flex', flexDirection: 'row', marginTop: '20px', marginBottom: '40px', width: '100%', gap: '12px' }}>
                        <Stack direction="row" justifyContent="center" spacing={2}>
                            <ListFormTT name='Điểm đi' label='Điểm đi' provinces={provinces} location={diemdi} setLocation={setDiemdi} />
                            <img
                                className={`imdss ${selectKh === 'Khứ hồi' ? 'leftt' : null}`}
                                onClick={swapLocations}
                                src="https://futabus.vn/images/icons/switch_location.svg"
                                alt="Swap locations"
                                style={{
                                    width: '50px',
                                    height: '50px',
                                    position: 'absolute',
                                    zIndex: 10,
                                    cursor: 'pointer',
                                    left: '22.5%',
                                    top: '35%',
                                    transition: '.3s',
                                    transform: 'rotate(0deg)'
                                }}
                            />
                            <ListFormTT name='Điểm đến' label='Điểm đến' provinces={provinces} location={diemden} setLocation={setDiemden} />
                        </Stack>

                        <Grid container spacing={2}>
                            <Grid item xs={selectKh === "Khứ hồi" ? 4 : 6} md={selectKh === 'Khứ hồi' ? 5 : 6}>
                                <DatePickerComponent name='selectDate' label="Ngày đi" date={setSelectDate} />
                            </Grid>
                            {selectKh === 'Khứ hồi' && (
                                <Grid item xs={4} md={5}>
                                    <DatePickerComponent name='selectDateVề' label="Ngày về" date={setBackDate} />
                                </Grid>
                            )}
                            <Grid item xs={selectKh === "Khứ hồi" ? 4 : 6} md={selectKh === 'Khứ hồi' ? 2 : 6}>
                                <TicketSelect name='sove' label="Số vé" options={tickedOption} />
                            </Grid>
                        </Grid>
                    </Box>

                    <Button onClick={onChangeProject} sx={{
                        borderRadius: '2rem',
                        backgroundColor: '#EF5222',
                        position: 'absolute',
                        top: '90%',
                        width: '262px',
                        height: '48px',
                        left: '50%',
                        padding: '20px',
                        transform: 'translate(-50%)'
                    }} type="submit" variant="contained">
                        Tìm chuyến xe
                    </Button>
                </form>
            </FormProvider>

            <Stack direction="column">
                <Typography textAlign="left">Tìm kiếm gần đây</Typography>
                <Stack direction="row" spacing={3}>
                    {recentSearchs.map((item, index) => (
                        <Box key={index} sx={{ cursor: 'pointer' }} onClick={() => handleClickValue(item)}>
                            <Stack sx={{
                                border: '1px solid #dde2e8',
                                borderRadius: '8px',
                                background: '#f9f9fa',
                                height: '64px',
                                padding: '10px'
                            }} direction="column">
                                <Typography sx={{ fontSize: '15px' }}>{item.diemdi}-{item.diemden}</Typography>
                                <Typography sx={{ textAlign: 'left', color: '#637280', fontSize: '13px' }}>
                                    {item.selectDate}
                                </Typography>
                            </Stack>
                        </Box>
                    ))}
                </Stack>
            </Stack>
        </Box>
    );
}

export default SearchForm;