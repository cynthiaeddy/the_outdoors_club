import { useEffect } from 'react'
import { Carousel } from 'react-responsive-carousel'
import { useLocation } from 'react-router-dom'
import FaqData from '../../components/Faqs/FaqData'
import CarouselData from '../../components/Carousel/CarouselData'
import { MemberPlan } from '../../components/MemberPlan/MemberPlan'
import 'react-responsive-carousel/lib/styles/carousel.min.css'
import './Home.css'

export const Home = ({ isMobile = true }) => {
  const location = useLocation()

  useEffect(() => {
    if (location.hash) {
      let elem = document.getElementById(location.hash.slice(1))
      if (elem) {
        elem.scrollIntoView({ behavior: 'smooth' })
      }
    } else {
      window.scrollTo({ top: 0, left: 0, behavior: 'smooth' })
    }
  }, [location])

  return (
    <div className='HomeWrapper' id='HomeWrapper'>
      <div className={`carousel-wrapper  ${!isMobile ? '' : ' mobile'}`}>
        {isMobile ? (
          <Carousel
            className='carousel-style home'
            showThumbs={false}
            infiniteLoop
            autoPlay
            interval={4000}
            transitionTime={1000}
            showIndicators={false}
            showStatus={false}
            showArrows={true}
          >
            {CarouselData.map((data, index) => (
              <div key={index} className='carousel-img'>
                <img src={data.img.props.src} alt={data.img.props.ariaLabel} />
              </div>
            ))}
          </Carousel>
        ) : (
          <Carousel
            className='carousel-style home'
            showThumbs={false}
            infiniteLoop={true}
            autoPlay
            interval={4000}
            transitionTime={1000}
            showIndicators={false}
            centerMode
            centerSlidePercentage={65}
            showStatus={false}
            showArrows={true}
          >
            {CarouselData.map((data, index) => (
              <div key={index} className='carousel-img'>
                <img src={data.img.props.src} alt={data.img.props.src} />
              </div>
            ))}
          </Carousel>
        )}
      </div>
      <h3 className='Home_about-text'>
        The Outdoors Club is dedicated to developing interest, appreciation and
        knowledge of our natural environment and local attractions by leading
        walks and hikes in parks, pathways, urban locales and historical
        neighborhoods.
      </h3>
      <section className='ComponentContainer home' id='membership'>
        <MemberPlan />
        <FaqData />
      </section>
    </div>
  )
}
