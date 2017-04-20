import React from 'react';
import glamorous from 'glamorous';

const H1 = glamorous.h1({
  display: 'none',
  fontFamily: 'sans-serif',
  fontSize: '3rem',
});

const Container = glamorous.div({
  display: 'flex',
  width: '100vw',
});

const Div = glamorous.div({
  height: '300px',
  flex: 1,
  backgroundSize: 'cover',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  '&:hover > h1': {
    display: 'block',
    transform: `rotate(${(Math.random() - 0.5) * 45}deg)`,
    color: 'white',
  },
});

const Trifold = props => (
  <Container display="flex" width="100vw">
    {props.children.map(child => (
      <Div key={child.name} style={{ backgroundImage: `url(${child.image})` }}>
        <H1>
          {child.name}
        </H1>
      </Div>
    ))}
  </Container>
);

export default Trifold;
