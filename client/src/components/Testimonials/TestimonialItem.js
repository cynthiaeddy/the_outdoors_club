import './Testimonials.css'
import { BsFillArrowRightCircleFill } from 'react-icons/bs'

export const TestimonialItem = ({ data, isOpen, btnOnClick }) => {
  return (
    <>
      <div className={`card ${isOpen ? 'flip' : 'no_flip'}`}>
        {isOpen ? (
          <div className='back'>
            <h4 className='quote'>
              <div className='box-testimonial'></div>
              {data.back.quote}
              <span className='byline'>{data.back.byline}</span>
            </h4>
            <button
              className={`flipCard-button card ${isOpen ? 'flip' : 'no_flip'}`}
              onClick={btnOnClick}
            >
              <BsFillArrowRightCircleFill />
            </button>
          </div>
        ) : (
          <div className='front'>
            <img
              src={data.front.img}
              className='front-img'
              alt={data.front.img}
            />

            <button
              className={`flipCard-button card ${isOpen ? 'flip' : 'no_flip'}`}
              onClick={btnOnClick}
            >
              <BsFillArrowRightCircleFill />
            </button>
          </div>
        )}
      </div>
    </>
  )
}
