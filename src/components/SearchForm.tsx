import React, { useEffect, useState } from 'react'
import { useForm, FormProvider } from 'react-hook-form'
import { Button, Grid, Select, Stack } from '@mui/material';
import TitleRadioForm from '../Forms/TitleRadioForm';
import { ListFormTT } from '../Forms/ListFormTT';
import DatePickerComponent from '../Forms/DatePickerComponent';
import TicketSelect from '../Forms/TicketSelect';
import './SearchForm.css'
import dayjs from 'dayjs';

function SearchForm({ onChangeProject, result1 }: any) {
    const methods = useForm();
    const [provinces, setProvinces] = useState<string[]>([]);
    const [selectKh, setKh] = useState<string>("");
    const tickedOption = [1, 2, 3, 4, 5];
    const [diemdi, setDiemdi] = useState<string>("");
    const [diemden, setDiemden] = useState<string>("");
    const [selectDate, setSelectDate] = useState<string>(dayjs().format('DD-MM-YYYY'));
    const [recentSearchs, setRecentSearchs] = useState<any[]>([]);
    useEffect(() => {
        const dataTT = async () => {
            try {
                const respone = await fetch('https://provinces.open-api.vn/api/p/');
                const data = await respone.json();
                console.log(data);
                setProvinces(data.map((province: any) => province.name));
            } catch (error) {
                console.log("Failed to fetch provinces:", error);
            }
        };
        dataTT();
        const saveSearchs = localStorage.getItem('recentSearchs');
        console.log("saveSearch", saveSearchs);
        if (saveSearchs) {
            setRecentSearchs(JSON.parse(saveSearchs));
        }
    }, []);
    const handleClickValue = (data: any) => {
        setDiemden(prev => prev = data.diemden)
        setDiemdi(prev => prev = data.diemdi)
        setSelectDate(data.selectDate)
    }
    const onSubmit = async () => {
        try {
            const newSearch = {
                diemdi,
                diemden,
                selectDate,
            };
            console.log("newSearch", newSearch);
            const saveSearch = localStorage.getItem('recentSearchs');
            let updateSearch = saveSearch ? JSON.parse(saveSearch) : [];
            updateSearch.unshift(newSearch);
            if (updateSearch.length > 4) {
                updateSearch = updateSearch.slice(0, 4);
            }
            localStorage.setItem('recentSearchs', JSON.stringify(updateSearch));
            setRecentSearchs(updateSearch);

            const response = await fetch('http://localhost:8080/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    DiemDi: diemdi,
                    DiemDen: diemden,
                    NgayDi: selectDate,
                }),
            });
            if (!response.ok) {
                throw new Error("Failed to fetch matching trips");
            }
            // const responseJson = await response.json();
            // console.log("Response JSON:", responseJson);
            const { Trip, TimeCounts } = await response.json();
            result1({
                dataTrip: Trip,
                timecount: TimeCounts
            });
            console.log('Trippppppppppppppppppppppppppppp', Trip);
            console.log('Counnnnnnnnnnnnnnnnn', TimeCounts)

        } catch (error) {
            console.error("Error submitting search form:", error);
        }
    };

    const swapLocations = () => {
        setDiemden(prev => prev = diemdi)
        setDiemdi(prev => prev = diemden)
    }
    console.log("điemiiiiii", diemdi);
    console.log("diemdennnnnnnn", diemden);
    console.log("selectdatee", selectDate);
    const handleRadioChange = (value: string) => {
        setKh(value);
    };

    return (
        <div className='SearchForm'>
            <FormProvider {...methods}>
                <form style={{ height: '160px', width: "100%" }} onSubmit={(e) => { e.preventDefault(); onSubmit(); }}>
                    <div className='radio'>
                        <TitleRadioForm name="title" onRadioChange={handleRadioChange}></TitleRadioForm>
                        <span>Hướng dẫn mua vé</span>
                    </div>
                    <div className='info'>
                        <Stack direction="row" justifyContent="center" spacing={2}>
                            <ListFormTT name='Điểm đi' label='Điểm đi' provinces={provinces} location={diemdi} setLocation={setDiemdi}></ListFormTT>
                            <img className={`imdss ${selectKh === 'Khứ hồi' ? 'leftt' : null}`} onClick={swapLocations} src="https://futabus.vn/images/icons/switch_location.svg"></img>
                            <ListFormTT name='Điểm đến' label='Điểm đến' provinces={provinces} location={diemden} setLocation={setDiemden} ></ListFormTT>
                        </Stack>
                        <Grid container spacing={2} >
                            <Grid item xs={selectKh === "Khứ hồi" ? 4 : 6} md={selectKh === 'Khứ hồi' ? 5 : 6}>
                                <DatePickerComponent name='selectDate' label="Ngày đi" date={setSelectDate} />
                            </Grid>

                            {selectKh === 'Khứ hồi' && <Grid item xs={4} md={5}> <DatePickerComponent name='selectDateVề' label="Ngày về" date={setSelectDate} /> </Grid>}
                            <Grid item xs={selectKh === "Khứ hồi" ? 4 : 6} md={selectKh === 'Khứ hồi' ? 2 : 6}>
                                <TicketSelect name='sove' label="Số vé" options={tickedOption}></TicketSelect>
                            </Grid>
                        </Grid >
                    </div>
                    <Button onClick={onChangeProject} className="button" type="submit" variant="contained">Tìm chuyến xe</Button>
                </form>
            </FormProvider>
            <Stack direction='column' >
                <span style={{ textAlign: 'left' }}>Tìm kiếm gần đây</span>
                <Stack direction='row' spacing={3}>
                    {recentSearchs.map((item, index) => <div style={{ cursor: 'pointer' }} onClick={() => handleClickValue(item)}><Stack sx={{ border: '1px solid #dde2e8', borderRadius: "8px", background: '#f9f9fa', height: '64px', padding: '10px' }} key={index} direction="column" >
                        <span style={{ fontSize: '15px' }}>{item.diemdi}-{item.diemden}</span>
                        <span style={{ textAlign: 'left', color: '#637280', fontSize: '13px' }}>{item.selectDate}</span>
                    </Stack> </div>)}
                </Stack>
            </Stack>
        </div >
    );
}
export default SearchForm;
