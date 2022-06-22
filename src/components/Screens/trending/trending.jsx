import React from 'react';
import { useEffect } from 'react';
import { Container,Row,Col } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Video from '../../Video/Video';
import InfiniteScroll from 'react-infinite-scroll-component';
const video=require('../../../redux-files/actions/video');

function Trending() {
  const dispatch=useDispatch();
  useEffect(()=>{
    dispatch({type:'RESET_STATE'});
    dispatch(video.getMostPopularVideos())
  },[dispatch]);

  const {videos} =useSelector(state=>state.video);

  function loadMoreVideos(){
    dispatch(video.getMostPopularVideos());
  }

  return (
    <Container>
        <InfiniteScroll dataLength={videos.length} next={loadMoreVideos} hasMore={true} 
        loader={
        <div className='spinner-border text-danger d-block mx-auto mt-2'></div>
        }>
            <Row>
                {
                    videos.map((video,idx)=>{
                        return (
                            <Col key={idx} lg={3} md={4}>
                                <Video video={video}></Video>
                            </Col>
                        )
                    })
                }
            </Row>
        </InfiniteScroll>
    </Container>
  )
}

export default Trending