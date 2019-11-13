import React, {useState, useEffect} from "react"
import api from "./Api"
import axios from "axios"
import ReactDOM from 'react-dom'
import FavoriteList from "./FavoriteList"


function Homepage() {

    let favorites = [];

    let user = localStorage.getItem("CognitoIdentityServiceProvider.kih6th6mjfivrhisimmkplm6.LastAuthUser")


    const [showFavoriteList, setShowFavoriteList] = useState(true)

    function hideMe(){
        setShowFavoriteList(!showFavoriteList);

    }



    const [channels, setChannels] = useState([])

    const [currentChannel, setCurrentChannel] = useState({})

    const currentViewing = (channel) => {
        let currentView = channel
        setCurrentChannel(currentView)
    }


    const getUser = async () => {
        const response = await axios.get('/user', {
            params: {
              username: user
            }
        })
        favorites = response.data.favorites;
        console.log(response.data)
        console.log(favorites)
        fetchData();
    };


    const deleteFavorite = (streamer) => {
        // console.log('the streamer', streamer);
        axios.delete(`/deleteFavorite/${user}/${streamer}`).then((res) => {
            getUser()
        })

    }

    const fetchData = async () => {
        
        let baseURL = `https://api.twitch.tv/helix/streams?`
        let queryParams = ''
        // console.log("PEEEEEEE", favorites)
        favorites.forEach(name => {
            queryParams += `user_login=${name}&`;
        })

    
        setCurrentChannel(favorites[0])

        let finalURL = baseURL + queryParams

        // console.log(finalURL)

        const result = await api.get(finalURL)

        // console.log(result.data.data)

        setChannels(result.data.data)


        
    }
    useEffect(() => {
        getUser();
    }, [])

    return(

    <div className="mainBody">
          <div className="row" style={{ marginLeft: '0', marginRight: '0'}}>

              <div className="favoriteWrapper">

                {showFavoriteList &&    
                    <FavoriteList channels={channels} currentViewing={currentViewing} deleteFavorite={deleteFavorite} />
                }
            </div>

        </div>
            <div className="hideButtonContainer">
                <button className="btn btn-success hideButton" onClick={hideMe}>
                    ^
                </button> 
            </div>

         <div className="row" style={{ marginLeft: '0', marginRight: '0'}}> 
                    <div className="col-lg-12">
                        <div className="row">
                            <div className="col-lg-9">
                                <div className="twitchPlayer embed-responsive embed-responsive-16by9">
                                    <iframe src={"https://player.twitch.tv/?channel=" + currentChannel} className="embed-responsive-item"
                                    frameborder="0" allowfullscreen="true" scrolling="no" height="800vh" width="1100vh"></iframe>
                                </div>
                            </div>

                            <div className="col-lg-3">
                                <div className="twitchChat embed-responsive embed-responsive-1by1">
                                    <iframe src={"https://www.twitch.tv/embed/"+currentChannel+"/chat"} className="embed-responsive-item"
                                    frameborder="0" scrolling="no" height="100%" width="450vh"></iframe>


                                </div>
                            </div>
                            
                        </div>
                    </div>
                
                     
            
            </div>
    </div>


    )
}

export default Homepage