import React from 'react'

const App = () => {
  return (
   <Routes>
    <Route path="/" element={<Home />} />
    {/* <Route path="/login" element={<LoginPage />} />
    <Route path="/register" element={<RegisterPage />} /> */}
   </Routes>
  )
}

export default App