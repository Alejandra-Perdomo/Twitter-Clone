
const axios=require('axios');
const url='https://api.twitter.com/1.1/search/tweets.json';

class Twitter{
    get(query,maxID){
        return axios.get(url,{
            params:{
                q:query,
                include_entities:1,
                max_id:maxID
            },
            headers:{
                'Authorization':`Bearer ${process.env.TWITTER_API_TOKEN}`
            }
        })
    }
}

module.exports=Twitter;