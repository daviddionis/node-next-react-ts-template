import { Card } from 'antd';
import 'antd/dist/reset.css'
import { BrowserRouter as Router } from 'react-router-dom';
import './App.css';
import AdminLayout from './components/Layout/AdminLayout';

function App() {
  return (
    <div className="App">
      <Router>
        <AdminLayout>
          <Card title="Card Title" bordered={false} style={{ width: "100%" }}>
            <p>Card content</p>
          </Card>
        </AdminLayout>
      </Router>
    </div>
  );
}

export default App;
