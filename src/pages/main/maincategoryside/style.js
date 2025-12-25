import styled from "styled-components";
import { h5Medium, h7Bold, h8Medium } from "../../../styles/common";
import { Link } from "react-router-dom";

const S = {};


S.CategoryParkingWrap = styled.div`
    width: 100%;
    display: flex;
    justify-content: center;
`

S.CategoryPlaceWrap = styled.div`
    width: 100%;
    display: flex;
    justify-content: center;
    margin-top: 45px;
`

S.CategoryTitleWrap = styled.div`
    width: 1160px;
    display: flex;
    margin-bottom: 20px;
    ${h5Medium}
`

S.CategoryMiddleWrap = styled.div`
    width: 100%;
    display: flex;
    justify-content: center;
`

S.CategoryImageWrap = styled.div`
    width: 1160px;
    display: flex;
    flex-wrap: wrap; 
    justify-content: flex-start; 
    gap: 53px; 
    row-gap: 50px; 
`

S.CategoryImages = styled(Link)`
    display: flex;
    flex-direction: column;
    text-decoration: none; 
    color: inherit;

    img {
        width: 250px;
        height: 237px;
        border-radius: 20px;
        object-fit: cover; 
    }
`

S.CategoryImageTitle = styled.p`
    ${h7Bold}
    margin-top: 10px; 
`

S.CategoryImageDate = styled.p`
    ${h8Medium}
    line-height: 16px;
`

S.CategoryImagePrice = styled.p`
    ${h8Medium}
    margin-top: -5px;
`

S.Wrap = styled.div`
    margin: -150px 0 0 0; 
    
    padding: 0 0 10px 0; 
    
    height: auto; 
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
`

export default S;