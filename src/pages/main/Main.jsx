import React, { useState } from 'react'; // useState 추가
import { useSearchParams } from 'react-router-dom';
import useOAuthCallback from '../../hooks/useOAuthCallback';
import S from './style';
import MainBanner from './mainbanner/MainBanner';
import MainCategorySide from './maincategoryside/MainCategorySide';

const Main = () => {
  const [searchParams] = useSearchParams();
  const key = searchParams.get('key');

  useOAuthCallback(key);

  const [searchRegion, setSearchRegion] = useState('');

  const handleSearch = (region) => {
    setSearchRegion(region);
  };

  return (
    <div>
      <S.MainWrap>
        <MainBanner onSearch={handleSearch} />
        <MainCategorySide searchRegion={searchRegion} />
      </S.MainWrap>
    </div>
  );
};

export default Main;