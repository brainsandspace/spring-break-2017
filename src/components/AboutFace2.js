import React from 'react';
import glamorous from 'glamorous';

const Container = glamorous.div({
  position: 'relative',
  width: '100vw',
  minHeight: '500px',
});

const Img = glamorous.img({
  width: '100vw',
  // minHeight: '500px',
  // // position: 'absolute',
  // backgroundSize: 'cover',
  backgroundBlendMode: 'multiply',
  '&:nth-of-type(1)': {
    display: 'block',
    color: 'white',
  },
});

const AboutFace2 = props => (
  <Container display="flex" width="100vw">
    {props.children.map(child => <img key={child} src={`img/${child}`} alt=""/>)}
    {/*<Div
      style={{
        backgroundImage: `url(img/${props.children[1]}), url(img/${props.children[2]})`,
        backgroundBlendMode: props.children[0],
      }}*/}
    />
  </Container>
);

export default AboutFace2;
