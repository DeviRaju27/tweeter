$(document).ready(() => {
  const tweet = $("#tweet-text")
  const counter = $(".counter")

  $(tweet).keyup(function(){
  let tweetLength = this.value.length;
  $(counter).text (140 - tweetLength);
  if(tweetLength >140){
     return $(counter).css ("color","red");
  }
    return $(counter).css ("color","black");
 })
})