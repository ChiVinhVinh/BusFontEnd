import BusLineTitle from "./BusLineTitle";
import { Box, Typography, styled } from '@mui/material';

const Container = styled(Box)({
    display: 'flex',
    flexDirection: 'column',
    marginBottom: '80px',
    alignItems: 'center'
});

const Title = styled(Typography)({
    textTransform: 'uppercase',
    color: '#00613d',
    fontSize: '28px',
    lineHeight: '33px'
});

const Subtitle = styled(Typography)({
    fontSize: '16px',
    lineHeight: '21px',
    color: '#4a4a4a',
    marginTop: '8px'
});

const ContentRow = styled(Box)({
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '40px'
});

const InfoColumn = styled(Box)({
    display: 'flex',
    flexDirection: 'column',
    width: '532px',
    height: '370px'
});

const BusImage = styled('img')({
    width: '532px',
    height: '370px'
});

const BusLine = () => {
    return (
        <Container>
            <Title variant="h1">
                futa bus lines - Chất lượng là danh dự
            </Title>
            <Subtitle variant="h6">
                Được khách hàng tin tưởng và lựa chọn
            </Subtitle>

            <ContentRow>
                <InfoColumn>
                    <BusLineTitle
                        img="https://cdn.futabus.vn/futa-busline-cms-dev/Group_662c4422ba/Group_662c4422ba.svg"
                        title="Hơn 20 Triệu"
                        titlee="Lượt khách"
                        info="Phương Trang phục vụ hơn 20 triệu lượt khách bình quân 1 năm trên toàn quốc"
                    />
                    <BusLineTitle
                        img="https://cdn.futabus.vn/futa-busline-cms-dev/Store_55c0da8bd7/Store_55c0da8bd7.svg"
                        title="Hơn 350"
                        titlee="Phòng vé - Bưu cục"
                        info="Phương Trang phục vụ hơn 20 triệu lượt khách bình quân 1 năm trên toàn quốc"
                    />
                    <BusLineTitle
                        img="https://cdn.futabus.vn/futa-busline-cms-dev/Group_2_75b5ed1dfd/Group_2_75b5ed1dfd.svg"
                        title="Hơn 1,000"
                        titlee="Chuyến xe"
                        info="Phương Trang phục vụ hơn 1,000 chuyến xe đường dài và liên tỉnh mỗi ngày"
                    />
                </InfoColumn>

                <BusImage
                    src="https://cdn.futabus.vn/futa-busline-cms-dev/image_f922bef1bb/image_f922bef1bb.svg"
                    alt="Bus"
                />
            </ContentRow>
        </Container>
    );
}

export default BusLine;