import { Box, Typography, styled } from '@mui/material';

const RowContainer = styled(Box)({
    display: 'flex',
    flexDirection: 'row',
    padding: '20px',
    height: '84px',
    marginBottom: '12px'
});

const BusIcon = styled('img')({
    width: '76px',
    height: '76px'
});

const ContentColumn = styled(Box)({
    display: 'flex',
    flexDirection: 'column'
});

const InfoRow = styled(Box)({
    display: 'flex',
    flexDirection: 'row',
    gap: '10px',
    lineHeight: '2.25rem'
});

const TitleText = styled(Typography)({
    fontWeight: 'bold',
    fontSize: '1.875rem'
});

const SubtitleText = styled(Typography)({
    fontWeight: 'bold'
});

const InfoText = styled(Typography)({
    textAlign: 'left'
});

interface BusLineTitleProps {
    img: string;
    title: string;
    titlee: string;
    info: string;
}

const BusLineTitle = ({ img, title, titlee, info }: BusLineTitleProps) => {
    return (
        <RowContainer>
            <BusIcon
                src={img}
                alt={title}
            />
            <ContentColumn>
                <InfoRow>
                    <TitleText variant="h4">
                        {title}
                    </TitleText>
                    <SubtitleText variant="h6">
                        {titlee}
                    </SubtitleText>
                </InfoRow>
                <InfoText variant="body1">
                    {info}
                </InfoText>
            </ContentColumn>
        </RowContainer>
    );
}

export default BusLineTitle;