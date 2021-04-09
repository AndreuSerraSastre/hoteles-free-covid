import MainContainer from './containers/MainContainer';
import Header from './components/Header';
import 'antd/dist/antd.css';
import { hotelesGet } from './actions/hotelAction';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Loading from './components/Loading'

function App() {

  const hoteles = useSelector(state => state.hoteles);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

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

  useEffect(() => {
    if (!hoteles || hoteles.length == 0) {
      Cargarhoteles();
    }
  }, [dispatch])

  return (
    <div className="App">
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

