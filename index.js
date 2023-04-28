/*
 ** PACKAGES
 */
const FormData = require("form-data");
const { TwitterApi } = require("twitter-api-v2");
const fs = require("fs");

/*
 ** AUTHENTICATION
 */
const clientnew = new TwitterApi({
  appKey: "RYwuKure5YNWdv3JbMKp4GeT7",
  appSecret: "TCCTl1UKHywLa3AvQrx08vkRtNIbi2DMbyiUDnv7Xe3R25hWTx",
  accessToken: "1651581240120602624-PtOlHkLzj8b8e2IEyMH7mitUcSgmDQ",
  accessSecret: "1dKK49Sc6sAau7NQSLSBrBOr91QiNRZBm2e6QQdnmbW7A",
});

const rwClient = clientnew.readWrite;

/*
 ** GET TWEETS FROM FILE
 */
var filepath = "/Users/diogduarte/Desktop/Bots/twitterBot-updated/tweets.txt";
function getTweets() {
  const tweets = fs.readFileSync(filepath, "utf8").split("\n");
  var tweetstrimmed = tweets.filter((tweet) => tweet.trim() !== "");
  for (let i = 0; i < tweetstrimmed.length; i++) {
    tweetstrimmed[i] = tweetstrimmed[i].slice(0, -1); // remove last 3 characters
  }
  return tweetstrimmed;
}

/*
 ** RESQUEST'S
 */
async function SendTweet() {
  const tweets = getTweets();
  var twttext = "";

  Object.keys(tweets).forEach((key) => {
    twttext = twttext + " " + `${tweets[key]}`;
  });

  const { data: createdTweet } = await rwClient.v2.tweet(twttext);
  console.log("Tweet", createdTweet.id, ":", createdTweet.text);
}

async function SendTweetImage() {
  const mediaId = await clientnew.v1.uploadMedia(
    "/Users/diogduarte/Desktop/Bots/twitterBot-updated/images/susdog.png"
  );

  const { data: createdTweet } = await rwClient.v2.tweetThread([
    {
      text: "Quando ela diz que é só um amigo hahahahahahaha sou muito louco mano",
      media: { media_ids: [mediaId] },
    },
  ]);
  console.log("Tweet image enviado");
}

SendTweetImage();
