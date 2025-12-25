import React, { useMemo } from 'react';
import S from './style';
import { useQuery } from '@tanstack/react-query';

const MainCategorySide = ({ searchRegion }) => {

    const formatKorean = (date, showYear = false) => {
        const year = date.getFullYear();
        const month = date.getMonth() + 1;
        const day = date.getDate();
        return showYear ? `${year}년${month}월${day}일` : `${month}월${day}일`;
    };

    const getParkingLot = async () => {
        let url = `${process.env.REACT_APP_BACKEND_URL}/school/parking-lot`;
        if (searchRegion) {
            url = `${process.env.REACT_APP_BACKEND_URL}/school/search-parking-by-region?region=${encodeURIComponent(searchRegion)}`;
        }

        const response = await fetch(url);
        const parks = await response.json();
        return parks.data;
    }

    const { data } = useQuery({
        queryKey: ['parks', searchRegion], 
        queryFn: getParkingLot,
        select: (data) => data.map(item => ({ id: item.id, schoolName: item.schoolName, schoolImageName: item.schoolImageName }))
    });
    
    const parkingLot = data ?? [];


    const getPlaceLot = async () => {
        let url = `${process.env.REACT_APP_BACKEND_URL}/school/find-not-exist-school`;

        if (searchRegion) {
            url = `${process.env.REACT_APP_BACKEND_URL}/school/search-place-by-region?region=${encodeURIComponent(searchRegion)}`;
        }

        const response = await fetch(url);
        const places = await response.json();
        return places.data;
    }

    const { data: placeData } = useQuery({
        queryKey: ['places', searchRegion],
        queryFn: getPlaceLot,
        select: (data) => data.map(item => ({ id: item.id, schoolName: item.schoolName, schoolImageName: item.schoolImageName }))
    });

    const placeLot = placeData ?? [];


    return (
        <div>
           <S.Wrap>
            <S.CategoryParkingWrap>
                <S.CategoryTitleWrap>
                    <p>
                        {searchRegion ? `'${searchRegion}' 주차 가능한 학교` : '현재 주차 가능한 학교'}
                    </p>
                </S.CategoryTitleWrap>
            </S.CategoryParkingWrap>

            <S.CategoryMiddleWrap>
                <S.CategoryImageWrap>
                    {parkingLot.length === 0 ? (
                        <p>{searchRegion ? '검색 결과가 없습니다.' : '로딩중...'}</p>
                    ) : (
                        parkingLot.map(data => {
                            const imgName = data?.schoolImageName ?? '';
                            const imgSrc = `http://localhost:10000/images/${encodeURIComponent(imgName)}`;
                            return (
                                <S.CategoryImages to={`/reserve/parking/${data.id}`} key={data.id}>
                                    <img src={imgSrc} alt={data.schoolName || '학교 이미지'} />
                                    <S.CategoryImageTitle>{data.schoolName}</S.CategoryImageTitle>
                                    <S.CategoryImagePrice>₩ 30,000</S.CategoryImagePrice>
                                </S.CategoryImages>
                            )
                        })
                    )}
                </S.CategoryImageWrap>
            </S.CategoryMiddleWrap>

            <S.CategoryPlaceWrap>
                <S.CategoryTitleWrap>
                    <p>
                        {searchRegion ? `'${searchRegion}' 장소 대여 가능한 학교` : '현재 장소대여 가능한 학교'}
                    </p>
                </S.CategoryTitleWrap>
            </S.CategoryPlaceWrap>

            <S.CategoryMiddleWrap>
                <S.CategoryImageWrap>
                    {placeLot.length === 0 ? (
                        <p>{searchRegion ? '검색 결과가 없습니다.' : '로딩중...'}</p>
                    ) : (
                        placeLot.map(data => {
                            const imgName = data?.schoolImageName ?? '';
                            const imgSrc = `http://localhost:10000/images/${encodeURIComponent(imgName)}`;
                            return (
                                <S.CategoryImages to={`/reserve/place/${data.id}`} key={data.id}>
                                    <img src={imgSrc} alt={data.schoolName || '학교 이미지'} />
                                    <S.CategoryImageTitle>{data.schoolName}</S.CategoryImageTitle>
                                    <S.CategoryImagePrice>₩ 50,000</S.CategoryImagePrice>
                                </S.CategoryImages>
                            )
                        })
                    )}
                </S.CategoryImageWrap>
            </S.CategoryMiddleWrap>
           </S.Wrap>
        </div >
    );
};

export default MainCategorySide;