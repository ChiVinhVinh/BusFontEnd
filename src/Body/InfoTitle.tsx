import { Box, Typography, styled } from '@mui/material';

interface InfoTitleProps {
    title: string;
    price: string;
    info: string;
}

const InfoContainer = styled(Box)({
    display: 'flex',
    flexDirection: 'column',
    borderBottom: '1px solid rgba(0, 0, 0, 0.12)',
    alignItems: 'flex-start',
    padding: '20px',
    width: '100%',
    boxSizing: 'border-box'
});

const TitleRow = styled(Box)({
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: '8px'
});

const InfoTitle = ({ title, price, info }: InfoTitleProps) => {
    return (
        <InfoContainer>
            <TitleRow>
                <Typography variant="subtitle1" fontWeight="medium">
                    {title}
                </Typography>
                <Typography variant="subtitle1" style={{ color: "black", fontWeight: "bold" }} fontWeight="medium">
                    {price}
                </Typography>
            </TitleRow>
            <Typography variant="body2" color="text.secondary">
                {info}
            </Typography>
        </InfoContainer>
    );
}

export default InfoTitle;