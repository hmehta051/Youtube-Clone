// const key= "AIzaSyBMpdAktVAHkWrj1-shoyfQKxjbexSeILw"
// const video_http='https://www.googleapis.com/youtube/v3/videos?';
// const channel_http='https://www.googleapis.com/youtube/v3/channels?';
// const videoContainer=document.querySelector(".video-container")
// fetch(video_http+ new URLSearchParams({
//     key:key,
//     part:'snippet',
//     chart:'mostPopular',
//     maxResults:2,
//     regionCode:'IN'
// }))
// .then(res =>  res.json())
// .then(data => {
//     console.log(data);
//     data.items.forEach(item => {
//         get(item);
//     });
// }).catch(err=>console.log('err:',err))
// const get =(video_data)=>{
//     fetch(channel_http+ new URLSearchParams({
//         key:key,
//         part:'snippet',
//         id:video_data.snippet.channelId
//     }))
//     .then(res=>res.json())
//     .then(data=>{
//         console.log(data);
//         video_data.channelThumbnail=data.items[0].snippet.thumbnails.default.url;
//         //console.log(video_data);
//         makevideocard(video_data);
//     })

// }

// const makevideocard=(data)=>{
//     videoContainer.innerHTML=`
//     <div class="video" onclick="location.href='https://youtube.com/watch?v=${data.id}'">
//     <img src="${data.snippet.thumbnails.high.url}" alt="" class="thumbnail">
//     <div class="content">
//         <img src="${data.channelThumbnail}" alt="" class="channel-icon">
//         <div class="info">
//             <h4 class="title">${data.snippet.title}</h4>
//             <p class="channel-name">${data.snippet.channelTitle}</p>
//         </div>
//     </div>
// </div>
//     `
// }



    
const key= "AIzaSyBMpdAktVAHkWrj1-shoyfQKxjbexSeILw"
const videoMain=document.querySelector("#videoMain")
    //https://youtube.googleapis.com/youtube/v3/search?q=tesla&type=video&key=[YOUR_API_KEY] 

    async function getsearch(){
        try{
            let name=document.getElementById("search-bar").value;
        let url=`https://youtube.googleapis.com/youtube/v3/search?q=${name}&part=snippet&maxResults=20&type=video&key=${key}`;
        let res=  await fetch(url);
        let data= await res.json();
        console.log('data:',data);
        let array_of_videos=data.items;
        console.log(array_of_videos);
        appendVideos(array_of_videos)
        } catch(err){
            console.log('err:',err);
        } finally{
            console.log("done");
        }
    }
const appendVideos =(arr) =>{
    videoMain.innerHTML=null
    arr.forEach( ({snippet,id:{videoId}}) => {
            
              let url=snippet.thumbnails.medium.url
              let div=document.createElement('div')
              let img=document.createElement('img');
              img.src=url;
              let title=snippet.title;
              let h4=document.createElement("h4");
              h4.innerText=title;
              let video_data={
                  snippet,
                  videoId // only if key and key value same
              }
              div.onclick=()=>{
                  showvideo(video_data);
              }
            //  img.src=`https://www.youtube.com/embed/${videoId}
            // //   let iframe=document.createElement('iframe');
            // //   iframe.src=`https://www.youtube.com/embed/${videoId}`
            // //   iframe.width='200px';
            //   iframe.height='200px';
            //   //iframe.allowFullscreen=true;
            //   iframe.setAttribute('allowFullScreen', true)
              div.append(img,h4);
              videoMain.append(div);

          });
}

// function showvideo() {
//     alert('clicked')
// }
const showvideo=(video_data)=>{
//console.log("video_data",video_data);
localStorage.setItem('clicked_video',JSON.stringify(video_data));

window.open("video.html")
}