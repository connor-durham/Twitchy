import React, {useState, useEffect} from "react"
import api from "./Api"
import { Auth } from 'aws-amplify'
import mongoose from "mongoose"
import axios from "axios"

function Streams() {

    let user = localStorage.getItem("CognitoIdentityServiceProvider.kih6th6mjfivrhisimmkplm6.LastAuthUser")

    const [channels, setChannels] = useState([])

    const handleFavorite = (streamer) => {
        axios.post("/favorite", {params: { username: user, streams: streamer}}).then((res) => {
            console.log(res.data)
        })
    }

    useEffect(() => {
        const fetchData = async () => {
            const result = await api.get(`https://api.twitch.tv/helix/streams`)
            console.log(result)
            let dataArray = result.data.data
            let gameIDs = dataArray.map(streams => {
                return streams.game_id
            })
            let baseURL = `https://api.twitch.tv/helix/games?`
            let queryParams = ''
            gameIDs.map(id => {
                return (queryParams = queryParams + `id=${id}&`)
            })
            let finalURL = baseURL + queryParams
            let gameNames = await api.get(finalURL)
            let gameNameArray = gameNames.data.data
            let finalArray = dataArray.map(stream => {
                stream.gameName = ``
                gameNameArray.map(name => {
                    if(stream.game_id === name.id) {
                        return stream.gameName = name.name
                    }
                })
                let newURL = stream.thumbnail_url.replace("{width}", "320").replace("{height}", "180");
                stream.thumbnail_url = newURL
                return stream
            })
            setChannels(finalArray)
        }
        fetchData()
    }, [])
    return(
    <div>
        <h1 className="text-center">Most Popular Live Streams</h1>
        

        <div className="row">
            {channels.map(channel => (
            <div className="col-lg-4 col-md-6 col-sm-12 mt-5">
                <div className="card streamerCard">
                <img className="card-img-top" src={channel.thumbnail_url} />
                <div className="card-body">
                    <h3 className="card-title">{channel.user_name}</h3>
                    <h5 className="card-text"> {channel.gameName}</h5>
                    <div className="card-text">
                    {channel.viewer_count} live viewers
                    </div>
                    <button className="btn btn-success p-3" style={{marginLeft:  + '%'}}>
                    <a
                        href={"https://twitch.tv/" + channel.user_name}
                        className="link"
                        target="_blank"
                        
                    >
                        watch {channel.user_name}'s' stream
                    </a>
                    </button>
                    <button className="btn btn-success p-3" style={{marginLeft: 12 + '%'}} onClick={() => handleFavorite(channel)}>
                       Add to Favorites
                    </button>

                </div>
                </div>
            </div>
            ))}
        </div>
    </div>
    )
}

export default Streams