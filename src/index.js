import React from 'react';
import ReactDOM from 'react-dom';

import AboutFace from 'components/AboutFace';
import AboutFace2 from 'components/AboutFace2';
import BoatRipple from 'components/BoatRipple';
import Trifold from 'components/Trifold';

ReactDOM.render(
  <div>
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
    <BoatRipple />
    <AboutFace>
      {['darken', 'about-face-1-c.jpg', 'about-face-1-d.jpg']}
    </AboutFace>
    <AboutFace>{['darken','about-face-2-c.jpg', 'about-face-2-d.jpg']}</AboutFace>
  </div>,
  document.getElementById('root')
);
