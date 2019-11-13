import React, {useState, useEffect} from "react"

const FavoriteList = ({channels, currentViewing, deleteFavorite}) => {
    return channels.map(channel => (
        <div className="card favoriteCard" key={channel.ids}>
        {/* <img className="card-img-top" src={channel.thumbnail_url.replace("{width}", "320").replace("{height}", "180")} /> */}
        <div className="card-body">
            <h3 className="card-title favoriteCardTitle">{channel.user_name}</h3>
            <h5 className="card-text favoriteCardText"> {channel.gameName}</h5>
            <div className="card-text favoriteCardText">
            {channel.viewer_count} live viewers
            </div>
            <button className="btn btn-success p-2">
            <a
                onClick={() => currentViewing(channel.user_name)}
                className="link"
                target="_blank"
                
            >
                Watch
            </a>
            </button>
            
            <button className="btn btn-success p-2" style={{marginLeft: 1.5 + 'rem'}} onClick={() => deleteFavorite(channel.user_name)}>
                Unfavorite
            </button>
        </div>
        </div>
        ))
}

export default FavoriteList