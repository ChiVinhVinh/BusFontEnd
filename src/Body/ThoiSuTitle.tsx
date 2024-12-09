import { Box, Typography } from '@mui/material';

const ThoiSuTitle = ({ img, title, date }: any) => {
    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                width: '376px',
                height: '284px',
            }}
        >
            <Box
                component="img"
                src={img}
                sx={{
                    width: '352px',
                    height: '197px',
                    borderRadius: '10px',
                }}
            />
            <Typography
                variant="body1"
                sx={{
                    display: '-webkit-box',
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: 'vertical',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    maxWidth: '100%',
                    wordBreak: 'break-word',
                    textAlign: 'left',
                }}
            >
                {title}
            </Typography>
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    marginTop: '10px',
                }}
            >
                <Typography
                    variant="body2"
                    sx={{
                        color: '#637280',
                        fontSize: '0.875rem',
                        lineHeight: '1.25rem',
                    }}
                >
                    {date}
                </Typography>
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'row',
                    }}
                >
                    <Typography
                        variant="body2"
                        sx={{
                            color: 'rgb(239 82 34)',
                            fontSize: '0.875rem',
                            lineHeight: '1.25rem',
                            fontWeight: 'bold',
                        }}
                    >
                        Chi tiết
                    </Typography>
                    <Box
                        component="img"
                        src="https://futabus.vn/images/icons/arrow.svg"
                        sx={{
                            marginLeft: '8px',
                        }}
                    />
                </Box>
            </Box>
        </Box>
    );
};

export default ThoiSuTitle;
