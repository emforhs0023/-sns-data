import React, { useState} from 'react';
import PropTypes from 'prop-types';
import { Icon } from 'antd';
import Slick from 'react-slick';
import styled from 'styled-components';
import { Overlay, Header, CloseBtn, SlickWrapper, ImgWrapper, Indicator } from './style';


const ImagesZoom = ({ images, onClose }) => {
    const [currentSlide, setCurrentSlide] = useState(0);

    return (  
        <Overlay>
            <Header>
                <h1>상세 이미지</h1>
                <CloseBtn type="close" onClick={onClose} />
            </Header>
            <SlickWrapper>
                <div>
                    <Slick
                        initialSlide={0} // 몇번째 이미지를 보여 줄지
                        afterChange={slide => setCurrentSlide(slide)} // 현재 인덱스를 변경
                        infinite={false} // 무한 슬라이드 
                        arrows
                        slidesToShow={1} // 한번에 한장만
                        slidesToScroll={1} // 한번에 한장만 스크롤 
                    >
                        {images.map((v) => {
                            return (
                                <ImgWrapper>
                                    <img src={`http://localhost:3065/${v.src}`} />
                                </ImgWrapper>
                            );
                        })}
                    </Slick>
                    <Indicator>
                        <div>
                            {currentSlide + 1} / {images.length}
                        </div>
                    </Indicator>
                </div>
            </SlickWrapper>
        </Overlay>
    );
};

ImagesZoom.propTypes = {
    images: PropTypes.arrayOf(PropTypes.shape({
        src: PropTypes.string,
    })).isRequired,
    onClose: PropTypes.func.isRequired,
};

export default ImagesZoom;