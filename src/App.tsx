import Body from './Body/Body'
import Footer from './footer/footer'
import Headers from './Header/Header'
import { useState } from 'react'
import FormChatBox from './components/FormChatbox'
import SearchForm from './components/SearchForm'
import FillterForm from './components/FillterForm'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import CRUD from './CRUD/crud'
import { Box, styled, IconButton } from '@mui/material'


const MainContainer = styled('main')({
  display: 'flex',
  flexDirection: 'column',
  minHeight: '100vh',
  textAlign: 'center',
});


const MainContent = styled(Box)({
  flex: 1,
});

const SearchFormContainer = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  marginTop: '210px',
});

const BannerImage = styled('img')({
  position: 'absolute',
  maxWidth: '1128px',
  height: 'auto',
  top: '29%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  borderRadius: '20px',
  zIndex: 1,
  boxShadow: '0 3px 6px rgba(0, 0, 0, .16), 0 3px 6px rgba(0, 0, 0, .2)',
});

const ContentWrapper = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
});

const ChatboxContainer = styled(Box)({
  position: 'fixed',
  bottom: '80px',
  right: '20px',
  display: 'flex',
  flexDirection: 'column-reverse',
  alignItems: 'flex-end',
  gap: '20px',
  zIndex: 1,
});

const ChatButton = styled(IconButton)({
  backgroundColor: '#fff',
  padding: '10px 20px',
  borderRadius: '50%',
  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
  '&:hover': {
    backgroundColor: '#f5f5f5',
  },
});

function App() {
  const [clickform, setClickForm] = useState(false);
  const [result1, setResult1] = useState({
    dataTrip: [],
    timecount: {}
  });
  const [projectState, setProjectState] = useState<{
    selectedProjectId: null | undefined;
    project: any[];
  }>({
    selectedProjectId: undefined,
    project: [],
  });

  function handChangeProject() {
    setProjectState(prev => ({
      ...prev,
      selectedProjectId: null,
    }));
  }

  const toggleForm = () => {
    setClickForm((prev) => !prev);
  }

  let content;
  if (projectState.selectedProjectId === null) {
    content = <FillterForm data={result1.dataTrip} count={result1.timecount} />;
  } else if (projectState.selectedProjectId === undefined) {
    content = <Body />;
  }

  return (
    <Router>
      <Routes>
        <Route path="/crud/*" element={<CRUD />} />
        <Route path="/" element={
          <MainContainer>
            <Headers />
            <MainContent>
              <SearchFormContainer>
                <BannerImage
                  src="https://cdn.futabus.vn/futa-busline-web-cms-prod/web_ca16250b69/web_ca16250b69.png"
                  alt="Banner"
                />
                <SearchForm
                  onChangeProject={handChangeProject}
                  result1={setResult1}
                />
              </SearchFormContainer>
              <ContentWrapper>
                {content}
              </ContentWrapper>
            </MainContent>
            <Footer />
            <ChatboxContainer>
              <ChatButton onClick={toggleForm}>
                <Box
                  component="img"
                  src="/public/live-chat.png"
                  sx={{ width: '30px' }}
                />
              </ChatButton>
              {clickform && (
                <Box>
                  <FormChatBox />
                </Box>
              )}
            </ChatboxContainer>
          </MainContainer>
        } />
      </Routes>
    </Router>
  );
}

export default App;