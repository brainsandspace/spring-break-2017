import React from 'react';
import glamorous from 'glamorous';

// const Container = glamorous.div({
//   position: 'relative',
//   // width: '100vw',
//   minHeight: '1000px',
// });

const Div = glamorous.div({
  // width: '100vw',
  minHeight: '100vh',
  // position: 'absolute',
  backgroundSize: 'cover',
  '&:nth-of-type(1)': {
    display: 'block',
    color: 'white',
  },
});

const AboutFace = props => (
  // <Container display="flex" width="100vw">
    <Div
      style={{
        backgroundImage: `url(img/${props.children[1]}), url(img/${props.children[2]})`,
        backgroundBlendMode: props.children[0],
        backgroundPosition: '0px 0px, 0px 0px',
      }}
    />
  // </Container>
);

export default AboutFace;
