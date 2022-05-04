

const base_url='http://localhost:3000/tweets';
let nextPage_url=null;

getTwitterData=(nextPage=false)=>{
    let url='';

    if(nextPage && nextPage_url){
        url=nextPage_url;
    }else{

        let query=document.getElementById('search-bar-input').value;
        let encodedQuery=encodeURIComponent(query);

        url=`${base_url}?q=${encodedQuery}&result_type=recent`;
    }
    

    fetch(url).then((response)=>{
        return response.json();
    }).then((data)=>{
        console.log(data);
        buildTweets(data.statuses,nextPage);
        SaveNextPage(data.search_metadata);
        
    })
}

onEnter=(e)=>{
    if(e.key=='Enter'){
        getTwitterData();
    }
}

buildTweets=(tweets_array,nextPage)=>{
    let tweets='';
    tweets_array.map((tweet)=>{
        tweets+=`
                <div class="tweet-container">
                <div class="user-info-container">
                    <div class="user-profile-pic" style="background-image:url(${tweet.user.profile_image_url})"></div>
                    <div class="user-info">
                        <div class="user-name">${tweet.user.name}</div>
                        <div class="user-handle">@${tweet.user.screen_name}</div>
                    </div>      
                </div>`
              
            if(tweet.extended_entities && tweet.extended_entities.media){
                tweets+=buildImages(tweet.extended_entities.media);
                tweets+=buildVideo(tweet.extended_entities.media);
                tweets+=buildGIFs(tweet.extended_entities.media);
            }
            
            tweets+=`<div class="tweet-text">${tweet.text}</div>
            <div class="creation-time">${moment(tweet.created_at).fromNow()}</div>
            </div>
            `;
    })

    if(nextPage){
        document.querySelector('.tweets-list-container').insertAdjacentHTML('beforeend',tweets);
    }else{
        document.querySelector('.tweets-list-container').innerHTML=tweets;
    }

   

}

buildImages=(Media)=>{

    let imgtags='<div class="tweet-media">';
    let imgExists=false;
    Media.map((media)=>{  
        if(media.type=='photo'){
            imgExists=true;
            imgtags+=`
            <div class="tweet-img" onclick="PopUp(this)" style="background-image: url(${media.media_url_https})"></div>
            `;
        }       
    })
    imgtags+='</div>';
    return imgExists?imgtags:'';

}

buildVideo=(media)=>{
    let videotags='<div class="tweet-media">';
    let videoExists=false;
    if(media[0].type=='video'){
        videoExists=true;
        let found_variant=media[0].video_info.variants.find((variant)=>variant.content_type=='video/mp4');
                videotags+=`
                <video controls>
                <source src="${found_variant.url}" type="video/mp4">
                </video>
                `;                
    }
    videotags+='</div>';
    return videoExists?videotags:'';
   
} 

buildGIFs=(media)=>{
    let GIFtag='<div class="tweet-media">';
    let GIF_Exists=false;
    if(media[0].type=='animated_gif'){
        GIF_Exists=true;
        let found_variant=media[0].video_info.variants.find((variant)=>variant.content_type=='video/mp4');
                GIFtag+=`
                <video autoplay loop>
                <source src="${found_variant.url}" type="video/mp4">
                </video>
                `;                
    }
    GIFtag+='</div>';
    return GIF_Exists?GIFtag:'';
}

OnTrend=(ListItemTag)=>{
    document.getElementById('search-bar-input').value=ListItemTag.innerText;
    getTwitterData();
}

SaveNextPage=(metadata)=>{
    if(metadata.next_results){
        nextPage_url=`${base_url}${metadata.next_results}`;
        ShowNextPageButton();
    }else{
        nextPage_url=null;
        HideNextPageButton();
    }
}


OnNextPage=()=>{
    if(nextPage_url){
        getTwitterData(true);
    }
}

ShowNextPageButton=()=>{
  /*   let button='<div class="next-page-btn" onclick="OnNextPage()"><i class="fas fa-arrow-down"></i></div>';
    document.querySelector('.tweets-list-container').insertAdjacentHTML('afterend',button); */
    document.querySelector('.next-page-btn').style.visibility='visible';
}

HideNextPageButton=()=>{
    document.querySelector('.next-page-btn').style.visibility='hidden';
}

