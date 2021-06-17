import React from "react";
import "./Home.css";
import ProductCard from "./ProductCard";
import ReactDOM from "react-dom";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
import ProductCarousel from "./ProductCarousel";
function Home() {
  return (
    <main>
      <div id="top"></div>
      <div className="home">
        <div className="home__banner">
          <Carousel
            showThumbs={false}
            showIndicators={false}
            showStatus={false}
            infiniteLoop={true}
            dynamicHeight={false}
          >
            <img
              src="https://images-na.ssl-images-amazon.com/images/G/01/AmazonExports/Fuji/2021/June/Fuji_TallHero_Gamers_en_US_1x._CB667161802_.jpg"
              alt="Home Banner"
              className="home__bannerImage"
            />

            <img
              src="https://images-na.ssl-images-amazon.com/images/G/01/AmazonExports/Fuji/2020/May/Hero/Fuji_TallHero_Computers_1x._CB432469755_.jpg"
              alt="Home Banner"
              className="home__bannerImage"
            />

            <img
              src="https://images-na.ssl-images-amazon.com/images/G/01/AmazonExports/Fuji/2020/May/Hero/Fuji_TallHero_Toys_en_US_1x._CB431858161_.jpg"
              alt="Home Banner"
              className="home__bannerImage"
            />
            <img
              src="https://images-na.ssl-images-amazon.com/images/G/01/AmazonExports/Fuji/2020/May/Hero/Fuji_TallHero_Home_v2_en_US_1x._CB429090084_.jpg"
              alt="Home Banner"
              className="home__bannerImage"
            />
            <img
              src="https://images-na.ssl-images-amazon.com/images/G/01/AmazonExports/Fuji/2020/May/Hero/Fuji_TallHero_Beauty_v2_en_US_1x._CB429089975_.jpg"
              alt="Home Banner"
              className="home__bannerImage"
            />
            <img
              src="https://images-na.ssl-images-amazon.com/images/G/01/AmazonExports/Fuji/2020/May/Hero/Fuji_TallHero_45M_v2_1x._CB432458380_.jpg"
              alt="Home Banner"
              className="home__bannerImage"
            />
          </Carousel>
        </div>
        <div className="home__container marginTopMinus-100">
          <ProductCard
            type="Shop by Category"
            image={[
              {
                type: "Computers & Accessories",
                src: "https://images-na.ssl-images-amazon.com/images/G/01/AmazonExports/Fuji/2019/February/Dashboard/computer120x._SY85_CB468850970_.jpg",
              },
              {
                type: "Video Games",
                src: "https://images-na.ssl-images-amazon.com/images/G/01/AmazonExports/Fuji/2019/August/DashboardCard/PS4_120X._SY85_CB438749318_.jpg",
              },
              {
                type: "Baby",
                src: "https://images-na.ssl-images-amazon.com/images/G/01/AmazonExports/Fuji/2019/February/Dashboard/Baby120X._SY85_CB468850882_.jpg",
              },
              {
                type: "Toys & Games",
                src: "https://images-na.ssl-images-amazon.com/images/G/01/AmazonExports/Fuji/2019/February/Dashboard/Toys120X._SY85_CB468851693_.jpg",
              },
            ]}
            linkUrl="#"
            linkText="Shop now"
          />

          <ProductCard
            type="Get fit at home"
            image="https://images-na.ssl-images-amazon.com/images/G/01/events/GFAH/GWDesktop_SingleImageCard_fitathome_1x._SY304_CB434924743_.jpg"
            linkUrl="#"
            linkText="Explore now"
          />

          <ProductCard
            type="Beauty picks"
            image="https://images-na.ssl-images-amazon.com/images/G/01/AmazonExports/Fuji/2020/May/Dashboard/Fuji_Dash_Beauty_1x._SY304_CB432774351_.jpg"
            linkUrl="#"
            linkText="Shop now"
          />
          <ProductCard
            type="Get fit at home"
            image="https://images-na.ssl-images-amazon.com/images/G/01/events/GFAH/GWDesktop_SingleImageCard_fitathome_1x._SY304_CB434924743_.jpg"
            linkUrl="#"
            linkText="Explore now"
          />
        </div>
        <hr className="card-flow-row-break" />
        <div className="home__container">
          <ProductCard
            type="Oculus"
            image="https://images-na.ssl-images-amazon.com/images/G/01/AmazonExports/Fuji/2021/June/Fuji_Dash_Oculus_1x._SY304_CB667158353_.jpg"
            linkUrl="#"
            linkText="Shop now"
          />
          <ProductCard
            type="AmazonBasics"
            image="https://images-na.ssl-images-amazon.com/images/G/01/AmazonExports/Fuji/2019/July/amazonbasics_520x520._SY304_CB442725065_.jpg"
            linkUrl="#"
            linkText="See more"
          />
          <ProductCard
            type="Oculus"
            image="https://images-na.ssl-images-amazon.com/images/G/01/AmazonExports/Fuji/2021/June/Fuji_Dash_Oculus_1x._SY304_CB667158353_.jpg"
            linkUrl="#"
            linkText="See more"
          />
          <ProductCard
            type="AmazonBasics"
            image="https://images-na.ssl-images-amazon.com/images/G/01/AmazonExports/Fuji/2019/July/amazonbasics_520x520._SY304_CB442725065_.jpg"
            linkUrl="#"
            linkText="See more"
          />
        </div>
        <hr className="card-flow-row-break" />
        <div className="home__container">
          <ProductCard
            type="Gaming accessories"
            image={[
              {
                type: "Headsets",
                src: "https://images-na.ssl-images-amazon.com/images/G/01/AmazonExports/Fuji/2021/June/Fuji_Quad_Headset_1x._SY116_CB667159060_.jpg",
              },
              {
                type: "Keyboards",
                src: "https://images-na.ssl-images-amazon.com/images/G/01/AmazonExports/Fuji/2021/June/Fuji_Quad_Keyboard_1x._SY116_CB667159063_.jpg",
              },
              {
                type: "Computer mice",
                src: "https://images-na.ssl-images-amazon.com/images/G/01/AmazonExports/Fuji/2021/June/Fuji_Quad_Mouse_1x._SY116_CB667159063_.jpg",
              },
              {
                type: "Chairs",
                src: "https://images-na.ssl-images-amazon.com/images/G/01/AmazonExports/Fuji/2021/June/Fuji_Quad_Chair_1x._SY116_CB667159060_.jpg",
              },
            ]}
            linkUrl="#"
            linkText="See more"
          />
          <ProductCard
            type="Find your ideal TV"
            image="https://images-na.ssl-images-amazon.com/images/G/01/AmazonExports/Fuji/2020/May/Dashboard/Fuji_Dash_TV_2X._SY304_CB432517900_.jpg"
            linkUrl="#"
            linkText="See more"
          />
          <ProductCard
            type="Computers & Accessories"
            image="https://images-na.ssl-images-amazon.com/images/G/01/AmazonExports/Fuji/2020/May/Dashboard/Fuji_Dash_PC_1x._SY304_CB431800965_.jpg"
            linkUrl="#"
            linkText="Shop now"
          />
          <ProductCard
            type="Gaming accessories"
            image={[
              {
                type: "Headsets",
                src: "https://images-na.ssl-images-amazon.com/images/G/01/AmazonExports/Fuji/2021/June/Fuji_Quad_Headset_1x._SY116_CB667159060_.jpg",
              },
              {
                type: "Keyboards",
                src: "https://images-na.ssl-images-amazon.com/images/G/01/AmazonExports/Fuji/2021/June/Fuji_Quad_Keyboard_1x._SY116_CB667159063_.jpg",
              },
              {
                type: "Computer mice",
                src: "https://images-na.ssl-images-amazon.com/images/G/01/AmazonExports/Fuji/2021/June/Fuji_Quad_Mouse_1x._SY116_CB667159063_.jpg",
              },
              {
                type: "Chairs",
                src: "https://images-na.ssl-images-amazon.com/images/G/01/AmazonExports/Fuji/2021/June/Fuji_Quad_Chair_1x._SY116_CB667159060_.jpg",
              },
            ]}
            linkUrl="#"
            linkText="See more"
          />
        </div>
        <hr className="card-flow-row-break" />

        {/* TOP SELLER */}
        <div className="top-seller">
          <ProductCarousel
            title="Top Beauty & Personal Care products"
            urlLink="#"
            items={[
              "https://m.media-amazon.com/images/I/41+OcSh2YsL._AC_SY200_.jpg",
              "https://m.media-amazon.com/images/I/41yn8u3qJPL._AC_SY200_.jpg",
              "https://m.media-amazon.com/images/I/51+8z0H7zGL._AC_SY200_.jpg",
              "https://m.media-amazon.com/images/I/51tyP0EgjUL._AC_SY200_.jpg",
              "https://m.media-amazon.com/images/I/31YWXtNkeKL._AC_SY200_.jpg",
              "https://m.media-amazon.com/images/I/51EnREs7ElL._AC_SY200_.jpg",
              "https://m.media-amazon.com/images/I/41RNHlao-eL._AC_SY200_.jpg",
              "https://m.media-amazon.com/images/I/41RNHlao-eL._AC_SY200_.jpg",
              "https://m.media-amazon.com/images/I/51ULZnzPZbS._AC_SY200_.jpg",
              "https://m.media-amazon.com/images/I/51EJjGyLVpL._AC_SY200_.jpg",
              "https://m.media-amazon.com/images/I/51ULZnzPZbS._AC_SY200_.jpg",
            ]}
          />
        </div>
        <hr className="card-flow-row-break" />
        <div className="best-seller">
          <ProductCarousel
            title="Best Sellers in Baby"
            urlLink="#"
            items={[
              "https://i.picsum.photos/id/395/270/200.jpg?hmac=VlRXRM28VlXb7lnmxDdW4bX73aXyNNnNAahmgl-Fg6g",
              "http://placeimg.com/640/480/food",
              "http://placeimg.com/640/480",
              "http://placeimg.com/640/480/technics",
              "http://placeimg.com/640/480/sports",
              "http://placeimg.com/640/480/nightlife",
              "http://placeimg.com/640/480/abstract",
              "http://placeimg.com/640/480/transport",
              "http://placeimg.com/640/480/city",
              "http://placeimg.com/640/480/fashion",
              "http://placeimg.com/640/480/abstract",
              "http://placeimg.com/640/480/cats",
              "http://placeimg.com/640/480/sports",
              "http://placeimg.com/640/480/abstract",
            ]}
          />
        </div>
        <hr className="card-flow-row-break" />
        <div className="home__container">
          <ProductCard
            type="Comfy styles for her"
            image={[
              {
                type: "Agent",
                src: "http://placeimg.com/640/480/sports",
              },
              {
                type: "Administrator",
                src: "http://placeimg.com/640/480/cats",
              },
              {
                type: "Planner",
                src: "http://placeimg.com/640/480/transport",
              },
              {
                type: "Director",
                src: "http://placeimg.com/640/480/city",
              },
            ]}
            linkUrl="#"
            linkText="See more"
          />
          <ProductCard
            type="Shop Laptops & Tablets"
            image="https://images-na.ssl-images-amazon.com/images/G/01/AmazonExports/Fuji/2020/May/Dashboard/Fuji_Dash_Laptops_379x304_1X_en_US._SY304_CB418608471_.jpg"
            linkUrl="#"
            linkText="See more"
          />
          <ProductCard
            type="Explore home bedding"
            image="https://images-na.ssl-images-amazon.com/images/G/01/AmazonExports/Fuji/2020/May/Dashboard/Fuji_Dash_HomeBedding_Single_Cat_1x._SY304_CB418596953_.jpg"
            linkUrl="#"
            linkText="See more"
          />
          <ProductCard
            type="Gaming merchandise"
            image={[
              {
                type: "Vella",
                src: "http://placeimg.com/640/480/business",
              },
              {
                type: "Marty",
                src: "http://placeimg.com/640/480/abstract",
              },
              {
                type: "Miguel",
                src: "http://placeimg.com/640/480/fashion",
              },
              {
                type: "Nathanial",
                src: "https://dummyimage.com/270x200/333.png?text=fashion",
              },
            ]}
            linkUrl="#"
            linkText="See more"
          />
        </div>
        <hr className="card-flow-row-break" />
        <div className="top-seller">
          <ProductCarousel
            title="Our favorite Toys"
            urlLink="#"
            items={[
              "http://loremflickr.com/g/270/200/toys",
              "http://lorempixel.com/g/270/200/abstract/toys",
              "http://placeimg.com/640/480/transport",
              "http://placeimg.com/640/480/cats",
              "http://placeimg.com/640/480/nightlife",
              "http://placeimg.com/640/480/nature",
              "http://placeimg.com/640/480/business",
              "http://placeimg.com/640/480/technics",
            ]}
          />
        </div>
        <hr className="card-flow-row-break" />
        <div className="top-seller">
          <ProductCarousel
            title="Best Sellers in Kitchen"
            urlLink="#"
            items={[
              "http://loremflickr.com/g/270/200/fashion",
              "http://loremflickr.com/g/270/200/sports",
              "http://loremflickr.com/g/270/200/landscape",
              "http://loremflickr.com/g/270/200/shadow",
              "http://loremflickr.com/g/270/200/shark",
              "http://loremflickr.com/g/270/200/sea",
              "http://loremflickr.com/g/270/200/sand",
              "http://loremflickr.com/g/270/200/sun",
              "http://loremflickr.com/g/270/200/flower",
              "http://loremflickr.com/g/270/200/rainbow",
            ]}
          />
        </div>
      </div>
    </main>
  );
}

export default Home;
