import React, { useEffect, useRef, useState } from 'react'
import { Box, Button, styled } from '@mui/material'
import { uploadImage } from '../services/api';
import left_img from './images/left-side.png'
import right_img from './images/right-side.png'

const Container = styled(Box)`
    display: flex;
    height: 100vh;
`;

const StyledButton = styled(Button)`
    font-size: 20px;
    width: 30%;
    margin: 100px auto 20px auto;
`;

const MiddleBox = styled(Box)`
    width: 80%;
    text-align: center;
    margin: auto;
`;

const MidBoxWrapper = styled(Box)`
    width: 70%;
    height: 50vh;
    display:flex;
    flex-direction:column;
    align-items: center;
    padding: 10px;
    margin: auto;
    border: 20px solid transparent;
    padding: 20px;
    border-image: url(https://webstockreview.net/images/golden-border-png-10.png) 80 round;

    & > h1 {
        font-size: 40px;
        color: green;
    }

    & > p {
        font-size: 20px;
    }
`;

const Image = styled('img')({
    width: '100%',
    height: '100%'
})

const Home = () => {
    const inputRef = useRef();
    const [file, setFile] = useState('');
    const [imgURL, setImgUrl] = useState('');

    const handleClick = () => {
        inputRef.current.click();
    }

    const handleChange = (e) => {
        setFile(e.target.files[0]);
    }

    useEffect(() => {
        const getImage = async () => {
            if (file) {
                const data = new FormData();
                data.append('name', file.name);
                data.append('file', file);

                let response = await uploadImage(data);
                setImgUrl(response.data.path);
            }
        }
        getImage();
        // eslint-disable-next-line
    }, [file])

    return (
        <Container>
            <Box>
                <Image src={left_img} alt="left-img" />
            </Box>
            <MiddleBox>
                <MidBoxWrapper>
                    <h1>Simple File Sharing!</h1>
                    <p>Upload and Share the download link</p>
                    <input type="file" ref={inputRef} onChange={(e) => handleChange(e)} style={{ display: 'none' }} />
                    <StyledButton variant='contained' onClick={() => handleClick()}>Upload</StyledButton>
                    <a href={imgURL} style={{ marginTop: 30 }}>{imgURL}</a>
                </MidBoxWrapper>
            </MiddleBox>
            <Box>
                <Image src={right_img} alt="right-img" />
            </Box>
        </Container>
    )
}

export default Home
