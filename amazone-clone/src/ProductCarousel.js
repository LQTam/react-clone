import React from 'react'
// import "react-responsive-carousel/lib/styles/carousel.min.css"; 
// import { Carousel } from 'react-responsive-carousel'

import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import './ProductCarousel.css'
function ProductCarousel({title,urlLink,items}) {
	const responsive = {
  superLargeDesktop: {
    // the naming can be any, depends on you.
    breakpoint: { max: 4000, min: 3000 },
    items: 6,
    slidesToSlide: 6 // optional, default to 1.
  },
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 5,
    slidesToSlide: 5 // optional, default to 1.
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 2,
    slidesToSlide: 2 // optional, default to 1.
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
    slidesToSlide: 1 // optional, default to 1.
  }
	};
	return (
		<div className="product-carousel">
			<div className='product-carouselLineOne'>
				<h3 className='product-carouselTitle'>{title}</h3>
				<a href={urlLink}>Shop now</a>
			</div>
			<div className='product-carouselList'>
				<Carousel responsive={responsive}>
					{Array.isArray(items)? items.map((item,key) => <a key={key} href='#'>
						<img src={item} alt='Product Item' />
					</a>	
						) : <></>}
				</Carousel>
			</div>
		</div>
	)
}
export default ProductCarousel