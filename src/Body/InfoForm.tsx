import InfoTitle from "./InfoTitle";
import { Box, Typography, styled } from '@mui/material';

const Container = styled(Box)({
    display: 'flex',
    flexDirection: 'column',
    margin: '70px auto',
    backgroundColor: 'rgb(255 247 245/ 1) !important',
    padding: '30px',
    width: '100%',
    boxSizing: 'border-box'
});

const Title = styled(Typography)({
    color: '#00613d',
    fontWeight: 600,
    fontSize: '28px',
    lineHeight: '33px',
    textTransform: 'uppercase'
});

const InfoRow = styled(Box)({
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: '20px'
});

const InfoColumn = styled(Box)({
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: '#fff',
    borderRadius: '12px',
    width: '360px',
    minWidth: '290px',
    border: '1px solid rgba(192, 198, 204, .4)',
    boxShadow: '0 3px 6px rgba(0, 0, 0, .16), 0 3px 6px rgba(0, 0, 0, .2)',
    position: 'relative'
});

const LocationInfo = styled(Box)({
    display: 'flex',
    flexDirection: 'column',
    position: 'absolute',
    top: '15%',
    left: '20px',
    alignItems: 'flex-start',
    '& > span': {
        color: '#fff',
        width: '100%',
        textAlign: 'left',
        '&:nth-of-type(2)': {
            fontSize: '20px'
        }
    }
});

const BusImage = styled('img')({
    width: '100%',
    borderTopLeftRadius: '12px',
    borderTopRightRadius: '12px'
});

const InfoForm = () => {
    return (
        <Container>
            <Title variant="h1">
                Tuyến phổ biến
            </Title>
            <Typography variant="h5" sx={{ mb: 3 }}>
                Được khách hàng tin tưởng và lựa chọn
            </Typography>

            <InfoRow>
                <InfoColumn>
                    <BusImage
                        src="https://cdn.futabus.vn/futa-busline-cms-dev/Rectangle_23_2_8bf6ed1d78/Rectangle_23_2_8bf6ed1d78.png"
                        alt="TPHCM Bus"
                    />
                    <LocationInfo>
                        <Typography variant="body1" color="white">
                            Tuyến xe từ
                        </Typography>
                        <Typography variant="h6" color="white" fontWeight="bold">
                            Tp Hồ Chí Minh
                        </Typography>
                    </LocationInfo>
                    <InfoTitle title='Đà Lạt' price='290.000đ' info='305km - 8 giờ - 12/11/2024' />
                    <InfoTitle title='Cần Thơ' price='165.000đ' info='166km - 3 giờ 12 phút -12/11/2024' />
                    <InfoTitle title='Đà Lạt' price='290.000đ' info='305km - 8 giờ - 12/11/2024' />
                </InfoColumn>

                <InfoColumn>
                    <BusImage
                        src="https://cdn.futabus.vn/futa-busline-cms-dev/Rectangle_23_3_2d8ce855bc/Rectangle_23_3_2d8ce855bc.png"
                        alt="Đà Lạt Bus"
                    />
                    <LocationInfo>
                        <Typography variant="body1" color="white">
                            Tuyến xe từ
                        </Typography>
                        <Typography variant="h6" color="white" fontWeight="bold">
                            Đà Lạt
                        </Typography>
                    </LocationInfo>
                    <InfoTitle title='Đà Lạt' price='290.000đ' info='305km - 8 giờ - 12/11/2024' />
                    <InfoTitle title='Cần Thơ' price='290.000đ' info='305km - 8 giờ - 12/11/2024' />
                    <InfoTitle title='Đà Lạt' price='290.000đ' info='305km - 8 giờ - 12/11/2024' />
                </InfoColumn>

                <InfoColumn>
                    <BusImage
                        src="https://cdn.futabus.vn/futa-busline-cms-dev/Rectangle_23_4_061f4249f6/Rectangle_23_4_061f4249f6.png"
                        alt="Đà Nẵng Bus"
                    />
                    <LocationInfo>
                        <Typography variant="body1" color="white">
                            Tuyến xe từ
                        </Typography>
                        <Typography variant="h6" color="white" fontWeight="bold">
                            Đà Nẵng
                        </Typography>
                    </LocationInfo>
                    <InfoTitle title='Đà Lạt' price='290.000đ' info='305km - 8 giờ - 12/11/2024' />
                    <InfoTitle title='Cần Thơ' price='290.000đ' info='305km - 8 giờ - 12/11/2024' />
                    <InfoTitle title='Đà Lạt' price='290.000đ' info='305km - 8 giờ - 12/11/2024' />
                </InfoColumn>
            </InfoRow>
        </Container>
    );
}

export default InfoForm;