import React, { useState } from 'react';
import S from './style';
import KakaoMap from '../map/KakaoMap';
import InfoCard from '../infocard/InfoCard';

const MainBanner = ({ onSearch }) => {
    const [selected, setSelected] = useState(null);
    
    const [searchCategory, setSearchCategory] = useState('place');
    const [searchRegion, setSearchRegion] = useState('');

    const handleSelect = (payload) => {
        setSelected(prev => (prev?.id === payload?.id ? null : payload));
    }

    const handleSearch = () => {
        console.log("MainBanner 검색 버튼 클릭됨:", searchRegion);
        if (onSearch) {
            onSearch(searchRegion); // 입력된 지역명을 부모로 보냄
        }
    };

    const handleOnKeyPress = (e) => {
        if (e.key === 'Enter') {
            handleSearch();
        }
    };

    return (
        <div>
            <S.BannerWrap>
                <S.ContentRow>
                    <S.MapPane>
                        <KakaoMap onSelect={handleSelect} selected={selected} />
                    </S.MapPane>
                    <S.SidePane>
                        <InfoCard selected={selected} />
                        <S.IsClosedSchoolWrap to={`/movie`}><p>무료 자동차 극장 예약하기</p></S.IsClosedSchoolWrap>
                    </S.SidePane>
            
                        <S.SearchWrap>
                            <S.FieldItem style={{ flex: 2 }}>
                                <div id='select-place' style={{ width: '100%' }}>
                                    <label>지역</label>
                                    <input 
                                        type="text" 
                                        placeholder="서울" 
                                        value={searchRegion}
                                        onChange={(e) => setSearchRegion(e.target.value)}
                                        onKeyPress={handleOnKeyPress} // 엔터키 이벤트 연결
                                        style={{ width: '80%' }} 
                                    />
                                </div>
                            </S.FieldItem>
                            <S.SearchButton aria-label="검색" onClick={handleSearch}> 
                                <img src="/assets/images/schoolsearch.png" alt="검색버튼" /> 
                            </S.SearchButton>
                        </S.SearchWrap>
                    
                </S.ContentRow>
            </S.BannerWrap>
            
        </div>
    );
};

export default MainBanner;