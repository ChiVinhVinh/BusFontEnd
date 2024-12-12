import React, { useState, useEffect } from "react";
import { Box, Typography, IconButton } from "@mui/material";
import { styled } from "@mui/system";
const CarouselContainer = styled(Box)({
    overflow: "hidden",
    width: "100%",
    position: "relative",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    marginTop: "5rem",
});

const Title = styled(Typography)({
    color: "#00613D",
    textTransform: "uppercase",
    fontSize: "28px",
    fontWeight: "bold",
    lineHeight: "33px",
    marginBottom: "2rem",
});

const ImageList = styled(Box)({
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    transition: "transform 0.5s ease-in-out",
});

const StyledImage = styled("img")({
    width: "351px",
    height: "190px",
    objectFit: "cover",
    marginRight: "32px",
    marginTop: "3rem",
    marginBottom: "5rem",
    borderRadius: "10px",
    boxShadow: "0px 4px 10px rgba(0, 0, 1, 0.8)",
});

const DotList = styled(Box)({
    display: "flex",
    flexDirection: "row",
    gap: "10px",
    justifyContent: "center",
    marginTop: "-2rem",
    padding: "0",
    listStyle: "none",
});

const Dot = styled(IconButton)(({ isActive }: { isActive: boolean }) => ({
    width: isActive ? "28px" : "10px",
    height: "10px",
    borderRadius: isActive ? "100px" : "50%",
    backgroundColor: isActive ? "#EF5222" : "#E4E3E3",
    cursor: "pointer",
    transition: "background-color 0.3s ease",
}));
const ListImg = [
    {
        img: [
            "https://cdn.futabus.vn/futa-busline-web-cms-prod/343_x_184_px_x4_4fd05509ef/343_x_184_px_x4_4fd05509ef.jpg",
            "https://cdn.futabus.vn/futa-busline-web-cms-prod/2_343_x_184_px_f365e0f9c8/2_343_x_184_px_f365e0f9c8.png",
            "https://cdn.futabus.vn/futa-busline-web-cms-prod/343_x_184_px_0b1588190d/343_x_184_px_0b1588190d.png",
        ],
        index: 1,
    },
    {
        img: [
            "https://cdn.futabus.vn/futa-busline-web-cms-prod/VNPAYFUTA_67_Resize_343_x_184_bd2e13cd77/VNPAYFUTA_67_Resize_343_x_184_bd2e13cd77.png",
            "https://cdn.futabus.vn/futa-busline-web-cms-prod/343x184_ea6055b4a6/343x184_ea6055b4a6.png",
            "https://cdn.futabus.vn/futa-busline-cms-dev/343x184_4x_29d182ce55/343x184_4x_29d182ce55.png",
        ],
        index: 2,
    },
    {
        img: [
            "https://cdn.futabus.vn/futa-busline-cms-dev/343x184_4x_29d182ce55/343x184_4x_29d182ce55.png",
            "https://cdn.futabus.vn/futa-busline-web-cms-prod/Zalo_11b66ecb81/Zalo_11b66ecb81.png",
            "https://cdn.futabus.vn/futa-busline-cms-dev/Banner_FUTA_Pay_2_57b0471834/Banner_FUTA_Pay_2_57b0471834.png",
        ],
        index: 3,
    },
];

const TitleForm = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const pages = ListImg.length;

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentPage((prevPage) => (prevPage % pages) + 1);
        }, 10000);
        return () => clearInterval(interval);
    }, [pages]);

    const handleClick = (page: number) => {
        setCurrentPage(page);
    };

    return (
        <CarouselContainer>
            <Title>Khuyến mãi nổi bật</Title>
            <ImageList>
                {ListImg[currentPage - 1].img.map((img, index) => (
                    <StyledImage key={index} src={img} />
                ))}
            </ImageList>
            <DotList>
                {ListImg.map((item) => (
                    <Dot
                        key={item.index}
                        isActive={currentPage === item.index}
                        onClick={() => handleClick(item.index)}
                    />
                ))}
            </DotList>
        </CarouselContainer>
    );
};
export default TitleForm;
