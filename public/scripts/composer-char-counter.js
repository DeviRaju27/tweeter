$(document).ready(() => {
  const tweet = $("#tweet-text");
  const counter = $(".counter");
  //const newTweetButton = $(".new-tweet-button");

  $(tweet).on('keyup input',function(){
  let tweetLength = this.value.length;
  $(counter).text (140 - tweetLength);
  if(tweetLength >140){
     return $(counter).css ("color","red");
  }
    return $(counter).css ("color","black");
 })

//  $button.on('click', () => {
//   console.log('button got clicked');
//   newTweetButton.val('').focus();
//  })

})