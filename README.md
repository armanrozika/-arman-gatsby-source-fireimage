## Sourcing Data From Google Firestore

This is a simple plugin to transform firestore collection into gatsby pages. It is most suitable for pages that don't need rich text and many images, for example product pages for book store.

**install**

```
npm install gatsby-source-fireimage
```

**gatsby config**

```javascript
//gatsby-config.js
module.exports = {
  plugins: [
    {
      resolve: "gatsby-source-fireimage",
      options: {
        credential: require("<path-to-your-firebase-admin-credential>"),
        appConfig: {
          databaseURL: "<firebase-databaseUrl>",
        },
        //your collection name, books for example
        collection: "books",
      },
    },
  ],
};
```

You can find how to get admin credential here, [Firebase Admin](https://firebase.google.com/docs/admin/setup#add_firebase_to_your_app!).

This plugin will also create an image node if your firebase collection has 'imgurl' property that point to the image url. This is useful if you want to use gatsby-image (you should use it for images).

```javascript
//example for books collection
{
    title: "This is book title",
    description: "A book worth reading",
    //if imgurl exist, image will be created
    //make sure it is pointed to correct url
    imgurl: "https://via.placeholder.com/300/09f/fff.png"
}
```
