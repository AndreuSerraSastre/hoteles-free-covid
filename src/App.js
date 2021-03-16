import MainContainer from './containers/MainContainer';
import Header from './components/Header';
import 'antd/dist/antd.css';

function App() {
  return (
    <div className="App">
      <Header></Header>
      <MainContainer />
    </div>
  );
}

export default App;

