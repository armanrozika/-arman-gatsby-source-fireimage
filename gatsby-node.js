const admin = require("firebase-admin");
const { createRemoteFileNode } = require("gatsby-source-filesystem");

exports.sourceNodes = async (
  { actions, createNodeId, createContentDigest },
  { appConfig, credential, collection }
) => {
  try {
    //initialize firebase admin
    admin.initializeApp({
      credential: admin.credential.cert(credential),
      databaseUrl: appConfig.databaseURL,
    });

    //get collection
    const res = await admin.firestore().collection(collection).get();

    //create node based on get collection response
    for (let doc of res.docs) {
      actions.createNode({
        ...doc.data(),
        id: createNodeId(`${collection}-${doc.id}`),
        parent: null,
        children: [],
        internal: {
          type: "firebase",
          content: JSON.stringify(doc.data()),
          contentDigest: createContentDigest(doc.data()),
        },
      });
    }
  } catch (err) {
    console.log(err);
  }
};

module.exports.onCreateNode = async ({
  node,
  actions: { createNode },
  store,
  cache,
  createNodeId,
}) => {
  if (node.internal.type === "firebase" && node.imgurl !== null) {
    let fileNode = await createRemoteFileNode({
      url: node.imgurl, // string that points to the URL of the image
      //attach this node to parent you want to, so the parent will have imgSrc
      parentNodeId: node.id,
      createNode, // helper function in gatsby-node to generate the node
      createNodeId, // helper function in gatsby-node to generate the node id
      cache, // Gatsby's cache
      store, // Gatsby's redux store
    });
    // if the file was created, attach the new node to the parent node
    if (fileNode) {
      //dont have to be imgSrc, name it whatever you want
      node.imgSrc___NODE = fileNode.id;
    }
  }
};
