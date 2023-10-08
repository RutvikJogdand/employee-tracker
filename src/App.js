import './App.css';
import '@ionic/react/css/core.css';
import { setupIonicReact } from '@ionic/react';
import AppRoutes from './routes/Routes';

setupIonicReact();
function App() {
  return (
    <div className="App">
      <AppRoutes/>
    </div>
  );
}

export default App;
