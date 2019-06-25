import React, { Component } from 'react';
import styled from 'styled-components';
import "../../node_modules/react-image-gallery/styles/css/image-gallery.css";
import ImageGallery from 'react-image-gallery';
import MainImage1 from '../images/index-image1.jpg';
import ThumImage1 from '../images/index-image1-thumb.jpg';
import MainImage2 from '../images/index-image2.jpg';
import ThumImage2 from '../images/index-image2-thumb.jpg';
import MainImage3 from '../images/index-image3.jpg';
import ThumImage3 from '../images/index-image3-thumb.jpg';
import MainImage4 from '../images/index-image4.jpg';
import ThumImage4 from '../images/index-image4-thumb.jpg';
const Wrapper = styled.div`
    padding-top : 80px;
    width : 85%;
    margin : 0 auto;
    
`

const images = [
    {
      original: MainImage1,
      thumbnail: ThumImage1
    },
    {
      original: MainImage2,
      thumbnail: ThumImage2
    }
];

class Index extends Component {
    render() {
        return (
            <Wrapper>
                <ImageGallery 
                    items={images} 
                    showFullscreenButton={false}
                    useBrowserFullscreen={false}
                    showPlayButton={false}
                    infinite={false}/>
            </Wrapper>
        );
    }
}

export default Index;