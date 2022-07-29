import React, { useLayoutEffect, useState } from 'react'
import {newsData} from '../utils/newsData'
import { RiArrowLeftSLine,RiArrowRightSLine} from 'react-icons/ri'

const News = () => {
    const [start, setStart] = useState(0);
    const [items, setItems] = useState(newsData.slice(0,3))
    const [width, height] = useWindowSize();

    const handleNext = () =>{
        if(start === 3){
            let newstart = start - 3
            setStart(newstart)
            setItems(newsData.slice(newstart,newstart+3))
        }
        else{
            let newstart = start + 3
           setStart(newstart )
            setItems(newsData.slice(newstart,newstart+3))
        } 
    }

    const handlePrev = () =>{
        if(start === 0){
            let newstart = start + 3
            setStart(newstart)
             setItems(newsData.slice(newstart,newstart+3))
        }else{
            let newstart = start - 3
            setStart(newstart)
            setItems(newsData.slice(newstart,newstart+3))
        }
    }

    function useWindowSize() {
        const [size, setSize] = useState([0, 0]);
        useLayoutEffect(() => {
          function updateSize() {
            setSize([window.innerWidth, window.innerHeight]);
          }
          window.addEventListener('resize', updateSize);
          updateSize();
          return () => window.removeEventListener('resize', updateSize);
        }, []);
        return size;
      }

  return (
    <section className='news-section'>
        <h1>Top News</h1>
        {
            width> 1200 ?
       
        <div className='news-carousel'>  
            <button onClick={handlePrev}><RiArrowLeftSLine size={30} /></button>
            {
                items.map((item,index)=>{
                    return (
                        <div key={index} className='single-news'>
                            <img src={item.image} alt={item.info} />
                            <h5>{item.text}</h5>
                            <p>{item.info}</p>
                        </div>
                    )
                })
            }
            <button onClick={handleNext}><RiArrowRightSLine size={30}/></button>
        </div>
        :
        <div className='news-carousel' style={{flexDirection:'column'}}>  
        {
            newsData.map((item,index)=>{
                return (
                    <div key={index} className='single-news'>
                        <img src={item.image} alt={item.info} />
                        <h5>{item.text}</h5>
                        <p>{item.info}</p>
                    </div>
                )
            })
        }
        
    </div>

        }
    </section>
  )
}

export default News