import Viewer from './components/Viewer';
import Sidebar from './components/Sidebar';
import Navbar from './components/Navbar';
import { useStore } from './store';
import shallow from 'zustand/shallow';

function App() {
  const { dot } = useStore((state) => ({ dot: state.dot }), shallow);

  if (dot == null || dot === '') {
    return <p>Waiting...</p>;
  }

  return (
    <div className="flex flex-col items-stretch w-screen h-screen">
      <Navbar />
      <div className="flex-auto">
        <div className="flex flex-row h-full items-stretch">
          <div style={{ width: '20rem' }} className="flex-none">
            <Sidebar />
          </div>
          <Viewer dot={dot} />
        </div>
      </div>
    </div>
  );
}

export default App;
