import './App.css';
import EmployeeForm from './components/Form/Form';
import ListPage from './components/ListPage/ListPage';
import '@ionic/react/css/core.css';
import { setupIonicReact } from '@ionic/react';

setupIonicReact();
function App() {
  return (
    <div className="App">
      {/* <EmployeeForm/> */}
      <ListPage/>
    </div>
  );
}

export default App;
