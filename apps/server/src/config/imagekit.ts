import ImageKit from "imagekit";

const imageKit = new ImageKit({
  publicKey: process.env.IMAGEKIT_RESTRICTED_PUBLIC_KEY as string,
  privateKey: process.env.IMAGEKIT_RESTRICTED_PRIVATE_KEY as string,
  urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT as string,
});

export default imageKit;
