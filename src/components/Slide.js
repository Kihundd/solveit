import React from 'react';
import { Slide } from 'react-slideshow-image';
import 'react-slideshow-image/dist/styles.css';

const slideImages = [
  {
    url: '/SlideImg1.png',
    caption: 'Slide 1'
  },
  {
    url: '/SlideImg2.jpg',
    caption: 'Slide 2'
  },
  {
    url: '/SlideImg3.jpg',
    caption: 'Slide 3'
  },
];
const Slideshow = () => {
    return (
      <div className="slide-container">
        <Slide>
         {slideImages.map((slideImage, index)=> (
            <div className="each-slide" key={index}>
              <div>
                <img src='/SlideImg1.png' />
              </div>
              <span>{slideImage.caption}</span>
            </div>
          ))} 
        </Slide>
      </div>
    )
}
export default Slideshow