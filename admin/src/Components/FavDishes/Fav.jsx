import React from 'react'
import {data} from '../../../../frontend/src/restApi.json';
import './Fav.css'; 
const Fav = () => {
  return (
    <>
    <section className='menu' id='menu'>
        <div className="container">
            <div className="heading_section">
                <h1 className="heading">Favorite DISHES</h1>
               
            </div>
            <div className="dishes_container">
                {
                    data[0].dishes.map(element => (
                        <div className="card" key={element.id}>
                                {/* <img src={element.image} alt={element.title} /> */}
                                <h3>{element.title}</h3>
                                <button>{element.category}</button>
                        </div>
                    ))
                }   
            </div>
        </div>
        <p>fav dishes.....that comes from the feedback form from users..!</p>
      </section>
     
    </>
)
}

export default Fav;
