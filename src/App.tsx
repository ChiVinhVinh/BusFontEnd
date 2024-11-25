import Body from './Body/Body'
import Footer from './footer/footer'
import Headers from './Header/Header'
import './App.css'
import { useState } from 'react'
import FormChatBox from './components/FormChatbox'
import SearchForm from './components/SearchForm'
import FillterForm from './components/FillterForm'

function App() {
  const [clickform, setClickForm] = useState(false);
  const [result1, setResult1] = useState({
    dataTrip: [],
    timecount: {}
  })
  const [projectState, setProjectState] = useState<{
    selectedProjectId: null | undefined;
    project: any[];
  }>({
    selectedProjectId: undefined,
    project: [],
  });
  function handChangeProject() {
    setProjectState(prev => {
      return {
        ...prev,
        selectedProjectId: null,

      }
    });
  }
  console.log("result111111111111111111", result1.timecount)
  const toggleForm = () => {
    setClickForm((prev) => !prev)
  }
  let content;
  if (projectState.selectedProjectId === null) {
    content = <FillterForm data={result1.dataTrip} count={result1.timecount}></FillterForm>
  } else if (projectState.selectedProjectId === undefined) {
    content = <Body></Body>
  }
  console.log(content)
  return (
    <main className='main-container'>
      <Headers></Headers>
      <div className='main-content'>
        <div className='searchForm'>
          <img className='img' style={{ maxWidth: '1128px' }} src="https://cdn.futabus.vn/futa-busline-web-cms-prod/web_ca16250b69/web_ca16250b69.png"></img>
          <SearchForm onChangeProject={handChangeProject} result1={setResult1}></SearchForm>
        </div>
        <div className='csssss'>
          {content}
        </div>
      </div>
      <Footer></Footer>
      <div className='container-chatbox'>
        <div className='chat-box'>
          <button onClick={toggleForm}><img style={{ width: '30px' }} src="/public/live-chat.png"></img></button>
        </div>
        {clickform ?
          <div className='chatbox-form'><FormChatBox></FormChatBox> </div> : null}
      </div>
    </main>
  )
}

export default App
