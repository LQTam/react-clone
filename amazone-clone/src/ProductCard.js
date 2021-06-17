import React from 'react'
import './ProductCard.css'
import ProductThumb from './ProductThumb'
function ProductCard({type,image,linkUrl,linkText}) {
	return (
		<div className='product__card'>
			<h2 className='product__type'>
				{type}
			</h2>
			{Array.isArray(image) ? <ProductThumb products={image} /> : <img className='product__cardImage' src={image} alt='Product Image' />}
			<a className='product__link' href={linkUrl}>{linkText}</a>
		</div>
	)
}

export default ProductCard
