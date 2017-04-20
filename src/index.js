import React from 'react';
import ReactDOM from 'react-dom';

import FxGallery from 'components/FxGallery';
import Trifold from 'components/Trifold';

ReactDOM.render(
  <div>
    <Trifold>
      {[
        { image: 'img/park-left.jpg', name: 'Alex' },
        { image: 'img/park-middle.jpg', name: 'Connor' },
        { image: 'img/park-right.jpg', name: 'Preston' },
      ]}
      {/*<img src="img/park-left.jpg" alt="park-left" />*/}
      {/*<img src="img/park-middle.jpg" alt="park-middle" />*/}
      {/*<img src="img/park-right.jpg" alt="park-right" />*/}
    </Trifold>
    <FxGallery></FxGallery>
  </div>,
  document.getElementById('root')
);
