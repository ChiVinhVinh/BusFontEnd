import React from 'react';
import { Box, Typography } from '@mui/material';

const Connet = () => {
    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '20px 0',
            }}
        >
            <Typography
                component="h1"
                sx={{
                    color: '#00613d',
                    fontWeight: 600,
                    fontSize: '28px',
                    lineHeight: '33px',
                }}
            >
                KẾT NỐI FUTA GROUP
            </Typography>
            <Typography
                component="span"
                sx={{
                    width: '672px',
                    height: '42px',
                    fontWeight: 400,
                    fontSize: '16px',
                    lineHeight: '21px',
                    color: '#4a4a4a',
                    marginTop: '8px',
                    textAlign: 'center',
                }}
            >
                Kết nối đa dạng hệ sinh thái FUTA Group qua App FUTA: mua vé Xe Phương Trang, Xe Buýt, Xe Hợp Đồng, Giao Hàng,...
            </Typography>
            <Box
                component="img"
                src="https://cdn.futabus.vn/futa-busline-cms-dev/1_ketnoi_3c401512ac/1_ketnoi_3c401512ac.svg"
                alt="FUTA Group"
                sx={{
                    margin: '30px 0',
                }}
            />
        </Box>
    );
};

export default Connet;
