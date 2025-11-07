import Header from "./components/sections/Header";
import Footer from "./components/sections/Footer";
import Page from "./components/ui/Page";
import Dashboard from "./components/Dashboard/Dashboard";
function App() {
  return (
    <Page title={""}>
      <Header />
      <Dashboard />
      <Footer />
    </Page>
  );
}

export default App;
