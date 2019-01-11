
import React from 'react';
import ReactDOM from 'react-dom';
import App from './views/APP';

ReactDOM.render(<App />, document.getElementById('root'));

// const root = document.getElementById('root');
// const render = Component => {
//   ReactDOM.hydrate(
//     <APPContainer>
//       <Component />
//     </APPContainer>
//   ,root)
// }

// render(App)

// //判断当需要热更新的代码出现时，重新加载整个app
// if(module.hot) {
//   module.hot.accept('./App.jsx', () => {
//     //引文使用require 引用export default的类。
//     const NextApp = require('./App.jsx').default
//     //ReactDOM.render(<NextApp/>, document.getElementById('root'))
//     render(NextApp)
//   })
// }
