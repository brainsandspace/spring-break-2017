import React from 'react';
import ReactDOM from 'react-dom';

import AboutFace from 'components/AboutFace';
import AboutFace2 from 'components/AboutFace2';
import BoatRipple from 'components/BoatRipple';
import Bridge from 'components/Bridge';
import Leftovers from 'components/Leftovers';
import Trifold from 'components/Trifold';

ReactDOM.render(
  <div>
    <BoatRipple />
    <Leftovers />
    <Bridge />
    <AboutFace2 />
    <AboutFace>
      {['darken', 'about-face-1-c.jpg', 'about-face-1-d.jpg']}
    </AboutFace>
    <Trifold>
      {[
        { image: 'park-left.jpg', name: 'Alex' },
        { image: 'park-middle.jpg', name: 'Connor' },
        { image: 'park-right.jpg', name: 'Preston' },
      ]}
      {/*<img src="img/park-left.jpg" alt="park-left" />*/}
      {/*<img src="img/park-middle.jpg" alt="park-middle" />*/}
      {/*<img src="img/park-right.jpg" alt="park-right" />*/}
    </Trifold>
  </div>,
  document.getElementById('root')
);
