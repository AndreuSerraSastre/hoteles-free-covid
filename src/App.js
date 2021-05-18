import MainContainer from './containers/MainContainer';
import Header from './components/Header';
import 'antd/dist/antd.css';
import { hotelesGet } from './actions/hotelAction';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Loading from './components/Loading'
import { useAlert } from 'react-alert';
import AddToHomescreen from 'react-add-to-homescreen';

function App() {

  const hoteles = useSelector(state => state.hoteles);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const alert = useAlert()

  const Cargarhoteles = async () => {
    setLoading(true);
    const response = await dispatch(hotelesGet());
    if (response.status === 400) {
      alert.show(response.err)
    } else if (response.status === 404 || response.status === 500) {
      alert.show('ERROR DE CONEXIÓN CON EL SERVIDOR.')
    }
    setLoading(false);
  }

  const handleAddToHomescreenClick = () => {
    alert(`
      1. Open Share menu
      2. Tap on "Add to Home Screen" button`);
  };

  useEffect(() => {
    if (!hoteles || hoteles.length === 0) {
      Cargarhoteles();
    }
  })

  return (
    <div className="App">
      <AddToHomescreen onAddToHomescreenClick={handleAddToHomescreenClick} />
      <Header></Header>
      {!loading ?
        <MainContainer /> :
        <></>
      }
      <Loading loading={loading}></Loading>
    </div>
  );
}

export default App;

