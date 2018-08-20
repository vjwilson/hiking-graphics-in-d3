function makeImage(url, options = { height:  100, width:  100 }) {
  const img = new Image(options.width, options.height);
  img.src = url;
  return img;
}

export default makeImage;
