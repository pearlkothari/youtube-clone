import { VIDEOS_FAILED, VIDEOS_REQUEST, VIDEOS_SUCCESS, VIDEO_SELECTED_FAILED, VIDEO_SELECTED_REQUEST, VIDEO_SELECTED_SUCCESS } from "../Video.Actions"
const api=require('../../axios/api.js');

export const getVideoById=(id) => async (dispatch)=>{
    try {
        dispatch({
            type:VIDEO_SELECTED_REQUEST
        })
        const response=await api.request.get('/videos',{
            params:{
                part:'snippet,contentDetails,statistics',
                id:id
            }
        })
        dispatch({
            type:VIDEO_SELECTED_SUCCESS,
            payload:{
                meta_:response.data.items[0]
            }
        })
    } catch (err) {
        console.log(err.message);
        dispatch({
            type:VIDEO_SELECTED_FAILED,
            payload:err.message
        })
    }
}
export const getVideosUsingCategories= (category) => async (dispatch,getState)=>{
    try {
        dispatch({
            type:VIDEOS_REQUEST
        })
        const response=await api.request.get('/search',{
            params:{
                part:'snippet',
                regionCode:'IN',
                q:category,
                video:'video',
                pageToken:getState().video.nextPageToken,
                maxResults:30
            }
        })
        dispatch({
            type:VIDEOS_SUCCESS,
            payload:{
                videos:response.data.items,
                nextPageToken:response.data.nextPageToken,
                category:category
            }
        })
    } catch (err) {
        console.log(err.message);
        dispatch({
            type:VIDEOS_FAILED,
            payload:err.message
        })
    }
}
export const getMostPopularVideos = ()=> async dispatch=>{
    try {
        dispatch({
            type:VIDEOS_REQUEST
        })
        const response= await api.request.get('/videos',{
            params:{
                part:"snippet,contentDetails,statistics",
                chart:"mostPopular",
                regionCode:"IN",
                maxResults:30
            }
        })
        
        dispatch({
            type:VIDEOS_SUCCESS,
            payload:{
                videos:response.data.items,
                nextPageToken:response.data.nextPageToken,
                category:'All'
            }
        })
    } catch (err) {
        console.log(err.message);
        dispatch({
            type:VIDEOS_FAILED,
            payload:err.message
        })
    }
}
