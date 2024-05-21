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
  appKey: "appKey",
  appSecret: "appSecret",
  accessToken: "accessToken",
  accessSecret: "accessSecret",
});

const rwClient = clientnew.readWrite;

/*
 ** GET TWEETS FROM FILE
 */
var filepath = "filepath";
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
    "filepath"
  );

  const { data: createdTweet } = await rwClient.v2.tweetThread([
    {
      text: "text",
      media: { media_ids: [mediaId] },
    },
  ]);
  console.log("Tweet image");
}

SendTweetImage();
