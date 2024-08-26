import React, { useState, useEffect } from 'react'
import './style.css';

export default function ScrollIndicator({url}) {
    // data : Contient les produits récupérés depuis l'API.
    const [data, setData] = useState([]);
    // loading : Indique si les données sont en cours de chargement.
    const [loading, setLoading] = useState(false);
    // errorMessage : Contient un message d'erreur en cas d'échec de la récupération des données.
    const [errorMessage, setErrorMessage] = useState('');
    // scrollPercentage : Stocke le pourcentage de défilement de la page.
    const [scrollPercentage, setScrollPercentage] = useState(0);
    

    async function fetchData(getUrl) {
        try {
            setLoading(true);
            const response = await fetch(getUrl);
            const data = await response.json();


            if (data && data.products && data.products.length > 0) {
                setData(data.products);
                setLoading(false)
            }
            
        } catch (e) {
            console.log(e);
            setErrorMessage(e.message)
        }
    }

    useEffect(() =>{
        fetchData(url);
    }, [url]);

    function handleScrollPercentage() {
        console.log(document.body.scrollTop, 
            document.documentElement.scrollTop, 
            document.documentElement.scrollHeight, 
            document.documentElement.clientHeight);

         //  howmuchScrolled permet d'obtenir la position de defilement vertical de la page quelque soit le navigateur utilise
    
        const howMuchScrolled = document.body.scrollTop || document.documentElement.scrollTop;

        const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;

        setScrollPercentage((howMuchScrolled /height) * 100);
    }
   
    useEffect(() =>{
        window.addEventListener('scroll', handleScrollPercentage)
        return () =>{
            window.removeEventListener('scroll', ()=>{} )
        }
    }, [])

    // console.log(data, loading);
    
    console.log(data, scrollPercentage);

    if (loading) {
        return <div> Loading data please wait</div>
    }

    if (errorMessage) {
        return <div>Error ! {errorMessage}</div>
    }
    
  return (
    <div>
        <div className="top-container">
            <h1>Custum Scroll Indicator</h1>
            <div className='scroll-progress-tracking-container'>
                <div className='current-progress-bar' style={{width: `${scrollPercentage}%`}}></div>
            </div>
        </div>
        
        <div className='data-container'>
            {
                data && data.length > 0 
                ? data.map((dataItem) => <p key={dataItem.id}>{dataItem.title}</p>) 
                : null
            }
        </div>
    </div>
  )
}
